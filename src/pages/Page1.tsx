import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Copy, Check } from 'lucide-react';
import * as THREE from 'three';
import Header from '../components/Header';

// --- ColorBends Background Component ---

type ColorBendsProps = {
  className?: string;
  style?: React.CSSProperties;
  rotation?: number;
  speed?: number;
  colors?: string[];
  transparent?: boolean;
  autoRotate?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  parallax?: number;
  noise?: number;
};

const MAX_COLORS = 8 as const;

const frag = `
#define MAX_COLORS ${MAX_COLORS}
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer; // in NDC [-1,1]
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

    vec3 col = vec3(0.0);
    float a = 1.0;

    if (uColorCount > 0) {
      vec2 s = q;
      vec3 sumCol = vec3(0.0);
      float cover = 0.0;
      for (int i = 0; i < MAX_COLORS; ++i) {
            if (i >= uColorCount) break;
            s -= 0.01;
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);
            float kMix = pow(kBelow, 0.3); // strong response across 0..1
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0); // allow >1 to amplify displacement
            vec2 disp = (r - s) * kBelow;
            vec2 warped = s + disp * gain;
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
            float m = mix(m0, m1, kMix);
            float w = 1.0 - exp(-6.0 / exp(6.0 * m));
            sumCol += uColors[i] * w;
            cover = max(cover, w);
      }
      col = clamp(sumCol, 0.0, 1.0);
      a = uTransparent > 0 ? cover : 1.0;
    } else {
        vec2 s = q;
        for (int k = 0; k < 3; ++k) {
            s -= 0.01;
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);
            float kMix = pow(kBelow, 0.3);
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
            vec2 disp = (r - s) * kBelow;
            vec2 warped = s + disp * gain;
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);
            float m = mix(m0, m1, kMix);
            col[k] = 1.0 - exp(-6.0 / exp(6.0 * m));
        }
        a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;
    }

    if (uNoise > 0.0001) {
      float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
      col += (n - 0.5) * uNoise;
      col = clamp(col, 0.0, 1.0);
    }

    vec3 rgb = (uTransparent > 0) ? col * a : col;
    gl_FragColor = vec4(rgb, a);
}
`;

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

function ColorBends({
  className,
  style,
  rotation = 45,
  speed = 0.2,
  colors = [],
  transparent = true,
  autoRotate = 0,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 1,
  parallax = 0.5,
  noise = 0.1
}: ColorBendsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rafRef = useRef<number | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const rotationRef = useRef<number>(rotation);
  const autoRotateRef = useRef<number>(autoRotate);
  const pointerTargetRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const pointerCurrentRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const pointerSmoothRef = useRef<number>(8);

  useEffect(() => {
    const container = containerRef.current!;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const uColorsArray = Array.from({ length: MAX_COLORS }, () => new THREE.Vector3(0, 0, 0));
    const material = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        uCanvas: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uRot: { value: new THREE.Vector2(1, 0) },
        uColorCount: { value: 0 },
        uColors: { value: uColorsArray },
        uTransparent: { value: transparent ? 1 : 0 },
        uScale: { value: scale },
        uFrequency: { value: frequency },
        uWarpStrength: { value: warpStrength },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uMouseInfluence: { value: mouseInfluence },
        uParallax: { value: parallax },
        uNoise: { value: noise }
      },
      premultipliedAlpha: true,
      transparent: true
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance',
      alpha: true
    });
    rendererRef.current = renderer;
    (renderer as any).outputColorSpace = (THREE as any).SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, transparent ? 0 : 1);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const clock = new THREE.Clock();

    const handleResize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h, false);
      (material.uniforms.uCanvas.value as THREE.Vector2).set(w, h);
    };

    handleResize();

    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(handleResize);
      ro.observe(container);
      resizeObserverRef.current = ro;
    } else {
      (window as Window).addEventListener('resize', handleResize);
    }

    const loop = () => {
      const dt = clock.getDelta();
      const elapsed = clock.elapsedTime;
      material.uniforms.uTime.value = elapsed;

      const deg = (rotationRef.current % 360) + autoRotateRef.current * elapsed;
      const rad = (deg * Math.PI) / 180;
      const c = Math.cos(rad);
      const s = Math.sin(rad);
      (material.uniforms.uRot.value as THREE.Vector2).set(c, s);

      const cur = pointerCurrentRef.current;
      const tgt = pointerTargetRef.current;
      const amt = Math.min(1, dt * pointerSmoothRef.current);
      cur.lerp(tgt, amt);
      (material.uniforms.uPointer.value as THREE.Vector2).copy(cur);
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
      else (window as Window).removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const material = materialRef.current;
    const renderer = rendererRef.current;
    if (!material) return;

    rotationRef.current = rotation;
    autoRotateRef.current = autoRotate;
    material.uniforms.uSpeed.value = speed;
    material.uniforms.uScale.value = scale;
    material.uniforms.uFrequency.value = frequency;
    material.uniforms.uWarpStrength.value = warpStrength;
    material.uniforms.uMouseInfluence.value = mouseInfluence;
    material.uniforms.uParallax.value = parallax;
    material.uniforms.uNoise.value = noise;

    const toVec3 = (hex: string) => {
      const h = hex.replace('#', '').trim();
      const v =
        h.length === 3
          ? [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)]
          : [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
      return new THREE.Vector3(v[0] / 255, v[1] / 255, v[2] / 255);
    };

    const arr = (colors || []).filter(Boolean).slice(0, MAX_COLORS).map(toVec3);
    for (let i = 0; i < MAX_COLORS; i++) {
      const vec = (material.uniforms.uColors.value as THREE.Vector3[])[i];
      if (i < arr.length) vec.copy(arr[i]);
      else vec.set(0, 0, 0);
    }
    material.uniforms.uColorCount.value = arr.length;

    material.uniforms.uTransparent.value = transparent ? 1 : 0;
    if (renderer) renderer.setClearColor(0x000000, transparent ? 0 : 1);
  }, [
    rotation,
    autoRotate,
    speed,
    scale,
    frequency,
    warpStrength,
    mouseInfluence,
    parallax,
    noise,
    colors,
    transparent
  ]);

  useEffect(() => {
    const material = materialRef.current;
    const container = containerRef.current;
    if (!material || !container) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / (rect.width || 1)) * 2 - 1;
      const y = -(((e.clientY - rect.top) / (rect.height || 1)) * 2 - 1);
      pointerTargetRef.current.set(x, y);
    };

    container.addEventListener('pointermove', handlePointerMove);
    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return <div ref={containerRef} className={`w-full h-full relative overflow-hidden ${className}`} style={style} />;
}


// --- Main Application ---

const App: React.FC = () => {
  const [copied, setCopied] = useState(false);

  // Handle clipboard copy
  const handleCopy = async () => {
    try {
      // Use execCommand as fallback if navigator not supported in some contexts
      const textArea = document.createElement("textarea");
      textArea.value = "svcr@gmail.com";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden font-['Inter'] text-gray-100 selection:bg-blue-500/30">
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <ColorBends 
            colors={['#000000', '#020617', '#172554', '#1e1b4b']} // Deep blacks, slate, and dark indigo
            speed={0.12}
            rotation={135}
            scale={1.2}
            mouseInfluence={0.4}
            transparent={false}
            noise={0.15}
        />
      </div>

      {/* Global Styles for Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');
        
        .text-premium-shine {
          background: linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 6px rgba(255, 255, 255, 0.25)) drop-shadow(0 3px 12px rgba(255, 255, 255, 0.15));
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }
      `}</style>

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen bg-black/10"> {/* Subtle overlay to ensure text contrast if needed */}
        
        {/* Navbar / Header area (Optional placeholder) */}
        <header className="absolute top-0 w-full px-6 py-6 flex justify-between items-center opacity-80">
            <div className="font-['Playfair_Display'] font-bold text-xl tracking-tight">Nextnode</div>
        </header>

        {/* Hero Section */}
        <main className="flex-grow flex flex-col items-center justify-center px-6 md:px-12 pb-20 pt-32">
          
          {/* AI Agent Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-pink-500/20 border border-blue-400/20 backdrop-blur-md mb-8 group hover:bg-blue-500/30 transition-all cursor-pointer shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            <span className="px-2.5 py-0.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-pink-600 rounded-full shadow-lg shadow-blue-600/30">
              AI Agent
            </span>
            <span className="text-sm text-gray-200 font-medium tracking-wide">
              Meet your personal AI agent: always learning, planning, and acting for your career success.
            </span>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Main Headline */}
          <h1 className="text-center mb-12 max-w-6xl">
            <div className="text-4xl md:text-6xl lg:text-7xl leading-tight font-['Playfair_Display'] text-gray-100 tracking-tight drop-shadow-2xl">
              AI That Thinks, Plans, and Acts
            </div>
            <div className="text-4xl md:text-6xl lg:text-7xl leading-tight font-['Playfair_Display'] tracking-tight mt-4 relative">
              for Your{' '}
              <span className="relative inline-block italic font-['Playfair_Display']">
                {/* White glow behind Career - only this remains */}
                <span className="absolute inset-0 blur-3xl opacity-40 bg-white rounded-full scale-150"></span>
                <span className="relative text-premium-shine inline-block">
                  Career
                </span>
              </span>
            </div>
          </h1>

          {/* Subtitle */}
          <div className="flex items-center gap-3 mb-12 flex-wrap justify-center animate-fade-in-up max-w-2xl text-center">
            <span className="text-lg md:text-xl text-gray-300/90 font-light leading-relaxed">
              Your intelligent career co-pilot powered by advanced AI agents. 
              Automate your growth and unlock new opportunities.
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <button className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 text-white font-medium text-lg transition-all shadow-lg shadow-black/20 hover:shadow-2xl hover:shadow-blue-900/20 hover:scale-105 active:scale-95">
              Get Started
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/30 transition-all group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </main>

        {/* Black fade at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>
      </div>
      
      {/* Header Component */}
      <Header activeTab="Home" />
    </div>
  );
};

export default App;