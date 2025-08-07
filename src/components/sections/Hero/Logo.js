'use client'
import Image from 'next/image'

export default function Logo() {
  // Calculate aspect ratio (original 1975w × 411h)
  const aspectRatio = 411 / 1975; // ≈ 0.208
  
  return (
    <div style={{
      position: 'absolute',
      bottom: '225px',
      left: '0',
      right: '0',
      display: 'flex',
      justifyContent: 'center',
      zIndex: 500,
      pointerEvents: 'none'
    }}>
      <div style={{
        position: 'relative',
        width: 'min(90vw, 1200px)', // Responsive up to original width
        height: `calc(min(90vw, 1200px) * ${aspectRatio})` // Maintain exact ratio
      }}>
        <Image
          src="/images/newt.png"
          alt="Logo"
          fill
          style={{ 
            objectFit: 'contain',
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.7))'
          }}
          priority
          unoptimized
        />
      </div>
    </div>
  )
}