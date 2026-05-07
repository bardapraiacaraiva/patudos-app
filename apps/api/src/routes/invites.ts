import type { FastifyPluginAsync } from 'fastify'
import { eq, or, and, desc } from 'drizzle-orm'
import { invites, dogs, encounters } from '@patudos/db/schema'
import { createInviteSchema, updateInviteSchema } from '@patudos/shared/schemas'
import { LIMITS } from '@patudos/shared/constants'

export const inviteRoutes: FastifyPluginAsync = async (app) => {
  // POST /api/invites — Send a Patinha (invite)
  app.post('/', async (request, reply) => {
    const body = createInviteSchema.parse(request.body)
    const userId = (request.headers['x-user-id'] as string) || 'test-user'

    // Get sender's first dog (simplified — later: let user pick which dog)
    const [senderDog] = await app.db.select().from(dogs).where(eq(dogs.ownerId, userId)).limit(1)
    if (!senderDog) return reply.status(400).send({ success: false, error: 'You need a dog profile first' })

    // Get recipient dog to find recipient user
    const [recipientDog] = await app.db.select().from(dogs).where(eq(dogs.id, body.recipientDogId)).limit(1)
    if (!recipientDog) return reply.status(404).send({ success: false, error: 'Recipient dog not found' })

    const expiresAt = new Date(Date.now() + LIMITS.INVITE_EXPIRY_HOURS * 60 * 60 * 1000)

    const [invite] = await app.db.insert(invites).values({
      senderDogId: senderDog.id,
      senderUserId: userId,
      recipientDogId: body.recipientDogId,
      recipientUserId: recipientDog.ownerId,
      activityType: body.activityType,
      proposedDatetime: body.proposedDatetime ? new Date(body.proposedDatetime) : null,
      message: body.message || null,
      suggestedLocationName: body.suggestedLocationName || null,
      suggestedLocationLat: body.suggestedLocationLat || null,
      suggestedLocationLng: body.suggestedLocationLng || null,
      expiresAt,
    }).returning()

    // TODO: send push notification to recipient

    return reply.status(201).send({ success: true, data: invite })
  })

  // GET /api/invites — List all invites for current user
  app.get('/', async (request) => {
    const userId = (request.headers['x-user-id'] as string) || 'test-user'

    const userInvites = await app.db.select()
      .from(invites)
      .where(or(eq(invites.senderUserId, userId), eq(invites.recipientUserId, userId)))
      .orderBy(desc(invites.createdAt))

    return { success: true, data: userInvites }
  })

  // GET /api/invites/:id
  app.get<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const [invite] = await app.db.select().from(invites).where(eq(invites.id, request.params.id)).limit(1)
    if (!invite) return reply.status(404).send({ success: false, error: 'Invite not found' })
    return { success: true, data: invite }
  })

  // PUT /api/invites/:id — Update invite status (accept, decline, reschedule)
  app.put<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const body = updateInviteSchema.parse(request.body)

    const [invite] = await app.db.update(invites)
      .set({
        status: body.status,
        proposedDatetime: body.proposedDatetime ? new Date(body.proposedDatetime) : undefined,
        updatedAt: new Date(),
      })
      .where(eq(invites.id, request.params.id))
      .returning()

    if (!invite) return reply.status(404).send({ success: false, error: 'Invite not found' })

    // If accepted, auto-create encounter
    if (body.status === 'aceite') {
      await app.db.insert(encounters).values({
        inviteId: invite.id,
        dog1Id: invite.senderDogId,
        dog2Id: invite.recipientDogId,
        user1Id: invite.senderUserId,
        user2Id: invite.recipientUserId,
        activityType: invite.activityType,
        latitude: invite.suggestedLocationLat,
        longitude: invite.suggestedLocationLng,
      })
    }

    return { success: true, data: invite }
  })
}
