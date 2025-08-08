'use client'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const projects = [
	{
		id: 1,
		title: 'DIGITAL EXPERIENCE PLATFORM',
		year: '2024',
		image:
			'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
		category: 'WEB DEVELOPMENT',
	},
	{
		id: 2,
		title: 'CREATIVE AGENCY WEBSITE',
		year: '2024',
		image:
			'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
		category: 'DESIGN',
	},
	{
		id: 3,
		title: 'MOBILE APP INTERFACE',
		year: '2023',
		image:
			'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
		category: 'MOBILE',
	},
	{
		id: 4,
		title: 'E-COMMERCE PLATFORM',
		year: '2023',
		image:
			'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
		category: 'WEB DEVELOPMENT',
	},
	{
		id: 5,
		title: 'BRAND IDENTITY SYSTEM',
		year: '2023',
		image:
			'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
		category: 'BRANDING',
	},
	{
		id: 6,
		title: 'INTERACTIVE DASHBOARD',
		year: '2022',
		image:
			'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
		category: 'DATA VISUALIZATION',
	},
]

export default function Projects() {
  const [hoveredProject] = useState(null)

  return (
    <section className="w-full bg-neon-primary text-neon-primary">
      {/* Section Header */}
      <div className="container mx-auto px-8 py-16">
        <motion.h2
          className="text-4xl mb-8 text-neon-primary"
          style={{ lineHeight: '1.1' }}
        >
          PROJECTS
        </motion.h2>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto space-y-32 pb-64">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="relative group cursor-pointer"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            <div className="relative w-full h-[70vh] overflow-hidden border border-gray-600">
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${project.image})` }}
                whileHover={{ scale: 1.05 }}
              />
              <div className="absolute bottom-8 left-8 z-10">
                <h3 className="font-clash text-xl text-neon-primary">
                  {project.title}
                </h3>
                <div className="flex gap-4 text-sm text-neon-secondary">
                  <span>{project.year}</span>
                  <span>•</span>
                  <span>{project.category}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}