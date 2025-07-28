'use client'
import Hero from '@/components/sections/Hero/Hero'
import { useRef } from 'react'

export default function Home() {
  const workRef = useRef()

  return (
    <div className="relative">
      {/* Hero Section (WebGL background) */}
      <section className="h-screen w-full relative">
        <Hero />
      </section>

      {/* Work Section (Black background) */}
      <section 
        ref={workRef}
        className="min-h-screen w-full bg-black text-white p-8"
      >
      </section>
    </div>
  )
}