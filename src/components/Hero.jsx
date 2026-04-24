import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, ChevronDown } from 'lucide-react'

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
      <div className="card-glass rounded-xl w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center glow-sky">
        <span className="font-black text-3xl sm:text-4xl text-white tabular-nums leading-none">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-xs text-slate-400 uppercase tracking-widest">{label}</span>
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
        {/* Badge */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 card-glass rounded-full px-4 py-2 mb-6 text-sm text-sky-300"
        >
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          Maestría en Ingeniería — UPIDET · ITD
        </motion.div>

        {/* Logos row */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.15 }}
          className="flex items-center justify-center gap-6 mb-6"
        >
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-sky-500/30 bg-white/5 flex items-center justify-center">
            <img src="/logo-ingenia.png" alt="IngenIA logo"
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                e.target.parentElement.innerHTML = '<span style="font-size:15px;font-weight:900;color:#f97316;text-align:center">Ingen<br/>IA</span>'
              }}
            />
          </div>
          <div className="w-px h-20 bg-sky-500/20" />
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-sky-500/30 bg-white/5 flex items-center justify-center">
            <img src="/logo-itd.png" alt="Instituto Tecnológico de Durango"
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                e.target.parentElement.innerHTML = '<span style="font-size:13px;font-weight:700;color:#e2e8f0;text-align:center">ITD<br/>1948</span>'
              }}
            />
          </div>
        </motion.div>

        {/* Main title */}
        <motion.h1
          variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}
          className="font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-none mb-4"
        >
          Ingen<span style={{ color: '#f97316' }}>IA</span>
        </motion.h1>

        <motion.div
          variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.3 }}
          className="text-xl sm:text-2xl md:text-3xl font-light text-slate-300 mb-2"
        >
          Simposio <span className="font-bold text-white">2026</span>
        </motion.div>

        <motion.p
          variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl font-medium mb-8"
          style={{ color: '#38bdf8' }}
        >
          "La nueva ingeniería es inteligente"
        </motion.p>

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
          <div className="flex items-start justify-center gap-3 sm:gap-6">
            <CountCard value={time.d} label="Días" />
            <span className="text-3xl font-thin text-slate-600 mt-5">:</span>
            <CountCard value={time.h} label="Horas" />
            <span className="text-3xl font-thin text-slate-600 mt-5">:</span>
            <CountCard value={time.m} label="Minutos" />
            <span className="text-3xl font-thin text-slate-600 mt-5">:</span>
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
