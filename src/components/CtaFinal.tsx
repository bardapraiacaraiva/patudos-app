import { motion } from 'framer-motion'
import { WaitlistForm } from './WaitlistForm'

export function CtaFinal() {
  return (
    <section className="px-5 py-20 text-center" id="waitlist">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto rounded-3xl p-8 sm:p-10 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(245,166,35,0.08), rgba(123,45,142,0.08))',
          border: '1px solid rgba(245,166,35,0.2)',
        }}
      >
        <div
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none"
          style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(245,166,35,0.06), transparent, rgba(123,45,142,0.06), transparent)',
            animation: 'spin 12s linear infinite',
          }}
        />
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Sê dos primeiros 🐾</h2>
          <p className="text-text-muted mb-6">Entra na waitlist e recebe acesso antecipado + primeiro mês Premium grátis.</p>
          <WaitlistForm />
        </div>
      </motion.div>
    </section>
  )
}
