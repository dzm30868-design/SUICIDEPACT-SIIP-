import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import React, { useRef, useState, useEffect } from "react";
import { 
  Zap, 
  Play, 
  Users, 
  Info, 
  ChevronRight, 
  Instagram, 
  Twitter, 
  Music, 
  Volume2,
  VolumeX,
  X
} from "lucide-react";
import { DynamicBackground } from "./components/DynamicBackground";
import { siteData } from "./siteData";

// --- Types ---
interface Poster {
  id: number;
  title: string;
  date: string;
  image: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-6 md:py-10 flex justify-between items-center mix-blend-difference">
      <div className="text-xl font-mono tracking-tighter uppercase select-none cursor-pointer group">
        <span className="inline-block group-hover:text-industrial-red transition-colors duration-500">
          {siteData.brand.name}
        </span>
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-10 font-mono text-[9px] tracking-[0.4em] uppercase">
        {siteData.nav.map((item, idx) => (
          <a key={idx} href={item.href} className="text-white/60 hover:text-white transition-all duration-500 relative group">
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full" />
          </a>
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden text-white p-2 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <div className="space-y-1.5">
          <div className="w-6 h-px bg-white" />
          <div className="w-4 h-px bg-white ml-auto" />
        </div>}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-12"
          >
            {siteData.nav.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-black uppercase tracking-tighter hover:text-industrial-red transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden bg-black pointer-events-none">
        {/* Scanlines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]" />
        
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
          className="absolute left-0 w-full h-[1px] bg-industrial-red shadow-[0_0_15px_rgba(255,51,51,0.8)] pointer-events-none"
        />

        {/* Subtle Vignette & Grain for premium feel */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.15] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] mix-blend-overlay pointer-events-none" />
      </div>
      {children}
    </>
  );
};

const HoverGlitchTitle = ({ text, className }: { text: string, className?: string }) => {
  return (
    <motion.div 
      className="relative inline-block group cursor-crosshair pointer-events-auto"
      whileHover="hover"
      whileTap="hover"
    >
      {/* Base Text */}
      <motion.h1 
        variants={{
          hover: { skewX: [-2, 2, -1, 1, 0], x: [-2, 2, -1, 1, 0] }
        }}
        transition={{ duration: 0.1, repeat: Infinity }}
        className={`text-white mix-blend-difference ${className}`}
      >
        {text}
      </motion.h1>
      
      {/* Red Glitch Layer */}
      <motion.h1 
        variants={{
          hover: { 
            opacity: [0, 1, 0.8, 1, 0], 
            x: [-5, 5, -3, 3, 0], 
            y: [2, -2, 1, -1, 0], 
            skewX: [5, -5, 2, -2, 0],
            clipPath: ['inset(10% 0 60% 0)', 'inset(30% 0 40% 0)', 'inset(60% 0 10% 0)', 'inset(20% 0 50% 0)', 'inset(0% 0 0% 0)']
          }
        }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.15, repeat: Infinity, repeatType: "mirror" }}
        className={`absolute top-0 left-0 text-industrial-red mix-blend-screen pointer-events-none ${className}`}
        aria-hidden="true"
      >
        {text}
      </motion.h1>
    </motion.div>
  );
};

const MouseParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, isActive: false });
  const particles = useRef<any[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    // Initialize particles
    const particleCount = 80;
    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        offsetX: (Math.random() - 0.5) * 300,
        offsetY: (Math.random() - 0.5) * 300,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 1.5 + 0.5,
        lerpFactor: Math.random() * 0.04 + 0.01,
        color: Math.random() > 0.8 ? '#ff3333' : '#ffffff',
        alpha: 0,
      });
    }

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e) {
        mouse.current.x = e.touches[0].clientX;
        mouse.current.y = e.touches[0].clientY;
      } else {
        mouse.current.x = e.clientX;
        mouse.current.y = e.clientY;
      }
      mouse.current.isActive = true;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        mouse.current.isActive = false;
      }, 500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleMouseMove, { passive: true });

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.current.forEach(p => {
        if (mouse.current.isActive) {
          const targetX = mouse.current.x + p.offsetX;
          const targetY = mouse.current.y + p.offsetY;
          p.x += (targetX - p.x) * p.lerpFactor;
          p.y += (targetY - p.y) * p.lerpFactor;
          p.alpha += (Math.random() * 0.5 + 0.5 - p.alpha) * 0.1;
        } else {
          p.x += p.vx + Math.sin(Date.now() * 0.001 * p.lerpFactor * 10) * 0.5;
          p.y += p.vy + Math.cos(Date.now() * 0.001 * p.lerpFactor * 10) * 0.5;
          p.alpha += (0 - p.alpha) * 0.02;
        }

        if (p.alpha > 0.01) {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 15;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchstart', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-20" />;
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Aggressive scroll parallax
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]); // Subtle zoom-out effect

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <MouseParticles />
      <HeroBackground>
        <motion.div 
          style={{ y, opacity, scale }} 
          className="absolute inset-0 w-full h-full z-10 pointer-events-none flex flex-col justify-center items-center"
        >
          <div className="relative w-full flex flex-col items-center justify-center">
            {/* Word 1 - Neat and centered */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full text-center"
            >
              <HoverGlitchTitle 
                text={siteData.hero.title[0]} 
                className="text-[22vw] md:text-[18vw] font-black uppercase leading-[0.85] tracking-tighter" 
              />
            </motion.div>
            
            {/* Word 2 - Neat and centered */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="w-full text-center"
            >
              <HoverGlitchTitle 
                text={siteData.hero.title[1]} 
                className="text-[22vw] md:text-[18vw] font-black uppercase leading-[0.85] tracking-tighter" 
              />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
        >
          <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-white font-bold">
            Scroll
          </span>
          <div className="h-16 w-[2px] bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-full h-full bg-industrial-red"
            />
          </div>
        </motion.div>
      </HeroBackground>
    </section>
  );
};

const TeamIntro = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section id="team-intro" ref={ref} className="py-32 md:py-64 px-6 md:px-10 max-w-7xl mx-auto relative overflow-hidden">
      <motion.div 
        style={{ opacity }}
        className="grid md:grid-cols-2 gap-16 md:gap-24 items-start relative z-10"
      >
        <div className="space-y-8 md:space-y-12">
          <div className="flex items-center gap-6 text-industrial-red overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              whileInView={{ x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-12 h-px bg-current" 
            />
            <motion.span 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-mono text-[9px] tracking-[0.5em] uppercase"
            >
              {siteData.teamIntro.label}
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              whileHover={{ 
                x: 20,
                color: "#ff3333",
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-[12vw] md:text-[8vw] font-black leading-[0.85] uppercase tracking-tighter cursor-default transition-colors duration-500"
            >
              {siteData.teamIntro.title[0]}<br />
              <span className="text-industrial-red/50 group-hover:text-industrial-red transition-colors duration-500">{siteData.teamIntro.title[1]}</span>
            </motion.h2>
          </div>
        </div>
        <div className="space-y-10 font-mono text-[11px] leading-loose text-metal-silver/30 border-l border-metal-silver/5 pl-8 md:pl-12 max-w-md">
          {siteData.teamIntro.paragraphs.map((p, idx) => (
            <motion.p 
              key={idx} 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ 
                x: 10, 
                color: "#ffffff",
                filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))"
              }}
              transition={{ 
                duration: 1, 
                delay: 0.3 + idx * 0.1,
                whileHover: { duration: 0.4, ease: "easeOut" }
              }}
              className="cursor-default transition-colors duration-700"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const PosterCard = ({ poster, onClick }: { poster: Poster; onClick: () => void; key?: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div 
      ref={ref}
      layoutId={`poster-container-${poster.id}`}
      whileHover={{ scale: 0.985 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative aspect-[2/3] group cursor-pointer overflow-hidden bg-black border border-white/5"
      onClick={onClick}
    >
      <div className="relative w-full h-full overflow-hidden">
        <motion.img 
          style={{ y, scale: 1.2 }}
          layoutId={`poster-image-${poster.id}`}
          src={poster.image} 
          alt={poster.title}
          className="absolute inset-0 w-full h-full object-cover md:grayscale md:brightness-[0.4] brightness-75 md:group-hover:grayscale-0 md:group-hover:brightness-100 transition-all duration-[1.5s] ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-white/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      </div>
      <div className="absolute inset-0 p-10 flex flex-col justify-end">
        <div className="overflow-hidden">
          <motion.h3 
            layoutId={`poster-title-${poster.id}`}
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl font-black leading-none uppercase tracking-tighter"
          >
            {poster.title}
          </motion.h3>
        </div>
        <div className="overflow-hidden mt-2">
          <motion.p 
            layoutId={`poster-date-${poster.id}`}
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            whileHover={{ 
              color: "#ffffff",
              textShadow: [
                "0 0 0px rgba(255,255,255,0)",
                "0 0 10px rgba(255,255,255,0.8)",
                "0 0 0px rgba(255,255,255,0)"
              ]
            }}
            transition={{ 
              duration: 1, 
              ease: [0.16, 1, 0.3, 1], 
              delay: 0.1,
              whileHover: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="font-mono text-[9px] text-white/40 uppercase tracking-[0.3em]"
          >
            {poster.date}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPoster(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPoster) return;
    const currentIndex = siteData.gallery.posters.findIndex(p => p.id === selectedPoster.id);
    const nextIndex = (currentIndex + 1) % siteData.gallery.posters.length;
    setSelectedPoster(siteData.gallery.posters[nextIndex]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPoster) return;
    const currentIndex = siteData.gallery.posters.findIndex(p => p.id === selectedPoster.id);
    const prevIndex = (currentIndex - 1 + siteData.gallery.posters.length) % siteData.gallery.posters.length;
    setSelectedPoster(siteData.gallery.posters[prevIndex]);
  };

  const visiblePosters = showAll ? siteData.gallery.posters : siteData.gallery.posters.slice(0, 4);

  return (
    <section id="gallery" className="py-32 md:py-64 bg-black relative z-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <div className="px-6 md:px-10 mb-20 md:mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 group/gallery">
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              whileHover={{ 
                skewY: -2,
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] md:text-[8vw] font-black leading-none uppercase tracking-tighter cursor-default"
            >
              {siteData.gallery.title}
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.span 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-mono text-[9px] opacity-20 tracking-[0.5em] uppercase"
            >
              {showAll ? "往期活动_FULL_ARCHIVE" : siteData.gallery.subtitle}
            </motion.span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          <AnimatePresence mode="popLayout">
            {visiblePosters.map((poster) => (
              <motion.div
                key={poster.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <PosterCard 
                  poster={poster} 
                  onClick={() => setSelectedPoster(poster)} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!showAll && siteData.gallery.posters.length > 4 && (
          <div className="mt-20 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(true)}
              className="group relative px-12 py-4 overflow-hidden border border-white/10 hover:border-industrial-red transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-industrial-red translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 font-mono text-[10px] tracking-[0.4em] uppercase group-hover:text-white transition-colors duration-500">
                EXPAND_ARCHIVE [+]
              </span>
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPoster && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6 md:p-20 backdrop-blur-2xl"
            onClick={() => setSelectedPoster(null)}
          >
            <button 
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 group/close z-[110]"
              onClick={() => setSelectedPoster(null)}
            >
              <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.4em] group-hover/close:text-industrial-red transition-colors duration-500">
                Close_Archive
              </span>
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 border border-white/10 rounded-full group-hover/close:border-industrial-red/50 group-hover/close:rotate-180 transition-all duration-700" />
                <X size={20} className="text-white/40 group-hover/close:text-industrial-red transition-colors duration-500" />
              </div>
            </button>

            {/* Navigation Buttons */}
            <button 
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-industrial-red transition-colors z-[110] group"
              onClick={handlePrev}
            >
              <ChevronRight size={48} className="rotate-180 group-hover:-translate-x-2 transition-transform" />
            </button>
            <button 
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-industrial-red transition-colors z-[110] group"
              onClick={handleNext}
            >
              <ChevronRight size={48} className="group-hover:translate-x-2 transition-transform" />
            </button>

            <motion.div 
              layoutId={`poster-container-${selectedPoster.id}`}
              className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center relative max-h-[90vh] overflow-y-auto scrollbar-hide p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[2/3] brutal-border overflow-hidden group/img">
                <motion.img 
                  layoutId={`poster-image-${selectedPoster.id}`}
                  src={selectedPoster.image} 
                  alt={selectedPoster.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-industrial-red/5 mix-blend-overlay" />
              </div>
              
              <div className="flex flex-col justify-center space-y-12">
                <div className="space-y-6">
                  <motion.p 
                    layoutId={`poster-date-${selectedPoster.id}`}
                    className="font-mono text-industrial-red text-xs tracking-[0.4em] uppercase"
                  >
                    {selectedPoster.date}
                  </motion.p>
                  <motion.h2 
                    layoutId={`poster-title-${selectedPoster.id}`}
                    className="text-4xl md:text-6xl font-black leading-[0.9] uppercase tracking-tighter"
                  >
                    {selectedPoster.title}
                  </motion.h2>
                </div>

                <div className="w-20 h-px bg-white/10" />

                {siteData.gallery.lightbox.description && (
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-mono text-[10px] leading-loose text-white/40 max-w-sm"
                  >
                    {siteData.gallery.lightbox.description}
                  </motion.p>
                )}

                <div className="pt-12 flex items-center gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.2em]">Archive_ID</span>
                    <span className="font-mono text-[10px] text-white/60">SP_2025_{selectedPoster.id.toString().padStart(3, '0')}</span>
                  </div>
                  <div className="w-px h-8 bg-white/5" />
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.2em]">Format</span>
                    <span className="font-mono text-[10px] text-white/60">Digital_Print_Archive</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPlaying(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const p = (video.currentTime / video.duration) * 100;
      setProgress(p);
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, [isPlaying]);

  const togglePlay = () => {
    if (siteData.video.videoUrl) {
      setIsLoading(true);
      setIsPlaying(true);
    } else {
      console.log("Please provide a valid video URL in siteData.ts");
    }
  };

  const handleClose = () => {
    setIsPlaying(false);
    setIsLoading(false);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const isEmbed = siteData.video.videoUrl.includes("embed") || 
                  siteData.video.videoUrl.includes("youtube.com") || 
                  siteData.video.videoUrl.includes("vimeo.com") ||
                  siteData.video.videoUrl.includes("screenapp.io");

  return (
    <section id="video" className="relative h-screen flex items-center justify-center overflow-hidden group z-10 bg-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 z-0"
      >
        {/* Background / Video Player */}
        <div className="absolute inset-0 z-0">
        {isPlaying && siteData.video.videoUrl ? (
          <>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/50 backdrop-blur-sm">
                <div className="w-12 h-12 border-4 border-white/20 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {isEmbed ? (
              <div className="relative w-full h-full">
                <iframe 
                  src={`${siteData.video.videoUrl}${siteData.video.videoUrl.includes('?') ? '&' : '?'}autoplay=1&controls=1`}
                  className="w-full h-full border-0"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                  loading="lazy"
                  onLoad={() => setIsLoading(false)}
                />
                <button 
                  onClick={handleClose}
                  className="absolute top-10 right-10 z-20 flex items-center gap-4 group/close"
                >
                  <span className="font-mono text-[8px] text-white/40 uppercase tracking-[0.4em] group-hover/close:text-industrial-red transition-colors">EXIT_STREAM</span>
                  <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover/close:border-industrial-red transition-colors">
                    <X size={16} className="group-hover/close:text-industrial-red" />
                  </div>
                </button>
              </div>
            ) : (
              <div className="relative w-full h-full group/player">
                <video 
                  ref={videoRef}
                  src={siteData.video.videoUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  preload="auto"
                  onCanPlay={() => setIsLoading(false)}
                  onEnded={() => setIsPlaying(false)}
                />
                
                {/* Custom Industrial Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/player:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 space-y-6 opacity-0 group-hover/player:opacity-100 transition-all duration-500 translate-y-4 group-hover/player:translate-y-0 pointer-events-auto">
                  <div className="flex items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                      <button 
                        onClick={handleClose}
                        className="font-mono text-[9px] text-industrial-red tracking-[0.3em] uppercase hover:text-white transition-colors"
                      >
                        [ STOP_SIGNAL ]
                      </button>
                      <div className="w-px h-4 bg-white/10" />
                      <button 
                        onClick={toggleMute}
                        className="text-white/40 hover:text-white transition-colors"
                      >
                        {isMuted ? <Volume2 size={16} className="opacity-20" /> : <Volume2 size={16} />}
                      </button>
                    </div>
                    
                    <div className="flex-1 h-px bg-white/5 relative overflow-hidden">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-industrial-red"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    
                    <div className="font-mono text-[8px] text-white/20 tracking-[0.2em] uppercase">
                      SYSTEM_SYNC: {Math.floor(progress)}%
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <img 
              src={siteData.video.placeholderImage} 
              className="w-full h-full object-cover opacity-20 grayscale scale-110 group-hover:scale-100 transition-transform duration-[2s] ease-out"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
          </>
        )}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none"
      >
        {!isPlaying && (
          <div className="text-center space-y-10 md:space-y-16 pointer-events-auto px-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="w-24 h-24 md:w-40 md:h-40 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-700 group/play"
            >
              <Play size={32} fill="currentColor" className="md:w-10 md:h-10 group-hover/play:scale-110 transition-transform duration-500" />
            </motion.button>
            <div className="space-y-4 md:space-y-6">
              <div className="overflow-hidden">
                <motion.h2 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  whileHover={{ 
                    letterSpacing: "0.2em",
                    transition: { duration: 0.4 }
                  }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[10vw] md:text-[6vw] font-black tracking-tighter uppercase leading-none cursor-default transition-all duration-500"
                >
                  {siteData.video.title}
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.p 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="font-mono text-[8px] md:text-[9px] opacity-20 uppercase tracking-[0.5em]"
                >
                  {siteData.video.subtitle}
                </motion.p>
              </div>
            </div>
          </div>
        )}

        {!isPlaying && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 font-mono text-[8px] opacity-20 uppercase tracking-[0.2em]">
            <Volume2 size={10} />
            <span>{siteData.video.audioTip}</span>
          </div>
        )}
      </motion.div>
      
      {isPlaying && (
        <button 
          onClick={() => setIsPlaying(false)}
          className="absolute top-10 right-10 flex items-center gap-4 group/close z-[110]"
        >
          <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.4em] group-hover/close:text-industrial-red transition-colors duration-500">
            Exit_Playback
          </span>
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 border border-white/10 rounded-full group-hover/close:border-industrial-red/50 group-hover/close:rotate-180 transition-all duration-700" />
            <X size={20} className="text-white/40 group-hover/close:text-industrial-red transition-colors duration-500" />
          </div>
        </button>
      )}
    </section>
  );
};

const MemberCard = ({ member, onClick }: { member: TeamMember; onClick: () => void; key?: number }) => {
  return (
    <motion.div 
      whileHover={{ y: -15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group/card cursor-pointer perspective-1000"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] mb-10 transition-transform duration-1000 transform-style-3d group-hover/card:rotate-y-180">
        
        {/* Front of Card */}
        <div className="absolute inset-0 backface-hidden metallic-card">
          <img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Front text overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-2xl font-black uppercase tracking-tighter leading-none text-white drop-shadow-md">
              {member.name}
            </h3>
          </div>
        </div>

        {/* Back of Card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 metallic-card flex flex-col items-center justify-center p-6 text-center">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <h3 className="text-3xl font-black uppercase tracking-tighter leading-none text-metal-silver drop-shadow-lg">
              {member.name}
            </h3>
            <p className="text-industrial-red font-mono text-xs uppercase tracking-[0.3em]">
              {member.role}
            </p>
            <div className="w-12 h-px bg-white/20 mx-auto my-6" />
            <p className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
              Click to view profile
            </p>
          </div>
        </div>

      </div>
      
      <div className="space-y-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
        <div className="overflow-hidden">
          <h3 className="text-2xl font-black uppercase tracking-tighter leading-none text-industrial-red">
            {member.name}
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-px bg-white/20" />
          <p className="font-mono text-[10px] text-white/40 uppercase tracking-[0.2em]">
            {member.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedMember(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="team" className="py-32 md:py-64 px-6 md:px-10 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="mb-20 md:mb-32">
          <div className="flex items-center gap-6 text-industrial-red mb-8 overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              whileInView={{ x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-12 h-px bg-current" 
            />
            <motion.span 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-mono text-[9px] tracking-[0.5em] uppercase"
            >
              {siteData.team.label}
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              whileHover={{ 
                x: [0, -5, 5, -5, 5, 0],
                transition: { duration: 0.3 }
              }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-[12vw] md:text-[8vw] font-black leading-none uppercase tracking-tighter cursor-default"
            >
              {siteData.team.title}
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          {siteData.team.members.map((member) => (
            <MemberCard key={member.id} member={member} onClick={() => setSelectedMember(member)} />
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedMember && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-20 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl w-full bg-industrial-black border border-white/10 p-8 md:p-16 relative overflow-y-auto max-h-[90vh] group/modal scrollbar-hide"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Industrial background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-industrial-red/5 -mr-16 -mt-16 rotate-45 pointer-events-none" />
              
              <button 
                className="absolute top-8 right-8 flex items-center gap-4 group/close z-10"
                onClick={() => setSelectedMember(null)}
              >
                <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.4em] group-hover/close:text-industrial-red transition-colors duration-500">
                  Close_Profile
                </span>
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className="absolute inset-0 border border-white/10 rounded-full group-hover/close:border-industrial-red/50 group-hover/close:rotate-180 transition-all duration-700" />
                  <X size={16} className="text-white/40 group-hover/close:text-industrial-red transition-colors duration-500" />
                </div>
              </button>

              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="relative aspect-[3/4] border border-white/5">
                  <img 
                    src={selectedMember.image} 
                    alt={selectedMember.name}
                    className="w-full h-full object-cover grayscale"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-industrial-red/10 mix-blend-overlay" />
                </div>
                
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">
                      {selectedMember.name}
                    </h2>
                    <p className="font-mono text-industrial-red text-xs uppercase tracking-[0.4em]">
                      {selectedMember.role}
                    </p>
                  </div>
                  
                  <div className="w-12 h-px bg-white/10" />
                  
                  <div className="space-y-6">
                    <p className="font-mono text-xs leading-loose text-white/60 whitespace-pre-wrap">
                      {selectedMember.bio}
                    </p>
                  </div>
                  
                  <div className="pt-8 flex items-center gap-4 text-[8px] font-mono text-white/20 uppercase tracking-[0.3em]">
                    <div className="w-2 h-2 bg-industrial-red animate-pulse" />
                    <span>STATUS: ACTIVE_MEMBER</span>
                    <span className="ml-auto">ID: {selectedMember.id.toString().padStart(3, '0')}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const FinalVisual = () => (
  <section className="py-64 px-10 relative z-10 overflow-hidden">
    <div className="max-w-7xl mx-auto flex justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative border-2 border-white/5 overflow-hidden group transition-all duration-700 hover:border-white"
      >
        <img 
          src={siteData.finalVisual.image} 
          alt="Final Visual"
          className="max-w-full h-auto grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[2s] ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 pointer-events-none" />
        
        {/* Decorative elements */}
        <div className="absolute bottom-6 left-6 flex items-center gap-4 text-[8px] font-mono text-white/30 uppercase tracking-[0.4em]">
          <div className="w-1 h-1 bg-industrial-red animate-pulse" />
          <span>VISUAL_ARCHIVE_REF: 0047F</span>
        </div>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 md:py-32 border-t border-white/5 px-6 md:px-10 relative z-10">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-20">
      <div className="space-y-10">
        <div className="overflow-hidden">
          <motion.h2 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15vw] md:text-[10vw] font-black leading-[0.75] uppercase tracking-tighter select-none opacity-5"
          >
            {siteData.brand.name}
          </motion.h2>
        </div>
      </div>
      
      <div className="flex flex-col items-start md:items-end gap-6 md:gap-10">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-mono text-[8px] opacity-10 tracking-[0.3em] uppercase"
        >
          {siteData.brand.copyright}
        </motion.p>
      </div>
    </div>
  </footer>
);

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <audio 
        ref={audioRef} 
        src={siteData.audio.bgm} 
        loop 
      />
      <button 
        onClick={togglePlay}
        className="w-12 h-12 bg-industrial-black/80 border border-white/20 rounded-full flex items-center justify-center text-white hover:text-industrial-red hover:border-industrial-red transition-all duration-300 backdrop-blur-md group"
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          <span className="font-mono text-[10px] tracking-widest uppercase bg-black/80 px-3 py-1.5 border border-white/10">
            {isPlaying ? 'PAUSE_AUDIO' : 'PLAY_AUDIO'}
          </span>
        </div>
      </button>
    </div>
  );
};

export default function App() {
  return (
    <div className="relative min-h-screen">
      <DynamicBackground />
      <Navbar />
      <Hero />
      <TeamIntro />
      <Gallery />
      <VideoShowcase />
      <Team />
      <FinalVisual />
      <Footer />
      <AudioPlayer />
      
      {/* Global Noise Overlay */}
      <div className="fixed inset-0 noise-bg pointer-events-none z-[99]" />
    </div>
  );
}

