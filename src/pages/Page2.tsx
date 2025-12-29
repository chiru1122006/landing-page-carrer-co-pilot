/**
 * Custom Star Icon Component used in the marquee dividers
 */
const StarIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 1C12 1 12 8 10 10C8 12 1 12 1 12C1 12 8 12 10 14C12 16 12 23 12 23C12 23 12 16 14 14C16 12 23 12 23 12C23 12 16 12 14 10C12 8 12 1 12 1Z" 
      fill="#fffff5"
    />
  </svg>
);

/**
 * Data for the marquee items
 */
const ITEMS = [
  { text: "AI Career Planning", isGradient: false },
  { text: "Adaptive Feedback Loop", isGradient: false },
  { text: "Agent-Based System", isGradient: false },
  { text: "Career Intelligence Engine", isGradient: false },
  { text: "Skill Gap Analyzer", isGradient: false },
  { text: "Smart Roadmapping", isGradient: false },
  { text: "Goal-Oriented Agents", isGradient: false },
  { text: "Market-Aware Insights", isGradient: false },
  { text: "Continuous Learning AI", isGradient: false },
  { text: "Autonomous Decision Engine", isGradient: false },
];

/**
 * Individual Item Component
 */
const MarqueeItem = ({ text, isGradient }: { text: string; isGradient: boolean }) => (
  <div className="inline-flex items-center gap-2">
    <span 
      className={`
        whitespace-nowrap font-instrument-serif font-semibold 
        text-base uppercase leading-5 tracking-wide md:text-lg lg:text-xl
        ${isGradient 
          ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300" 
          : "text-[#fffff5]"
        }
      `}
    >
      {text}
    </span>
    <StarIcon className="h-4 w-4 md:h-5 md:w-5" />
  </div>
);

export default function Page2() {
  return (
    // Changed min-h-screen to w-full and removed flex vertical centering to "compress" the page
    <div className="bg-[#050505] w-full overflow-hidden font-sans">
      {/* Injecting styles and fonts specifically for this component */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
        
        .font-instrument-serif {
          font-family: "Instrument Serif", serif;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% - var(--gap)));
          }
        }

        .animate-marquee {
          animation: marquee var(--duration) linear infinite;
        }
      `}</style>

      {/* Minimal vertical spacing - only enough for the rotated ribbon */}
      <section className="relative w-full py-11 overflow-hidden flex justify-center">
        
        {/* Scaling wrapper to be wider than viewport */}
        <div className="relative w-[120%] -ml-[10%]">
          
          {/* Background Decorative Strip (Rotated +6deg) */}
          <div className="absolute inset-0 z-0 h-8 w-full -translate-x-5 translate-y-2 rotate-6 bg-gradient-to-r from-[#6799fe] to-[#0a255b] opacity-60 md:h-10 md:rotate-3 lg:translate-y-3 pointer-events-none"></div>

          {/* Foreground Active Strip (Rotated -2deg) */}
          <div className="relative z-10 -rotate-2 flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#6799fe] to-[#0255fb] py-1.5 shadow-xl lg:py-2">
            
            {/* Marquee Container */}
            <div 
              className="group flex w-full overflow-hidden p-1.5 flex-row"
              style={{
                '--duration': '35s',
                '--gap': '1.5rem',
                gap: 'var(--gap)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
              } as React.CSSProperties}
            >
              
              {/* First Marquee Set */}
              <div 
                className="flex shrink-0 justify-around flex-row min-w-full animate-marquee"
                style={{ gap: 'var(--gap)' }}
              >
                {ITEMS.map((item, index) => (
                  <MarqueeItem key={`list1-${index}`} {...item} />
                ))}
              </div>

              {/* Duplicated Set (For Seamless Looping) */}
              <div 
                className="flex shrink-0 justify-around flex-row min-w-full animate-marquee"
                style={{ gap: 'var(--gap)' }}
                aria-hidden="true"
              >
                {ITEMS.map((item, index) => (
                  <MarqueeItem key={`list2-${index}`} {...item} />
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}