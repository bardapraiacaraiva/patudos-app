import { View, Text, Pressable } from 'react-native'
import { colors } from '../../src/lib/theme'

export default function CreateScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.dark, justifyContent: 'center', alignItems: 'center', padding: 32 }}>
      <Text style={{ fontSize: 64, marginBottom: 16 }}>🎬</Text>
      <Text style={{ color: colors.text, fontSize: 24, fontWeight: '700', textAlign: 'center' }}>
        Grava um Take
      </Text>
      <Text style={{ color: colors.textMuted, fontSize: 14, textAlign: 'center', marginTop: 8, lineHeight: 20 }}>
        Filma o dia a dia do teu patudo. Máximo 60 segundos. Autêntico, divertido, real.
      </Text>
      <Pressable style={{
        marginTop: 32, paddingHorizontal: 32, paddingVertical: 14,
        borderRadius: 50, backgroundColor: colors.amber,
      }}>
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>📸 Abrir Câmara</Text>
      </Pressable>
      <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 16 }}>Sprint 3 — câmara + upload + hashtags</Text>
    </View>
  )
}
