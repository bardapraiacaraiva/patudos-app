import { useEffect, useRef } from 'react'
import { Animated, View, type ViewStyle } from 'react-native'
import { colors } from '../lib/theme'

export function Skeleton({ width, height, borderRadius = 8, style }: {
  width: number | string
  height: number
  borderRadius?: number
  style?: ViewStyle
}) {
  const opacity = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.6, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    )
    animation.start()
    return () => animation.stop()
  }, [opacity])

  return (
    <Animated.View
      style={[
        {
          width: width as number,
          height,
          borderRadius,
          backgroundColor: colors.glassBorder,
          opacity,
        },
        style,
      ]}
    />
  )
}

export function FeedSkeleton() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.dark, justifyContent: 'center', alignItems: 'center' }}>
      <Skeleton width="90%" height={500} borderRadius={24} />
      <View style={{ position: 'absolute', bottom: 120, left: 20, gap: 8 }}>
        <Skeleton width={120} height={20} borderRadius={10} />
        <Skeleton width={200} height={14} borderRadius={7} />
        <View style={{ flexDirection: 'row', gap: 6, marginTop: 4 }}>
          <Skeleton width={60} height={24} borderRadius={12} />
          <Skeleton width={80} height={24} borderRadius={12} />
          <Skeleton width={50} height={24} borderRadius={12} />
        </View>
      </View>
    </View>
  )
}

export function CardSkeleton() {
  return (
    <View style={{
      backgroundColor: colors.darkCard,
      borderRadius: 16,
      padding: 16,
      marginHorizontal: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    }}>
      <Skeleton width={56} height={56} borderRadius={28} />
      <View style={{ flex: 1, gap: 6 }}>
        <Skeleton width={100} height={16} borderRadius={8} />
        <Skeleton width={160} height={12} borderRadius={6} />
      </View>
      <Skeleton width={70} height={30} borderRadius={15} />
    </View>
  )
}
