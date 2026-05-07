import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

function AnimatedNumber({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const value = Math.round(eased * target)

      if (target >= 1_000_000) setDisplay((value / 1_000_000).toFixed(1) + 'M')
      else if (target >= 1000) setDisplay(Math.round(value / 1000) + 'K')
      else setDisplay(String(value))

      if (progress < 1) requestAnimationFrame(tick)
    }
    tick()
  }, [inView, target, duration])

  return <span ref={ref}>{display}{suffix}</span>
}

const stats = [
  { target: 2_840_000, suffix: '', label: 'Cães em Portugal' },
  { target: 67, suffix: '%', label: 'Querem mais socialização' },
  { target: 850_000_000, suffix: '', label: 'Views dog content /mês' },
  { target: 0, suffix: '', label: 'Apps que resolvem isto', static: '0' },
]

export function Stats() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="px-5 py-16"
    >
      <div className="flex flex-wrap gap-8 justify-center max-w-3xl mx-auto">
        {stats.map((s, i) => (
          <div key={i} className="text-center min-w-[120px]">
            <div className="font-display text-4xl sm:text-5xl font-bold gradient-text leading-none">
              {s.static ?? <AnimatedNumber target={s.target} suffix={s.suffix} />}
            </div>
            <div className="text-xs text-text-muted mt-1.5">{s.label}</div>
          </div>
        ))}
      </div>
    </motion.section>
  )
}
