import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
export const DynamicBackground = () => {
  return (
    <div className="dynamic-bg fixed inset-0 z-[-1] overflow-hidden bg-black pointer-events-none transition-transform duration-700">
      {/* Scanlines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]" />

      <GlitchFaultBackground />
      
      {/* Red Flicker Overlay */}
      <motion.div 
        animate={{ opacity: [0, 0.05, 0, 0.08, 0] }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() * 2 + 0.5 }}
        className="absolute inset-0 bg-industrial-red pointer-events-none"
      />
      
      {/* Moving Glitch Line */}
      <motion.div 
        animate={{ 
          top: ["-10%", "110%"],
          opacity: [0, 0.4, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "linear",
          repeatDelay: 1
        }}
        className="absolute left-0 w-full h-[1px] bg-industrial-red shadow-[0_0_15px_rgba(255,51,51,0.8)] z-0"
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  );
};

const GlitchFaultBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let time = 0;
    let animationId: number;

    const drawBackground = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Organic noise / floating particles
      for (let i = 0; i < 30; i++) {
        const x = (Math.sin(time * 0.2 + i) * 0.5 + 0.5) * width;
        const y = (Math.cos(time * 0.15 + i * 2) * 0.5 + 0.5) * height;
        const size = Math.random() * 1.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.05 + Math.sin(time + i) * 0.02})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Red line flash effect
      if (Math.random() > 0.75) {
        const lineY = Math.random() * height;
        const lineWidth = Math.random() * 3 + 1;
        const opacity = Math.random() * 0.3;
        
        ctx.strokeStyle = `rgba(255, 51, 51, ${opacity})`;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(0, lineY);
        ctx.lineTo(width, lineY);
        ctx.stroke();

        // Occasional vertical glitch
        if (Math.random() > 0.5) {
          const lineX = Math.random() * width;
          ctx.beginPath();
          ctx.moveTo(lineX, 0);
          ctx.lineTo(lineX, height);
          ctx.stroke();
        }
      }

      time += 0.01;
      animationId = requestAnimationFrame(drawBackground);
    };

    const resizeHandler = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resizeHandler);
    drawBackground();

    return () => {
      window.removeEventListener('resize', resizeHandler);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 opacity-50"
    />
  );
};
