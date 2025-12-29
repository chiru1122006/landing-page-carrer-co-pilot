import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * MagneticButton Component
 * Wraps any content to give it a "magnetic" attraction to the mouse cursor.
 * Uses native mouse events and requestAnimationFrame for smooth physics without
 * heavy libraries like GSAP.
 */
const MagneticButton = ({ 
  children, 
  className = "", 
  strength = 0.5, 
  activeScale = 0.95,
  hoverScale = 1.05
}) => {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Handle mouse movement for magnetic effect
  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    
    // Calculate distance from center
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const x = (clientX - centerX) * strength;
    const y = (clientY - centerY) * strength;
    
    setPosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 }); // Snap back
  };

  return (
    <div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${isHovered ? hoverScale : 1})`,
      }}
    >
      {/* This inner container handles the click 'press' effect 
        separately from the magnetic movement 
      */}
      <div className="active:scale-95 transition-transform duration-100">
        {children}
      </div>
    </div>
  );
};

/**
 * Main Call to Action Component
 */
export default function Page9() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden flex flex-col items-center justify-center font-sans selection:bg-pink-500 selection:text-white">
      
      {/* --- Background Effects --- */}
      
      {/* 1. Subtle Radial Glow (Center) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* 2. Secondary Ambient Glows (Pink/Orange hints) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-900/5 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-900/5 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* 3. Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* --- Main Content --- */}
      <div className="relative z-10 max-w-4xl px-6 text-center flex flex-col items-center">
        
        {/* Top Label (Replaces Badge) */}
        <p className={`mb-4 font-mono font-normal text-white/50 text-xs uppercase tracking-widest transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          System Online
        </p>

        {/* Main Heading with Instrument Serif & Gradient */}
        <h2 
          className={`relative z-10 mb-10 font-medium text-5xl sm:text-6xl md:text-7xl tracking-tight text-center text-balance text-white transition-all duration-1000 delay-100 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          style={{ fontFamily: '"Instrument Serif", serif', lineHeight: '1.1' }}
        >
          <span className="">Start Your Career Journey </span>
          <span className="animate-gradient-x inline-block italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#EC4899] to-[#F59E0B] pb-1 pr-2">
            Today
          </span>
        </h2>

        {/* Subtext */}
        <p 
          className={`text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-300 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          Take control with an intelligent system that observes, reasons, plans, acts, and learns with you.
        </p>

        {/* --- Button Group --- */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-1000 delay-500 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          
          {/* PRIMARY BUTTON: "Start Now" */}
          <MagneticButton strength={0.4} hoverScale={1.05}>
            <button className="group relative inline-flex items-center justify-center">
              {/* Gradient Border Glow Container */}
              <div className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-[#60A5FA] via-[#EC4899] to-[#F59E0B] opacity-75 blur-sm transition duration-500 group-hover:opacity-100 group-hover:blur-md" />
              
              {/* Main Button Surface */}
              <div className="relative flex items-center gap-2 px-8 py-4 bg-black rounded-full leading-none border border-white/10 ring-1 ring-white/20 transition duration-300 group-hover:bg-gray-900/90">
                <span className="font-semibold text-white tracking-wide">Start Now</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
                
                {/* Inner Shine Effect */}
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 group-hover:ring-white/30 transition-all duration-500" />
                
                {/* Subtle sheen animation */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                </div>
              </div>
            </button>
          </MagneticButton>

          {/* SECONDARY BUTTON: "Explore Features" */}
          <MagneticButton strength={0.2} hoverScale={1.02}>
            <button className="group relative px-8 py-4 rounded-full overflow-hidden bg-transparent border border-white/10 transition-colors duration-300 hover:border-white/30 hover:bg-white/5">
              <span className="relative flex items-center gap-2 text-gray-300 font-medium group-hover:text-white transition-colors">
                <Sparkles className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-pink-400" />
                Explore Features
              </span>
            </button>
          </MagneticButton>

        </div>
      </div>

      {/* --- Footer Decorative Elements --- */}
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Grid lines (Very subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <style>{`
        /* Import Instrument Serif from Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }

        /* Animated Gradient for Text */
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 4s linear infinite;
        }

        @keyframes gradient-x {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}