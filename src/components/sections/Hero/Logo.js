'use client'
import Image from 'next/image'

export default function Logo() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '300px', // 2rem from bottom
      left: '0',
      right: '0',
      display: 'flex',
      justifyContent: 'center',
      zIndex: 500,
      pointerEvents: 'none' // Prevents interaction issues
    }}>
      <div style={{
        position: 'relative',
        width: 'min(90vw, 500px)',
        height: '80px',
      }}>
        <Image
          src="/images/newt.png"
          alt="Logo"
          fill
          style={{ objectFit: 'contain' }}
          priority
          unoptimized
        />
      </div>
    </div>
  )
}