import { defineConfig } from '@prisma/config'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrate: {
    databaseUrl: process.env.DIRECT_URL, // <--- แก้เป็น DIRECT_URL ตรงนี้ครับ
  },
  database: {
    url: process.env.DATABASE_URL,
    directUrl: process.env.DIRECT_URL,
  }
})