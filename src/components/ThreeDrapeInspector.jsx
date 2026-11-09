import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCcw,
  Sun,
  Sparkles,
  Flame,
  Layers,
  ZoomIn,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';

export default function ThreeDrapeInspector({ product, selectedColorway }) {
  // 360° Drag Rotation State
  const [rotationAngle, setRotationAngle] = useState(0); // 0 to 360 degrees
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const startAngle = useRef(0);

  // Lighting Mode: 'daylight' | 'gala' | 'diya'
  const [lightingMode, setLightingMode] = useState('daylight');
  const [cursorPos, setCursorPos] = useState({ x: 0.5, y: 0.4 });
  const [isHovered, setIsHovered] = useState(false);

  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Angles mapping to views
  // 0° - 89°: Full Editorial Bridal Drape
  // 90° - 179°: Pallu & Border Micro Weave
  // 180° - 269°: 98.2% Tested Silver Zari Macro Detail
  // 270° - 359°: Traditional Varanasi Pit Loom Texture
  const views = [
    {
      angleRange: [0, 90],
      title: '0° • Full Editorial Bridal Drape',
      src: product?.drape || product?.image || '/images/hero_bridal_drape.jpg',
      subtitle: 'Sculpted drape flow on traditional wooden pit loom'
    },
    {
      angleRange: [90, 180],
      title: '90° • Pallu & Interlocked Kadwa Border',
      src: product?.thumbnails?.[0] || product?.image || '/images/colorway_sindoor.jpg',
      subtitle: 'Continuous warp density: 2,400 silk threads / meter'
    },
    {
      angleRange: [180, 270],
      title: '180° • 98.2% Tested Silver Zari Macro View',
      src: '/images/zari_macro_detail.jpg',
      subtitle: 'Real silver core electro-gilded in 24K gold (1.2 micron)'
    },
    {
      angleRange: [270, 360],
      title: '270° • Artisan Pit-Loom Weft & Provenance',
      src: '/images/karigar_pit_loom.jpg',
      subtitle: '144 handloom hours woven by master karigar guild'
    }
  ];

  // Determine active view based on normalized rotation angle (0 to 359)
  const normalizedAngle = ((rotationAngle % 360) + 360) % 360;
  const currentView = views.find(
    (v) => normalizedAngle >= v.angleRange[0] && normalizedAngle < v.angleRange[1]
  ) || views[0];

  // Drag rotation handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    startAngle.current = rotationAngle;
  };

  const handleMouseMove = (e) => {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    
    // Update specular cursor light position
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, ((e.clientY || (e.touches && e.touches[0].clientY) || 0) - rect.top) / rect.height));
      setCursorPos({ x, y });
    }

    if (!isDragging) return;
    const deltaX = clientX - dragStartX.current;
    // 1px drag = ~0.6 degrees
    setRotationAngle(startAngle.current + deltaX * 0.65);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Canvas Specular Shimmer Loop (Simulating metallic 24K Gold Zari Reflection)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const width = (canvas.width = canvas.offsetWidth * 2);
    const height = (canvas.height = canvas.offsetHeight * 2);

    // Generate random spark micro-particles for zari sheen
    const sparkles = [];
    for (let i = 0; i < 40; i++) {
      sparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1 + Math.random() * 2,
        freq: 0.02 + Math.random() * 0.05,
        offset: Math.random() * Math.PI * 2
      });
    }

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Light pool settings by lighting mode
      let intensity = 0.25;
      let lightColor = 'rgba(212, 175, 55, '; // Gold default
      let poolRadius = width * 0.45;

      if (lightingMode === 'daylight') {
        intensity = 0.18;
        lightColor = 'rgba(255, 250, 240, '; // True-to-life white/ivory
        poolRadius = width * 0.55;
      } else if (lightingMode === 'gala') {
        intensity = 0.45;
        lightColor = 'rgba(230, 194, 101, '; // High specular gold
        poolRadius = width * 0.35;
      } else if (lightingMode === 'diya') {
        intensity = 0.35;
        lightColor = 'rgba(245, 158, 11, '; // Warm amber
        poolRadius = width * 0.4;
      }

      const targetX = cursorPos.x * width;
      const targetY = cursorPos.y * height;

      // Radial Specular Pool
      const grad = ctx.createRadialGradient(targetX, targetY, 0, targetX, targetY, poolRadius);
      grad.addColorStop(0, `${lightColor}${intensity})`);
      grad.addColorStop(0.5, `${lightColor}${intensity * 0.4})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle specular micro-sparkles
      if (lightingMode !== 'daylight' || isHovered) {
        sparkles.forEach((s) => {
          const dist = Math.hypot(s.x - targetX, s.y - targetY);
          if (dist < poolRadius) {
            const glow = Math.sin(frame * s.freq + s.offset);
            if (glow > 0.3) {
              ctx.beginPath();
              ctx.arc(s.x, s.y, s.radius * (1 + glow * 0.5), 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 245, 200, ${glow * 0.8 * (1 - dist / poolRadius)})`;
              ctx.fill();
            }
          }
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [lightingMode, cursorPos, isHovered]);

  return (
    <div className="w-full flex flex-col gap-4 font-sans select-none">
      {/* 3D Stage Header */}
      <div className="flex items-center justify-between px-1">
        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#7A1C28] font-bold">
          <span className="w-2 h-2 rounded-full bg-[#7A1C28] animate-pulse" />
          <span>360° Tactile Drape &amp; Zari Inspector</span>
        </div>

        <div className="text-[11px] font-mono text-stone-500 font-semibold">
          Angle: {Math.round(normalizedAngle)}°
        </div>
      </div>

      {/* Main 3D Turntable Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          handleMouseUp();
          setIsHovered(false);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        className={`relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-300 shadow-md ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        } transition-shadow`}
      >
        {/* Active Angle Texture */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentView.src}
            src={currentView.src}
            alt={currentView.title}
            initial={{ opacity: 0.85, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.85 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full object-cover object-center pointer-events-none"
          />
        </AnimatePresence>

        {/* Dynamic Specular Zari Light Canvas Overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
        />

        {/* View Indicator Overlay at Top */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 text-stone-900 text-[10px] font-bold uppercase tracking-wider shadow-sm">
            {currentView.title}
          </span>

          <span className="px-2.5 py-1 rounded-full bg-[#7A1C28] text-white text-[9px] font-bold uppercase tracking-wider shadow-sm">
            360° Drag Active
          </span>
        </div>

        {/* Drag Hint at Center (fades out on interaction) */}
        {!isDragging && (
          <div className="absolute inset-x-0 bottom-14 flex justify-center pointer-events-none">
            <div className="px-4 py-1.5 rounded-full bg-stone-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wide flex items-center gap-2 shadow-lg animate-bounce">
              <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Drag to rotate 360°</span>
            </div>
          </div>
        )}

        {/* Bottom View Subtitle */}
        <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200 text-stone-800 text-[11px] font-medium flex items-center justify-between shadow-xs pointer-events-none">
          <span className="truncate pr-2">{currentView.subtitle}</span>
          <span className="text-[10px] text-[#7A1C28] font-bold shrink-0">98.2% Tested Zari</span>
        </div>
      </div>

      {/* Lighting Presets Engine */}
      <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <span className="text-[11px] uppercase tracking-wider text-stone-500 font-bold flex items-center gap-1.5 self-start sm:self-center">
          <Sparkles className="w-3.5 h-3.5 text-[#7A1C28]" />
          <span>Light Environment:</span>
        </span>

        <div className="grid grid-cols-3 gap-1.5 w-full sm:w-auto">
          {/* Preset 1: Daylight */}
          <button
            onClick={() => setLightingMode('daylight')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              lightingMode === 'daylight'
                ? 'bg-[#7A1C28] text-white shadow-xs'
                : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Sun className="w-3 h-3 text-[#D4AF37]" />
            <span>Daylight (5500K)</span>
          </button>

          {/* Preset 2: Gala */}
          <button
            onClick={() => setLightingMode('gala')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              lightingMode === 'gala'
                ? 'bg-[#7A1C28] text-white shadow-xs'
                : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>Evening Gala</span>
          </button>

          {/* Preset 3: Diya */}
          <button
            onClick={() => setLightingMode('diya')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              lightingMode === 'diya'
                ? 'bg-[#7A1C28] text-white shadow-xs'
                : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Flame className="w-3 h-3 text-amber-500" />
            <span>Temple Diya</span>
          </button>
        </div>
      </div>
    </div>
  );
}
