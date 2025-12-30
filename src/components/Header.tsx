import React, { useState } from 'react';
import { Command, ChevronDown } from 'lucide-react';

interface HeaderProps {
  activeTab?: string;
}

const Header: React.FC<HeaderProps> = ({ activeTab = 'Home' }) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const navItems = [
    { id: 'Home', label: 'Home' },
    { id: 'Dashboard', label: 'Dashboard' },
  ];

  return (
    <>
      <style>{`
        /* Existing Styles (Refined) */
        .header-glassmorphic {
          background: transparent; 
        }

        .glass-nav {
          background: rgba(15, 15, 15, 0.6);
          /* Stronger blur on the pill itself */
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.08),
            0 4px 20px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          transition: transform 0.2s ease;
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.65);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 9999px;
          position: relative;
        }

        .nav-link:hover {
          color: rgba(255, 255, 255, 0.95);
          background: rgba(255, 255, 255, 0.03);
        }

        .nav-link-active {
          color: rgb(255, 255, 255) !important;
          background: rgba(255, 255, 255, 0.1);
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.3);
        }

        /* Glowing indicator - CHANGED TO WHITE */
        .glow-indicator {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 32px;
          height: 4px;
          background: rgb(255, 255, 255);
          border-radius: 0 0 9999px 9999px;
          opacity: 0.9;
        }

        .glow-blur-1 {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 48px;
          height: 24px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 9999px;
          filter: blur(12px);
        }

        .cta-button {
          position: relative;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          color: rgba(255, 255, 255, 0.9);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

        .cta-button:hover {
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
          color: rgb(255, 255, 255);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .logo-svg {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          width: 28px;
          height: 28px;
          fill: rgba(255, 255, 255, 0.9);
        }

        /* Mobile Pill Container */
        .mobile-pill {
          background: rgba(20, 20, 20, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 
            0 4px 24px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        .mobile-logo-icon {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: white;
          font-size: 14px;
        }

        .mobile-username {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: white;
          font-size: 15px;
        }
        
        /* UPDATED: Page Top Blur 
           Now creates a more deliberate "curtain" of blur that starts above the nav 
           and fades out below it.
        */
        .page-top-blur {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 200px; /* Extended height to reach further down */
            z-index: 40;
            pointer-events: none;
            
            /* Increased blur slightly for the "glassmorphism" feel */
            backdrop-filter: blur(8px); 
            -webkit-backdrop-filter: blur(8px);
            
            /* Mask Gradient:
              - Black at 0% to 25%: Fully visible blur at top (Above Nav)
              - Gradient to transparent: Fades out smoothly below nav
            */
            mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 100%);
            -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 100%);
        }

        /* NEW: Glass Aura 
           A localized blur field centered on the nav container that bleeds up and down.
        */
        .nav-glass-aura {
            position: absolute;
            top: -40px;    /* Extends well above the container */
            bottom: -60px; /* Extends well below the container */
            left: -20%;
            right: -20%;
            z-index: -2;
            pointer-events: none;
            
            /* Subtle glassy background + blur */
            background: linear-gradient(to bottom, rgba(255,255,255,0.01), transparent);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            
            /* Soft radial mask to blend it horizontally */
            mask-image: radial-gradient(ellipse at center, black 40%, transparent 70%);
            -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 70%);
            opacity: 0.7;
        }

        /* Ambient Backlight */
        .nav-ambient-light {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 110%;
            height: 120%;
            background: radial-gradient(closest-side, rgba(255, 255, 255, 0.08), transparent);
            filter: blur(20px);
            z-index: -1;
            opacity: 0.6;
            pointer-events: none;
        }

      `}</style>

      {/* 1. Global Page Blur Fade (The "Background" Blur) */}
      <div className="page-top-blur" aria-hidden="true" />

      {/* Header Container */}
      <header className="fixed top-2.5 md:top-4 left-0 right-0 z-[50] w-full header-glassmorphic pointer-events-none">
        <nav className="container mx-auto flex items-center justify-center py-1.5 px-6 pointer-events-auto">
          
          {/* Mobile Logo - Premium Pill Design - Shows ONLY on Mobile */}
          <div className="flex md:hidden items-center justify-center w-full">
            <div className="mobile-pill flex items-center gap-4 px-5 py-2.5 rounded-full">
              <div className="mobile-logo-icon">AB</div>
              <div className="mobile-username">chiru</div>
            </div>
          </div>

          {/* Desktop Layout - Shows ONLY on Desktop */}
          <div className="hidden md:flex items-center w-full">
            {/* Logo - Desktop */}
            <a 
              href="/" 
              aria-label="Homepage" 
              className="flex items-center justify-center mr-auto hover:opacity-80 transition-opacity"
            >
              <svg className="logo-svg" viewBox="0 0 5350 5350" xmlns="http://www.w3.org/2000/svg">
                <path d="M265 4069c-70-20-71-59-4-197 29-59 78-161 109-227 32-66 85-178 119-248 77-159 167-347 236-492 29-60 81-168 115-240 34-71 79-166 100-210 21-44 62-132 93-195 30-63 101-212 157-330 240-504 311-652 373-780 35-74 101-210 145-303 90-186 96-193 186-184 58 5 76 23 124 121 341 693 462 946 462 968 0 10 3 18 8 18 4 0 17 19 29 42 27 52 229 469 288 593 23 50 88 182 143 295 55 113 165 340 245 505 80 165 188 389 241 499 53 109 103 214 112 235 18 44 11 91-17 117-20 18-41 19-303 19-281 0-281 0-344-29-110-51-132-84-347-521-106-214-303-613-437-886-135-273-251-499-257-503-19-12-39 11-73 83-17 36-85 176-151 311-66 135-134 277-152 315-18 39-65 138-105 220-82 169-166 344-250 520-153 323-181 373-230 419-73 68-112 76-369 75-119 0-229-5-246-10z"></path>
                <path d="M3922 3999c-42-21-47-29-134-208-143-293-148-310-107-347 19-17 43-20 253-24 274-7 308-16 406-107 209-193 166-551-82-696-100-58-168-67-520-67-344 0-370-3-403-53-9-14-54-107-101-206-92-200-101-237-59-269 24-19 45-20 373-24 347-4 347-4 422-39 137-65 210-175 210-317 0-176-102-308-267-348-46-10-182-13-642-14-584 0-584 0-618-38-30-32-93-155-234-460-37-80-38-124-3-151 26-21 33-21 788-21 708 0 769 1 876 20 238 40 409 119 565 262 120 109 221 278 266 443 45 169 34 388-28 557-30 81-104 197-157 247-20 19-36 43-36 52 0 10 32 40 78 72 309 217 445 544 388 927-66 435-413 770-851 820-49 5-146 10-215 10-108 0-131-3-168-21z"></path>
              </svg>
            </a>

            {/* Navigation Container - Desktop */}
            <div className="relative flex justify-center mx-auto">
              {/* 2. Ambient Light behind the nav pills */}
              <div className="nav-ambient-light" />
              
              {/* 3. NEW: The "More Glassmorphism" Aura attached to the container */}
              <div className="nav-glass-aura" />
              
              <ul className="relative flex min-h-10 items-center justify-center gap-0 rounded-[24px] glass-nav px-1 py-1">
                <div className="flex items-center">
                  {navItems.map((item) => (
                    <li key={item.id} className="relative list-none">
                      <a
                        href={`#${item.id.toLowerCase()}`}
                        className={`block px-5 py-2 text-sm font-medium nav-link ${
                          activeTab === item.id ? 'nav-link-active' : ''
                        }`}
                      >
                        {item.label}
                      </a>
                      {activeTab === item.id && (
                        <span className="-z-10 absolute inset-0 w-full rounded-full pointer-events-none">
                          <div className="glow-indicator">
                            <div className="glow-blur-1"></div>
                          </div>
                        </span>
                      )}
                    </li>
                  ))}

                  {/* More Dropdown */}
                  <li className="relative list-none ml-1">
                    <button
                      onClick={() => setIsMoreOpen(!isMoreOpen)}
                      className="flex items-center px-4 py-2 text-sm font-medium nav-link cursor-pointer"
                    >
                      More
                      <ChevronDown className={`ml-1 w-3.5 h-3.5 transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </li>

                  {/* Login CTA */}
                  <li className="ml-2 list-none">
                    <a href="https://frontend-career-copilot.vercel.app/login" target="_blank" rel="noopener noreferrer" className="relative inline-flex items-center h-full cursor-pointer whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium cta-button">
                      Login
                    </a>
                  </li>
                </div>
              </ul>
            </div>

            {/* Command Icon - Desktop Only */}
            <div className="flex items-center gap-2 ml-auto">
              <button 
                aria-label="Command menu"
                className="group p-2 cursor-pointer hover:bg-white/5 rounded-full transition-all duration-300"
              >
                <Command className="w-5 h-5 text-white/50 group-hover:text-white/90 transition-colors" />
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
