import type { FastifyPluginAsync } from 'fastify'
import { eq, desc, sql, and } from 'drizzle-orm'
import { videos, videoLikes, dogs } from '@patudos/db/schema'
import { createVideoSchema, feedQuerySchema } from '@patudos/shared/schemas'

export const videoRoutes: FastifyPluginAsync = async (app) => {
  // POST /api/videos — Create video metadata (upload handled by Cloudflare Stream direct)
  app.post('/', async (request, reply) => {
    const body = createVideoSchema.parse(request.body)
    const userId = (request.headers['x-user-id'] as string) || 'test-user'

    const [video] = await app.db.insert(videos).values({
      ...body,
      userId,
      videoUrl: '', // Will be updated after Cloudflare upload completes
      hashtags: body.hashtags || [],
    }).returning()

    return reply.status(201).send({ success: true, data: video })
  })

  // GET /api/videos/feed — Feed "Para Ti" (algorithm v0)
  app.get('/feed', async (request) => {
    const query = feedQuerySchema.parse(request.query)
    const { page, limit, latitude, longitude } = query
    const offset = (page - 1) * limit

    // Algorithm v0: recent + nearby (if location provided) + random mix
    let feedVideos
    if (latitude && longitude) {
      const distanceSql = sql`(
        6371 * acos(
          cos(radians(${latitude})) * cos(radians(${videos.latitude})) *
          cos(radians(${videos.longitude}) - radians(${longitude})) +
          sin(radians(${latitude})) * sin(radians(${videos.latitude}))
        )
      )`
      feedVideos = await app.db
        .select({
          video: videos,
          dog: dogs,
          distance: distanceSql.as('distance'),
        })
        .from(videos)
        .innerJoin(dogs, eq(videos.dogId, dogs.id))
        .orderBy(
          sql`CASE WHEN ${videos.latitude} IS NOT NULL THEN ${distanceSql} ELSE 9999 END`,
          desc(videos.createdAt)
        )
        .limit(limit)
        .offset(offset)
    } else {
      feedVideos = await app.db
        .select({ video: videos, dog: dogs })
        .from(videos)
        .innerJoin(dogs, eq(videos.dogId, dogs.id))
        .orderBy(desc(videos.createdAt))
        .limit(limit)
        .offset(offset)
    }

    return { success: true, data: feedVideos, meta: { page, limit } }
  })

  // GET /api/videos/nearby — Feed "Perto"
  app.get('/nearby', async (request) => {
    const query = feedQuerySchema.parse(request.query)
    const { latitude, longitude, radiusKm, page, limit } = query
    if (!latitude || !longitude) {
      return { success: false, error: 'Location required for nearby feed' }
    }
    const offset = (page - 1) * limit

    const distanceSql = sql`(
      6371 * acos(
        cos(radians(${latitude})) * cos(radians(${videos.latitude})) *
        cos(radians(${videos.longitude}) - radians(${longitude})) +
        sin(radians(${latitude})) * sin(radians(${videos.latitude}))
      )
    )`

    const nearbyVideos = await app.db
      .select({ video: videos, dog: dogs, distance: distanceSql.as('distance') })
      .from(videos)
      .innerJoin(dogs, eq(videos.dogId, dogs.id))
      .where(and(
        sql`${videos.latitude} IS NOT NULL`,
        sql`${distanceSql} < ${radiusKm}`
      ))
      .orderBy(sql`distance`, desc(videos.createdAt))
      .limit(limit)
      .offset(offset)

    return { success: true, data: nearbyVideos, meta: { page, limit } }
  })

  // GET /api/videos/:id
  app.get<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const [video] = await app.db.select().from(videos).where(eq(videos.id, request.params.id)).limit(1)
    if (!video) return reply.status(404).send({ success: false, error: 'Video not found' })

    // Increment view count
    await app.db.update(videos).set({ viewCount: sql`${videos.viewCount} + 1` }).where(eq(videos.id, request.params.id))

    return { success: true, data: video }
  })

  // POST /api/videos/:id/like — Patinha (like)
  app.post<{ Params: { id: string } }>('/:id/like', async (request, reply) => {
    const userId = (request.headers['x-user-id'] as string) || 'test-user'
    try {
      await app.db.insert(videoLikes).values({ videoId: request.params.id, userId })
      await app.db.update(videos).set({ likeCount: sql`${videos.likeCount} + 1` }).where(eq(videos.id, request.params.id))
      return { success: true }
    } catch {
      return reply.status(409).send({ success: false, error: 'Already liked' })
    }
  })

  // DELETE /api/videos/:id/like — Remove patinha
  app.delete<{ Params: { id: string } }>('/:id/like', async (request) => {
    const userId = (request.headers['x-user-id'] as string) || 'test-user'
    await app.db.delete(videoLikes).where(
      and(eq(videoLikes.videoId, request.params.id), eq(videoLikes.userId, userId))
    )
    await app.db.update(videos).set({ likeCount: sql`${videos.likeCount} - 1` }).where(eq(videos.id, request.params.id))
    return { success: true }
  })
}
