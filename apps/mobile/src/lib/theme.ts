export const colors = {
  amber: '#F5A623',
  amberGlow: 'rgba(245,166,35,0.25)',
  coral: '#E8603C',
  dark: '#0A0A14',
  darkCard: '#111122',
  darkSurface: '#16162E',
  glass: 'rgba(255,255,255,0.04)',
  glassBorder: 'rgba(255,255,255,0.07)',
  text: '#EAEAF2',
  textMuted: '#7E7E9A',
  green: '#34D399',
  red: '#FF4466',
  blue: '#3B82F6',
  purple: '#7B2D8E',
} as const

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
} as const

export const fonts = {
  display: 'SpaceGrotesk',
  body: 'Inter',
} as const

export const API_URL = __DEV__
  ? 'http://192.168.1.80:3001'  // Local network IP — update to your machine's IP
  : 'https://api.patudos.pt'
