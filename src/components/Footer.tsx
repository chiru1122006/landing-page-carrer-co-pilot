import React from 'react';
import { ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full relative">
      {/* Container enforcing the 21:9 aspect ratio.
        On very small mobile screens, we allow it to grow naturally (min-h) 
        so content isn't cramped, but on standard displays, it holds the ratio.
      */}
      <div className="w-full relative aspect-[21/9] min-h-[400px] overflow-hidden group">
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={new URL('../images/footer-image/footer.png', import.meta.url).href}
            alt="Footer Background" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Footer Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-10 px-8 md:px-16">
          
          {/* Main Content Wrapper - Changed to Row Layout */}
          <div className="w-full flex flex-col md:flex-row items-center md:items-end justify-between gap-6 animate-fade-in-up">
            
            {/* Credits Text */}
            <div className="text-center md:text-left space-y-1">
              <p className="text-white/60 text-xs tracking-widest uppercase font-light">
                Crafted with precision
              </p>
              <p className="text-white text-sm md:text-base font-light tracking-wide font-sans">
                Designed & Developed by <span className="font-medium text-white drop-shadow-sm">Chiru, Aditya, & Prapul</span>
              </p>
            </div>

            {/* Get Started Button */}
            <button className="group relative px-6 py-2.5 overflow-hidden rounded-full border border-gray-400/50 bg-white text-black backdrop-blur-sm transition-all duration-300 hover:bg-white hover:border-white">
              <span className="relative flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-black font-medium transition-colors duration-300 group-hover:text-black">
                Get Started
                <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;