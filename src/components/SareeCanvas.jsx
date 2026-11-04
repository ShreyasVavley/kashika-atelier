import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Sun, Flame, Lightbulb, ZoomIn, Eye } from "lucide-react";

export default function SareeCanvas({
  selectedColorway,
  lightingPreset,
  setLightingPreset,
  lightingPresets,
  loupeActive,
  setLoupeActive
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [lightPos, setLightPos] = useState({ x: 0.5, y: 0.35 });
  const [isHovering, setIsHovering] = useState(false);

  // Handle pointer tracking for real-time specular Zari lighting
  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setLightPos({ x, y });
  };

  // Canvas render loop for dynamic Zari micro-shimmer sparkles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const width = (canvas.width = canvas.offsetWidth * 2);
    const height = (canvas.height = canvas.offsetHeight * 2);

    // Generate fixed zari pattern points along pallu and borders
    const zariPoints = [];
    for (let i = 0; i < 90; i++) {
      zariPoints.push({
        x: 0.65 + Math.random() * 0.3, // Pallu region (right side)
        y: 0.15 + Math.random() * 0.75,
        baseSize: 1.5 + Math.random() * 2.5,
        freq: 0.02 + Math.random() * 0.04,
        offset: Math.random() * Math.PI * 2
      });
    }
    // Border zari points
    for (let i = 0; i < 50; i++) {
      zariPoints.push({
        x: 0.08 + Math.random() * 0.85,
        y: 0.82 + Math.random() * 0.12, // Lower border
        baseSize: 1.2 + Math.random() * 2,
        freq: 0.03 + Math.random() * 0.05,
        offset: Math.random() * Math.PI * 2
      });
    }

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const intensity = lightingPreset.sheenIntensity;
      const targetX = lightPos.x * width;
      const targetY = lightPos.y * height;

      // Draw dynamic radial light pool
      const radius = width * (lightingPreset.specularSize / 100);
      const grad = ctx.createRadialGradient(targetX, targetY, 0, targetX, targetY, radius);
      
      const zariGlow = selectedColorway.zariTone === "silver" 
        ? "rgba(224, 231, 255, 0.45)" 
        : (selectedColorway.zariTone === "rose-gold" 
          ? "rgba(251, 207, 232, 0.45)" 
          : "rgba(243, 229, 171, 0.55)");

      grad.addColorStop(0, zariGlow);
      grad.addColorStop(0.35, lightingPreset.ambientColor);
      grad.addColorStop(1, "transparent");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw glistening zari thread sparkles that react to light position
      zariPoints.forEach((p) => {
        const px = p.x * width;
        const py = p.y * height;

        // Distance from cursor light
        const dist = Math.hypot(px - targetX, py - targetY);
        const maxDist = width * 0.45;

        if (dist < maxDist) {
          const proximity = 1 - dist / maxDist;
          const shimmer = Math.sin(frame * p.freq + p.offset) * 0.5 + 0.5;
          const alpha = proximity * shimmer * intensity;

          if (alpha > 0.05) {
            ctx.fillStyle = selectedColorway.zariColor;
            ctx.shadowColor = selectedColorway.zariColor;
            ctx.shadowBlur = 12 * intensity;

            const size = p.baseSize * (1 + proximity * 1.5);
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [selectedColorway, lightingPreset, lightPos]);

  return (
    <div className="relative w-full flex flex-col gap-4">
      {/* Interactive Saree Stage Container */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] rounded-3xl overflow-hidden cursor-crosshair border border-[var(--border-gold)] shadow-2xl transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse 90% 80% at 50% 20%, ${selectedColorway.secondaryHex} 0%, #050508 100%)`,
          boxShadow: `0 25px 60px -15px ${selectedColorway.accentGlow}`
        }}
      >
        {/* Background Decorative Gold Arch Motif */}
        <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
          <svg viewBox="0 0 400 500" className="w-[85%] h-[85%] stroke-[var(--gold-primary)] fill-none stroke-[0.75]">
            <path d="M 50 450 L 50 180 Q 200 20 350 180 L 350 450" />
            <path d="M 70 450 L 70 190 Q 200 45 330 190 L 330 450" />
            <circle cx="200" cy="180" r="40" />
          </svg>
        </div>

        {/* Dynamic Silk Fabric Representation with Master Design Motifs */}
        <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
          <motion.div
            key={selectedColorway.id}
            initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between"
            style={{
              background: `linear-gradient(135deg, ${selectedColorway.hex} 0%, ${selectedColorway.secondaryHex} 100%)`,
              border: `1px solid rgba(212, 175, 55, 0.3)`
            }}
          >
            {/* Silk Warp Slub & Shimmer Texture Overlay */}
            <div
              className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.06) 3px, transparent 5px)`
              }}
            />

            {/* Top Border: Intricate Temple Zari Architecture */}
            <div
              className="relative w-full h-16 sm:h-20 flex items-center justify-between px-6 border-b border-[var(--border-gold)]"
              style={{
                background: `linear-gradient(90deg, rgba(212, 175, 55, 0.25) 0%, rgba(212, 175, 55, 0.4) 50%, rgba(212, 175, 55, 0.25) 100%)`
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-royal font-bold tracking-widest text-[#f3e5ab]">
                  {selectedColorway.sanskrit}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-black/40 text-amber-200 border border-amber-300/30">
                  {selectedColorway.zariName}
                </span>
              </div>
            </div>

            {/* Center Body: Dancing Mayil (Peacock) & Hansa Jangla Motifs */}
            <div className="relative flex-1 p-6 flex flex-col justify-center items-center">
              {/* Stylized Mayil Brocade Crest (Handloom Jacquard Vector) */}
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full"
                  style={{
                    filter: `drop-shadow(0 0 12px ${selectedColorway.zariColor}40)`
                  }}
                >
                  <circle cx="100" cy="100" r="92" stroke={selectedColorway.zariColor} strokeWidth="1.2" fill="none" opacity="0.6" strokeDasharray="3 3" />
                  <circle cx="100" cy="100" r="82" stroke={selectedColorway.zariColor} strokeWidth="1" fill="none" opacity="0.4" />
                  
                  {/* Ornate Royal Mayil (Peacock) Contour */}
                  <path
                    d="M 100 35 C 115 35 125 45 125 60 C 125 75 110 85 100 100 C 90 85 75 75 75 60 C 75 45 85 35 100 35 Z"
                    fill="none"
                    stroke={selectedColorway.zariColor}
                    strokeWidth="2"
                  />
                  <path
                    d="M 100 100 C 120 120 150 130 165 160 C 145 155 125 150 100 130 C 75 150 55 155 35 160 C 50 130 80 120 100 100 Z"
                    fill={`${selectedColorway.zariColor}15`}
                    stroke={selectedColorway.zariColor}
                    strokeWidth="1.75"
                  />
                  {/* Floral vine bootis */}
                  <circle cx="100" cy="55" r="4" fill={selectedColorway.zariColor} />
                  <circle cx="70" cy="130" r="3" fill={selectedColorway.zariColor} />
                  <circle cx="130" cy="130" r="3" fill={selectedColorway.zariColor} />
                  <circle cx="100" cy="155" r="5" fill={selectedColorway.zariColor} />
                </svg>
              </div>

              {/* Fabric Grain Title */}
              <div className="text-center mt-2">
                <span className="text-[11px] uppercase tracking-[0.25em] text-amber-200/80 font-royal font-semibold">
                  Kadwa Handloom Brocade
                </span>
                <p className="text-xs text-white/60 font-editorial italic mt-0.5">
                  144 Hours Hand-Loomed Weave
                </p>
              </div>
            </div>

            {/* Bottom Pallu: Heavy Korvai Architectural Temple Border */}
            <div
              className="relative w-full h-24 sm:h-28 border-t border-[var(--border-gold)] p-4 flex flex-col justify-center"
              style={{
                background: `linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(212, 175, 55, 0.28) 100%)`
              }}
            >
              {/* Architectural Temple Triangles (Gopuram motifs) */}
              <div className="flex justify-between items-center w-full px-2">
                {[...Array(9)].map((_, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[16px]"
                      style={{ borderBottomColor: selectedColorway.zariColor }}
                    />
                    <div className="w-1.5 h-1.5 rounded-full mt-1" style={{ background: selectedColorway.zariColor }} />
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center text-[11px] text-white/80 font-mono mt-3 px-1">
                <span>WARP: 2,400 THREADS</span>
                <span className="text-amber-300 font-bold">SILKMARK CERTIFIED</span>
                <span>WEFT: 98% SILVER ZARI</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Specular Zari Light Canvas Overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none w-full h-full mix-blend-screen"
        />

        {/* Interactive Hover HUD Tooltip */}
        <AnimatePresence>
          {isHovering && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-5 left-5 right-5 sm:left-auto sm:right-5 bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-amber-400/30 flex items-center gap-3 pointer-events-none"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <div className="text-xs">
                <span className="font-bold text-amber-200 font-royal">Zari Light Shifter Active:</span>
                <span className="text-white/70 ml-1.5">Move cursor to catch the metallic sheen</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lighting Preset Control Bar (☀️ / 🕯️ / ✨) */}
      <div className="royal-glass p-3 rounded-2xl flex flex-wrap items-center justify-between gap-2 border border-amber-500/20">
        <div className="flex items-center gap-2 pl-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-royal font-bold text-amber-200 uppercase tracking-wider">
            Zari Light Environment:
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {lightingPresets.map((preset) => {
            const isActive = lightingPreset.id === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setLightingPreset(preset);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-amber-400/20 text-amber-200 border border-amber-300 shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                    : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>{preset.icon}</span>
                <span className="hidden sm:inline">{preset.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
