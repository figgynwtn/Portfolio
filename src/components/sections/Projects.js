'use client';
import { useRef } from 'react';

export default function Projects() {
  const projects = [
    {
      title: "NEON NIGHTS",
      description: "Interactive audio-visual experience",
      tags: ["WebGL", "Three.js", "GSAP"]
    },
    {
      title: "FESTIVAL WAVE",
      description: "Music festival visualizer",
      tags: ["WebAudio API", "Canvas", "React"]
    },
    {
      title: "DIGITAL RAIN",
      description: "Generative art installation",
      tags: ["GLSL", "Shader", "p5.js"]
    },
    {
      title: "SYNTH DREAMS",
      description: "Browser-based synthesizer",
      tags: ["Tone.js", "WebMIDI", "UI Design"]
    }
  ];

  return (
    <section className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          FEATURED PROJECTS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group relative bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 overflow-hidden transition-all hover:border-pink-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 bg-black/50 text-cyan-300 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="absolute bottom-4 right-4 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}