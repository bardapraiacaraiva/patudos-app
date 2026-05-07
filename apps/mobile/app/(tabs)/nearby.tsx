import { View, Text, ScrollView, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { colors, radius } from '../../src/lib/theme'
import { CardSkeleton } from '../../src/components/Skeleton'

const NEARBY_DOGS = [
  { name: 'Bono', breed: 'Golden Retriever', distance: '0.3km', energy: '⚡⚡⚡⚡', openFor: ['Passeio', 'Trilho', 'Praia'], image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=120&h=120&fit=crop' },
  { name: 'Luna', breed: 'Labrador', distance: '1.2km', energy: '⚡⚡⚡', openFor: ['Passeio', 'Praia', 'Parque'], image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=120&h=120&fit=crop' },
  { name: 'Bella', breed: 'French Bulldog', distance: '2.8km', energy: '⚡⚡', openFor: ['Parque', 'Café'], image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=120&h=120&fit=crop' },
  { name: 'Max', breed: 'Husky', distance: '3.5km', energy: '⚡⚡⚡⚡⚡', openFor: ['Trilho', 'Praia'], image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=120&h=120&fit=crop' },
  { name: 'Nala', breed: 'Corgi', distance: '4.1km', energy: '⚡⚡⚡', openFor: ['Passeio', 'Parque'], image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=120&h=120&fit=crop' },
]

export default function NearbyScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.dark }}>
      {/* Header */}
      <View style={{ paddingTop: 56, paddingHorizontal: 16, paddingBottom: 12 }}>
        <Text style={{ color: colors.text, fontSize: 28, fontWeight: '700' }}>📍 Perto</Text>
        <Text style={{ color: colors.textMuted, fontSize: 14, marginTop: 4 }}>Cães num raio de 5km</Text>
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 16, marginBottom: 12 }} contentContainerStyle={{ gap: 8, paddingRight: 16 }}>
        {['Todos', 'Passeio', 'Trilho', 'Praia', 'Parque', 'Café'].map((filter, i) => (
          <Pressable key={filter} style={{
            paddingHorizontal: 14, paddingVertical: 8,
            borderRadius: radius.full,
            backgroundColor: i === 0 ? colors.amber : colors.glass,
            borderWidth: 1,
            borderColor: i === 0 ? colors.amber : colors.glassBorder,
          }}>
            <Text style={{ color: i === 0 ? '#fff' : colors.textMuted, fontSize: 13, fontWeight: '600' }}>{filter}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Dog list */}
      <ScrollView style={{ flex: 1 }}>
        {NEARBY_DOGS.map(dog => (
          <Pressable key={dog.name} style={{
            backgroundColor: colors.darkCard,
            borderRadius: radius.lg,
            padding: 14,
            marginHorizontal: 16,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: colors.glassBorder,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}>
            <Image source={{ uri: dog.image }} style={{ width: 56, height: 56, borderRadius: 28 }} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={{ color: colors.text, fontSize: 16, fontWeight: '700' }}>{dog.name}</Text>
                <Text style={{ color: colors.textMuted, fontSize: 12 }}>{dog.distance}</Text>
              </View>
              <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 1 }}>{dog.breed} • {dog.energy}</Text>
              <View style={{ flexDirection: 'row', gap: 4, marginTop: 4 }}>
                {dog.openFor.map(tag => (
                  <View key={tag} style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.full, backgroundColor: 'rgba(245,166,35,0.1)' }}>
                    <Text style={{ color: colors.amber, fontSize: 10, fontWeight: '600' }}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
            <Pressable style={{
              paddingHorizontal: 12, paddingVertical: 8,
              borderRadius: radius.full,
              backgroundColor: colors.amber,
            }}>
              <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>🐾</Text>
            </Pressable>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}
