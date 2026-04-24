import { motion } from 'framer-motion'
import { Calendar, MapPin, Heart } from 'lucide-react'

const navLinks = [
  { href: '#sobre', label: 'Sobre el Evento' },
  { href: '#programa', label: 'Programa' },
  { href: '#ponentes', label: 'Ponentes' },
  { href: '#comite', label: 'Comité Organizador' },
  { href: '#registro', label: 'Registro' },
]

export default function Footer() {
  const handleLink = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#040a18] border-t border-white/5">
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border border-sky-500/20 bg-white/5 overflow-hidden flex items-center justify-center">
                <img src="/logo-ingenia.png" alt="IngenIA"
                  className="w-full h-full object-contain p-1"
                  onError={(e) => { e.target.parentElement.innerHTML = '<span style="font-weight:900;font-size:11px;color:#f97316">IA</span>' }}
                />
              </div>
              <div>
                <div className="font-black text-white text-lg leading-none">
                  Ingen<span style={{ color: '#f97316' }}>IA</span>
                </div>
                <div className="text-[10px] text-slate-500 tracking-widest uppercase">Simposio 2026</div>
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              "La nueva ingeniería es inteligente"
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <Calendar size={13} style={{ color: '#f97316' }} />
              <span>28 y 29 de mayo de 2026</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <MapPin size={13} style={{ color: '#f97316' }} />
              <span>CIT — Instituto Tecnológico de Durango</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">Navegación</h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => handleLink(l.href)}
                    className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Organizer */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">Organiza</h4>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                <img src="/logo-itd.png" alt="ITD"
                  className="w-full h-full object-contain p-1"
                  onError={(e) => { e.target.parentElement.innerHTML = '<span style="font-size:9px;font-weight:700;color:#94a3b8">ITD</span>' }}
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-tight">Instituto Tecnológico de Durango</p>
                <p className="text-xs text-slate-500 mt-0.5">Maestría en Ingeniería — UPIDET</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unidad de Posgrado, Investigación y Desarrollo Tecnológico del ITD.
              Durango, Dgo., México.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © 2026 IngenIA Simposio · Maestría en Ingeniería UPIDET-ITD · Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <span>Hecho con</span>
            <Heart size={11} style={{ color: '#f97316' }} />
            <span>en Durango, México</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
