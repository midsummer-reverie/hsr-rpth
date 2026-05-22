// app/npcs/[id]/page.tsx
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export default async function NpcDetail({ params }: { params: Promise<{ id: string }> }) {
  
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);

  const npc = await prisma.npcs.findUnique({
    where: { id: id },
    include: {
      paths: true,
      elements: true,
    }
  });

  if (!npc) notFound();

  // จัดกลุ่มเนื้อเรื่องทั้ง 5 พาร์ทเพื่อง่ายต่อการ Loop แสดงผล
  const stories = [
    { part: 1, content: npc.story_1, isLocked: npc.is_story_1_locked },
    { part: 2, content: npc.story_2, isLocked: npc.is_story_2_locked },
    { part: 3, content: npc.story_3, isLocked: npc.is_story_3_locked },
    { part: 4, content: npc.story_4, isLocked: npc.is_story_4_locked },
    { part: 5, content: npc.story_5, isLocked: npc.is_story_5_locked },
  ];

  const themeStyles = {
    '--hsr-gold': '#E5C57F',
    '--hsr-border': 'rgba(229, 197, 127, 0.2)',
    '--hsr-panel-bg': 'rgba(15, 15, 22, 0.85)',
    '--icon-mask-url': 'url("https://iili.io/C9Q7TgI.png")',
    fontFamily: '"Google Sans", sans-serif'
  } as React.CSSProperties;

  return (
    <main 
      className="min-h-screen text-gray-200 relative overflow-hidden flex flex-col md:flex-row"
      style={{ ...themeStyles, backgroundColor: '#07070A' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap');
      `}} />

      {/* Decorative Background */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-white opacity-[0.01] blur-[120px] rounded-full pointer-events-none" />

      {/* ================= LEFT SIDE: NPC Splash Art (สไลด์จากซ้าย) ================= */}
      <section 
        className="relative w-full md:w-[40%] h-[50vh] md:h-screen flex items-center justify-center p-8 stagger-left"
        style={{ '--delay': '0.1s' } as React.CSSProperties}
      >
        <Link href="/npcs" className="absolute top-8 left-8 z-30 text-gray-400 hover:text-white hover:underline tracking-widest text-sm drop-shadow-md transition-colors">
          ← BACK TO INTEL
        </Link>
        
        <div className="relative w-full max-w-sm aspect-[2/3] group rounded-md overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black/20 grayscale-[10%]">
            
            {/* ภาพ Splash Art หรือ Profile */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10 opacity-90 transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${npc.splash_img || npc.profile_img || 'https://iili.io/your_placeholder_big.png'}')` }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none" />

            {/* แสดงลายน้ำเป็น Faction ถ้าไม่มี Path */}
            {npc.paths?.icon_url && (
              <div 
                  className="absolute inset-0 opacity-[0.04] z-0 pointer-events-none"
                  style={{
                      backgroundColor: '#E5C57F',
                      maskImage: `url(${npc.paths.icon_url})`,
                      WebkitMaskImage: `url(${npc.paths.icon_url})`,
                      maskSize: '150%',
                      WebkitMaskSize: '150%',
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center 20%',
                      WebkitMaskPosition: 'center 20%',
                  }}
              />
            )}
        </div>
      </section>

      {/* ================= RIGHT SIDE: Data Panel (สไลด์จากขวา) ================= */}
      <section 
        className="w-full md:w-[60%] min-h-screen overflow-y-auto p-8 md:p-16 z-20 custom-scrollbar border-l border-white/5 stagger-right"
        style={{ backgroundColor: 'var(--hsr-panel-bg)', '--delay': '0.2s' } as React.CSSProperties}
      >
        
        {/* HEADER: NPC Name & Faction (ดันขึ้นมา) */}
        <div className="mb-10 stagger-up" style={{ '--delay': '0.3s' } as React.CSSProperties}>
            <p className="text-sm text-gray-500 tracking-[0.3em] uppercase mb-2 border-l-2 border-gray-600 pl-3">
              Faction: <span className="text-gray-300 font-bold">{npc.faction}</span>
            </p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-6 uppercase">{npc.name}</h1>
            
            {/* Badges: แสดงเฉพาะเมื่อมีข้อมูล Path / Element */}
            {(npc.paths || npc.elements) && (
              <div className="flex flex-wrap items-center gap-4 mt-6">
                  {npc.paths && (
                    <div className="flex items-center gap-3 p-3 px-5 bg-white/5 border-l-2 border-[#E5C57F] w-fit">
                        <img src={npc.paths.icon_url || ''} className="w-6 h-6 object-contain filter grayscale" alt="Path" />
                        <span className="text-sm tracking-[0.2em] text-[#E5C57F] uppercase font-bold">
                            {npc.paths.path_name}
                        </span>
                    </div>
                  )}

                  {npc.elements && (
                    <div className="flex items-center gap-3 p-3 px-5 bg-white/5 border-l-2 border-gray-400 w-fit">
                        <img src={npc.elements.icon_url || ''} className="w-6 h-6 object-contain filter grayscale" alt="Element" />
                        <span className="text-sm tracking-[0.2em] text-gray-300 uppercase font-bold">
                            {npc.elements.element_name_en}
                        </span>
                    </div>
                  )}
              </div>
            )}
        </div>

        {/* SECTION: INTEL RECORDS (5 Parts Story) */}
        <div>
            <h3 
              className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-8 flex items-center gap-4 stagger-up"
              style={{ '--delay': '0.4s' } as React.CSSProperties}
            >
                <span>Personnel Records</span>
                <div className="flex-1 h-[1px] bg-white/10" />
            </h3>

            <div className="space-y-6 max-w-3xl">
                {stories.map((story, index) => (
                    <div 
                      key={story.part} 
                      className="border border-white/5 bg-black/40 rounded-sm relative overflow-hidden group hover:border-white/10 transition-colors stagger-up"
                      style={{ '--delay': `${0.5 + (index * 0.1)}s` } as React.CSSProperties}
                    >
                        
                        {/* ขีดตกแต่งด้านซ้าย */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-600 to-transparent opacity-50" />

                        <div className="p-5 pl-6">
                            <h4 className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                                Fragment {story.part}
                            </h4>

                            {/* เงื่อนไขเช็กล็อก */}
                            {story.isLocked ? (
                                <div className="flex flex-col gap-2 p-4 bg-red-900/10 border border-red-500/20 rounded-sm mt-2">
                                    <div className="flex items-center gap-3 text-red-400">
                                        <span className="text-lg">🔒</span>
                                        <span className="text-sm font-bold tracking-widest uppercase">Access Denied</span>
                                    </div>
                                    <p className="text-xs text-red-400/60 font-mono">
                                        ██████████ DATA CLASSIFIED. Requires higher clearance or progression to unlock.
                                    </p>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {story.content || <span className="italic text-gray-600">No data recorded.</span>}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <p 
              className="text-[10px] text-gray-600 mt-10 italic border-t border-white/5 pt-4 stagger-up"
              style={{ '--delay': '1.1s' } as React.CSSProperties}
            >
               * Records maintained by the Interastral Peace Corporation. Unauthorized access is strictly prohibited.
            </p>
        </div>

      </section>
    </main>
  );
}