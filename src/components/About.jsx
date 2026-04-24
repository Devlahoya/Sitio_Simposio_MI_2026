import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Users, Lightbulb, GraduationCap, Target, Cpu } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  show: { transition: { staggerChildren: 0.12 } },
}

const objectives = [
  {
    icon: GraduationCap,
    title: 'Difusión Académica',
    desc: 'Dar a conocer la Maestría en Ingeniería de UPIDET-ITD entre estudiantes de licenciatura interesados en IA.',
  },
  {
    icon: Brain,
    title: 'IA Aplicada',
    desc: 'Presentar proyectos que incorporan IA, Machine Learning y Redes Neuronales en ingeniería.',
  },
  {
    icon: Cpu,
    title: 'Investigación Aplicada',
    desc: 'Acercar a los asistentes al mundo de la investigación aplicada en ingeniería de vanguardia.',
  },
  {
    icon: Lightbulb,
    title: 'Formación Práctica',
    desc: 'Proveer formación introductoria en fundamentos de IA con Python, accesible para todos.',
  },
  {
    icon: Users,
    title: 'Comunidad',
    desc: 'Generar un espacio de diálogo entre investigadores, docentes y estudiantes sobre el futuro de la ingeniería.',
  },
  {
    icon: Target,
    title: 'Proyectos de Maestría',
    desc: 'Mostrar con claridad los proyectos, líneas de investigación y perfil de egresados del programa.',
  },
]

function Section({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'} className={className}>
      {children}
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="sobre" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3">
            Sobre el Evento
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
            ¿Qué es{' '}
            <span className="text-gradient-orange">IngenIA</span>
            {' '}Simposio?
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-slate-400 leading-relaxed">
            El <strong className="text-white">IngenIA Simposio 2026</strong> es un evento académico organizado por la
            Maestría en Ingeniería, adscrita a la Unidad de Posgrado, Investigación y Desarrollo Tecnológico{' '}
            <strong className="text-sky-400">(UPIDET)</strong> del Instituto Tecnológico de Durango.
          </p>
        </motion.div>

        {/* Two-column overview */}
        <Section className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            variants={fadeUp}
            className="card-glass card-glass-hover rounded-2xl p-8 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{ background: 'rgba(249, 115, 22, 0.15)', border: '1px solid rgba(249,115,22,0.3)' }}>
              <Brain size={24} style={{ color: '#f97316' }} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Bajo el lema</h3>
            <blockquote className="text-2xl font-black text-gradient-sky leading-snug mb-4">
              "La nueva ingeniería es inteligente"
            </blockquote>
            <p className="text-slate-400 text-sm leading-relaxed">
              El evento articula conferencias magistrales, mesa redonda, curso práctico y sesiones de presentación
              de protocolos de investigación para mostrar cómo la IA, el Machine Learning y las Redes Neuronales
              transforman la ingeniería.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="card-glass card-glass-hover rounded-2xl p-8 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56,189,248,0.3)' }}>
              <Target size={24} style={{ color: '#38bdf8' }} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Objetivo General</h3>
            <p className="text-slate-300 leading-relaxed">
              Informar a la comunidad estudiantil y al público interesado sobre el uso actual de la{' '}
              <strong className="text-white">Inteligencia Artificial</strong> en el ejercicio de la ingeniería
              y en la industria, al tiempo que se promueve la Maestría en Ingeniería del ITD mediante la
              presentación de sus proyectos de investigación.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                ['Modalidad', 'Presencial'],
                ['Duración', '2 días'],
                ['Sede', 'CIT — ITD'],
                ['Organiza', 'UPIDET'],
              ].map(([k, v]) => (
                <div key={k} className="bg-white/5 rounded-lg px-3 py-2">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">{k}</div>
                  <div className="text-sm font-semibold text-white mt-0.5">{v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </Section>

        {/* Objectives grid */}
        <motion.div
          ref={useRef(null)}
          className="text-center mb-10"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-orange-400 mb-2">
            Objetivos Específicos
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">¿Qué lograremos?</h3>
        </motion.div>

        <Section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {objectives.map((o, i) => {
            const Icon = o.icon
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className="card-glass card-glass-hover rounded-xl p-6 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors"
                  style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56,189,248,0.2)' }}>
                  <Icon size={20} style={{ color: '#38bdf8' }} />
                </div>
                <h4 className="font-bold text-white mb-2">{o.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{o.desc}</p>
              </motion.div>
            )
          })}
        </Section>
      </div>
    </section>
  )
}
