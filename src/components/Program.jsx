import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Clock, Mic, Users, Code, Award, Coffee, BookOpen, ChevronRight } from 'lucide-react'

const DAYS = [
  {
    day: 'Día 1',
    date: 'Jueves 28 de mayo',
    theme: 'Divulgación y Formación',
    color: '#f97316',
    colorLight: 'rgba(249, 115, 22, 0.15)',
    colorBorder: 'rgba(249, 115, 22, 0.3)',
    activities: [
      {
        time: '09:00 – 09:30',
        title: 'Inauguración',
        desc: 'Acto protocolario de bienvenida y apertura formal del evento.',
        speaker: 'Autoridades del ITD y UPIDET',
        icon: Award,
        type: 'ceremony',
      },
      {
        time: '09:30 – 10:30',
        title: 'Conferencia 1',
        subtitle: '"El futuro de la ingeniería en la era de la IA"',
        desc: 'Conferencia magistral de apertura sobre el panorama global de la ingeniería frente al avance de la IA: tendencias, transformaciones del perfil profesional y áreas emergentes.',
        speaker: 'Juan Pedro Maestrone Vázquez — Ing. Eléctrico, AI Developer · Montevideo, Uruguay',
        icon: Mic,
        type: 'conference',
      },
      {
        time: '10:30 – 11:00',
        title: 'Receso',
        desc: 'Espacio de networking y convivencia entre asistentes.',
        icon: Coffee,
        type: 'break',
      },
      {
        time: '11:00 – 12:00',
        title: 'Mesa Redonda',
        subtitle: '"La nueva ingeniería es inteligente"',
        desc: 'Espacio de diálogo entre doctores de la Maestría en Ingeniería sobre la incorporación de IA en sus líneas de investigación.',
        speaker: 'Profesores y estudiantes de la Maestría · Moderadora: Ing. Darcy Torres',
        icon: Users,
        type: 'panel',
      },
      {
        time: '12:00 – 13:00',
        title: 'Curso 1',
        subtitle: '"Fundamentos de la IA con Python"',
        desc: 'Curso práctico introductorio. Cubre conceptos básicos de IA y Machine Learning con implementación guiada en Python. Sala de Cómputo del CIT.',
        speaker: 'Ing. Darcy Torres · Ing. Adley Bracho',
        icon: Code,
        type: 'workshop',
      },
    ],
  },
  {
    day: 'Día 2',
    date: 'Viernes 29 de mayo',
    theme: 'Investigación de la Maestría',
    color: '#38bdf8',
    colorLight: 'rgba(56, 189, 248, 0.15)',
    colorBorder: 'rgba(56, 189, 248, 0.3)',
    activities: [
      {
        time: '09:00 – 10:00',
        title: 'Conferencia 2',
        desc: 'Segunda conferencia magistral a cargo de ponente invitado.',
        speaker: 'Por confirmar',
        icon: Mic,
        type: 'conference',
      },
      {
        time: '10:00 – 11:00',
        title: 'Seminario — Bloque 1',
        subtitle: 'Presentación de protocolos de investigación',
        desc: 'Los estudiantes de primer semestre de la Maestría en Ingeniería presentan sus protocolos de investigación ante el público.',
        speaker: 'Estudiantes de 1.er semestre de la Maestría',
        icon: BookOpen,
        type: 'seminar',
      },
      {
        time: '11:00 – 11:30',
        title: 'Receso',
        desc: 'Espacio de networking y convivencia entre asistentes.',
        icon: Coffee,
        type: 'break',
      },
      {
        time: '11:30 – 12:30',
        title: 'Seminario — Bloque 2',
        subtitle: 'Presentación de protocolos de investigación',
        desc: 'Continuación de presentaciones de protocolos de investigación. Segunda ronda de estudiantes.',
        speaker: 'Estudiantes de 1.er semestre de la Maestría',
        icon: BookOpen,
        type: 'seminar',
      },
      {
        time: '12:30 – 13:00',
        title: 'Clausura y Entrega de Constancias',
        desc: 'Ceremonia de cierre del evento. Entrega de constancias de participación a asistentes y ponentes.',
        speaker: 'Comité Organizador',
        icon: Award,
        type: 'ceremony',
      },
    ],
  },
]

const typeStyles = {
  ceremony: { bg: 'rgba(168, 85, 247, 0.1)', border: 'rgba(168,85,247,0.2)', text: '#c084fc', label: 'Ceremonia' },
  conference: { bg: 'rgba(249, 115, 22, 0.1)', border: 'rgba(249,115,22,0.2)', text: '#fb923c', label: 'Conferencia' },
  break: { bg: 'rgba(100, 116, 139, 0.1)', border: 'rgba(100,116,139,0.2)', text: '#94a3b8', label: 'Receso' },
  panel: { bg: 'rgba(56, 189, 248, 0.1)', border: 'rgba(56,189,248,0.2)', text: '#38bdf8', label: 'Mesa Redonda' },
  workshop: { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34,197,94,0.2)', text: '#4ade80', label: 'Taller Práctico' },
  seminar: { bg: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251,191,36,0.2)', text: '#fbbf24', label: 'Seminario' },
}

function ActivityCard({ activity, accent }) {
  const Icon = activity.icon
  const ts = typeStyles[activity.type]
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className={`relative pl-6 pb-8 last:pb-0 group ${activity.type === 'break' ? 'opacity-60' : ''}`}
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-2 bottom-0 w-px" style={{ background: `${accent}30` }} />
      {/* Timeline dot */}
      <div className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full border-2"
        style={{ background: '#080f28', borderColor: accent }} />

      <div className="card-glass card-glass-hover rounded-xl p-5 transition-all duration-300 ml-4">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Clock size={13} />
            <span className="tabular-nums font-mono">{activity.time}</span>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
            style={{ background: ts.bg, border: `1px solid ${ts.border}`, color: ts.text }}>
            {ts.label}
          </span>
        </div>

        <div className="flex gap-3">
          <div className="w-9 h-9 shrink-0 rounded-lg flex items-center justify-center mt-0.5"
            style={{ background: ts.bg, border: `1px solid ${ts.border}` }}>
            <Icon size={16} style={{ color: ts.text }} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-white leading-tight">{activity.title}</h4>
            {activity.subtitle && (
              <p className="text-sm font-medium mt-0.5" style={{ color: accent }}>{activity.subtitle}</p>
            )}
            {activity.desc && (
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">{activity.desc}</p>
            )}
            {activity.speaker && (
              <div className="flex items-center gap-1.5 mt-3">
                <ChevronRight size={12} className="text-slate-600" />
                <span className="text-xs text-slate-500">{activity.speaker}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Program() {
  const [activeDay, setActiveDay] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="programa" className="relative py-24 sm:py-32 bg-[#060c20]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3">
            28 y 29 de mayo · 2026
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Programa <span className="text-gradient-orange">General</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400">
            Dos días de conferencias magistrales, mesa redonda, curso práctico de IA con Python y
            presentación de protocolos de investigación de la Maestría.
          </p>
        </motion.div>

        {/* Day tabs */}
        <div className="flex gap-3 justify-center mb-10">
          {DAYS.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className="relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer"
              style={activeDay === i
                ? { background: d.colorLight, border: `1px solid ${d.colorBorder}`, color: d.color }
                : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }
              }
            >
              <span className="font-black">{d.day}</span>
              <span className="hidden sm:inline ml-2 font-normal opacity-80">{d.date}</span>
            </button>
          ))}
        </div>

        {/* Day content */}
        {DAYS.map((day, dayIndex) => (
          <motion.div
            key={dayIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: activeDay === dayIndex ? 1 : 0, display: activeDay === dayIndex ? 'block' : 'none' }}
            transition={{ duration: 0.3 }}
          >
            {/* Day header */}
            <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl"
              style={{ background: day.colorLight, border: `1px solid ${day.colorBorder}` }}>
              <div>
                <div className="font-black text-2xl text-white">{day.day} — {day.date}</div>
                <div className="text-sm font-medium mt-0.5" style={{ color: day.color }}>{day.theme}</div>
              </div>
            </div>

            {/* Activities timeline */}
            <div className="max-w-3xl mx-auto">
              {day.activities.map((activity, i) => (
                <ActivityCard key={i} activity={activity} accent={day.color} />
              ))}
            </div>
          </motion.div>
        ))}

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-slate-600 mt-12"
        >
          * Los horarios y ponentes marcados como "por confirmar" se definirán conforme avance la gestión con los ponentes invitados.
        </motion.p>
      </div>
    </section>
  )
}
