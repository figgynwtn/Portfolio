'use client';
import { useEffect, useRef } from 'react';

export default function DistortedLogo() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = 300;
    canvas.height = 150;
    
    ctx.font = 'bold 60px "Neue Haas Grotesk", sans-serif';
    ctx.fillStyle = 'white';
    ctx.fillText('HN', 50, 100);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {

      const x = (i / 4) % canvas.width;
      const y = Math.floor((i / 4) / canvas.width);
      const wave = Math.sin(x * 0.05) * 5;
      
      if (Math.random() > 0.7) {

        const j = (y * canvas.width + (x + wave)) * 4;
        if (j < data.length - 4) {
          data[j] = data[i];         // R
          data[j + 1] = data[i + 1]; // G
          data[j + 2] = data[i + 2]; // B
        }
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  }, []);

  return (
    <div className="logo-container">
      <canvas 
        ref={canvasRef} 
        className="distorted-logo"
      />
    </div>
  );
}