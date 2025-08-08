'use client'
import Image from 'next/image'

export default function Footer() {
  const aspectRatio = 411 / 1975; // ≈ 0.208
  
  return (
    <footer className="relative w-full flex flex-col items-center justify-end bg-neon-primary border-t border-border pt-16 pb-8">
      {/* Massive but constrained logo container */}
      <div className="w-full flex justify-center px-4">
        <div style={{
          position: 'relative',
          width: 'min(180vw, 4200px)', // Safe maximum size
          height: `calc(min(180vw, 4200px) * ${aspectRatio})`,
          marginBottom: '2rem',
          maxHeight: '100vh' // Prevents overwhelming the footer
        }}>
          <Image
            src="/images/newt-stacked.png"
            alt="NEWT Logo"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </div>
    </footer>
  )
}