'use client'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: "DIGITAL EXPERIENCE PLATFORM",
    year: "2024",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    category: "WEB DEVELOPMENT"
  },
  {
    id: 2,
    title: "CREATIVE AGENCY WEBSITE",
    year: "2024",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
    category: "DESIGN"
  },
  {
    id: 3,
    title: "MOBILE APP INTERFACE",
    year: "2023",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    category: "MOBILE"
  },
  {
    id: 4,
    title: "E-COMMERCE PLATFORM",
    year: "2023",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    category: "WEB DEVELOPMENT"
  },
  {
    id: 5,
    title: "BRAND IDENTITY SYSTEM",
    year: "2023",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
    category: "BRANDING"
  },
  {
    id: 6,
    title: "INTERACTIVE DASHBOARD",
    year: "2022",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    category: "DATA VISUALIZATION"
  }
]

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null)

  return (
    <section className="min-h-screen w-full bg-neon-primary text-neon-primary">
      {/* Section Header */}
      <div className="container mx-auto px-8 py-16">
        <motion.h2 
          className="neon-heading mb-8 text-neon-primary"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          PROJECTS
        </motion.h2>
      </div>

      {/* Projects Grid */}
      <div className="space-y-32">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="relative group cursor-pointer"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Full-bleed Image Container */}
            <div className="relative w-full h-[70vh] overflow-hidden neon-border">
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
                whileHover={{
                  scale: 1.05,
                  filter: "brightness(1.1) contrast(1.1) saturate(1.1)",
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              
              {/* Distortion Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: hoveredProject === project.id ? 0.9 : 0.4 
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Grain Effect */}
              <div className="absolute inset-0 opacity-20 bg-noise" />
              
              {/* Hover Border Effect */}
              <motion.div
                className="absolute inset-0 border-2 border-purple-500/0 pointer-events-none"
                animate={{
                  borderColor: hoveredProject === project.id 
                    ? "rgba(79, 70, 229, 0.8)" 
                    : "rgba(79, 70, 229, 0)"
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Project Info - Minimal Metadata */}
            <div className="absolute bottom-8 left-8 z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: hoveredProject === project.id ? 1 : 0.9,
                  y: hoveredProject === project.id ? 0 : 10
                }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="neon-heading text-4xl md:text-6xl mb-2 text-neon-primary">
                  {project.title}
                </h3>
                <div className="flex items-center gap-4 text-lg text-neon-secondary neon-text">
                  <span>{project.year}</span>
                  <span className="text-neon-purple">•</span>
                  <span>{project.category}</span>
                </div>
              </motion.div>
            </div>

            {/* Hover Glow Effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                boxShadow: hoveredProject === project.id 
                  ? "inset 0 0 50px rgba(79, 70, 229, 0.1)" 
                  : "none"
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom Spacing */}
      <div className="h-32" />
    </section>
  )
}
