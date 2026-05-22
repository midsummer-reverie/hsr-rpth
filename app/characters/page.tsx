// app/characters/page.tsx
import prisma from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export default async function CharacterRoster() {
  
  // ใส่ Discord ID ของแอดมินทั้ง 7 คนเพื่อกรองออก
  const adminIds = [
    BigInt(599591612452044800),
    BigInt(735379564687261757n),
    BigInt(1034097225581740092n),
    BigInt(743763848544256060n),
    BigInt(728223646450974732n),
    BigInt(1028023414247669860n),
    BigInt(827185963792203827n),
  ];

  // ดึงข้อมูลตัวละคร (ยกเว้นแอดมิน)
  const players = await prisma.users.findMany({
    where: {
      discord_id: { notIn: adminIds }
    },
    include: {
      paths: true,    
      elements: true, 
    },
    orderBy: { char_name: 'asc' }
  });

  // จัดกลุ่มตาม Path
  const paths = await prisma.paths.findMany({ orderBy: { path_id: 'asc' } });
  const groupedPlayers = paths.map(path => ({
    ...path,
    members: players.filter(p => p.path_id === path.path_id)
  })).filter(group => group.members.length > 0); 

  // CSS Variables สำหรับจัดการธีม HSR
  const themeStyles = {
    '--hsr-gold': '#E5C57F',
    '--hsr-border': 'rgba(229, 197, 127, 0.2)',
    '--hsr-panel-bg': 'rgba(20, 20, 28, 0.7)',
    '--icon-mask-url': 'url("https://iili.io/C9Q7TgI.png")',
    fontFamily: '"Google Sans", sans-serif'
  } as React.CSSProperties;

  return (
    <main 
      className="min-h-screen text-gray-200 p-6 md:p-12 relative overflow-x-hidden"
      style={{ ...themeStyles, backgroundColor: '#0B0B12' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap');
        
        @keyframes textGlow {
          0%, 100% { opacity: 0.8; text-shadow: 0 0 5px rgba(229, 197, 127, 0.2); }
          50% { opacity: 1; text-shadow: 0 0 15px rgba(229, 197, 127, 0.6); }
        }
        .animate-text-glow { animation: textGlow 4s ease-in-out infinite; }
      `}} />

      {/* Header Section - เลื่อนขึ้นมาเป็นอันดับแรก */}
      <div 
        className="max-w-7xl mx-auto mb-12 stagger-up" 
        style={{ '--delay': '0.1s' } as React.CSSProperties}
      >
        <Link href="/" className="text-[#E5C57F] hover:underline text-sm tracking-widest mb-4 inline-block">
          ← BACK TO ARCHIVE
        </Link>
        <h1 className="text-4xl font-light tracking-[0.3em] uppercase animate-text-glow">
          Trailblazer <span className="font-bold text-[#E5C57F]">Roster</span>
        </h1>
        <div className="h-[1px] w-full mt-4" style={{ background: 'linear-gradient(to right, var(--hsr-gold), transparent)' }} />
      </div>

      {/* Character Grid Section */}
      <div className="max-w-7xl mx-auto space-y-16">
        {groupedPlayers.map((group, index) => (
          <section 
            key={group.path_id}
            className="stagger-up"
            style={{ '--delay': `${0.2 + (index * 0.1)}s` } as React.CSSProperties}
          >
            {/* แต่ละ Path จะทยอยเลื่อนขึ้นมาตามลำดับ index */}
            {/* Path Header */}
            <div className="flex items-center gap-4 mb-8 border-b pb-4" style={{ borderColor: 'var(--hsr-border)' }}>
              <div className="w-12 h-12 flex-shrink-0">
                <img src={group.icon_url || ''} alt={group.path_name} className="w-full h-full object-contain filter drop-shadow-[0_0_5px_rgba(229,197,127,0.5)]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-widest uppercase text-white">{group.path_name_th}</h2>
                <p className="text-[10px] tracking-[0.3em] text-[#E5C57F] uppercase">{group.path_name}</p>
              </div>
            </div>

            {/* Characters in this Path */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {group.members.map(player => (
                <CharacterCard key={player.uid} data={player} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

// ================= COMPONENT: CHARACTER CARD =================
function CharacterCard({ data }: { data: any }) {
  return (
    <Link 
      href={`/characters/${data.uid}`}
      className="group relative aspect-[3/4] rounded-sm overflow-hidden border transition-all duration-500 hover:scale-105 shadow-xl block"
      style={{ borderColor: 'var(--hsr-border)', backgroundColor: '#14141C' }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${data.profile_img || 'https://iili.io/your_placeholder.png'})`, opacity: 0.8 }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

      <div className="absolute top-2 left-2 w-8 h-8 z-20">
        {data.elements?.icon_url && (
          <img 
            src={data.elements.icon_url} 
            alt={data.elements.element_name_en} 
            className="w-full h-full object-contain filter drop-shadow-[0_0_3px_black]" 
          />
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
        <p className="text-white font-bold text-sm truncate drop-shadow-lg">{data.char_name}</p>
        <p className="text-[10px] text-[#E5C57F] tracking-wider truncate opacity-80">
          {data.display_name || data.discord_id.toString()}
        </p>
      </div>

      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#E5C57F]/40 transition-all duration-500 pointer-events-none" />
      
      <div 
        className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10 pointer-events-none rotate-12"
        style={{
          backgroundColor: 'white',
          maskImage: 'var(--icon-mask-url)',
          WebkitMaskImage: 'var(--icon-mask-url)',
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
        }}
      />
    </Link>
  );
}