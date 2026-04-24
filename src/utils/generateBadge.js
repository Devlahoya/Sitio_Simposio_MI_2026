// Gafete vertical — render 3× (960×1440) alta calidad, JPEG 0.9

const TIPO_LABELS = {
  licenciatura: 'Estudiante de Licenciatura',
  maestria:     'Estudiante de Posgrado',
  docente:      'Docente / Investigador',
  profesional:  'Profesionista',
  otro:         'Participante',
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload  = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function fitText(ctx, text, maxWidth) {
  let t = String(text || '')
  while (ctx.measureText(t).width > maxWidth && t.length > 1) t = t.slice(0, -1)
  return t === text ? text : t + '…'
}

export async function generateBadge({ nombre, email, institucion, tipo }, fotoBase64 = null) {
  const S  = 3            // 3× escala → 960×1440
  const W  = 320 * S      // 960
  const H  = 480 * S      // 1440
  const CX = W / 2

  const canvas = document.createElement('canvas')
  canvas.width  = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled  = true
  ctx.imageSmoothingQuality  = 'high'

  await document.fonts.ready
  const F = 'Inter, system-ui, sans-serif'
  const px = (n) => Math.round(n * S)
  const font = (weight, size) => `${weight} ${px(size)}px ${F}`

  // ── Fondo ─────────────────────────────────────────
  ctx.fillStyle = '#080f28'
  ctx.fillRect(0, 0, W, H)

  // Grid sutil
  ctx.strokeStyle = 'rgba(56,189,248,0.05)'
  ctx.lineWidth = S * 0.5
  for (let x = 0; x <= W; x += px(32)) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
  for (let y = 0; y <= H; y += px(32)) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }

  // ── Cabecera ──────────────────────────────────────
  const HDR = px(120)
  const hGrad = ctx.createLinearGradient(0, 0, 0, HDR)
  hGrad.addColorStop(0, '#0f1e45')
  hGrad.addColorStop(1, '#0a1330')
  ctx.fillStyle = hGrad
  ctx.fillRect(0, 0, W, HDR)

  const lGrad = ctx.createLinearGradient(0, 0, W, 0)
  lGrad.addColorStop(0, 'transparent')
  lGrad.addColorStop(0.15, '#f97316')
  lGrad.addColorStop(0.85, '#f97316')
  lGrad.addColorStop(1, 'transparent')
  ctx.fillStyle = lGrad
  ctx.fillRect(0, HDR - px(2.5), W, px(2.5))

  // Logo grande centrado
  const LS = px(64)
  try {
    const logo = await loadImage('/logo-ingenia.png')
    ctx.drawImage(logo, CX - LS / 2, px(10), LS, LS)
  } catch {
    ctx.fillStyle = '#f97316'
    ctx.font = font(900, 22)
    ctx.textAlign = 'center'
    ctx.fillText('IA', CX, px(52))
  }

  // "IngenIA"
  ctx.textAlign = 'center'
  ctx.font = font(900, 19)
  const ingenW = ctx.measureText('Ingen').width
  const iaW    = ctx.measureText('IA').width
  const nameX  = CX - (ingenW + iaW) / 2
  ctx.fillStyle = '#ffffff'
  ctx.fillText('Ingen', nameX + ingenW / 2, px(88))
  ctx.fillStyle = '#f97316'
  ctx.fillText('IA', nameX + ingenW + iaW / 2, px(88))

  ctx.font = font(400, 10)
  ctx.fillStyle = '#64748b'
  ctx.textAlign = 'center'
  ctx.fillText('SIMPOSIO 2026  ·  28 y 29 de Mayo  ·  ITD · Durango', CX, px(105))

  // ── Foto circular ─────────────────────────────────
  const PR  = px(82)
  const PCY = HDR + px(18) + PR

  // Glow
  const glowR = ctx.createRadialGradient(CX, PCY, PR * 0.7, CX, PCY, PR + px(18))
  glowR.addColorStop(0, 'rgba(249,115,22,0.3)')
  glowR.addColorStop(1, 'transparent')
  ctx.beginPath()
  ctx.arc(CX, PCY, PR + px(18), 0, Math.PI * 2)
  ctx.fillStyle = glowR
  ctx.fill()

  if (fotoBase64) {
    try {
      const fImg = await loadImage('data:image/jpeg;base64,' + fotoBase64)
      ctx.save()
      ctx.beginPath()
      ctx.arc(CX, PCY, PR, 0, Math.PI * 2)
      ctx.clip()
      const ar = fImg.width / fImg.height
      let dw = PR * 2, dh = PR * 2
      if (ar > 1) dw = dh * ar; else dh = dw / ar
      ctx.drawImage(fImg, CX - dw / 2, PCY - dh / 2, dw, dh)
      ctx.restore()
    } catch { /* placeholder */ }
  }

  if (!fotoBase64) {
    ctx.beginPath()
    ctx.arc(CX, PCY, PR, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(249,115,22,0.07)'
    ctx.fill()
    ctx.font = font(700, 60)
    ctx.fillStyle = 'rgba(249,115,22,0.35)'
    ctx.textAlign = 'center'
    ctx.fillText((nombre || '?').charAt(0).toUpperCase(), CX, PCY + px(22))
  }

  // Borde naranja→sky
  const cGrad = ctx.createLinearGradient(CX - PR, PCY - PR, CX + PR, PCY + PR)
  cGrad.addColorStop(0, '#f97316')
  cGrad.addColorStop(1, '#38bdf8')
  ctx.beginPath()
  ctx.arc(CX, PCY, PR, 0, Math.PI * 2)
  ctx.strokeStyle = cGrad
  ctx.lineWidth = px(4)
  ctx.stroke()

  // ── Datos ─────────────────────────────────────────
  ctx.textAlign = 'center'
  let dy = PCY + PR + px(32)

  // Nombre
  ctx.font = font(900, 25)
  ctx.fillStyle = '#ffffff'
  ctx.fillText(fitText(ctx, nombre || '', W - px(48)), CX, dy)
  dy += px(28)

  // Institución
  if (institucion) {
    ctx.font = font(500, 16)
    ctx.fillStyle = '#38bdf8'
    ctx.fillText(fitText(ctx, institucion, W - px(60)), CX, dy)
    dy += px(22)
  }

  // Pill tipo
  const tipoLabel = TIPO_LABELS[tipo] || tipo || 'Participante'
  ctx.font = font(700, 13)
  const pW  = ctx.measureText(tipoLabel).width + px(28)
  const pH  = px(30)
  const pX  = CX - pW / 2

  roundRect(ctx, pX, dy, pW, pH, px(15))
  ctx.fillStyle = 'rgba(249,115,22,0.13)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(249,115,22,0.6)'
  ctx.lineWidth = px(1)
  ctx.stroke()
  ctx.fillStyle = '#fb923c'
  ctx.textAlign = 'center'
  ctx.fillText(tipoLabel, CX, dy + px(20))
  dy += pH + px(22)

  // Separador
  ctx.strokeStyle = 'rgba(255,255,255,0.07)'
  ctx.lineWidth = px(1)
  ctx.beginPath()
  ctx.moveTo(px(80), dy); ctx.lineTo(W - px(80), dy); ctx.stroke()
  dy += px(18)

  // Email
  ctx.font = font(400, 12)
  ctx.fillStyle = '#475569'
  ctx.fillText(fitText(ctx, email || '', W - px(60)), CX, dy)

  // ── Pie ───────────────────────────────────────────
  const FH = px(50)
  const fGrad = ctx.createLinearGradient(0, 0, W, 0)
  fGrad.addColorStop(0, '#c2410c')
  fGrad.addColorStop(1, '#f97316')
  ctx.fillStyle = fGrad
  ctx.fillRect(0, H - FH, W, FH)

  ctx.font = font(700, 11)
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.fillText('Centro de Innovación Tecnológica · ITD', CX, H - FH + px(18))
  ctx.font = font(400, 10)
  ctx.fillStyle = 'rgba(255,255,255,0.72)'
  ctx.fillText('28 y 29 de Mayo de 2026  ·  Durango, Dgo., México', CX, H - FH + px(34))

  return canvas.toDataURL('image/jpeg', 0.9).split(',')[1]
}
