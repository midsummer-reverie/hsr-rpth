// app/api/npcs/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: ดึงรายชื่อ NPC ทั้งหมด
export async function GET() {
  try {
    const npcs = await prisma.npcs.findMany({
      orderBy: { name: 'asc' }
    });
    return NextResponse.json(npcs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch NPCs' }, { status: 500 });
  }
}

// POST: สร้าง NPC ใหม่
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const pathId = body.path_id ? parseInt(body.path_id) : null;
    const elementId = body.element_id ? parseInt(body.element_id) : null;

    const newNpc = await prisma.npcs.create({
      data: {
        name: body.name, faction: body.faction,
        profile_img: body.profile_img || null, splash_img: body.splash_img || null,
        path_id: pathId, element_id: elementId,
        story_1: body.story_1 || null, is_story_1_locked: body.is_story_1_locked,
        story_2: body.story_2 || null, is_story_2_locked: body.is_story_2_locked,
        story_3: body.story_3 || null, is_story_3_locked: body.is_story_3_locked,
        story_4: body.story_4 || null, is_story_4_locked: body.is_story_4_locked,
        story_5: body.story_5 || null, is_story_5_locked: body.is_story_5_locked,
      },
    });
    return NextResponse.json(newNpc, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Database Write Failure' }, { status: 500 });
  }
}

// PUT: อัปเดตข้อมูล NPC เดิม
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body; 
    const pathId = updateData.path_id ? parseInt(updateData.path_id) : null;
    const elementId = updateData.element_id ? parseInt(updateData.element_id) : null;

    const updatedNpc = await prisma.npcs.update({
      where: { id: parseInt(id) },
      data: {
        name: updateData.name, faction: updateData.faction,
        profile_img: updateData.profile_img || null, splash_img: updateData.splash_img || null,
        path_id: pathId, element_id: elementId,
        story_1: updateData.story_1 || null, is_story_1_locked: updateData.is_story_1_locked,
        story_2: updateData.story_2 || null, is_story_2_locked: updateData.is_story_2_locked,
        story_3: updateData.story_3 || null, is_story_3_locked: updateData.is_story_3_locked,
        story_4: updateData.story_4 || null, is_story_4_locked: updateData.is_story_4_locked,
        story_5: updateData.story_5 || null, is_story_5_locked: updateData.is_story_5_locked,
      },
    });
    return NextResponse.json(updatedNpc, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Database Update Failure' }, { status: 500 });
  }
}