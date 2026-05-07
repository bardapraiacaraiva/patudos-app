import { View, Text, ScrollView, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { colors, radius } from '../../src/lib/theme'

const DEMO_INVITES = [
  { id: '1', dogName: 'Luna', dogImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=80&h=80&fit=crop', activity: 'Praia', status: 'aceite', statusColor: colors.green, date: 'Sábado 10h', message: 'Carcavelos? 🏖️' },
  { id: '2', dogName: 'Max', dogImage: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=80&h=80&fit=crop', activity: 'Trilho', status: 'enviado', statusColor: '#F5A623', date: 'Domingo 9h', message: 'Sintra, trilho do Mouro?' },
  { id: '3', dogName: 'Bella', dogImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=80&h=80&fit=crop', activity: 'Parque', status: 'aconteceu', statusColor: colors.green, date: 'Ontem', message: 'Foi incrível! 🐾' },
]

const statusLabels: Record<string, string> = {
  enviado: '🟡 Enviado',
  aceite: '🟢 Aceite',
  aconteceu: '✅ Aconteceu',
  recusado: '⚫ Recusado',
  reagendado: '🔵 Reagendado',
}

export default function InvitesScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.dark }}>
      <View style={{ paddingTop: 56, paddingHorizontal: 16, paddingBottom: 16 }}>
        <Text style={{ color: colors.text, fontSize: 28, fontWeight: '700' }}>🐾 Patinhas</Text>
        <Text style={{ color: colors.textMuted, fontSize: 14, marginTop: 4 }}>Os teus convites</Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {DEMO_INVITES.map(invite => (
          <Pressable key={invite.id} style={{
            backgroundColor: colors.darkCard,
            borderRadius: radius.xl,
            padding: 16,
            marginHorizontal: 16,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: colors.glassBorder,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Image source={{ uri: invite.dogImage }} style={{ width: 48, height: 48, borderRadius: 24 }} />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ color: colors.text, fontSize: 16, fontWeight: '700' }}>{invite.dogName}</Text>
                  <Text style={{ fontSize: 12 }}>{statusLabels[invite.status]}</Text>
                </View>
                <Text style={{ color: colors.amber, fontSize: 12, fontWeight: '600', marginTop: 2 }}>
                  {invite.activity} • {invite.date}
                </Text>
              </View>
            </View>
            <Text style={{ color: colors.textMuted, fontSize: 13, marginTop: 10 }}>{invite.message}</Text>
            {invite.status === 'enviado' && (
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
                <Pressable style={{ flex: 1, paddingVertical: 10, borderRadius: radius.full, backgroundColor: colors.amber, alignItems: 'center' }}>
                  <Text style={{ color: '#fff', fontWeight: '700', fontSize: 13 }}>Aceitar</Text>
                </Pressable>
                <Pressable style={{ flex: 1, paddingVertical: 10, borderRadius: radius.full, borderWidth: 1, borderColor: colors.glassBorder, alignItems: 'center' }}>
                  <Text style={{ color: colors.textMuted, fontWeight: '600', fontSize: 13 }}>Declinar</Text>
                </Pressable>
              </View>
            )}
            {invite.status === 'aceite' && (
              <Pressable style={{ marginTop: 12, paddingVertical: 10, borderRadius: radius.full, backgroundColor: colors.green, alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 13 }}>💬 Abrir WhatsApp</Text>
              </Pressable>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}
