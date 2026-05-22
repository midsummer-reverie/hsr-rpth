"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617]">
      {/* 🌌 Cosmic Background with Gold Dust particles */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[15%] left-[25%] w-1 h-1 bg-amber-200 rounded-full animate-pulse"></div>
        <div className="absolute top-[45%] left-[75%] w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping [animation-duration:4s]"></div>
        <div className="absolute top-[75%] left-[15%] w-1 h-1 bg-amber-300 rounded-full animate-pulse [animation-delay:1s]"></div>
      </div>

      {/* ✨ Main Animation: Golden Astral Orbit */}
      <div className="relative flex items-center justify-center w-36 h-36">
        {/* Outer Ring: Slow, Elegant Gold */}
        <div className="absolute inset-0 border-2 border-amber-600/20 rounded-full border-t-amber-400 animate-spin [animation-duration:5s]"></div>
        
        {/* Middle Ring: Reverse, Soft Cream */}
        <div className="absolute inset-3 border border-amber-800/10 rounded-full border-b-amber-200 animate-spin [animation-duration:4s] [animation-direction:reverse]"></div>
        
        {/* 🌟 Center Star: Core of the Express */}
        <div className="w-5 h-5 bg-white rounded-full shadow-[0_0_25px_rgba(251,191,36,0.9)] animate-pulse"></div>
      </div>

      {/* 📜 Thematic Text */}
      <div className="mt-10 text-center space-y-2.5">
        <h2 className="text-xl font-semibold tracking-[0.25em] text-amber-300 uppercase animate-pulse">
          Jumping to Hyperdrive
        </h2>
        <p className="text-xs text-slate-500 font-mono tracking-widest uppercase">
          Astral Express Logs • Version 2.5 ACE
        </p>
      </div>

      {/* 🚇 Progress Bar (Decorative Gold) */}
      <div className="absolute bottom-12 w-56 h-[1.5px] bg-slate-800 overflow-hidden rounded-full">
        <div className="h-full bg-gradient-to-r from-transparent via-amber-400 to-transparent w-full animate-[loading-bar_2s_infinite]"></div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}