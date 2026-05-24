// app/equipment/EquipmentClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Props {
  lightConesByPath: any;
  relicsBySet: any;
}

export default function EquipmentClient({ lightConesByPath, relicsBySet }: Props) {
  const [activeTab, setActiveTab] = useState<'relics' | 'lightcones'>('relics');

  const getStatPrefix = (type: string) => {
    switch (type) {
      case 'HEAD': return 'HP +';
      case 'HANDS': return 'ATK +';
      case 'BODY': return 'DEF +';
      case 'SPHERE': return 'Effect +';
      default: return '+';
    }
  };

  return (
    <main 
      className="min-h-screen bg-[#07070A] text-gray-200 relative p-8 md:p-16 pt-16 md:pt-20 custom-scrollbar"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap');
        
        @keyframes pageEnter {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tabContentEnter {
          from { opacity: 0; transform: scale(0.98) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-page { animation: pageEnter 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-tab-content { animation: tabContentEnter 1.0s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      {/* Background Decor */}
      <div className="fixed inset-0 bg-[#07070A] -z-20" />
      <div className="fixed top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#E5C57F] opacity-[0.03] blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* ============================================================== */}
      {/* BACK BUTTON (มุมซ้ายบนสไตล์ HSR) */}
      {/* ============================================================== */}
      <Link href="/" className="absolute top-6 left-6 md:top-8 md:left-8 z-30 text-[#E5C57F] hover:underline tracking-widest text-xs md:text-sm drop-shadow-md uppercase animate-page">
        ← RETURN TO HOME
      </Link>

      {/* Header (เอาปุ่มเก่าออกแล้ว) */}
      <header className="mb-10 border-b border-[#E5C57F]/20 pb-6 animate-page">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-white uppercase drop-shadow-md">
            Equipment <span className="text-[#E5C57F]">Archive</span>
          </h1>
          <p className="text-gray-500 tracking-[0.3em] uppercase text-xs mt-2">Astral Express Logistics Database</p>
        </div>
      </header>

      {/* TABS CONTROLLER */}
      <div className="flex gap-4 mb-12 animate-page" style={{ animationDelay: '0.1s' }}>
        <button 
          onClick={() => setActiveTab('relics')}
          className={`px-8 py-4 uppercase tracking-[0.2em] font-bold text-sm transition-all duration-300 border-b-2 ${
            activeTab === 'relics' 
              ? 'text-[#E5C57F] border-[#E5C57F] bg-white/5' 
              : 'text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/5'
          }`}
        >
          Relic Sets
        </button>
        <button 
          onClick={() => setActiveTab('lightcones')}
          className={`px-8 py-4 uppercase tracking-[0.2em] font-bold text-sm transition-all duration-300 border-b-2 ${
            activeTab === 'lightcones' 
              ? 'text-[#E5C57F] border-[#E5C57F] bg-white/5' 
              : 'text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/5'
          }`}
        >
          Light Cones
        </button>
      </div>

      {/* CONTENT AREA */}
      <div key={activeTab} className="animate-tab-content">
        
        {/* RELICS TAB */}
        {activeTab === 'relics' && (
          <section className="flex flex-col gap-12">
            {Object.entries(relicsBySet).map(([setName, data]: [string, any], index) => (
              <div 
                key={setName} 
                className="bg-white/[0.02] border border-white/5 p-8 rounded-md animate-tab-content"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Set Header */}
                <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
                  <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center border border-[#E5C57F]/30 p-2 shadow-[0_0_15px_rgba(229,197,127,0.1)]">
                    <img src={data.path?.icon_url} alt={data.path?.path_name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#E5C57F] tracking-widest uppercase">{setName}</h3>
                    <span className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">Path Relation: {data.path?.path_name}</span>
                  </div>
                </div>

                {/* Rarities Sub-Group System */}
                <div className="space-y-10">
                  {Object.entries(data.rarities)
                    .sort((a, b) => Number(b[0]) - Number(a[0]))
                    .map(([rarity, items]: [string, any]) => (
                      <div key={rarity} className="space-y-4">
                        
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono font-bold text-[#E5C57F] bg-[#E5C57F]/10 border border-[#E5C57F]/20 px-3 py-0.5 rounded-sm tracking-widest">
                            {'★'.repeat(Number(rarity))} GRADE
                          </span>
                          <div className="flex-1 h-[1px] bg-white/[0.03]" />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          {items.map((relic: any) => (
                            <div key={relic.id} className="group relative bg-[#0B0B12] border border-white/10 hover:border-[#E5C57F]/50 rounded-sm overflow-hidden transition-all duration-300 flex flex-col items-center p-4">
                              <span className="absolute top-2 left-2 text-[#E5C57F] text-[10px]">{'★'.repeat(relic.rarity)}</span>
                              <span className="absolute top-2 right-2 text-gray-500 text-[9px] tracking-widest font-mono uppercase">{relic.piece_type}</span>
                              
                              <div className="w-24 h-24 my-4 relative">
                                <img src={relic.image_url || 'https://iili.io/C9QECvV.png'} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" alt={relic.name} />
                              </div>
                              
                              <h4 className="text-xs font-bold text-white text-center uppercase tracking-wider mb-2 line-clamp-2text-white font-bold text-sm text-wrap break-words leading-tight">{relic.name}</h4>
                              
                              <p className="text-[10px] text-[#E5C57F] text-center tracking-widest font-mono bg-white/5 px-3 py-1 rounded-sm w-full">
                                {getStatPrefix(relic.piece_type)}{relic.min_stat} - {relic.max_stat}{relic.piece_type === 'SPHERE' ? '%' : ''}
                              </p>
                            </div>
                          ))}
                        </div>

                      </div>
                    ))}
                </div>

              </div>
            ))}
          </section>
        )}

        {/* LIGHT CONES TAB */}
        {activeTab === 'lightcones' && (
          <section className="flex flex-col gap-12">
            {Object.entries(lightConesByPath).map(([pathName, data]: [string, any], index) => (
              <div 
                key={pathName}
                className="animate-tab-content"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-4 mb-6 border-l-2 border-[#E5C57F] pl-4">
                  <img src={data.path?.icon_url} alt={pathName} className="w-8 h-8 object-contain" />
                  <h3 className="text-lg font-bold text-[#E5C57F] tracking-widest uppercase">{pathName}</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
                  {data.items.map((lc: any) => (
                    <div key={lc.id} className="group relative bg-[#0B0B12] border border-white/5 hover:border-[#E5C57F]/80 rounded-sm overflow-hidden transition-all duration-300">
                      <div className="aspect-[3/4] relative overflow-hidden flex items-center justify-center">
                        <img src={lc.image_url || 'https://iili.io/C9QECvV.png'} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" alt={lc.name} />
                        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col justify-end pointer-events-none">
                        <span className="text-[#E5C57F] text-[10px] mb-1 drop-shadow-md">{'★'.repeat(lc.rarity)}</span>
                        <h4 className="text-[10px] font-bold text-white uppercase tracking-widest line-clamp-2 leading-tight drop-shadow-md">
                          {lc.name}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>

    </main>
  );
}