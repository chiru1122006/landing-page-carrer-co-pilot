import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4 md:p-10 relative overflow-hidden">
      
      {/* Injecting the necessary styles and fonts to support the custom classes 
        found in the original HTML (animate-gradient-x, font-instrument-serif, etc.)
      */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

        .font-instrument-serif {
          font-family: 'Instrument Serif', serif;
        }


        /* Updated 'text-colorfull' gradient: light blue, pink, orange */
        .text-colorfull {
          background: linear-gradient(to right, #7dd3fc 0%, #f472b6 50%, #fb923c 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Simulating the gradient animation */
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .text-shadow-custom {
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.15);
        }
      `}</style>

      {/* Main Content Container */}
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 relative z-10">
        
        {/* Left Side - Text Content */}
        <div className="flex-1 max-w-full lg:max-w-[55%] relative z-10">
          <h2 className="relative z-2 mb-10 font-medium text-5xl tracking-tight max-sm:px-5 sm:text-5xl md:mb-16 md:text-6xl text-center lg:text-left text-balance md:mt-10 text-shadow-custom text-white">
          <p className="mb-3 font-mono font-normal text-white/50 text-xs uppercase tracking-widest">
            THE NEW STANDARD
          </p>
          <span className="font-instrument-serif">
            <span className="">Not a Chatbot. </span>
            <span className="animate-gradient-x pe-2 font-instrument-serif italic tracking-tight text-colorfull">
              A Thinking Agent.
            </span>
          </span>
        </h2>
        
        <div className="relative z-5 mx-auto flex max-w-xl flex-col gap-y-8 text-center font-light text-base text-neutral-300 tracking-wider lg:mx-0 lg:max-w-[550px] lg:text-left lg:text-lg">
          <p>
            Our system uses multiple AI agents that go beyond simple responses. They observe your profile, reason about your specific goals, and meticulously plan the next steps.
          </p>
          <p>
            Unlike traditional models, they take autonomous actions and learn from every result. This continuous loop of execution and improvement is a BIG differentiator.
          </p>
          
          {/* Visual Idea: Observe → Reason → Plan → Act → Learn */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 items-center mt-2 text-sm font-mono text-neutral-400">
             <div className="flex items-center gap-2">
                <span className="text-white border-b border-white/20 pb-0.5">Observe</span>
                <span className="text-neutral-600">→</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="text-white border-b border-white/20 pb-0.5">Reason</span>
                <span className="text-neutral-600">→</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="text-white border-b border-white/20 pb-0.5">Plan</span>
                <span className="text-neutral-600">→</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="text-colorfull font-bold">Act</span>
                <span className="text-neutral-600">→</span>
             </div>
             <div>
                <span className="text-white border-b border-white/20 pb-0.5">Learn</span>
             </div>
          </div>
        </div>

        <a className="group flex w-fit items-center justify-center gap-2 font-mono text-neutral-300 transition-colors hover:text-white mt-10 lg:justify-start cursor-pointer mx-auto lg:mx-0" href="#system">
          See the Architecture
          <div className="size-[25px] overflow-hidden rounded-full border border-neutral-700 bg-white/5 transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20 relative">
            <div className="flex w-12 transition-transform duration-500 ease-in-out -translate-x-1/2 group-hover:translate-x-0 absolute top-0 bottom-0 items-center">
              <span className="flex size-[25px] items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right size-[14px]">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
              <span className="flex size-[25px] items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right size-[14px]">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </div>
          </div>
        </a>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1 max-w-full lg:max-w-[40%] flex items-center justify-center">
          <img 
            src="/images/page6-images/page6-left.webp" 
            alt="Thinking Agent Visualization" 
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}