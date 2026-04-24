// Proxy server-side para imgbb — evita CORB/CORS del navegador
exports.handler = async (event) => {
  const CORS = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS, body: 'Method Not Allowed' }
  }

  const key = process.env.IMGBB_API_KEY
  if (!key) {
    return {
      statusCode: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'IMGBB_API_KEY not configured' }),
    }
  }

  let badgeBase64
  try {
    ;({ badgeBase64 } = JSON.parse(event.body))
  } catch {
    return {
      statusCode: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid JSON body' }),
    }
  }

  if (!badgeBase64) {
    return {
      statusCode: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'badgeBase64 required' }),
    }
  }

  const params = new URLSearchParams({ key, image: badgeBase64 })

  const res  = await fetch('https://api.imgbb.com/1/upload', {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:    params.toString(),
  })

  const json = await res.json()
  const url  = json?.data?.display_url || json?.data?.url || ''

  return {
    statusCode: 200,
    headers: { ...CORS, 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  }
}
