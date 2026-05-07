import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const traits = [
  { emoji: '⚡', label: 'Energético', value: 'energetico' },
  { emoji: '😎', label: 'Chill', value: 'chill' },
  { emoji: '🤪', label: 'Maluco', value: 'maluco' },
  { emoji: '😴', label: 'Dorminhoco', value: 'dorminhoco' },
  { emoji: '🔍', label: 'Curioso', value: 'curioso' },
  { emoji: '🎾', label: 'Brincalhão', value: 'brincalhao' },
  { emoji: '🛡️', label: 'Leal', value: 'leal' },
  { emoji: '🍖', label: 'Guloso', value: 'guloso' },
  { emoji: '😤', label: 'Teimoso', value: 'teimoso' },
  { emoji: '🏔️', label: 'Aventureiro', value: 'aventureiro' },
  { emoji: '🫣', label: 'Tímido', value: 'timido' },
  { emoji: '🤡', label: 'Palhaço', value: 'palhaco' },
]

function getPersona(selected: string[]) {
  const has = (v: string) => selected.includes(v)
  if (has('energetico') || has('aventureiro') || has('brincalhao'))
    return { title: 'O Explorador Incansável 🏔️', desc: 'O teu patudo não para. Precisa de trilhos, praia e companhia à altura. O Patudos vai encontrar-lhe os parceiros de aventura perfeitos.' }
  if (has('chill') || has('dorminhoco') || has('leal'))
    return { title: 'O Zen Master 🧘', desc: 'Calmo, selectivo e profundamente leal. O teu patudo escolhe os amigos com cuidado. No Patudos, vai encontrar almas gémeas tranquilas.' }
  if (has('maluco') || has('palhaco') || has('guloso'))
    return { title: 'O Animador da Festa 🎉', desc: 'Impossível ficar indiferente. O teu patudo é puro entretenimento — e os seus vídeos vão viralizar no Patudos.' }
  if (has('curioso') || has('timido'))
    return { title: 'O Observador Sensível 👀', desc: 'Desconfiado no início, melhor amigo depois. O Patudos vai ajudá-lo a encontrar amigos ao seu ritmo.' }
  return { title: 'O Patudo Especial ✨', desc: 'Uma mistura única. O teu cão é inclassificável — e é por isso que vai adorar o Patudos.' }
}

export function Quiz() {
  const [selected, setSelected] = useState<string[]>([])
  const [persona, setPersona] = useState<{ title: string; desc: string } | null>(null)

  const toggle = (value: string) => {
    if (persona) return
    setSelected(prev => {
      if (prev.includes(value)) return prev.filter(v => v !== value)
      if (prev.length >= 3) return prev
      const next = [...prev, value]
      if (next.length === 3) setTimeout(() => setPersona(getPersona(next)), 300)
      return next
    })
  }

  const reset = () => { setSelected([]); setPersona(null) }

  return (
    <section className="px-5 py-20" id="quiz">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto rounded-3xl p-8 sm:p-10 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(245,166,35,0.06), rgba(123,45,142,0.06))',
          border: '1px solid rgba(245,166,35,0.15)',
        }}
      >
        {/* Spinning background */}
        <div
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-spin pointer-events-none"
          style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(245,166,35,0.04), transparent, rgba(123,45,142,0.04), transparent)',
            animationDuration: '15s',
          }}
        />

        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
            Qual é o jeito do teu patudo? 🐕
          </h2>
          <p className="text-text-muted text-center mb-6">Escolhe 3 palavras que definem o teu cão.</p>

          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {traits.map(t => (
              <motion.button
                key={t.value}
                onClick={() => toggle(t.value)}
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.06 }}
                className={`px-4 py-2 rounded-full text-sm font-medium border cursor-pointer transition-all duration-200 ${
                  selected.includes(t.value)
                    ? 'btn-gradient text-white border-transparent'
                    : 'glass text-text-main hover:border-amber/30'
                }`}
              >
                {t.emoji} {t.label}
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {persona && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                className="rounded-2xl p-5 text-center"
                style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.15)' }}
              >
                <h3 className="text-xl font-bold text-amber mb-1">{persona.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{persona.desc}</p>
                <button
                  onClick={reset}
                  className="mt-3 text-xs text-text-muted underline cursor-pointer bg-transparent border-none"
                >
                  Tentar de novo
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {!persona && selected.length > 0 && (
            <p className="text-center text-xs text-text-muted">{3 - selected.length} restante{3 - selected.length !== 1 ? 's' : ''}</p>
          )}
        </div>
      </motion.div>
    </section>
  )
}
