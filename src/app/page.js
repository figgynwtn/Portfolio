'use client';
import Background from '@/components/webgl/Background';
import Hero from '@/components/sections/Hero';

export default function Home() {
  return (
    <main className="relative h-screen overflow-hidden">
      <Background />
      <div className="relative z-10">
        <Hero />
      </div>
    </main>
  );
}