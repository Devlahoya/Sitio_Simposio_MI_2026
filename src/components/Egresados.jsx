import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, MapPin, Users } from 'lucide-react'

export default function Egresados() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="egresados" className="relative py-24 sm:py-32 bg-[#060c20]">
      {/* Decoración */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, #38bdf8 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-sky-400 mb-3">
            Evento Especial · 29 de Mayo
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Encuentro de <span className="text-gradient-sky">Egresados</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400">
            Un espacio para el intercambio de experiencias y la construcción de redes profesionales
            entre exalumnos de la Maestría en Ingeniería, fortaleciendo su relación con la institución.
          </p>
        </motion.div>

        {/* Chips de info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {[
            { icon: Calendar, text: '29 de Mayo de 2026  ·  13:00 hrs.', color: '#f97316' },
            { icon: MapPin,   text: 'Auditorio del CIT — ITD', color: '#38bdf8' },
            { icon: Users,    text: 'Egresados y Alumnos', color: '#a855f7' },
          ].map(({ icon: Icon, text, color }, i) => (
            <div key={i}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full card-glass text-sm"
              style={{ border: `1px solid ${color}25` }}
            >
              <Icon size={14} style={{ color }} />
              <span className="text-slate-300">{text}</span>
            </div>
          ))}
        </motion.div>

        {/* Flyer — protagonista */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative max-w-lg w-full">
            {/* Glow detrás del flyer */}
            <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-30"
              style={{ background: 'radial-gradient(ellipse, #38bdf8 0%, #f97316 60%, transparent 80%)' }} />

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{ boxShadow: '0 25px 60px rgba(56,189,248,0.2), 0 0 0 1px rgba(56,189,248,0.15)' }}
            >
              <img
                src="/encuentro_egresados.jpeg"
                alt="Encuentro de Egresados — Maestría en Ingeniería UPIDET-ITD — 29 Mayo 2026"
                className="w-full h-auto block"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Info contacto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-xs text-slate-600 uppercase tracking-widest mb-2">Más información</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <a href="tel:6183257467" className="text-sky-400 hover:text-sky-300 transition-colors font-medium">
              618-325-7467
            </a>
            <span className="hidden sm:block text-slate-700">·</span>
            <a href="mailto:mping@itdurango.edu.mx" className="text-sky-400 hover:text-sky-300 transition-colors font-medium">
              mping@itdurango.edu.mx
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
