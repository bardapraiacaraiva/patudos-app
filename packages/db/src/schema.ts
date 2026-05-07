import { pgTable, uuid, varchar, text, integer, boolean, timestamp, real, pgEnum, jsonb, index, uniqueIndex } from 'drizzle-orm/pg-core'

// ==================== ENUMS ====================

export const dogSizeEnum = pgEnum('dog_size', ['pequeno', 'medio', 'grande', 'gigante'])
export const dogSociabilityEnum = pgEnum('dog_sociability', ['ama-todos', 'selectivo', 'timido'])
export const activityTypeEnum = pgEnum('activity_type', ['passeio', 'trilho', 'praia', 'parque'])
export const inviteStatusEnum = pgEnum('invite_status', ['enviado', 'aceite', 'reagendado', 'recusado', 'aconteceu', 'cancelado', 'expirado'])
export const encounterStatusEnum = pgEnum('encounter_status', ['scheduled', 'active', 'completed', 'cancelled'])
export const reviewScoreEnum = pgEnum('review_score', ['positive', 'neutral', 'negative'])
export const trustLevelEnum = pgEnum('trust_level', ['novato', 'curioso', 'explorador', 'companheiro', 'guardiao', 'embaixador'])
export const locationTypeEnum = pgEnum('location_type', ['park', 'beach', 'trail', 'cafe', 'other'])

// ==================== USERS ====================

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  authId: varchar('auth_id', { length: 255 }).unique().notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  phone: varchar('phone', { length: 20 }),
  name: varchar('name', { length: 100 }).notNull(),
  avatarUrl: text('avatar_url'),
  city: varchar('city', { length: 100 }),
  bairro: varchar('bairro', { length: 100 }),
  latitude: real('latitude'),
  longitude: real('longitude'),
  trustScore: integer('trust_score').default(0).notNull(),
  trustLevel: trustLevelEnum('trust_level').default('novato').notNull(),
  isVerifiedFacial: boolean('is_verified_facial').default(false).notNull(),
  isVerifiedId: boolean('is_verified_id').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => [
  index('users_auth_id_idx').on(t.authId),
  index('users_location_idx').on(t.latitude, t.longitude),
])

// ==================== DOGS ====================

export const dogs = pgTable('dogs', {
  id: uuid('id').defaultRandom().primaryKey(),
  ownerId: uuid('owner_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 50 }).notNull(),
  nickname: varchar('nickname', { length: 50 }),
  bio: varchar('bio', { length: 140 }),
  breed: varchar('breed', { length: 100 }).notNull(),
  size: dogSizeEnum('size').notNull(),
  sex: varchar('sex', { length: 1 }).notNull(), // M or F
  ageMonths: integer('age_months').notNull(),
  energyLevel: integer('energy_level').default(3).notNull(),
  sociability: dogSociabilityEnum('sociability').default('selectivo').notNull(),
  moodTags: jsonb('mood_tags').$type<string[]>().default([]).notNull(),
  superpower: varchar('superpower', { length: 30 }),
  secretFear: varchar('secret_fear', { length: 30 }),
  favoriteWalks: jsonb('favorite_walks').$type<string[]>().default([]).notNull(),
  preferredSpots: jsonb('preferred_spots').$type<string[]>().default([]).notNull(),
  routine: jsonb('routine').$type<string[]>().default([]).notNull(),
  isVaccinated: boolean('is_vaccinated').default(false).notNull(),
  lastVaccineDate: timestamp('last_vaccine_date', { withTimezone: true }),
  isSterilized: boolean('is_sterilized').default(false).notNull(),
  passportCountries: jsonb('passport_countries').$type<string[]>().default([]).notNull(),
  openFor: jsonb('open_for').$type<string[]>().default([]).notNull(),
  avoids: jsonb('avoids').$type<string[]>().default([]).notNull(),
  photos: jsonb('photos').$type<string[]>().default([]).notNull(),
  introVideoUrl: text('intro_video_url'),
  latitude: real('latitude'),
  longitude: real('longitude'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => [
  index('dogs_owner_id_idx').on(t.ownerId),
  index('dogs_location_idx').on(t.latitude, t.longitude),
  index('dogs_breed_idx').on(t.breed),
  index('dogs_size_idx').on(t.size),
])

// ==================== VIDEOS ====================

export const videos = pgTable('videos', {
  id: uuid('id').defaultRandom().primaryKey(),
  dogId: uuid('dog_id').references(() => dogs.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  videoUrl: text('video_url').notNull(),
  thumbnailUrl: text('thumbnail_url'),
  hashtags: jsonb('hashtags').$type<string[]>().default([]).notNull(),
  latitude: real('latitude'),
  longitude: real('longitude'),
  viewCount: integer('view_count').default(0).notNull(),
  likeCount: integer('like_count').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => [
  index('videos_dog_id_idx').on(t.dogId),
  index('videos_user_id_idx').on(t.userId),
  index('videos_created_at_idx').on(t.createdAt),
  index('videos_location_idx').on(t.latitude, t.longitude),
])

// ==================== VIDEO LIKES ====================

export const videoLikes = pgTable('video_likes', {
  videoId: uuid('video_id').references(() => videos.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => [
  uniqueIndex('video_likes_unique').on(t.videoId, t.userId),
])

// ==================== INVITES (PATINHAS) ====================

export const invites = pgTable('invites', {
  id: uuid('id').defaultRandom().primaryKey(),
  senderDogId: uuid('sender_dog_id').references(() => dogs.id).notNull(),
  senderUserId: uuid('sender_user_id').references(() => users.id).notNull(),
  recipientDogId: uuid('recipient_dog_id').references(() => dogs.id).notNull(),
  recipientUserId: uuid('recipient_user_id').references(() => users.id).notNull(),
  activityType: activityTypeEnum('activity_type').notNull(),
  suggestedLocationLat: real('suggested_location_lat'),
  suggestedLocationLng: real('suggested_location_lng'),
  suggestedLocationName: varchar('suggested_location_name', { length: 200 }),
  status: inviteStatusEnum('status').default('enviado').notNull(),
  proposedDatetime: timestamp('proposed_datetime', { withTimezone: true }),
  message: text('message'),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => [
  index('invites_sender_user_idx').on(t.senderUserId),
  index('invites_recipient_user_idx').on(t.recipientUserId),
  index('invites_status_idx').on(t.status),
])

// ==================== ENCOUNTERS (PASSEATAS) ====================

export const encounters = pgTable('encounters', {
  id: uuid('id').defaultRandom().primaryKey(),
  inviteId: uuid('invite_id').references(() => invites.id).notNull(),
  dog1Id: uuid('dog_1_id').references(() => dogs.id).notNull(),
  dog2Id: uuid('dog_2_id').references(() => dogs.id).notNull(),
  user1Id: uuid('user_1_id').references(() => users.id).notNull(),
  user2Id: uuid('user_2_id').references(() => users.id).notNull(),
  activityType: activityTypeEnum('activity_type').notNull(),
  latitude: real('latitude'),
  longitude: real('longitude'),
  confirmedByUser1: boolean('confirmed_by_user_1').default(false).notNull(),
  confirmedByUser2: boolean('confirmed_by_user_2').default(false).notNull(),
  confirmedAt1: timestamp('confirmed_at_1', { withTimezone: true }),
  confirmedAt2: timestamp('confirmed_at_2', { withTimezone: true }),
  coLocatedVerified: boolean('co_located_verified').default(false).notNull(),
  durationMinutes: integer('duration_minutes'),
  status: encounterStatusEnum('status').default('scheduled').notNull(),
  photoUrl: text('photo_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => [
  index('encounters_invite_idx').on(t.inviteId),
  index('encounters_user1_idx').on(t.user1Id),
  index('encounters_user2_idx').on(t.user2Id),
])

// ==================== REVIEWS ====================

export const reviews = pgTable('reviews', {
  id: uuid('id').defaultRandom().primaryKey(),
  encounterId: uuid('encounter_id').references(() => encounters.id).notNull(),
  reviewerId: uuid('reviewer_id').references(() => users.id).notNull(),
  reviewedUserId: uuid('reviewed_user_id').references(() => users.id).notNull(),
  score: reviewScoreEnum('score').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => [
  uniqueIndex('reviews_unique').on(t.encounterId, t.reviewerId),
])

// ==================== TRUST LOGS ====================

export const trustLogs = pgTable('trust_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  action: varchar('action', { length: 100 }).notNull(),
  pointsDelta: integer('points_delta').notNull(),
  previousScore: integer('previous_score').notNull(),
  newScore: integer('new_score').notNull(),
  reason: text('reason').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => [
  index('trust_logs_user_idx').on(t.userId),
])

// ==================== BADGES ====================

export const badges = pgTable('badges', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  badgeType: varchar('badge_type', { length: 50 }).notNull(),
  earnedAt: timestamp('earned_at', { withTimezone: true }).defaultNow().notNull(),
  isActive: boolean('is_active').default(true).notNull(),
}, (t) => [
  index('badges_user_idx').on(t.userId),
])

// ==================== LOCATIONS ====================

export const locations = pgTable('locations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  latitude: real('latitude').notNull(),
  longitude: real('longitude').notNull(),
  type: locationTypeEnum('type').notNull(),
  verified: boolean('verified').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => [
  index('locations_type_idx').on(t.type),
  index('locations_coords_idx').on(t.latitude, t.longitude),
])
