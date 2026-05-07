// ==================== ACTIVITY TYPES ====================
export const ACTIVITY_TYPES = ['passeio', 'trilho', 'praia', 'parque'] as const
export type ActivityType = (typeof ACTIVITY_TYPES)[number]

// ==================== INVITE STATES ====================
export const INVITE_STATES = ['enviado', 'aceite', 'reagendado', 'recusado', 'aconteceu', 'cancelado', 'expirado'] as const
export type InviteState = (typeof INVITE_STATES)[number]

// ==================== TRUST LEVELS ====================
export const TRUST_LEVELS = {
  novato: { level: 0, label: 'Novato', badge: '🐾', minScore: 0 },
  curioso: { level: 1, label: 'Curioso', badge: '🐾🐾', minScore: 20 },
  explorador: { level: 2, label: 'Explorador', badge: '⭐', minScore: 50 },
  companheiro: { level: 3, label: 'Companheiro', badge: '⭐⭐', minScore: 120 },
  guardiao: { level: 4, label: 'Guardião', badge: '💎', minScore: 250 },
  embaixador: { level: 5, label: 'Embaixador', badge: '👑', minScore: 500 },
} as const
export type TrustLevelKey = keyof typeof TRUST_LEVELS

// ==================== DOG ENUMS ====================
export const DOG_SIZES = ['pequeno', 'medio', 'grande', 'gigante'] as const
export type DogSize = (typeof DOG_SIZES)[number]

export const DOG_SOCIABILITY = ['ama-todos', 'selectivo', 'timido'] as const
export type DogSociability = (typeof DOG_SOCIABILITY)[number]

export const DOG_MOOD_TAGS = [
  'energetico', 'chill', 'maluco', 'dorminhoco', 'curioso',
  'brincalhao', 'leal', 'guloso', 'teimoso', 'aventureiro', 'timido', 'palhaco',
] as const
export type DogMoodTag = (typeof DOG_MOOD_TAGS)[number]

export const DOG_OPEN_FOR = ['passeios', 'trilhos', 'praia', 'parque', 'playdates', 'eventos', 'apenas-videos'] as const
export type DogOpenFor = (typeof DOG_OPEN_FOR)[number]

// ==================== ENCOUNTER STATUS ====================
export const ENCOUNTER_STATUSES = ['scheduled', 'active', 'completed', 'cancelled'] as const
export type EncounterStatus = (typeof ENCOUNTER_STATUSES)[number]

// ==================== REVIEW SCORES ====================
export const REVIEW_SCORES = ['positive', 'neutral', 'negative'] as const
export type ReviewScore = (typeof REVIEW_SCORES)[number]

// ==================== BADGE TYPES ====================
export const BADGE_TYPES = [
  'patudo_novato', 'primeiro_take', 'primeira_patinha', 'encontro_real',
  'patudo_praia', 'trilheiro', 'cafe_regular',
  'anfitriao_estreante', 'super_anfitriao', 'patudo_viajante',
  'activo_semana', 'querido_bairro', 'criador',
] as const
export type BadgeType = (typeof BADGE_TYPES)[number]

// ==================== LOCATION TYPES ====================
export const LOCATION_TYPES = ['park', 'beach', 'trail', 'cafe', 'other'] as const
export type LocationType = (typeof LOCATION_TYPES)[number]

// ==================== LIMITS ====================
export const LIMITS = {
  MAX_DOG_PHOTOS: 6,
  MAX_INTRO_VIDEO_SECONDS: 15,
  MAX_VIDEO_SECONDS: 60,
  MAX_BIO_CHARS: 140,
  MAX_SUPERPOWER_CHARS: 30,
  MAX_HASHTAGS: 5,
  INVITE_EXPIRY_HOURS: 72,
  DEFAULT_NEARBY_RADIUS_KM: 5,
  MAX_INVITES_PER_WEEK_LEVEL_1: 3,
} as const
