'use client'
import { useState, useEffect } from 'react'
import './globals.css'

export default function RootLayout({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-neon-primary">
        {/* Only render effects on client-side to prevent hydration errors */}
        {isMounted && (
          <>
            {/* TV static effect overlay */}
            <div className="tv-effect"></div>
            {/* Primary grain layer */}
            <div className="grain-effect-primary"></div>
            {/* Secondary grain layer */}
            <div className="grain-effect-secondary"></div>
          </>
        )}
        <div className="flex-grow">
          {children}
        </div>
      </body>
    </html>
  );
}