import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, ChevronDown } from 'lucide-react'
import LogoIngenia from './LogoIngenia'

const TARGET = new Date('2026-05-28T09:00:00')

function calcTime() {
  const diff = TARGET - new Date()
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  }
}

function CountCard({ value, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center"
    >
      <div className="card-glass rounded-xl w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center glow-sky">
        <span className="font-black text-2xl sm:text-3xl md:text-4xl text-white tabular-nums leading-none">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-1.5 text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider">{label}</span>
    </motion.div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

export default function Hero() {
  const [time, setTime] = useState(calcTime())

  useEffect(() => {
    const id = setInterval(() => setTime(calcTime()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-grid pt-20">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #1a2b5e 0%, transparent 70%)' }} />
        <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, #f97316 0%, transparent 60%)' }} />
      </div>

      {/* Neural network decorative lines */}
      <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="net" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <circle cx="100" cy="100" r="2" fill="#38bdf8" />
            <circle cx="0" cy="0" r="2" fill="#38bdf8" />
            <circle cx="200" cy="0" r="2" fill="#38bdf8" />
            <circle cx="0" cy="200" r="2" fill="#38bdf8" />
            <circle cx="200" cy="200" r="2" fill="#38bdf8" />
            <line x1="100" y1="100" x2="0" y2="0" stroke="#38bdf8" strokeWidth="0.5" />
            <line x1="100" y1="100" x2="200" y2="0" stroke="#38bdf8" strokeWidth="0.5" />
            <line x1="100" y1="100" x2="0" y2="200" stroke="#38bdf8" strokeWidth="0.5" />
            <line x1="100" y1="100" x2="200" y2="200" stroke="#38bdf8" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#net)" />
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Logo IngenIA — protagonista */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.15 }}
          className="flex flex-col items-center mb-6"
        >
          {/* Halo de luz detrás del logo */}
          <div className="relative flex items-center justify-center">
            <div className="absolute rounded-full blur-3xl opacity-30 w-72 h-72"
              style={{ background: 'radial-gradient(circle, #f97316 0%, #38bdf8 60%, transparent 100%)' }} />
            <div className="absolute rounded-full blur-xl opacity-20 w-48 h-48 animate-pulse"
              style={{ background: '#f97316' }} />

            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="relative z-10"
            >
              <LogoIngenia size={220} className="drop-shadow-2xl sm:w-[260px] sm:h-[260px]" />
            </motion.div>
          </div>

          {/* Logo ITD — secundario, debajo */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.25 }}
            className="flex items-center gap-4 mt-6"
          >
            <div className="w-px h-8 bg-white/10" />
            <div className="w-20 h-20 rounded-full overflow-hidden border border-white/20 bg-white/5 flex items-center justify-center">
              <img src="/logo-itd.png" alt="Instituto Tecnológico de Durango"
                className="w-full h-full object-contain p-1"
                onError={(e) => { e.target.parentElement.innerHTML = '<span style="font-size:10px;font-weight:700;color:#94a3b8">ITD</span>' }}
              />
            </div>
            <span className="text-sm text-slate-400 tracking-wide">Instituto Tecnológico<br/>de Durango</span>
            <div className="w-px h-8 bg-white/10" />
          </motion.div>
        </motion.div>

        {/* Título del evento */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.3 }}
          className="mb-3"
        >
          <h1 className="font-black text-5xl sm:text-6xl md:text-7xl tracking-tight text-white leading-none">
            Ingen<span style={{ color: '#f97316' }}>IA</span>
          </h1>
          <div className="text-xl sm:text-2xl font-light text-slate-300 mt-2">
            Simposio <span className="font-bold text-white">2026</span>
          </div>
        </motion.div>

        <motion.p
          variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.38 }}
          className="text-lg sm:text-xl font-medium mb-4"
          style={{ color: '#38bdf8' }}
        >
          "La nueva ingeniería es inteligente"
        </motion.p>

        <motion.div
          variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.42 }}
          className="inline-flex items-center gap-2 card-glass rounded-full px-4 py-2 mb-8 text-sm text-sky-300"
        >
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          Maestría en Ingeniería — UPIDET · ITD
        </motion.div>

        {/* Event info */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12 text-slate-400 text-sm"
        >
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-orange-400" />
            <span>28 y 29 de mayo de 2026</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-slate-600" />
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-orange-400" />
            <span>Centro de Innovación Tecnológica · ITD</span>
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.6 }}
          className="mb-3"
        >
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Cuenta regresiva</p>
          <div className="flex items-start justify-center gap-2 sm:gap-4 md:gap-6">
            <CountCard value={time.d} label="Días" />
            <span className="text-xl sm:text-2xl font-thin text-slate-600 mt-4 sm:mt-5">:</span>
            <CountCard value={time.h} label="Horas" />
            <span className="text-xl sm:text-2xl font-thin text-slate-600 mt-4 sm:mt-5">:</span>
            <CountCard value={time.m} label="Minutos" />
            <span className="text-xl sm:text-2xl font-thin text-slate-600 mt-4 sm:mt-5">:</span>
            <CountCard value={time.s} label="Segundos" />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.75 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <button
            onClick={() => document.querySelector('#registro')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-xl font-bold text-white text-base transition-all duration-200 hover:scale-105 glow-orange cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
          >
            Registrarse Gratis
          </button>
          <button
            onClick={() => document.querySelector('#programa')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-xl font-semibold text-sky-300 border border-sky-500/30 text-base transition-all duration-200 hover:bg-sky-500/10 cursor-pointer"
          >
            Ver Programa
          </button>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600"
      >
        <span className="text-xs tracking-widest uppercase">Explorar</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
