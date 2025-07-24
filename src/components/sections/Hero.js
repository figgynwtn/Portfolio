'use client';

export default function Hero() {
  return (
    <div className="relative z-10 min-h-screen flex flex-col justify-center px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500">
          HANNAH NEWTON
        </h1>
        
        <div className="text-xl md:text-2xl text-gray-300 mb-12">
          <p>CREATIVE DEVELOPER & VISUAL ARTIST</p>
          <p className="mt-4">SPECIALIZING IN IMMERSIVE WEB EXPERIENCES</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium hover:scale-105 transition-transform">
            VIEW WORK
          </button>
          <button className="px-6 py-3 border border-pink-500 rounded-full text-pink-300 font-medium hover:bg-pink-500 hover:text-white transition-colors">
            CONTACT ME
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-8 text-gray-400 text-sm max-w-xs">
        Drag, click or move your mouse to interact with the festival bubbles.
        The effect will reset after 20 seconds of inactivity.
      </div>
    </div>
  );
}