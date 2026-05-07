import { motion, useScroll, useTransform } from 'framer-motion'

export function Navbar() {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.85])
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.07])

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 px-5 py-3 flex justify-between items-center"
      style={{
        backgroundColor: useTransform(bgOpacity, v => `rgba(10,10,20,${v})`),
        borderBottom: useTransform(borderOpacity, v => `1px solid rgba(255,255,255,${v})`),
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="font-display text-xl font-bold text-amber flex items-center gap-1.5">
        <span className="text-2xl">🐾</span> Patudos
      </div>
      <button
        onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
        className="btn-gradient px-5 py-2 rounded-full text-white font-semibold text-sm cursor-pointer border-none"
      >
        Entrar na waitlist
      </button>
    </motion.nav>
  )
}
