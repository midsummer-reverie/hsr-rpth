// app/admin/dashboard/page.tsx
import Link from 'next/link';

export default function AdminDashboard() {
  const themeStyles = {
    '--hsr-gold': '#E5C57F',
    '--hsr-border': 'rgba(229, 197, 127, 0.2)',
    fontFamily: '"Google Sans", sans-serif'
  } as React.CSSProperties;

  const adminTools = [
    { id: '01', title: 'COMBAT SYSTEM', subtitle: 'ระบบคำนวณการต่อสู้และดาเมจ', href: '/admin/combat', icon: '⚔️', color: '#E5C57F' },
    { id: '02', title: 'PERFORMANCE', subtitle: 'สรุปผลงานและการเติบโตของผู้เล่น', href: '/admin/performance', icon: '📊', color: '#60A5FA' },
    { id: '03', title: 'SPARE SPACE', subtitle: 'เว้นไว้ก่อน ใส่ไรดี', href: '/npcs', icon: '📜', color: '#F87171' },
    { id: '04', title: 'INTEL EDITOR', subtitle: 'จัดการเนื้อเรื่อง NPC และฝ่ายต่างๆ', href: '/admin/dashboard/database', icon: '📜', color: '#F87171' },
  ];

  return (
    <main 
      className="min-h-screen text-gray-200 relative flex flex-col items-center justify-center p-6 md:p-12"
      style={{ ...themeStyles, backgroundColor: '#0B0B12' }}
    >
      {/* 👇 เพิ่มบล็อก Style ดึงฟอนต์กลับมาให้เหมือนหน้าอื่น 👇 */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap');
      `}} />

      <div className="max-w-6xl w-full relative z-10">
        {/* Header */}
        <div className="mb-12 text-center stagger-up" style={{ '--delay': '0.2s' } as React.CSSProperties}>
          <h1 className="text-5xl font-light tracking-[0.3em] text-white uppercase mb-4">
            Overseer <span className="font-bold text-[#E5C57F]">Portal</span>
          </h1>
          <div className="h-[1px] w-48 bg-[#E5C57F] mx-auto opacity-50" />
        </div>

        {/* Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminTools.map((tool, index) => (
            <Link 
              key={tool.id} 
              href={tool.href}
              target={tool.isExternal ? "_blank" : "_self"}
              className="group relative bg-white/5 border border-white/10 p-8 rounded-sm overflow-hidden transition-all duration-500 hover:border-[#E5C57F]/50 hover:bg-[#E5C57F]/5 stagger-up"
              style={{ '--delay': `${0.3 + (index * 0.1)}s` } as React.CSSProperties}
            >
              <div className="flex justify-between items-start mb-10">
                <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">{tool.icon}</span>
                <span className="text-[10px] text-gray-600 group-hover:text-[#E5C57F] tracking-widest">{tool.id}</span>
              </div>
              
              <h2 className="text-2xl font-bold tracking-widest text-white group-hover:text-[#E5C57F] transition-colors mb-2 uppercase">
                {tool.title}
              </h2>
              <p className="text-xs text-gray-500 tracking-wider group-hover:text-gray-400 transition-colors uppercase">
                {tool.subtitle}
              </p>

              {/* Decorative Corner */}
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-[#E5C57F]/10 transform translate-x-6 translate-y-6 rotate-45 group-hover:bg-[#E5C57F]/20 transition-all" />
            </Link>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-16 text-center stagger-up" style={{ '--delay': '0.8s' } as React.CSSProperties}>
          <Link href="/" className="text-gray-500 hover:text-white text-xs tracking-widest uppercase transition-colors">
            ← BACK TO ARCHIVE HOME
          </Link>
        </div>
      </div>
    </main>
  );
}