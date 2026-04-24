import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import LogoIngenia from './LogoIngenia'

const links = [
  { href: '#sobre', label: 'Sobre el Evento' },
  { href: '#programa', label: 'Programa' },
  { href: '#ponentes', label: 'Ponentes' },
  { href: '#comite', label: 'Comité' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (href) => {
    setOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const navbar = (
    <header
      className={`fixed top-0 left-0 right-0 z-[9999] transition-colors duration-300 ${
        scrolled
          ? 'bg-[#080f28] sm:bg-[#080f28]/95 sm:backdrop-blur-md border-b border-sky-500/10 shadow-xl'
          : 'bg-[#080f28] sm:bg-[#080f28]/80 sm:backdrop-blur-sm'
      }`}
      style={{ willChange: 'background-color' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inicio" onClick={(e) => { e.preventDefault(); handleLink('#inicio') }}
            className="flex items-center gap-3 group">
            <LogoIngenia size={42} showText={false} />
            <div className="leading-none">
              <span className="font-black text-white text-lg">Ingen</span>
              <span className="font-black text-lg" style={{color:'#f97316'}}>IA</span>
              <div className="text-[10px] text-slate-400 tracking-widest uppercase">Simposio 2026</div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleLink(l.href)}
                className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => handleLink('#registro')}
              className="ml-3 px-5 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-200 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
            >
              Registrarse
            </button>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Menú"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#080f28]/98 backdrop-blur-md border-b border-sky-500/10"
          >
            <nav className="px-4 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => handleLink(l.href)}
                  className="w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm cursor-pointer"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => handleLink('#registro')}
                className="mt-2 w-full py-3 text-sm font-semibold text-white rounded-lg cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
              >
                Registrarse
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )

  return createPortal(navbar, document.body)
}
