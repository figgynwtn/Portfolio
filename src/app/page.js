'use client'
import { useRef } from 'react'
import Hero from '@/components/sections/Hero/Hero'
import Projects from '@/components/sections/Projects'
import Footer from '@/components/sections/Footer'

export default function Home() {
  const workRef = useRef()

  return (
    <div className="bg-neon">
      {/* Hero Section */}
      <Hero />

      {/* Projects Section */}
      <Projects />

      {/* Footer */}
      <Footer />
    </div>
  )
}