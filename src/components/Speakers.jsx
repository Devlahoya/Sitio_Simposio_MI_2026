import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mic, Globe, BookOpen, ExternalLink } from 'lucide-react'

const speakers = [
  {
    name: 'Ponente Invitado Internacional',
    role: 'Conferencia 1 — Día 1',
    topic: '"El futuro de la ingeniería en la era de la IA"',
    bio: 'Experto internacional en Inteligencia Artificial aplicada a la ingeniería. Perfil por confirmar. Se contempla la participación de ponentes de alto perfil internacional.',
    tags: ['IA', 'Ingeniería', 'Industria 4.0'],
    confirmed: false,
    avatar: null,
    accentColor: '#f97316',
  },
  {
    name: 'Ponente Invitado',
    role: 'Conferencia 2 — Día 2',
    topic: 'Tema por confirmar',
    bio: 'Segunda conferencia magistral del evento. Se realizará el viernes 29 de mayo. Detalles del ponente próximamente.',
    tags: ['Por confirmar'],
    confirmed: false,
    avatar: null,
    accentColor: '#38bdf8',
  },
  {
    name: 'Ing. Darcy Torres',
    role: 'Moderadora & Instructora',
    topic: 'Mesa Redonda + Curso "Fundamentos de IA con Python"',
    bio: 'Moderadora de la mesa redonda y co-instructora del curso práctico de IA. Especialista en implementación de algoritmos de Machine Learning con Python.',
    tags: ['Python', 'Machine Learning', 'Maestría'],
    confirmed: true,
    avatar: null,
    accentColor: '#a855f7',
  },
  {
    name: 'Ing. Adley Bracho',
    role: 'Instructor',
    topic: 'Curso "Fundamentos de IA con Python"',
    bio: 'Co-instructor del curso práctico de fundamentos de IA. Especialista en implementación de algoritmos de Machine Learning con Python.',
    tags: ['Python', 'IA', 'Deep Learning'],
    confirmed: true,
    avatar: null,
    accentColor: '#22c55e',
  },
  {
    name: 'Profesores de la Maestría',
    role: 'Panelistas — Mesa Redonda',
    topic: '"La nueva ingeniería es inteligente"',
    bio: 'Doctores e investigadores de la Maestría en Ingeniería de UPIDET-ITD. Compartirán cómo la IA se incorpora en sus líneas de investigación.',
    tags: ['Investigación', 'UPIDET', 'Doctorado'],
    confirmed: true,
    avatar: null,
    accentColor: '#38bdf8',
  },
  {
    name: 'Estudiantes de Maestría',
    role: 'Presentadores — Seminario',
    topic: 'Protocolos de investigación (1.er semestre)',
    bio: 'Estudiantes de primer semestre de la Maestría en Ingeniería que presentarán el protocolo de su proyecto de investigación al público.',
    tags: ['Investigación', 'Protocolos', 'Maestría'],
    confirmed: true,
    avatar: null,
    accentColor: '#fbbf24',
  },
]

function AvatarPlaceholder({ name, color }) {
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('')
  return (
    <div className="w-full h-full flex items-center justify-center rounded-2xl font-black text-2xl"
      style={{ background: `${color}20`, color }}>
      {initials}
    </div>
  )
}

function SpeakerCard({ s, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="card-glass card-glass-hover rounded-2xl overflow-hidden transition-all duration-300 group"
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${s.accentColor}, transparent)` }} />

      <div className="p-6">
        {/* Avatar + status */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-16 h-16 shrink-0 rounded-2xl overflow-hidden"
            style={{ border: `2px solid ${s.accentColor}40` }}>
            {s.avatar
              ? <img src={s.avatar} alt={s.name} className="w-full h-full object-cover" />
              : <AvatarPlaceholder name={s.name} color={s.accentColor} />
            }
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-white text-base leading-tight">{s.name}</h3>
              {!s.confirmed && (
                <span className="text-[10px] px-2 py-0.5 rounded-full border"
                  style={{ background: 'rgba(249,115,22,0.1)', borderColor: 'rgba(249,115,22,0.3)', color: '#fb923c' }}>
                  Por confirmar
                </span>
              )}
              {s.confirmed && (
                <span className="text-[10px] px-2 py-0.5 rounded-full border"
                  style={{ background: 'rgba(34,197,94,0.1)', borderColor: 'rgba(34,197,94,0.3)', color: '#4ade80' }}>
                  Confirmado
                </span>
              )}
            </div>
            <p className="text-xs mt-1" style={{ color: s.accentColor }}>{s.role}</p>
          </div>
        </div>

        {/* Topic */}
        <div className="flex gap-2 mb-3">
          <Mic size={13} className="shrink-0 mt-0.5 text-slate-500" />
          <p className="text-sm font-medium text-slate-200">{s.topic}</p>
        </div>

        {/* Bio */}
        <p className="text-sm text-slate-400 leading-relaxed mb-4">{s.bio}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {s.tags.map((t) => (
            <span key={t} className="text-[11px] px-2 py-0.5 rounded-full"
              style={{ background: `${s.accentColor}15`, color: s.accentColor, border: `1px solid ${s.accentColor}25` }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Speakers() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="ponentes" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3">
            Participantes
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Ponentes y <span className="text-gradient-sky">Participantes</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400">
            Investigadores, docentes y estudiantes que compartirán su conocimiento sobre
            el impacto de la IA en la ingeniería moderna.
          </p>
        </motion.div>

        {/* Call for speakers banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-10 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4"
          style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}
        >
          <Globe size={28} style={{ color: '#f97316', flexShrink: 0 }} />
          <div className="text-center sm:text-left">
            <p className="font-bold text-white">Ponentes internacionales en gestión</p>
            <p className="text-sm text-slate-400 mt-0.5">Se contemplan ponentes invitados de perfil internacional para las conferencias magistrales. Detalles próximamente.</p>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {speakers.map((s, i) => (
            <SpeakerCard key={i} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
