import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { createDb } from '@patudos/db'
import { userRoutes } from './routes/users.js'
import { dogRoutes } from './routes/dogs.js'
import { videoRoutes } from './routes/videos.js'
import { inviteRoutes } from './routes/invites.js'
import { encounterRoutes } from './routes/encounters.js'

const port = Number(process.env.PORT) || 3001
const host = '0.0.0.0'

async function main() {
  const app = Fastify({ logger: true })

  // CORS
  await app.register(cors, { origin: true })

  // Database
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) throw new Error('DATABASE_URL is required')
  const db = createDb(databaseUrl)

  // Decorate fastify instance with db
  app.decorate('db', db)

  // Health check
  app.get('/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '0.1.0',
  }))

  // Routes
  await app.register(userRoutes, { prefix: '/api/users' })
  await app.register(dogRoutes, { prefix: '/api/dogs' })
  await app.register(videoRoutes, { prefix: '/api/videos' })
  await app.register(inviteRoutes, { prefix: '/api/invites' })
  await app.register(encounterRoutes, { prefix: '/api/encounters' })

  // Global error handler
  app.setErrorHandler((err: Error & { validation?: unknown; statusCode?: number }, _request, reply) => {
    app.log.error(err)
    if (err.validation) {
      return reply.status(400).send({ success: false, error: 'Validation error', details: err.validation })
    }
    return reply.status(err.statusCode || 500).send({ success: false, error: err.message })
  })

  // Start
  await app.listen({ port, host })
  console.log(`🐾 Patudos API running on http://localhost:${port}`)
}

main().catch(console.error)

// Type augmentation for Fastify
declare module 'fastify' {
  interface FastifyInstance {
    db: ReturnType<typeof createDb>
  }
}
