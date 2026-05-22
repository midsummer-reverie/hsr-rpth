// app/monsters/page.tsx
import prisma from '@/lib/prisma';
import MonsterClient from './MonsterClient';

export const dynamic = 'force-dynamic';
export default async function MonstersPage() {
  const rawMonsters = await prisma.monster_templates.findMany({
    include: { monster_skills: true },
    orderBy: [
      { rank: 'desc' },
      { name: 'asc' }
    ]
  });

  // 🌟 ดึงข้อมูลธาตุทั้งหมดจาก Database
  const elementsData = await prisma.elements.findMany();

  const monstersByFaction = rawMonsters.reduce((acc, monster) => {
    const factionName = monster.faction || 'Unclassified Entities';
    if (!acc[factionName]) acc[factionName] = [];
    acc[factionName].push(monster);
    return acc;
  }, {} as Record<string, typeof rawMonsters>);

  // 🌟 ส่ง elements พ่วงไปให้ Client ด้วย
  return <MonsterClient monstersByFaction={monstersByFaction} elements={elementsData} />;
}