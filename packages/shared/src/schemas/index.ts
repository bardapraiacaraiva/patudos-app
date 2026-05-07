import { z } from 'zod'
import { ACTIVITY_TYPES, DOG_SIZES, DOG_SOCIABILITY, DOG_MOOD_TAGS, DOG_OPEN_FOR, REVIEW_SCORES, LIMITS } from '../constants/index.js'

// ==================== DOG SCHEMAS ====================

export const createDogSchema = z.object({
  name: z.string().min(1).max(50),
  nickname: z.string().max(50).optional(),
  bio: z.string().max(LIMITS.MAX_BIO_CHARS).optional(),
  breed: z.string().min(1).max(100),
  size: z.enum(DOG_SIZES),
  sex: z.enum(['M', 'F']),
  ageMonths: z.number().int().min(1).max(360),
  energyLevel: z.number().int().min(0).max(5),
  sociability: z.enum(DOG_SOCIABILITY),
  moodTags: z.array(z.enum(DOG_MOOD_TAGS)).max(3),
  superpower: z.string().max(LIMITS.MAX_SUPERPOWER_CHARS).optional(),
  secretFear: z.string().max(LIMITS.MAX_SUPERPOWER_CHARS).optional(),
  openFor: z.array(z.enum(DOG_OPEN_FOR)).min(1),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
})
export type CreateDogInput = z.infer<typeof createDogSchema>

export const updateDogSchema = createDogSchema.partial()
export type UpdateDogInput = z.infer<typeof updateDogSchema>

// ==================== VIDEO SCHEMAS ====================

export const createVideoSchema = z.object({
  dogId: z.string().uuid(),
  hashtags: z.array(z.string().max(30)).max(LIMITS.MAX_HASHTAGS).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
})
export type CreateVideoInput = z.infer<typeof createVideoSchema>

// ==================== INVITE SCHEMAS ====================

export const createInviteSchema = z.object({
  recipientDogId: z.string().uuid(),
  activityType: z.enum(ACTIVITY_TYPES),
  proposedDatetime: z.string().datetime().optional(),
  message: z.string().max(200).optional(),
  suggestedLocationName: z.string().max(100).optional(),
  suggestedLocationLat: z.number().min(-90).max(90).optional(),
  suggestedLocationLng: z.number().min(-180).max(180).optional(),
})
export type CreateInviteInput = z.infer<typeof createInviteSchema>

export const updateInviteSchema = z.object({
  status: z.enum(['aceite', 'recusado', 'reagendado', 'cancelado']),
  proposedDatetime: z.string().datetime().optional(),
})
export type UpdateInviteInput = z.infer<typeof updateInviteSchema>

// ==================== ENCOUNTER SCHEMAS ====================

export const confirmEncounterSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
})
export type ConfirmEncounterInput = z.infer<typeof confirmEncounterSchema>

export const createReviewSchema = z.object({
  encounterId: z.string().uuid(),
  score: z.enum(REVIEW_SCORES),
  comment: z.string().max(500).optional(),
})
export type CreateReviewInput = z.infer<typeof createReviewSchema>

// ==================== FEED SCHEMAS ====================

export const feedQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  latitude: z.coerce.number().min(-90).max(90).optional(),
  longitude: z.coerce.number().min(-180).max(180).optional(),
  radiusKm: z.coerce.number().min(1).max(100).default(LIMITS.DEFAULT_NEARBY_RADIUS_KM),
})
export type FeedQuery = z.infer<typeof feedQuerySchema>

export const nearbyQuerySchema = z.object({
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  radiusKm: z.coerce.number().min(1).max(100).default(LIMITS.DEFAULT_NEARBY_RADIUS_KM),
  size: z.enum(DOG_SIZES).optional(),
  breed: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
})
export type NearbyQuery = z.infer<typeof nearbyQuerySchema>
