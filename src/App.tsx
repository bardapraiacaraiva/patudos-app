import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { PhotoStrip } from './components/PhotoStrip'
import { Features } from './components/Features'
import { Activities } from './components/Activities'
import { Quiz } from './components/Quiz'
import { Stats } from './components/Stats'
import { CtaFinal } from './components/CtaFinal'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <PhotoStrip />
      <Features />
      <Activities />
      <Quiz />
      <Stats />
      <CtaFinal />
      <footer className="py-6 text-center border-t border-glass-border">
        <p className="text-xs text-text-muted">🐾 Patudos 2026 — Feito em Lisboa, para cães e os seus humanos</p>
      </footer>
    </>
  )
}

export default App
