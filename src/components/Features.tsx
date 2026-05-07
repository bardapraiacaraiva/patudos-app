import { motion } from 'framer-motion'
import { Film, PawPrint, MapPin, Star, Users, Home } from 'lucide-react'
import type { ReactNode } from 'react'

const features: { icon: ReactNode; title: string; desc: string }[] = [
  { icon: <Film size={28} />, title: 'Feed de vídeo', desc: 'Vídeos curtos e autênticos do dia a dia dos patudos. Scroll infinito, estilo TikTok.' },
  { icon: <PawPrint size={28} />, title: 'Convites (Patinhas)', desc: 'Manda uma patinha — convida para passeio, trilho, praia ou parque.' },
  { icon: <MapPin size={28} />, title: 'Perto de ti', desc: 'Descobre cães no teu bairro. Filtra por raça, porte e actividade.' },
  { icon: <Star size={28} />, title: 'Confiança progressiva', desc: 'Quanto mais participas, mais desbloqueas. De passeios a hospedagem.' },
  { icon: <Users size={28} />, title: 'Matilha (Grupos)', desc: 'Forma grupos no teu bairro. Organiza encontrões. Cria comunidade.' },
  { icon: <Home size={28} />, title: 'Patudo Anfitrião', desc: 'Vais viajar? Deixa o teu cão com um tutor verificado de confiança.' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 20, stiffness: 150 } },
}

export function Features() {
  return (
    <section className="px-5 py-20 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        className="text-center mb-12"
      >
        <span className="text-xs uppercase tracking-[3px] text-amber block mb-2">O que vem aí</span>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">Não é só mais uma app de cães</h2>
        <p className="text-text-muted max-w-md mx-auto">Conteúdo viral que se transforma em amizades reais.</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {features.map((f, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ y: -6, transition: { type: 'spring', damping: 15, stiffness: 200 } }}
            className="glass glass-hover rounded-2xl p-7 cursor-default relative overflow-hidden group"
          >
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                padding: '1px',
                background: 'linear-gradient(135deg, rgba(245,166,35,0.3), transparent, rgba(123,45,142,0.2))',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />
            <div className="text-amber mb-4">{f.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-text-muted leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
