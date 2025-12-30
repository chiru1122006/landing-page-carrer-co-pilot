import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, Search, Map, Award, Briefcase, MessageSquare, Database } from 'lucide-react';

/**
 * Main Application Component
 * * Horizontal Scroll Layout
 * 1. Intro filler section.
 * 2. Pinned Horizontal Track:
 * - Part 1: "Core Features" Text (Left 30-35% of width)
 * - Part 2: Cards sequence
 * 3. Uses GSAP to translate the entire track leftwards.
 */
export default function Page5() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // 1. Dynamic Script & Font Loading
  useEffect(() => {
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve(true);
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
      });
    };

    const loadFont = () => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    };

    loadFont();

    Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js')
    ]).then(() => {
      setAssetsLoaded(true);
    });
  }, []);

  // 2. Initialize GSAP Animation
  useEffect(() => {
    if (!assetsLoaded || !containerRef.current || !trackRef.current) return;

    // @ts-ignore - GSAP is loaded globally via CDN
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;

    gsap.registerPlugin(ScrollTrigger);

    // Function to handle resize and animation setup
    const setupAnimation = () => {
      // Kill old triggers if they exist to prevent conflicts
      ScrollTrigger.getAll().forEach((t: any) => t.kill());

      const track = trackRef.current;
      if (!track) return;

      // The total scrollable width is the track's width minus the viewport
      const totalWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalWidth - viewportWidth;

      // Only animate if content is wider than screen
      if (scrollDistance > 0) {
        gsap.to(track, {
          x: -scrollDistance, // Move entire track left
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true, // Stick the container in place
            start: "top top",
            end: `+=${totalWidth}`, // Scroll duration proportional to width
            scrub: 0.5, // Buttery smooth feel (lower = smoother)
            invalidateOnRefresh: true,
            anticipatePin: 1, // Smooth pin behavior
          }
        });
      }
    };

    setupAnimation();

    // Re-calculate on resize
    window.addEventListener('resize', setupAnimation);
    return () => {
      window.removeEventListener('resize', setupAnimation);
      ScrollTrigger.getAll().forEach((t: any) => t.kill());
    };
  }, [assetsLoaded]);

  // Updated Data for Cards based on User Request
  const cards = [
    { 
      id: 1, 
      title: "Skill Gap Analyzer", 
      desc: "Finds what skills you're missing and prioritizes what to learn.", 
      icon: <Search size={48} className="text-white" />, 
      img: new URL('../images/page5-images/Skill Gap Analyzer.webp', import.meta.url).href
    },
    { 
      id: 2, 
      title: "Personalized Roadmap", 
      desc: "AI creates week-by-week learning plans that adapt when you improve.", 
      icon: <Map size={48} className="text-white" />, 
      img: new URL('../images/page5-images/roadmap.webp', import.meta.url).href
    },
    { 
      id: 3, 
      title: "Career Readiness Score", 
      desc: "Shows how close you are to your target job.", 
      icon: <Award size={48} className="text-white" />, 
      img: new URL('../images/page5-images/rediness.webp', import.meta.url).href
    },
    { 
      id: 4, 
      title: "AI Job Match", 
      desc: "Matches your profile with jobs and explains why you fit or not.", 
      icon: <Briefcase size={48} className="text-white" />, 
      img: new URL('../images/page5-images/AI Job Match.webp', import.meta.url).href
    },
    { 
      id: 5, 
      title: "Feedback Intelligence", 
      desc: "Learns from rejections & interviews and updates your plan.", 
      icon: <MessageSquare size={48} className="text-white" />, 
      img: new URL('../images/page5-images/Feedback Intelligence.webp', import.meta.url).href
    },
    { 
      id: 6, 
      title: "Memory-Based AI", 
      desc: "Remembers your progress and improves continuously.", 
      icon: <Database size={48} className="text-white" />, 
      img: new URL('../images/page5-images/memory.webp', import.meta.url).href
    },
  ];

  if (!assetsLoaded) {
  return <div className="h-screen w-full flex items-center justify-center bg-black text-white">Loading Experience...</div>;
  }

  return (
  <div className="bg-black min-h-screen font-sans text-white selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* 1. Intro / Spacer Section 
          User scrolls past this to trigger the pin 
      */}
  <div className="h-[50vh] flex flex-col items-center justify-center bg-black z-20 relative">
        <p className="text-neutral-500 animate-bounce mt-10">Scroll Down</p>
        <h2 className="text-balance font-medium text-4xl sm:text-5xl md:text-6xl text-white leading-tight mt-8">
          <span className="font-['Instrument_Serif'] block">Always Learning.</span>
          <span className="font-['Instrument_Serif'] italic tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">Always Improving.</span>
        </h2>
      </div>

      {/* 2. MAIN HORIZONTAL SCROLL SECTION 
          This container gets pinned.
      */}
      <div 
        ref={containerRef} 
  className="h-screen w-full bg-black relative overflow-hidden flex items-center"
      >
        {/* The Moving Track 
            Contains Text Block + Cards in one continuous line.
        */}
        <div 
          ref={trackRef}
          className="flex items-center h-full pl-8 md:pl-20 pr-20"
        >
          
          {/* A. THE "CORE FEATURES" TEXT BLOCK 
              Occupies the first ~35% visual space (approx 35vw width)
              Moves left WITH the cards.
          */}
          <div className="w-[85vw] md:w-[35vw] flex-shrink-0 pr-12 md:pr-24 flex flex-col justify-center h-full">
             <div className="relative z-10" style={{ textShadow: "rgba(255, 255, 255, 0.05) 0px 4px 8px, rgba(255, 255, 255, 0.25) 0px 8px 30px" }}>
              <p className="mb-4 font-mono font-normal text-white/60 text-xs uppercase tracking-widest">
                Core Features
              </p>
              <h2 className="text-balance font-medium text-4xl sm:text-5xl md:text-6xl text-white leading-tight">
                <span className="font-['Instrument_Serif'] block">Bridge the gap between your potential and your </span>
                <span className="font-['Instrument_Serif'] italic tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                   career.
                </span>
              </h2>
            </div>
          </div>

          {/* B. THE CARDS 
              Follow immediately after the text block.
          */}
          <div className="flex gap-12 items-center">
            {cards.map((card) => (
              <div 
                key={card.id} 
                className="group relative w-[300px] md:w-[400px] flex-shrink-0 flex flex-col gap-4"
              >
                {/* Header */}
                <div className="flex justify-between items-end pb-2">
                  <h3 className="mb-3 font-bold font-['Instrument_Serif'] text-xl md:text-2xl text-white/95 tracking-wide">
                    {card.title}
                  </h3>
                  <span className="text-4xl font-black opacity-30 font-mono text-neutral-500">0{card.id}</span>
                </div>

                {/* Image (No Borders, Full Color) */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-900 relative rounded-sm">
                   {/* White sheen on hover */}
                   <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500 z-10" />
                   
                   <img 
                    src={card.img} 
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                   />
                   
                   {/* Icon */}
                   <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg text-white">
                      {card.icon}
                   </div>
                </div>

                {/* Description */}
                <div>
                  <p className="mb-6 font-light text-base md:text-lg text-white/70 leading-relaxed">
                    {card.desc}
                  </p>
                  <button className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:gap-4 transition-all text-white">
                    Read Specs <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
