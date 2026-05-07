import { motion } from 'framer-motion'

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, damping: 20, stiffness: 150 } },
}

function BentoCard({ children, className = '', span = '' }: { children: React.ReactNode; className?: string; span?: string }) {
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -4, scale: 1.01, transition: { type: 'spring', damping: 15, stiffness: 200 } }}
      className={`rounded-3xl p-6 relative overflow-hidden group cursor-default ${span} ${className}`}
      style={{
        background: 'var(--color-glass)',
        border: '1px solid var(--color-glass-border)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Hover glow border */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          padding: '1px',
          background: 'linear-gradient(135deg, rgba(245,166,35,0.4), transparent 50%, rgba(123,45,142,0.3))',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {children}
    </motion.div>
  )
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
        <span className="text-xs uppercase tracking-[3px] text-amber block mb-2">Não é só uma app</span>
        <h2 className="text-3xl sm:text-4xl font-bold">5 camadas. 1 experiência.</h2>
      </motion.div>

      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[180px]"
      >
        {/* Feed — big card */}
        <BentoCard span="col-span-2 row-span-2" className="flex flex-col justify-between">
          <div>
            <span className="text-4xl block mb-3">🎬</span>
            <h3 className="text-2xl font-bold mb-1">Feed de Vídeo</h3>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Scroll infinito, estilo TikTok. Vídeos curtos e autênticos dos patudos — os cães dos vídeos são perfis reais na app.
            </p>
          </div>
          <div className="flex gap-2 mt-3">
            {['Para Ti', 'Perto', 'Trending'].map(t => (
              <span key={t} className="px-3 py-1 rounded-full text-[11px] font-medium" style={{ background: 'rgba(245,166,35,0.1)', color: 'var(--color-amber)' }}>{t}</span>
            ))}
          </div>
          {/* Video feed preview */}
          <div className="absolute -right-4 -bottom-4 w-32 h-48 rounded-2xl overflow-hidden opacity-20 group-hover:opacity-40 transition-opacity">
            <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=300&fit=crop" alt="" className="w-full h-full object-cover" />
          </div>
        </BentoCard>

        {/* Patinhas */}
        <BentoCard className="flex flex-col justify-between">
          <span className="text-3xl">🐾</span>
          <div>
            <h3 className="font-bold text-sm mb-0.5">Patinhas</h3>
            <p className="text-text-muted text-xs leading-relaxed">Convida para passeio, trilho, praia ou parque com um tap.</p>
          </div>
        </BentoCard>

        {/* Perto */}
        <BentoCard className="flex flex-col justify-between">
          <span className="text-3xl">📍</span>
          <div>
            <h3 className="font-bold text-sm mb-0.5">Perto</h3>
            <p className="text-text-muted text-xs leading-relaxed">Mapa com cães no teu bairro. Filtro por raça e energia.</p>
          </div>
          {/* Mini map dots */}
          <div className="absolute bottom-3 right-3 w-12 h-12 rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.15), transparent)' }}>
            <div className="absolute top-2 left-3 w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
            <div className="absolute top-5 right-2 w-1.5 h-1.5 rounded-full bg-green animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-2 left-5 w-1 h-1 rounded-full bg-amber/50 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </BentoCard>

        {/* Confiança */}
        <BentoCard className="flex flex-col justify-between">
          <span className="text-3xl">🛡️</span>
          <div>
            <h3 className="font-bold text-sm mb-0.5">Confiança</h3>
            <p className="text-text-muted text-xs leading-relaxed">5 níveis. Verificação progressiva. Quanto mais participas, mais desbloqueas.</p>
          </div>
          {/* Trust level indicators */}
          <div className="flex gap-1 mt-1">
            {['🐾', '⭐', '⭐', '💎', '👑'].map((b, i) => (
              <span key={i} className={`text-[10px] ${i < 2 ? 'opacity-100' : 'opacity-20'}`}>{b}</span>
            ))}
          </div>
        </BentoCard>

        {/* Matilha */}
        <BentoCard className="flex flex-col justify-between">
          <span className="text-3xl">👥</span>
          <div>
            <h3 className="font-bold text-sm mb-0.5">Matilha</h3>
            <p className="text-text-muted text-xs leading-relaxed">Grupos do bairro. Encontrões. Eventos temáticos.</p>
          </div>
        </BentoCard>

        {/* Anfitrião — wide card */}
        <BentoCard span="col-span-2" className="flex items-center gap-5">
          <span className="text-5xl">🏠</span>
          <div>
            <h3 className="font-bold text-lg mb-0.5">Patudo Anfitrião</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Vais viajar? Deixa o teu cão com um tutor de confiança verificado. Rede de apoio real — não hotéis caninos.
            </p>
          </div>
          {/* Dog photos */}
          <div className="hidden sm:flex -space-x-3 ml-auto">
            {[
              'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=60&h=60&fit=crop',
              'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=60&h=60&fit=crop',
              'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=60&h=60&fit=crop',
            ].map((src, i) => (
              <img key={i} src={src} alt="" className="w-10 h-10 rounded-full border-2 border-dark object-cover" />
            ))}
            <div className="w-10 h-10 rounded-full bg-amber/20 border-2 border-dark flex items-center justify-center text-[10px] text-amber font-bold">+12</div>
          </div>
        </BentoCard>
      </motion.div>
    </section>
  )
}
