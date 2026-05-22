// app/monsters/MonsterClient.tsx
'use client';

import Link from 'next/link';

interface Props {
  monstersByFaction: any;
  elements: any[]; 
}

export default function MonsterClient({ monstersByFaction, elements }: Props) {
  
  const getRankInfo = (rank: number) => {
    switch(rank) {
      case 3: return { name: 'BOSS', color: 'text-red-400 border-red-500/30 bg-red-500/10', glow: 'group-hover:border-red-500/50' };
      case 2: return { name: 'ELITE', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10', glow: 'group-hover:border-purple-500/50' };
      default: return { name: 'MINION', color: 'text-gray-400 border-gray-500/30 bg-gray-500/10', glow: 'group-hover:border-gray-400/50' };
    }
  };

  const getElementData = (weaknessName: string) => {
    const lowerName = weaknessName.toLowerCase();
    const found = elements.find(
      (e) => e.element_name_en.toLowerCase() === lowerName || e.element_name_th === weaknessName
    );
    return found || null;
  };

  return (
    <main 
      className="min-h-screen bg-[#07070A] text-gray-200 relative p-8 md:p-16 pt-16 md:pt-20 custom-scrollbar"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap');
        @keyframes pageEnter { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-page { animation: pageEnter 1.0s ease-in-out forwards; }
      `}} />

      <div className="fixed inset-0 bg-[#07070A] -z-20" />
      <div className="fixed top-[-10%] left-[-10%] w-[800px] h-[800px] bg-red-900 opacity-[0.02] blur-[150px] rounded-full pointer-events-none -z-10" />

      <Link href="/" className="absolute top-6 left-6 md:top-8 md:left-8 z-30 text-[#E5C57F] hover:underline tracking-widest text-xs md:text-sm drop-shadow-md uppercase animate-page">
        ← RETURN TO HOME
      </Link>

      <header className="mb-16 border-b border-white/10 pb-6 animate-page">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-white uppercase drop-shadow-md">
            Enemy <span className="text-red-500">Database</span>
          </h1>
          <p className="text-gray-500 tracking-[0.3em] uppercase text-xs mt-2">Interastral Peace Corporation Threat Index</p>
        </div>
      </header>

      <div className="flex flex-col gap-16 animate-page" style={{ animationDelay: '0.1s' }}>
        {Object.entries(monstersByFaction).map(([factionName, items]: [string, any]) => (
          <section key={factionName} className="bg-white/[0.01] border border-white/5 p-8 rounded-md">
            
            <div className="mb-8 border-b border-white/5 pb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#E5C57F] tracking-widest uppercase pl-4 border-l-2 border-[#E5C57F]">
                {factionName}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {items.map((monster: any) => {
                const rankInfo = getRankInfo(monster.rank);
                
                return (
                  <div key={monster.monster_id} className={`group flex flex-col bg-[#0B0B12] border border-white/10 ${rankInfo.glow} rounded-sm overflow-hidden transition-all duration-300`}>
                    
                    <div className="h-[200px] relative bg-black/40 overflow-hidden border-b border-white/5 flex items-center justify-center p-4">
                      <div className={`absolute top-3 left-3 px-2 py-1 text-[9px] font-bold tracking-widest border rounded-sm z-10 ${rankInfo.color}`}>
                        {rankInfo.name}
                      </div>
                      <img 
                        src={monster.image_url || 'https://iili.io/C9QECvV.png'} 
                        alt={monster.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-xl opacity-80 group-hover:opacity-100"
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-5 line-clamp-1">{monster.name}</h3>
                      
                      <div className="grid grid-cols-4 gap-2 mb-6">
                        <div className="bg-white/[0.02] py-2 flex flex-col items-center border-t-2 border-red-500/50">
                          <span className="text-[8px] text-gray-500 uppercase tracking-widest mb-1">HP</span>
                          <span className="text-xs font-mono text-white font-bold">{monster.max_hp}</span>
                        </div>
                        <div className="bg-white/[0.02] py-2 flex flex-col items-center border-t-2 border-[#E5C57F]/50">
                          <span className="text-[8px] text-gray-500 uppercase tracking-widest mb-1">ATK</span>
                          <span className="text-xs font-mono text-white font-bold">{monster.atk}</span>
                        </div>
                        <div className="bg-white/[0.02] py-2 flex flex-col items-center border-t-2 border-blue-500/50">
                          <span className="text-[8px] text-gray-500 uppercase tracking-widest mb-1">DEF</span>
                          <span className="text-xs font-mono text-white font-bold">{monster.def}</span>
                        </div>
                        <div className="bg-white/[0.02] py-2 flex flex-col items-center border-t-2 border-gray-400/50">
                          <span className="text-[8px] text-gray-500 uppercase tracking-widest mb-1">Tough</span>
                          <span className="text-xs font-mono text-white font-bold">{monster.toughness}</span>
                        </div>
                      </div>

                      {monster.weakness && monster.weakness.length > 0 && (
                        <div className="mt-auto pt-4 border-t border-white/5">
                          <span className="block text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-3">Weaknesses</span>
                          <div className="flex flex-wrap gap-2">
                            {monster.weakness.map((w: string, i: number) => {
                              const elData = getElementData(w);
                              
                              // 🌟 เช็คและเติม # ให้ Hex Code ป้องกัน CSS Error 🌟
                              const hexRaw = elData?.color_hex;
                              const safeColor = hexRaw 
                                ? (hexRaw.startsWith('#') ? hexRaw : `#${hexRaw}`) 
                                : '#D1D5DB';
                              
                              return (
                                <div key={i} className="flex items-center justify-center gap-1.5 px-2.5 py-1 bg-black/40 border border-white/10 rounded-full h-[24px]">
                                  {elData?.icon_url && (
                                    <img 
                                      src={elData.icon_url} 
                                      alt={w} 
                                      className="w-4 h-4 object-contain"
                                      onError={(e) => e.currentTarget.style.display = 'none'} 
                                    />
                                  )}
                                  {/* 🌟 บีบ leading-none และดัน text ลงมา 1px เพื่อให้ Center เป๊ะๆ 🌟 */}
                                  <span 
                                    className="text-[10px] uppercase tracking-wider leading-none mt-[1px]"
                                    style={{ color: safeColor }}
                                  >
                                    {w}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      
                    </div>
                  </div>
                );
              })}
            </div>

          </section>
        ))}
      </div>
    </main>
  );
}