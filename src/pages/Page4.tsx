import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Sparkles, Brain, Zap, Repeat, Bot } from 'lucide-react';

// --- Font Injection ---
const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,600;1,600&family=Instrument+Serif:ital,wght@0,400;1,400&display=swap');
    
    .font-playfair { font-family: 'Playfair Display', serif; }
    .font-inter { font-family: 'Inter', sans-serif; }
    .font-instrument-serif { font-family: 'Instrument Serif', serif; }
    
    .bg-noise {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.07'/%3E%3C/svg%3E");
    }

    /* Animated Gradient Text */
    .text-colorfull {
      background: linear-gradient(to right, #3b82f6, #ec4899, #f97316, #3b82f6); /* Blue, Pink, Orange, Loop back to Blue */
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradient-x 4s linear infinite;
    }

    @keyframes gradient-x {
      to {
        background-position: 200% center;
      }
    }
  `}</style>
);

const steps = [
  {
    id: 1,
    title: "UNDERSTAND YOU",
    icon: <Sparkles className="w-4 h-4" />, // Slightly smaller icon
    description: "Our system ingests your entire professional history, analyzing skills, education, and hidden potential to build a comprehensive, dynamic career profile that evolves as you grow.",
    bullets: ["Ingests resume & portfolio data", "Identifies core strengths", "Maps career trajectory goals"],
    image: "/images/page4-images/UNDERSTAND YOU.webp"
  },
  {
    id: 2,
    title: "THINK & REASON",
    icon: <Brain className="w-4 h-4" />,
    description: "Using advanced agentic reasoning, the AI identifies critical skill gaps between your current profile and your target roles, strategically planning the most efficient bridge to your goals.",
    bullets: ["Gap analysis vs. market data", "Strategic role matching", "Personalized upskilling logic"],
    image: "/images/page4-images/THINK & REASON.webp"
  },
  {
    id: 3,
    title: "ACT AUTOMATICALLY",
    icon: <Zap className="w-4 h-4" />,
    description: "We don't just plan; we act. The system automatically generates structured learning roadmaps, drafts outreach emails, and curates job applications tailored specifically to your new profile.",
    bullets: ["Auto-generates learning paths", "Curates job applications", "Drafts outreach messages"],
    image: "/images/page4-images/ACT AUTOMATICALLY.webp"
  },
  {
    id: 4,
    title: "LEARNS & IMPROVES",
    icon: <Repeat className="w-4 h-4" />,
    description: "The cycle never stops. As you interact and achieve milestones, the intelligence engine refines its understanding of your preferences, continuously optimizing recommendations for long-term success.",
    bullets: ["Feedback loop integration", "Real-time market adaptation", "Long-term success tracking"],
    image: "/images/page4-images/LEARNS & IMPROVES.webp"
  }
];

const StepCard = ({ step, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-15% 0px -15% 0px", once: false });

  return (
    <div 
      ref={ref}
      // Grid Layout: Left column is smaller (25% approx), Right column is wider
      className={`relative grid grid-cols-1 md:grid-cols-[25%_1fr] gap-8 md:gap-16 mb-40 last:mb-0 w-full max-w-7xl mx-auto items-start transition-opacity duration-500 ${isInView ? 'opacity-100' : 'opacity-40'}`}
    >
      {/* Left Side: Main Topic - Using Instrument Serif */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-right flex flex-col items-end px-6 md:px-0 pt-2"
      >
        <span className="text-xs font-inter font-bold tracking-widest text-gray-500 uppercase mb-2">0{step.id}</span>
        <h3 className="font-instrument-serif font-medium text-3xl md:text-5xl text-white leading-tight">
          {step.title}
        </h3>
      </motion.div>

      {/* Right Side: Description with Image */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="px-6 md:px-0 text-left pt-3"
      >
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Left: Text Content */}
          <div className="group transition-colors duration-300 flex-1">
            <div className="flex items-center gap-3 mb-3 text-white">
              <div className="bg-white/10 p-1.5 rounded-full text-white">
                {step.icon}
              </div>
              <h4 className="font-inter font-medium text-base text-white/90">Core Function</h4>
            </div>
            
            {/* Main Description - Font Style from "Bio" Snippet */}
            <p className="font-light text-base text-neutral-300 tracking-wider leading-relaxed mb-5 max-w-2xl font-inter">
              {step.description}
            </p>
            
            <ul className="space-y-2">
              {step.bullets.map((bullet, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-neutral-400 font-inter font-light tracking-wide">
                  <span className="w-1 h-1 bg-neutral-500 rounded-full" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="w-full md:w-80 lg:w-96 flex-shrink-0"
          >
            <img 
              src={step.image} 
              alt={step.title}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default function CareerFlow() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform for the gradient line fill
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden selection:bg-white/20">
      <FontStyles />
      
      {/* Background Texture Only - No Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-noise opacity-[0.05]"></div>

      <div className="relative z-10 py-24 md:py-40" ref={containerRef}>
        
        {/* New Header Section */}
        <div className="text-center mb-32 relative px-4 max-w-4xl mx-auto">
            <h2 className="relative z-2 mb-10 font-medium text-5xl tracking-tight max-sm:px-5 sm:text-5xl md:mb-16 md:text-6xl text-center text-balance md:mt-10 text-white">
              <p className="mb-3 font-mono font-normal text-white/50 text-xs uppercase tracking-widest">
                HOW IT WORKS
              </p>
              <span className="font-instrument-serif block">
                <span className="">Career Intelligence </span>
                <span className="animate-gradient-x pe-2 font-instrument-serif italic tracking-tight text-colorfull">Flow</span>
              </span>
            </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full max-w-7xl mx-auto">
          
          {/* The Vertical Line Track - Shifted Left (approx 25% + gap adjustment) */}
          <div className="absolute left-[8%] md:left-[27%] top-0 bottom-0 w-[4px] bg-gray-800 hidden md:block overflow-visible">
            {/* The Active Filled Line - Solid Gradient (Blue, Pink, Orange) */}
            <motion.div 
              style={{ height: lineHeight }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 via-pink-500 to-orange-500"
            />
            
            {/* The Agent Pointer - Bot Icon */}
            <motion.div 
              style={{ top: lineHeight }}
              className="absolute left-1/2 -translate-x-1/2 -mt-5 z-20"
            >
               <div className="bg-[#080808] p-2 rounded-full border border-gray-700">
                  <Bot className="w-6 h-6 text-white" />
               </div>
            </motion.div>
          </div>

          {/* Steps */}
          <div className="relative z-10 px-4 md:px-0">
            {steps.map((step, index) => (
              <StepCard key={step.id} step={step} index={index} />
            ))}
          </div>

          {/* Footer Button */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mt-40 relative z-20 pl-[27%]"
          >
             <button className="px-10 py-4 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 rounded-full font-inter font-medium text-sm tracking-wide uppercase">
                Initialize System
             </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}