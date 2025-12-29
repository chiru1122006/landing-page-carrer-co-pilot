import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

/**
 * CurvedLoop Component
 * Ported from Vue to React
 */
const CurvedLoop = ({
  marqueeText = "TECHNOLOGY ✦ TRUST ✦ SECURITY ✦ AI ✦",
  speed = 2,
  className = "",
  curveAmount = 400,
  direction = "left",
  interactive = true,
}) => {
  const [spacing, setSpacing] = useState(0);
  const measureRef = useRef(null);
  const textPathRef = useRef(null);
  const pathId = useMemo(() => `curve-${Math.random().toString(36).substr(2, 9)}`, []);
  
  // Animation state stored in refs to prevent excessive re-renders
  const state = useRef({
    offset: 0,
    isDragging: false,
    lastX: 0,
    velocity: 0,
    direction: direction,
    animationFrame: null
  });

  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  // Construct the curved path
  // Increased Y value to accommodate the curve without clipping
  const pathD = useMemo(() => 
    `M-100,50 Q500,${50 + curveAmount} 1540,50`, 
    [curveAmount]
  );

  // Measure text width once mounted
  useEffect(() => {
    if (measureRef.current) {
      setSpacing(measureRef.current.getComputedTextLength());
    }
  }, [text]);

  // Generate repeating text string
  const totalText = useMemo(() => {
    if (!spacing) return text;
    // Increased multiplier to ensure enough text for larger screens/longer strings
    const itemsNeeded = Math.ceil(3000 / spacing) + 4;
    return new Array(itemsNeeded).fill(text).join('');
  }, [spacing, text]);

  const animate = useCallback(() => {
    if (!spacing || !textPathRef.current) return;

    const step = () => {
      if (!state.current.isDragging && textPathRef.current) {
        const delta = state.current.direction === 'right' ? speed : -speed;
        let newOffset = state.current.offset + delta;

        // Wrap logic
        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset >= wrapPoint) newOffset -= wrapPoint;

        textPathRef.current.setAttribute('startOffset', `${newOffset}px`);
        state.current.offset = newOffset;
      }
      state.current.animationFrame = requestAnimationFrame(step);
    };
    
    cancelAnimationFrame(state.current.animationFrame);
    step();
  }, [spacing, speed]);

  useEffect(() => {
    animate();
    return () => cancelAnimationFrame(state.current.animationFrame);
  }, [animate]);

  const onPointerDown = (e) => {
    if (!interactive) return;
    state.current.isDragging = true;
    state.current.lastX = e.clientX;
    state.current.velocity = 0;
    e.target.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!interactive || !state.current.isDragging || !textPathRef.current) return;
    
    const dx = e.clientX - state.current.lastX;
    state.current.lastX = e.clientX;
    state.current.velocity = dx;

    let newOffset = state.current.offset + dx;
    
    // Wrap logic during drag
    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset >= wrapPoint) newOffset -= wrapPoint;

    textPathRef.current.setAttribute('startOffset', `${newOffset}px`);
    state.current.offset = newOffset;
  };

  const onPointerUp = () => {
    if (!interactive) return;
    state.current.isDragging = false;
    // Determine new direction based on fling
    if (state.current.velocity !== 0) {
        state.current.direction = state.current.velocity > 0 ? 'right' : 'left';
    }
  };

  return (
    <div 
      className="w-full relative select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      style={{ cursor: interactive ? 'grab' : 'auto' }}
    >
      <svg
        className={`w-full overflow-visible block text-[4rem] md:text-[6rem] font-bold uppercase leading-none ${className}`}
        viewBox="0 0 1440 450"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Hidden text for measurement */}
        <text 
          ref={measureRef} 
          xmlSpace="preserve" 
          style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}
        >
          {text}
        </text>

        <defs>
          <path id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>

        {spacing > 0 && (
          <text xmlSpace="preserve" className="fill-current">
            <textPath 
              ref={textPathRef} 
              href={`#${pathId}`} 
              startOffset="0px" 
              xmlSpace="preserve"
            >
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-black text-white font-sans flex items-center justify-center overflow-hidden p-0 m-0" style={{ minHeight: 'unset', height: 'auto' }}>
      {/* The Curved Marquee Component */}
      <div className="w-full text-white/80 hover:text-white transition-colors duration-500" style={{ maxWidth: 1440, margin: '0 auto', padding: 0 }}>
        <CurvedLoop 
          marqueeText="AGENTIC AI ✦ SECURE AUTHENTICATION ✦ DATA STORED SAFELY ✦ NO SPAM ✦ USER-CONTROLLED DATA ✦ GPT INTELLIGENCE ✦ " 
          curveAmount={300} 
          speed={1.5}
        />
      </div>
    </div>
  );
}