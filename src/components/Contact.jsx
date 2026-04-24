import { useState, useRef, useCallback } from 'react'
import emailjs from '@emailjs/browser'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { motion, useInView } from 'framer-motion'
import { Mail, MapPin, Calendar, Send, CheckCircle, User, AtSign, ShieldCheck, Camera, X } from 'lucide-react'
import { generateBadge } from '../utils/generateBadge'

// Comprime imagen a máx 800px, JPEG 75%
function compressImage(file, maxSize = 800, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = (ev) => {
      const img = new Image()
      img.onerror = reject
      img.onload = () => {
        const ratio  = Math.min(maxSize / img.width, maxSize / img.height, 1)
        const canvas = document.createElement('canvas')
        canvas.width  = Math.round(img.width  * ratio)
        canvas.height = Math.round(img.height * ratio)
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        const dataUrl = canvas.toDataURL('image/jpeg', quality)
        resolve({
          base64:   dataUrl.split(',')[1],
          mime:     'image/jpeg',
          preview:  dataUrl,
        })
      }
      img.src = ev.target.result
    }
    reader.readAsDataURL(file)
  })
}

const infoItems = [
  {
    icon: Calendar,
    label: 'Fechas',
    value: '28 y 29 de mayo de 2026',
    sub: 'Jueves y Viernes',
    color: '#f97316',
  },
  {
    icon: MapPin,
    label: 'Sede',
    value: 'Centro de Innovación Tecnológica (CIT)',
    sub: 'Instituto Tecnológico de Durango · Durango, Dgo.',
    color: '#38bdf8',
  },
  {
    icon: Mail,
    label: 'Contacto',
    value: 'Maestría en Ingeniería — UPIDET',
    sub: 'Instituto Tecnológico de Durango',
    color: '#a855f7',
  },
]

export default function Contact() {
  const [form, setForm]           = useState({ nombre: '', email: '', institucion: '', tipo: '', mensaje: '' })
  const [foto, setFoto]           = useState(null)   // { base64, mime, preview }
  const [fotoError, setFotoError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const ref                       = useRef(null)
  const inView                    = useInView(ref, { once: true, margin: '-80px' })
  const { executeRecaptcha }      = useGoogleReCaptcha()

  const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const SHEET_SCRIPT_URL    = import.meta.env.VITE_APPS_SCRIPT_URL

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleFoto = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFotoError('')
    if (file.size > 8 * 1024 * 1024) {
      setFotoError('La foto no debe superar 8 MB.')
      return
    }
    if (!file.type.startsWith('image/')) {
      setFotoError('Solo se aceptan imágenes.')
      return
    }
    try {
      const compressed = await compressImage(file)
      setFoto(compressed)
    } catch {
      setFotoError('No se pudo procesar la imagen. Intenta con otra.')
    }
  }

  const uploadBadge = async (badgeBase64) => {
    if (!badgeBase64) return ''
    try {
      const res  = await fetch('/.netlify/functions/upload-badge', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ badgeBase64 }),
      })
      const json = await res.json()
      if (json.error) console.error('upload-badge fn error:', json.error)
      return json.url || ''
    } catch (err) {
      console.error('uploadBadge error:', err)
      return ''
    }
  }

  const saveToSheet = (data) => {
    if (!SHEET_SCRIPT_URL) return
    const params = new URLSearchParams({
      nombre:      data.nombre,
      email:       data.email,
      institucion: data.institucion,
      tipo:        data.tipo,
      mensaje:     data.mensaje || '',
    })
    fetch(SHEET_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: params }).catch(() => {})
  }

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (!executeRecaptcha) return
    setLoading(true)
    try {
      await executeRecaptcha('registro_simposio')
      const [, badgeBase64] = await Promise.all([
        emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name:   form.nombre,
            from_email:  form.email,
            institucion: form.institucion,
            tipo:        form.tipo,
            mensaje:     form.mensaje || '(sin comentarios)',
          },
          EMAILJS_PUBLIC_KEY
        ),
        generateBadge(form, foto?.base64 || null),
      ])
      void uploadBadge(badgeBase64)
      saveToSheet(form)
      setSubmitted(true)
    } catch (err) {
      console.error('Error:', err)
      alert('Error al enviar el registro. Intenta de nuevo.')
    }
    setLoading(false)
  }, [executeRecaptcha, form, foto, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, SHEET_SCRIPT_URL])

  return (
    <section id="registro" className="relative py-24 sm:py-32">
      <div id="contacto" className="absolute -top-20" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 70%)' }} />
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
            Registro & Contacto
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            ¡Regístrate <span className="text-gradient-orange">Gratis</span>!
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400">
            El evento es de acceso libre y gratuito. Regístrate para asegurar tu lugar y recibir
            actualizaciones sobre el programa y los ponentes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {infoItems.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="card-glass rounded-xl p-5 flex gap-4 items-start">
                  <div className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                    <Icon size={18} style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-0.5">{item.label}</p>
                    <p className="font-bold text-white text-sm">{item.value}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
                  </div>
                </div>
              )
            })}

            <div className="card-glass rounded-xl p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">El evento incluye</p>
              {[
                'Conferencias magistrales',
                'Mesa redonda con investigadores',
                'Curso práctico de IA con Python',
                'Presentación de protocolos de investigación',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0">
                  <CheckCircle size={13} style={{ color: '#4ade80', flexShrink: 0 }} />
                  <span className="text-sm text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="card-glass rounded-2xl p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ background: 'rgba(34,197,94,0.15)', border: '2px solid rgba(34,197,94,0.4)' }}>
                    <CheckCircle size={32} style={{ color: '#4ade80' }} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">¡Registro enviado!</h3>
                  <p className="text-slate-400">Gracias por registrarte. Te enviaremos confirmación y actualizaciones del evento.</p>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-xl font-black text-white mb-6">Formulario de Registro</h3>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5" htmlFor="nombre">
                          Nombre completo <span style={{ color: '#f97316' }}>*</span>
                        </label>
                        <div className="relative">
                          <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input
                            id="nombre" name="nombre" required
                            value={form.nombre} onChange={handleChange}
                            placeholder="Tu nombre"
                            className="w-full pl-9 pr-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                            onFocus={e => e.target.style.borderColor = 'rgba(249,115,22,0.5)'}
                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5" htmlFor="email">
                          Correo electrónico <span style={{ color: '#f97316' }}>*</span>
                        </label>
                        <div className="relative">
                          <AtSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input
                            id="email" name="email" type="email" required
                            value={form.email} onChange={handleChange}
                            placeholder="tu@correo.com"
                            className="w-full pl-9 pr-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                            onFocus={e => e.target.style.borderColor = 'rgba(249,115,22,0.5)'}
                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5" htmlFor="institucion">
                        Institución / Empresa
                      </label>
                      <input
                        id="institucion" name="institucion"
                        value={form.institucion} onChange={handleChange}
                        placeholder="ITD, UJED, empresa, etc."
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(249,115,22,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5" htmlFor="tipo">
                        Tipo de participante <span style={{ color: '#f97316' }}>*</span>
                      </label>
                      <select
                        id="tipo" name="tipo" required
                        value={form.tipo} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all appearance-none cursor-pointer"
                        style={{ background: 'rgba(15,30,74,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(249,115,22,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      >
                        <option value="" disabled style={{ background: '#080f28' }}>Selecciona una opción</option>
                        <option value="licenciatura" style={{ background: '#080f28' }}>Estudiante de licenciatura</option>
                        <option value="maestria" style={{ background: '#080f28' }}>Estudiante de maestría/doctorado</option>
                        <option value="docente" style={{ background: '#080f28' }}>Docente / Investigador</option>
                        <option value="profesional" style={{ background: '#080f28' }}>Profesionista</option>
                        <option value="otro" style={{ background: '#080f28' }}>Otro</option>
                      </select>
                    </div>

                    {/* Foto para gafete */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                        Foto para gafete <span className="text-slate-600 font-normal">(opcional · JPG/PNG · máx 8 MB)</span>
                      </label>
                      <input id="foto" type="file" accept="image/*" onChange={handleFoto} className="hidden" />
                      {foto ? (
                        <div className="flex items-center gap-3">
                          <img src={foto.preview} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0" />
                          <div>
                            <p className="text-xs text-green-400 mb-1">✓ Foto lista</p>
                            <button type="button" onClick={() => setFoto(null)}
                              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-400 transition-colors cursor-pointer">
                              <X size={11} /> Quitar foto
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <label htmlFor="foto"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-slate-300 border border-white/10 hover:border-orange-500/40 hover:text-orange-400 transition-colors cursor-pointer"
                          >
                            <Camera size={15} />
                            Seleccionar foto
                          </label>
                          {fotoError && <p className="text-xs text-red-400 mt-1.5">{fotoError}</p>}
                          <p className="text-[10px] text-slate-600 mt-1.5">Se usará para identificarte en el gafete del evento.</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5" htmlFor="mensaje">
                        Comentarios (opcional)
                      </label>
                      <textarea
                        id="mensaje" name="mensaje" rows={3}
                        value={form.mensaje} onChange={handleChange}
                        placeholder="¿Hay algún tema en particular que te interese?"
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all resize-none"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(249,115,22,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>

                    {/* Protección reCAPTCHA v3 — invisible */}
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <ShieldCheck size={13} />
                      <span>Protegido por reCAPTCHA v3 — Google</span>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                      style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Enviar Registro
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
