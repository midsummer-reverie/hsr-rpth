// app/admin/dashboard/clues/page.tsx
import prisma from '@/lib/prisma';
import ClueEditorForm from './ClueEditorForm';

export const dynamic = 'force-dynamic';

export default async function ClueEditorPage() {
  const characters = await prisma.users.findMany({
    where: {
      char_name: {
        not: null // กรองเอาเฉพาะคนที่กรอกชื่อตัวละครแล้ว
      }
    },
    orderBy: { char_name: 'asc' },
    select: {
      uid: true,        // ใช้ uid แทน id
      char_name: true   // ใช้ char_name แทน name
    }
  });

  return <ClueEditorForm characters={characters} />;
}