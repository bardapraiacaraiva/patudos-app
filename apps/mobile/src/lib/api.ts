import { API_URL } from './theme'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      // TODO: add auth token from Clerk
      ...options?.headers,
    },
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(error.error || 'Request failed')
  }
  return res.json()
}

export const api = {
  // Users
  createUser: (data: { email: string; name: string }) =>
    request('/api/users', { method: 'POST', body: JSON.stringify(data) }),

  getUser: (id: string) =>
    request(`/api/users/${id}`),

  // Dogs
  createDog: (data: Record<string, unknown>, userId: string) =>
    request('/api/dogs', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'x-user-id': userId },
    }),

  getDog: (id: string) =>
    request(`/api/dogs/${id}`),

  getNearbyDogs: (lat: number, lng: number, radiusKm = 5) =>
    request(`/api/dogs/nearby?latitude=${lat}&longitude=${lng}&radiusKm=${radiusKm}`),

  // Videos
  getFeed: (page = 1, lat?: number, lng?: number) => {
    const params = new URLSearchParams({ page: String(page), limit: '20' })
    if (lat) params.set('latitude', String(lat))
    if (lng) params.set('longitude', String(lng))
    return request(`/api/videos/feed?${params}`)
  },

  likeVideo: (videoId: string, userId: string) =>
    request(`/api/videos/${videoId}/like`, {
      method: 'POST',
      headers: { 'x-user-id': userId },
    }),

  // Invites
  sendInvite: (data: Record<string, unknown>, userId: string) =>
    request('/api/invites', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'x-user-id': userId },
    }),

  getInvites: (userId: string) =>
    request('/api/invites', { headers: { 'x-user-id': userId } }),

  updateInvite: (id: string, data: { status: string }) =>
    request(`/api/invites/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  // Encounters
  getEncounters: (userId: string) =>
    request('/api/encounters', { headers: { 'x-user-id': userId } }),

  confirmEncounter: (id: string, lat: number, lng: number, userId: string) =>
    request(`/api/encounters/${id}/confirm`, {
      method: 'PUT',
      body: JSON.stringify({ latitude: lat, longitude: lng }),
      headers: { 'x-user-id': userId },
    }),

  submitReview: (encounterId: string, score: string, userId: string, comment?: string) =>
    request(`/api/encounters/${encounterId}/review`, {
      method: 'POST',
      body: JSON.stringify({ encounterId, score, comment }),
      headers: { 'x-user-id': userId },
    }),
}
