import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Mic2, BookOpen, Users, HelpCircle, Building2 } from 'lucide-react'
import LogoIngenia from './LogoIngenia'

const roles = [
  {
    icon: Shield,
    role: 'Coordinación General',
    name: 'Comité Organizador',
    org: 'Maestría en Ingeniería — UPIDET-ITD',
    color: '#f97316',
  },
  {
    icon: Mic2,
    role: 'Moderación de Mesa Redonda',
    name: 'Ing. Darcy Torres',
    org: 'Alumna — Maestría en Ingeniería',
    color: '#38bdf8',
  },
  {
    icon: BookOpen,
    role: 'Instructores del Curso 1',
    name: 'Ing. Darcy Torres · Ing. Adley Bracho',
    org: 'Fundamentos de IA con Python',
    color: '#22c55e',
  },
  {
    icon: Users,
    role: 'Panelistas de Mesa Redonda',
    name: 'Estudiantes y Maestros de Maestría',
    org: 'Maestría en Ingeniería — UPIDET',
    color: '#a855f7',
  },
  {
    icon: HelpCircle,
    role: 'Ponentes Invitados',
    name: 'Por definir',
    org: 'Conferencias magistrales',
    color: '#fbbf24',
  },
  {
    icon: BookOpen,
    role: 'Ponentes del Seminario',
    name: 'Estudiantes 1.er semestre',
    org: 'Maestría en Ingeniería — UPIDET',
    color: '#38bdf8',
  },
  {
    icon: Building2,
    role: 'Logística y Sede',
    name: 'Centro de Innovación del ITD',
    org: 'Instituto Tecnológico de Durango',
    color: '#f97316',
  },
]

export default function Committee() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="comite" className="relative py-24 sm:py-32 bg-[#060c20]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
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
            Organización
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Comité <span className="text-gradient-orange">Organizador</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400">
            El simposio es organizado por la Maestría en Ingeniería de UPIDET-ITD con el apoyo
            de docentes, investigadores y el Centro de Innovación Tecnológica.
          </p>
        </motion.div>

        {/* Institution callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 card-glass rounded-2xl p-8 text-center"
        >
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="flex items-center justify-center">
              <LogoIngenia size={64} showText={false} />
            </div>
            <div className="w-px h-10 bg-sky-500/20" />
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white/5 border border-sky-500/20 flex items-center justify-center">
              <img src="/logo-itd.png" alt="ITD"
                className="w-full h-full object-contain p-1"
                onError={(e) => { e.target.parentElement.innerHTML = '<span style="font-size:10px;font-weight:700;color:#e2e8f0">ITD</span>' }}
              />
            </div>
          </div>
          <h3 className="text-xl font-black text-white">Maestría en Ingeniería — UPIDET</h3>
          <p className="text-sky-400 text-sm mt-1">Instituto Tecnológico de Durango · Durango, Dgo. — 2026</p>
          <p className="text-slate-400 text-sm mt-3 max-w-xl mx-auto">
            La Unidad de Posgrado, Investigación y Desarrollo Tecnológico (UPIDET) del ITD organiza
            este evento para fortalecer los vínculos entre la comunidad académica y la industria tecnológica.
          </p>
        </motion.div>

        {/* Roles grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((r, i) => {
            const Icon = r.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="card-glass card-glass-hover rounded-xl p-5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center"
                    style={{ background: `${r.color}15`, border: `1px solid ${r.color}30` }}>
                    <Icon size={18} style={{ color: r.color }} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: r.color }}>
                      {r.role}
                    </p>
                    <p className="font-bold text-white text-sm leading-snug">{r.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{r.org}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
