import type { FastifyPluginAsync } from 'fastify'
import { eq, or, and, desc, sql } from 'drizzle-orm'
import { encounters, reviews, invites, trustLogs, users } from '@patudos/db/schema'
import { confirmEncounterSchema, createReviewSchema } from '@patudos/shared/schemas'

export const encounterRoutes: FastifyPluginAsync = async (app) => {
  // GET /api/encounters — List encounters for current user
  app.get('/', async (request) => {
    const userId = (request.headers['x-user-id'] as string) || 'test-user'
    const userEncounters = await app.db.select()
      .from(encounters)
      .where(or(eq(encounters.user1Id, userId), eq(encounters.user2Id, userId)))
      .orderBy(desc(encounters.createdAt))
    return { success: true, data: userEncounters }
  })

  // PUT /api/encounters/:id/confirm — Confirm presence at encounter
  app.put<{ Params: { id: string } }>('/:id/confirm', async (request, reply) => {
    const body = confirmEncounterSchema.parse(request.body)
    const userId = (request.headers['x-user-id'] as string) || 'test-user'

    const [encounter] = await app.db.select().from(encounters).where(eq(encounters.id, request.params.id)).limit(1)
    if (!encounter) return reply.status(404).send({ success: false, error: 'Encounter not found' })

    // Determine which user is confirming
    const isUser1 = encounter.user1Id === userId
    const isUser2 = encounter.user2Id === userId
    if (!isUser1 && !isUser2) return reply.status(403).send({ success: false, error: 'Not a participant' })

    const updateData: Record<string, unknown> = {}
    if (isUser1) {
      updateData.confirmedByUser1 = true
      updateData.confirmedAt1 = new Date()
    } else {
      updateData.confirmedByUser2 = true
      updateData.confirmedAt2 = new Date()
    }

    // Check co-location (both users within 500m of suggested location)
    if (encounter.latitude && encounter.longitude) {
      const distanceKm = haversineDistance(
        body.latitude, body.longitude,
        encounter.latitude, encounter.longitude
      )
      if (distanceKm < 0.5) updateData.coLocatedVerified = true
    }

    const [updated] = await app.db.update(encounters).set(updateData).where(eq(encounters.id, request.params.id)).returning()

    // If both confirmed, mark as completed + update invite status
    if (updated.confirmedByUser1 && updated.confirmedByUser2) {
      await app.db.update(encounters).set({ status: 'completed' }).where(eq(encounters.id, request.params.id))
      await app.db.update(invites).set({ status: 'aconteceu', updatedAt: new Date() }).where(eq(invites.id, encounter.inviteId))

      // Award trust points to both users
      await awardTrustPoints(app.db, encounter.user1Id, 5, 'encounter_completed')
      await awardTrustPoints(app.db, encounter.user2Id, 5, 'encounter_completed')
    }

    return { success: true, data: updated }
  })

  // POST /api/encounters/:id/review — Post micro-review
  app.post<{ Params: { id: string } }>('/:id/review', async (request, reply) => {
    const body = createReviewSchema.parse(request.body)
    const userId = (request.headers['x-user-id'] as string) || 'test-user'

    const [encounter] = await app.db.select().from(encounters).where(eq(encounters.id, request.params.id)).limit(1)
    if (!encounter) return reply.status(404).send({ success: false, error: 'Encounter not found' })

    const reviewedUserId = encounter.user1Id === userId ? encounter.user2Id : encounter.user1Id

    const [review] = await app.db.insert(reviews).values({
      encounterId: request.params.id,
      reviewerId: userId,
      reviewedUserId,
      score: body.score,
      comment: body.comment || null,
    }).returning()

    // Award/penalize trust based on review
    const pointsDelta = body.score === 'positive' ? 3 : body.score === 'negative' ? -5 : 0
    if (pointsDelta !== 0) {
      await awardTrustPoints(app.db, reviewedUserId, pointsDelta, `review_${body.score}`)
    }

    return reply.status(201).send({ success: true, data: review })
  })
}

// ==================== HELPERS ====================

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

async function awardTrustPoints(db: any, userId: string, points: number, action: string) {
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1)
  if (!user) return

  const newScore = Math.max(0, user.trustScore + points)

  // Determine new level
  let newLevel: string = 'novato'
  if (newScore >= 500) newLevel = 'embaixador'
  else if (newScore >= 250) newLevel = 'guardiao'
  else if (newScore >= 120) newLevel = 'companheiro'
  else if (newScore >= 50) newLevel = 'explorador'
  else if (newScore >= 20) newLevel = 'curioso'

  await db.update(users).set({ trustScore: newScore, trustLevel: newLevel, updatedAt: new Date() }).where(eq(users.id, userId))

  await db.insert(trustLogs).values({
    userId,
    action,
    pointsDelta: points,
    previousScore: user.trustScore,
    newScore,
    reason: `${action}: ${points > 0 ? '+' : ''}${points} points`,
  })
}
