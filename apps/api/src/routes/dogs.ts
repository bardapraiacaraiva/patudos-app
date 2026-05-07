import type { FastifyPluginAsync } from 'fastify'
import { eq, and, sql } from 'drizzle-orm'
import { dogs, users } from '@patudos/db/schema'
import { createDogSchema, updateDogSchema, nearbyQuerySchema } from '@patudos/shared/schemas'

export const dogRoutes: FastifyPluginAsync = async (app) => {
  // POST /api/dogs — Create dog profile
  app.post('/', async (request, reply) => {
    const body = createDogSchema.parse(request.body)
    // TODO: get userId from auth middleware
    const userId = (request.headers['x-user-id'] as string) || 'test-user'

    const [dog] = await app.db.insert(dogs).values({
      ...body,
      ownerId: userId,
      moodTags: body.moodTags,
      openFor: body.openFor,
    }).returning()

    return reply.status(201).send({ success: true, data: dog })
  })

  // GET /api/dogs/:id — Get dog profile
  app.get<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const [dog] = await app.db.select().from(dogs).where(eq(dogs.id, request.params.id)).limit(1)
    if (!dog) return reply.status(404).send({ success: false, error: 'Dog not found' })
    return { success: true, data: dog }
  })

  // PUT /api/dogs/:id — Update dog profile
  app.put<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const body = updateDogSchema.parse(request.body)
    const [dog] = await app.db.update(dogs)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(dogs.id, request.params.id))
      .returning()
    if (!dog) return reply.status(404).send({ success: false, error: 'Dog not found' })
    return { success: true, data: dog }
  })

  // DELETE /api/dogs/:id — Delete dog
  app.delete<{ Params: { id: string } }>('/:id', async (request, reply) => {
    await app.db.delete(dogs).where(eq(dogs.id, request.params.id))
    return { success: true }
  })

  // GET /api/dogs/nearby — Find dogs near location
  app.get('/nearby', async (request, reply) => {
    const query = nearbyQuerySchema.parse(request.query)
    const { latitude, longitude, radiusKm, size, breed, page, limit } = query
    const offset = (page - 1) * limit

    // Haversine formula for distance in km
    const distanceSql = sql`(
      6371 * acos(
        cos(radians(${latitude})) * cos(radians(${dogs.latitude})) *
        cos(radians(${dogs.longitude}) - radians(${longitude})) +
        sin(radians(${latitude})) * sin(radians(${dogs.latitude}))
      )
    )`

    let baseQuery = app.db
      .select({
        dog: dogs,
        distance: distanceSql.as('distance'),
      })
      .from(dogs)
      .where(
        and(
          sql`${dogs.latitude} IS NOT NULL`,
          sql`${distanceSql} < ${radiusKm}`,
          size ? eq(dogs.size, size) : undefined,
          breed ? eq(dogs.breed, breed) : undefined,
        )
      )
      .orderBy(sql`distance`)
      .limit(limit)
      .offset(offset)

    const results = await baseQuery
    return { success: true, data: results, meta: { page, limit } }
  })

  // GET /api/dogs/user/:userId — Get all dogs for a user
  app.get<{ Params: { userId: string } }>('/user/:userId', async (request) => {
    const userDogs = await app.db.select().from(dogs).where(eq(dogs.ownerId, request.params.userId))
    return { success: true, data: userDogs }
  })
}
