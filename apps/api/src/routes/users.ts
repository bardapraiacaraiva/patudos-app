import type { FastifyPluginAsync } from 'fastify'
import { eq } from 'drizzle-orm'
import { users } from '@patudos/db/schema'

export const userRoutes: FastifyPluginAsync = async (app) => {
  // POST /api/users — Create user (simplified, no Clerk for now)
  app.post('/', async (request, reply) => {
    const body = request.body as { email: string; name: string; authId?: string }

    const [user] = await app.db.insert(users).values({
      authId: body.authId || `local_${Date.now()}`,
      email: body.email,
      name: body.name,
    }).returning()

    return reply.status(201).send({ success: true, data: user })
  })

  // GET /api/users/:id
  app.get<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const [user] = await app.db.select().from(users).where(eq(users.id, request.params.id)).limit(1)
    if (!user) return reply.status(404).send({ success: false, error: 'User not found' })
    return { success: true, data: user }
  })
}
