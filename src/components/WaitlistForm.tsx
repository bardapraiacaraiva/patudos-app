import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'duplicate'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setStatus('error')
      return
    }

    const stored = JSON.parse(localStorage.getItem('patudos_emails') || '[]')
    if (stored.includes(email)) {
      setStatus('duplicate')
      return
    }

    stored.push(email)
    localStorage.setItem('patudos_emails', JSON.stringify(stored))
    localStorage.setItem('patudos_count', String(Number(localStorage.getItem('patudos_count') || '47') + 1))

    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto flex-wrap justify-center">
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); if (status !== 'idle') setStatus('idle') }}
          placeholder="O teu email..."
          className="flex-1 min-w-[220px] px-5 py-3 rounded-full border border-glass-border bg-[rgba(255,255,255,0.05)] text-text-main text-base outline-none focus:border-amber transition-colors backdrop-blur-lg placeholder:text-text-muted"
          aria-label="Email para waitlist"
        />
        <motion.button
          type="submit"
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.03 }}
          className="btn-gradient px-7 py-3 rounded-full text-white font-semibold text-base cursor-pointer border-none whitespace-nowrap"
        >
          Quero entrar 🐾
        </motion.button>
      </form>

      <AnimatePresence mode="wait">
        {status !== 'idle' && (
          <motion.p
            key={status}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`text-sm mt-3 ${
              status === 'success' ? 'text-green' :
              status === 'duplicate' ? 'text-amber' :
              'text-[#FF4466]'
            }`}
          >
            {status === 'success' && '🎉 Estás na lista! Vamos avisar-te quando lançarmos.'}
            {status === 'duplicate' && '🐾 Este email já está na waitlist!'}
            {status === 'error' && 'Introduz um email válido.'}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
