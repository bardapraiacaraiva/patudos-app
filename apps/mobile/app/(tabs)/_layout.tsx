import { Tabs } from 'expo-router'
import { Text, View } from 'react-native'
import { colors } from '../../src/lib/theme'

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 4 }}>
      <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.4 }}>{emoji}</Text>
    </View>
  )
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.darkCard,
          borderTopColor: colors.glassBorder,
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 10,
          paddingTop: 6,
        },
        tabBarActiveTintColor: colors.amber,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🎬" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="nearby"
        options={{
          title: 'Perto',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📍" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <View style={{
              width: 44, height: 44, borderRadius: 22,
              backgroundColor: colors.amber,
              alignItems: 'center', justifyContent: 'center',
              marginTop: -10,
              shadowColor: colors.amber, shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4, shadowRadius: 12,
            }}>
              <Text style={{ fontSize: 20, color: '#fff' }}>＋</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="invites"
        options={{
          title: 'Patinhas',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🐾" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => <TabIcon emoji="👤" focused={focused} />,
        }}
      />
    </Tabs>
  )
}
