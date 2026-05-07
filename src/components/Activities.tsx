import { motion } from 'framer-motion'

const activities = [
  { emoji: '🚶', label: 'Passeios', img: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400&h=500&fit=crop', desc: 'Diários, no bairro' },
  { emoji: '🏔️', label: 'Trilhos', img: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=500&fit=crop', desc: 'Sintra, Arrábida, Gerês' },
  { emoji: '🏖️', label: 'Praia', img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=500&fit=crop', desc: 'Pet-friendly, em grupo' },
  { emoji: '🌳', label: 'Parque', img: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400&h=500&fit=crop', desc: 'O clássico, reinventado' },
  { emoji: '☕', label: 'Café Pet', img: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&h=500&fit=crop', desc: 'Dog-friendly spots' },
  { emoji: '🎉', label: 'Eventos', img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=500&fit=crop', desc: 'Encontrões temáticos' },
]

export function Activities() {
  return (
    <section className="px-5 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <span className="text-xs uppercase tracking-[3px] text-amber block mb-2">Actividades</span>
        <h2 className="text-3xl sm:text-4xl font-bold">Manda uma patinha. Vai lá fora.</h2>
      </motion.div>

      <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory max-w-5xl mx-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}>
        {activities.map((a, i) => (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, type: 'spring', damping: 20, stiffness: 150 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative flex-shrink-0 w-[180px] h-[260px] rounded-2xl overflow-hidden snap-center cursor-pointer group"
          >
            <img src={a.img} alt={a.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-amber/0 group-hover:bg-amber/10 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="text-2xl block mb-1">{a.emoji}</span>
              <h3 className="font-bold text-base">{a.label}</h3>
              <p className="text-white/60 text-xs">{a.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
