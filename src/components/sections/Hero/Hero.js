'use client'
import ModelViewer from './ModelViewer'  // Note PascalCase import

export default function Hero() {
  return (
    <div className="relative h-screen w-full">
      <ModelViewer modelPath="/models/star.glb" />
      
      <div className="absolute inset-0 flex items-center justify-center text-white pointer-events-none">
      </div>
    </div>
  )
}