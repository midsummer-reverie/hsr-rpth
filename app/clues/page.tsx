import Link from 'next/link';
import prisma from '@/lib/prisma';
import ClueBoard from '../components/ClueBoard';

export const dynamic = 'force-dynamic';

export default async function AllCluesPage() {
  const allClues = await prisma.clue.findMany({
    orderBy: { created_at: 'desc' }
  });

  const themeStyles = {
    '--hsr-gold': '#E5C57F',
    '--hsr-border': 'rgba(229, 197, 127, 0.2)',
    '--hsr-panel-bg': 'rgba(20, 20, 28, 0.6)',
    fontFamily: '"Google Sans", sans-serif'
  } as React.CSSProperties;

  return (
    <main className="min-h-screen p-6 md:p-12 relative overflow-x-hidden text-gray-200" style={{ ...themeStyles, backgroundColor: '#0B0B12' }}>
      <div className="max-w-6xl mx-auto stagger-up">
        <Link href="/" className="text-[#E5C57F] hover:underline text-sm tracking-widest mb-8 inline-block">
          ← BACK TO ARCHIVE
        </Link>
        
        {/* ตรงนี้สำคัญครับ: สั่งให้เปิดใช้งานตัวกรอง */}
        <ClueBoard clues={allClues} showAllButton={false} showFilter={true} />
      </div>
    </main>
  );
}