import { View, Text, ScrollView, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { colors, radius } from '../../src/lib/theme'

export default function ProfileScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.dark }}>
      <View style={{ paddingTop: 56, alignItems: 'center', paddingBottom: 24 }}>
        {/* Dog avatar */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop' }}
          style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: colors.amber }}
        />
        <Text style={{ color: colors.text, fontSize: 24, fontWeight: '700', marginTop: 12 }}>Bono</Text>
        <Text style={{ color: colors.textMuted, fontSize: 14 }}>Golden Retriever • 3 anos</Text>
        <Text style={{ color: colors.amber, fontSize: 12, fontWeight: '600', marginTop: 4 }}>🐾 Novato</Text>
      </View>

      {/* Bio */}
      <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
        <View style={{
          backgroundColor: colors.darkCard, borderRadius: radius.xl, padding: 16,
          borderWidth: 1, borderColor: colors.glassBorder,
        }}>
          <Text style={{ color: colors.textMuted, fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>O Jeito do Patudo</Text>
          <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
            {['⚡ Energético', '🎾 Brincalhão', '🛡️ Leal'].map(tag => (
              <View key={tag} style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: radius.full, backgroundColor: 'rgba(245,166,35,0.1)' }}>
                <Text style={{ color: colors.amber, fontSize: 12, fontWeight: '600' }}>{tag}</Text>
              </View>
            ))}
          </View>
          <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 10 }}>💪 Superpower: Olhinhos irresistíveis</Text>
          <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 2 }}>😱 Medo secreto: Aspirador</Text>
        </View>
      </View>

      {/* Open for */}
      <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
        <Text style={{ color: colors.textMuted, fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Aberto para</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {['🚶 Passeios', '🏔️ Trilhos', '🏖️ Praia'].map(item => (
            <View key={item} style={{
              paddingHorizontal: 12, paddingVertical: 8,
              borderRadius: radius.lg, backgroundColor: colors.darkCard,
              borderWidth: 1, borderColor: colors.green + '40',
            }}>
              <Text style={{ color: colors.green, fontSize: 12, fontWeight: '600' }}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {[
            { label: 'Encontros', value: '0', icon: '🤝' },
            { label: 'Vídeos', value: '0', icon: '🎬' },
            { label: 'Amigos', value: '0', icon: '🐕' },
          ].map(stat => (
            <View key={stat.label} style={{
              flex: 1, backgroundColor: colors.darkCard, borderRadius: radius.lg,
              padding: 14, alignItems: 'center', borderWidth: 1, borderColor: colors.glassBorder,
            }}>
              <Text style={{ fontSize: 20 }}>{stat.icon}</Text>
              <Text style={{ color: colors.text, fontSize: 20, fontWeight: '700', marginTop: 4 }}>{stat.value}</Text>
              <Text style={{ color: colors.textMuted, fontSize: 10 }}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tutor section */}
      <View style={{ paddingHorizontal: 16, marginBottom: 40 }}>
        <View style={{
          backgroundColor: colors.darkCard, borderRadius: radius.xl, padding: 16,
          borderWidth: 1, borderColor: colors.glassBorder, flexDirection: 'row', alignItems: 'center', gap: 12,
        }}>
          <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.glass, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>👤</Text>
          </View>
          <View>
            <Text style={{ color: colors.text, fontSize: 14, fontWeight: '600' }}>João Silva</Text>
            <Text style={{ color: colors.textMuted, fontSize: 12 }}>Lisboa, Alvalade</Text>
          </View>
          <Pressable style={{ marginLeft: 'auto', paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.full, borderWidth: 1, borderColor: colors.glassBorder }}>
            <Text style={{ color: colors.textMuted, fontSize: 11 }}>Editar</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}
