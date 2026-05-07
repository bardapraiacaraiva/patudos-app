import { motion } from 'framer-motion'
import { useState } from 'react'
import { WaitlistForm } from './WaitlistForm'

export function Hero() {
  const [count] = useState(47)

  return (
    <section className="min-h-screen flex items-center justify-center px-5 pt-24 pb-16 relative overflow-hidden">
      {/* Ambient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full -top-36 -right-24 pointer-events-none"
        style={{ background: 'var(--color-amber)', filter: 'blur(120px)', opacity: 0.06 }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full -bottom-20 -left-24 pointer-events-none"
        style={{ background: '#7B2D8E', filter: 'blur(120px)', opacity: 0.05 }}
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="relative z-10 text-center max-w-2xl">
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
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-5"
        >
          O teu patudo
          <br />
          <span className="gradient-text">merece mais.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-text-muted leading-relaxed max-w-lg mx-auto mb-8"
        >
          A 1ª app de conteúdo pet em Portugal. Vídeos, convites para
          passeios, trilhos, praia, parque — e uma comunidade de confiança real para o teu cão.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <WaitlistForm />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-text-muted mt-4"
        >
          Junta-te a <strong className="text-amber">{count}</strong> tutores na waitlist. Primeiro mês Premium grátis.
        </motion.p>
      </div>
    </section>
  )
}
