// src/lib/prisma.ts
import "dotenv/config"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { PrismaClient } from "../../generated/prisma/client"

const prismaClientSingleton = () => {
  const adapter = new PrismaMariaDb(process.env.DATABASE_URL!)
  return new PrismaClient({ adapter })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma

export default prisma