import { View, Text, Pressable, Dimensions } from 'react-native'
import { Image } from 'expo-image'
import * as Haptics from 'expo-haptics'
import { useState } from 'react'
import { colors, radius } from '../../src/lib/theme'
import { FeedSkeleton } from '../../src/components/Skeleton'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

// Seed data for demo (will be replaced with API calls)
const DEMO_VIDEOS = [
  { id: '1', dogName: 'Bono', breed: 'Golden Retriever', age: '3 anos', tags: ['Brincalhão', 'Lisboa'], image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=900&fit=crop', likes: 247 },
  { id: '2', dogName: 'Luna', breed: 'Labrador', age: '2 anos', tags: ['Chill', 'Cascais'], image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&h=900&fit=crop', likes: 183 },
  { id: '3', dogName: 'Bella', breed: 'French Bulldog', age: '1 ano', tags: ['Fofa', 'Porto'], image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=900&fit=crop', likes: 412 },
  { id: '4', dogName: 'Max', breed: 'Husky', age: '4 anos', tags: ['Aventureiro', 'Sintra'], image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600&h=900&fit=crop', likes: 89 },
  { id: '5', dogName: 'Rocky', breed: 'Corgi', age: '2 anos', tags: ['Palhaço', 'Braga'], image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&h=900&fit=crop', likes: 534 },
]

export default function FeedScreen() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [liked, setLiked] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)

  if (loading) return <FeedSkeleton />

  const video = DEMO_VIDEOS[currentIndex]

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setLiked(prev => {
      const next = new Set(prev)
      if (next.has(video.id)) next.delete(video.id)
      else next.add(video.id)
      return next
    })
  }

  const handleNext = () => {
    Haptics.selectionAsync()
    setCurrentIndex(i => (i + 1) % DEMO_VIDEOS.length)
  }

  const handlePrev = () => {
    Haptics.selectionAsync()
    setCurrentIndex(i => (i - 1 + DEMO_VIDEOS.length) % DEMO_VIDEOS.length)
  }

  const isLiked = liked.has(video.id)

  return (
    <View style={{ flex: 1, backgroundColor: colors.dark }}>
      {/* Header */}
      <View style={{
        position: 'absolute', top: 50, left: 0, right: 0, zIndex: 10,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 16,
      }}>
        <Text style={{ color: colors.amber, fontSize: 18, fontWeight: '700' }}>🐾 Patudos</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Text style={{ color: colors.textMuted, fontSize: 14, fontWeight: '600' }}>Para Ti</Text>
          <Text style={{ color: colors.text, fontSize: 14, fontWeight: '700' }}>|</Text>
          <Text style={{ color: colors.textMuted, fontSize: 14, fontWeight: '600' }}>Perto</Text>
        </View>
      </View>

      {/* Video / Image (full screen) */}
      <Pressable
        onPress={handleNext}
        onLongPress={handleLike}
        style={{ flex: 1 }}
      >
        <Image
          source={{ uri: video.image }}
          style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
          contentFit="cover"
          transition={300}
        />

        {/* Gradient overlay */}
        <View style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
          background: undefined,
          backgroundColor: 'transparent',
        }}>
          <View style={{
            position: 'absolute', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            opacity: 1,
          }} />
        </View>
      </Pressable>

      {/* Side actions */}
      <View style={{
        position: 'absolute', right: 12, bottom: 140, gap: 20, alignItems: 'center',
      }}>
        <Pressable onPress={handleLike} style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 28 }}>{isLiked ? '🧡' : '🤍'}</Text>
          <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600', marginTop: 2 }}>
            {video.likes + (isLiked ? 1 : 0)}
          </Text>
        </Pressable>
        <Pressable style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 26 }}>💬</Text>
          <Text style={{ color: '#fff', fontSize: 11, marginTop: 2 }}>23</Text>
        </Pressable>
        <Pressable style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 26 }}>📤</Text>
          <Text style={{ color: '#fff', fontSize: 11, marginTop: 2 }}>Partilhar</Text>
        </Pressable>
        <Pressable style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 26 }}>🐾</Text>
          <Text style={{ color: colors.amber, fontSize: 11, fontWeight: '700', marginTop: 2 }}>Patinha</Text>
        </Pressable>
      </View>

      {/* Bottom info */}
      <View style={{
        position: 'absolute', bottom: 90, left: 16, right: 80,
      }}>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>
          {video.dogName}
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 2 }}>
          {video.breed} • {video.age}
        </Text>
        <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
          {video.tags.map(tag => (
            <View key={tag} style={{
              paddingHorizontal: 10, paddingVertical: 4,
              borderRadius: radius.full,
              backgroundColor: 'rgba(255,255,255,0.15)',
            }}>
              <Text style={{ color: '#fff', fontSize: 11 }}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Navigate hint */}
      <View style={{ position: 'absolute', bottom: 90, left: 0, right: 0, alignItems: 'center' }}>
        <Text style={{ color: 'rgba(255,255,255,0.2)', fontSize: 10 }}>Toca para próximo</Text>
      </View>
    </View>
  )
}
