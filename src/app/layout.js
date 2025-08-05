'use client'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-neon-primary">
        <div className="flex-grow">
          {children}
        </div>
      </body>
    </html>
  );
}