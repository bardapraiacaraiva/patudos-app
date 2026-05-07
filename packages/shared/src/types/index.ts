import type { ActivityType, InviteState, DogSize, DogSociability, DogMoodTag, DogOpenFor, EncounterStatus, ReviewScore, BadgeType, TrustLevelKey, LocationType } from '../constants/index.js'

// ==================== USER ====================
export interface User {
  id: string
  authId: string
  email: string
  phone: string | null
  name: string
  avatarUrl: string | null
  city: string | null
  bairro: string | null
  latitude: number | null
  longitude: number | null
  trustScore: number
  trustLevel: TrustLevelKey
  isVerifiedFacial: boolean
  isVerifiedId: boolean
  createdAt: Date
  updatedAt: Date
}

// ==================== DOG ====================
export interface Dog {
  id: string
  ownerId: string
  name: string
  nickname: string | null
  bio: string | null
  breed: string
  size: DogSize
  sex: 'M' | 'F'
  ageMonths: number
  energyLevel: number // 0-5
  sociability: DogSociability
  moodTags: DogMoodTag[]
  superpower: string | null
  secretFear: string | null
  favoriteWalks: string[]
  preferredSpots: string[]
  routine: string[]
  isVaccinated: boolean
  lastVaccineDate: Date | null
  isSterilized: boolean
  passportCountries: string[]
  openFor: DogOpenFor[]
  avoids: string[]
  photos: string[] // URLs, max 6
  introVideoUrl: string | null
  latitude: number | null
  longitude: number | null
  createdAt: Date
  updatedAt: Date
}

// ==================== VIDEO ====================
export interface Video {
  id: string
  dogId: string
  userId: string
  videoUrl: string
  thumbnailUrl: string | null
  hashtags: string[]
  latitude: number | null
  longitude: number | null
  viewCount: number
  likeCount: number
  createdAt: Date
}

// ==================== INVITE (PATINHA) ====================
export interface Invite {
  id: string
  senderDogId: string
  senderUserId: string
  recipientDogId: string
  recipientUserId: string
  activityType: ActivityType
  suggestedLocationLat: number | null
  suggestedLocationLng: number | null
  suggestedLocationName: string | null
  status: InviteState
  proposedDatetime: Date | null
  message: string | null
  expiresAt: Date
  createdAt: Date
  updatedAt: Date
}

// ==================== ENCOUNTER (PASSEATA) ====================
export interface Encounter {
  id: string
  inviteId: string
  dog1Id: string
  dog2Id: string
  user1Id: string
  user2Id: string
  activityType: ActivityType
  latitude: number | null
  longitude: number | null
  confirmedByUser1: boolean
  confirmedByUser2: boolean
  confirmedAt1: Date | null
  confirmedAt2: Date | null
  coLocatedVerified: boolean
  durationMinutes: number | null
  status: EncounterStatus
  photoUrl: string | null
  createdAt: Date
}

// ==================== REVIEW ====================
export interface Review {
  id: string
  encounterId: string
  reviewerId: string
  reviewedUserId: string
  score: ReviewScore
  comment: string | null
  createdAt: Date
}

// ==================== BADGE ====================
export interface Badge {
  id: string
  userId: string
  badgeType: BadgeType
  earnedAt: Date
  isActive: boolean
}

// ==================== TRUST LOG ====================
export interface TrustLog {
  id: string
  userId: string
  action: string
  pointsDelta: number
  previousScore: number
  newScore: number
  reason: string
  createdAt: Date
}

// ==================== LOCATION ====================
export interface Location {
  id: string
  name: string
  latitude: number
  longitude: number
  type: LocationType
  verified: boolean
}

// ==================== API RESPONSE ====================
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  meta?: {
    page?: number
    limit?: number
    total?: number
  }
}
