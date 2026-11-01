import React from "react";
import { Sparkles, Layers } from "lucide-react";

export default function MasterDesignTabs({
  masterDesigns,
  currentDesign,
  onSelectDesign
}) {
  return (
    <div className="w-full flex items-center justify-center my-6 px-4">
      <div className="inline-flex p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md gap-2">
        {masterDesigns.map((design) => {
          const isActive = currentDesign.id === design.id;
          return (
            <button
              key={design.id}
              type="button"
              onClick={() => onSelectDesign(design)}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-royal font-bold transition-all duration-300 flex items-center gap-2 ${
                isActive
                  ? "bg-gradient-to-r from-amber-400/25 to-amber-600/25 border border-amber-300 text-amber-100 shadow-[0_0_20px_rgba(212,175,55,0.35)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{design.name}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 text-amber-300/80 border border-amber-400/20">
                {design.colorways.length} Dyes
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
