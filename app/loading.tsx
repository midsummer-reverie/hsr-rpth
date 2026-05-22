// app/loading.tsx
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617]">
      {/* Background Effect: Star Particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-[40%] left-[80%] w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-[70%] left-[10%] w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
      </div>

      {/* Main Animation: Cosmic Orbit */}
      <div className="relative flex items-center justify-center w-32 h-32">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full border-t-cyan-400 animate-spin [animation-duration:3s]"></div>
        
        {/* Middle Ring */}
        <div className="absolute inset-2 border border-blue-500/20 rounded-full border-b-blue-400 animate-spin [animation-duration:2s] [animation-direction:reverse]"></div>
        
        {/* Center Glowing Dot */}
        <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-pulse"></div>
      </div>

      {/* Thematic Text */}
      <div className="mt-8 text-center space-y-2">
        <h2 className="text-lg font-medium tracking-[0.2em] text-cyan-400 uppercase animate-pulse">
          Jumping to Hyperdrive
        </h2>
        <p className="text-xs text-slate-500 font-mono tracking-widest uppercase">
          Scanning Interastral Peace Guide...
        </p>
      </div>

      {/* Progress Bar (Decorative) */}
      <div className="absolute bottom-10 w-48 h-[2px] bg-slate-800 overflow-hidden rounded-full">
        <div className="h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-full animate-[loading-bar_1.5s_infinite]"></div>
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