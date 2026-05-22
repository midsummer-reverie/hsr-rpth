import { PrismaClient } from '../prisma/generated/client' // หรือ @/prisma/generated/client ถ้าใช้ Alias
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const prismaClientSingleton = () => {
  // 1. ดึง URL จาก .env
  const connectionString = process.env.DATABASE_URL

  // 2. สร้าง Connection Pool และ Adapter (กฎใหม่ Prisma 7)
  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  
  // 3. ส่ง Adapter เข้าไปใน PrismaClient
  return new PrismaClient({ adapter })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma