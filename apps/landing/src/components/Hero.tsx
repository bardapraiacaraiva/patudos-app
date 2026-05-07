import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useState } from 'react'
import { WaitlistForm } from './WaitlistForm'

const dogCards = [
  { name: 'Luna', breed: 'Golden Retriever', age: '3 anos', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=420&fit=crop', tags: ['Brincalhona', 'Lisboa'] },
  { name: 'Buddy', breed: 'Labrador', age: '2 anos', img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&h=420&fit=crop', tags: ['Calmo', 'Cascais'] },
  { name: 'Bella', breed: 'French Bulldog', age: '1 ano', img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&h=420&fit=crop', tags: ['Fofa', 'Porto'] },
]

function PhoneMockup() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [8, -8]), { damping: 20, stiffness: 150 })
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-8, 8]), { damping: 20, stiffness: 150 })

  const [current, setCurrent] = useState(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className="relative w-[280px] h-[560px] mx-auto"
    >
      {/* Phone frame */}
      <div className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-[#2A2A3A] to-[#1A1A2A] p-[3px] shadow-2xl"
        style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
        <div className="w-full h-full rounded-[38px] bg-dark overflow-hidden relative">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-[#1A1A2A] rounded-b-2xl z-20" />

          {/* Status bar */}
          <div className="absolute top-1 left-0 right-0 flex justify-between items-center px-6 py-1 z-10 text-[10px] text-text-muted">
            <span>9:41</span>
            <span>●●●</span>
          </div>

          {/* App header */}
          <div className="absolute top-8 left-0 right-0 flex justify-between items-center px-4 z-10">
            <span className="text-amber font-bold text-sm font-display">🐾 Patudos</span>
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-glass-border flex items-center justify-center text-[10px]">📍</div>
              <div className="w-7 h-7 rounded-full bg-glass-border flex items-center justify-center text-[10px]">💬</div>
            </div>
          </div>

          {/* Dog cards stack */}
          <div className="absolute inset-0 top-16 flex items-center justify-center">
            {dogCards.map((dog, i) => {
              const offset = i - current
              if (offset < 0 || offset > 2) return null
              return (
                <motion.div
                  key={dog.name}
                  className="absolute w-[240px] h-[360px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing"
                  style={{
                    zIndex: 3 - offset,
                    backgroundImage: `url(${dog.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  initial={false}
                  animate={{
                    scale: 1 - offset * 0.06,
                    y: offset * 10,
                    opacity: offset === 0 ? 1 : 0.5,
                  }}
                  transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                  onClick={() => setCurrent((current + 1) % dogCards.length)}
                  drag={offset === 0 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragEnd={(_, info) => {
                    if (Math.abs(info.offset.x) > 80) setCurrent((current + 1) % dogCards.length)
                  }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* MATCH / NOPE stamps */}
                  <motion.div
                    className="absolute top-6 right-4 text-green font-black text-2xl border-3 border-green rounded-lg px-3 py-1 rotate-[-15deg] opacity-0"
                    style={{ textShadow: '0 0 10px rgba(52,211,153,0.5)' }}
                  >
                    MATCH
                  </motion.div>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="font-display font-bold text-xl text-white">{dog.name}</div>
                    <div className="text-white/60 text-xs mb-2">{dog.breed} • {dog.age}</div>
                    <div className="flex gap-1">
                      {dog.tags.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded-full bg-white/15 backdrop-blur text-[10px] text-white">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom tab bar */}
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-dark-card/90 backdrop-blur-lg border-t border-glass-border flex items-center justify-around px-2 z-10">
            {['🎬', '📍', '＋', '🐾', '👤'].map((icon, i) => (
              <div key={i} className={`text-lg ${i === 0 ? 'text-amber' : 'text-text-muted/50'}`}>{icon}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Glow behind phone */}
      <div className="absolute -inset-10 rounded-full bg-amber/5 blur-3xl -z-10" />
    </motion.div>
  )
}

export function Hero() {
  return (
    <section className="min-h-screen flex items-center px-5 pt-20 pb-12 relative overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full -top-40 -right-32"
          style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full -bottom-32 -left-32"
          style={{ background: 'radial-gradient(circle, rgba(123,45,142,0.06) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.1, 1], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full top-1/3 left-1/3"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 70%)' }}
          animate={{ scale: [0.9, 1.2, 0.9] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        />
      </div>

      {/* Floating paw particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/[0.03]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${1 + Math.random() * 1.5}rem`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 15, -15, 0],
              opacity: [0.03, 0.06, 0.03],
            }}
            transition={{
              duration: 6 + Math.random() * 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5,
            }}
          >
            🐾
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm text-green mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
            A chegar em breve a Lisboa
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-5"
          >
            O teu patudo
            <br />
            <span className="gradient-text">merece mais.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-lg text-text-muted leading-relaxed max-w-md mb-8"
          >
            Vídeos virais. Convites para passeios. Uma comunidade de confiança real.
            A 1ª app de conteúdo pet em Portugal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <WaitlistForm />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs text-text-muted mt-4"
          >
            Junta-te a <strong className="text-amber">47</strong> tutores. Primeiro mês Premium grátis.
          </motion.p>
        </div>

        {/* Right: Phone mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', damping: 18, stiffness: 80, delay: 0.3 }}
          className="hidden lg:flex justify-center"
        >
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  )
}
