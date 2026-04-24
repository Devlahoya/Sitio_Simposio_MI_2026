export default function LogoIngenia({ size = 80, className = '' }) {
  return (
    <img
      src="/logo-ingenia.png"
      alt="IngenIA Simposio 2026"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  )
}
