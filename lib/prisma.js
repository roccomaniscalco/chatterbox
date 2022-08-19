import { PrismaClient } from "@prisma/client";

export const getPrisma = () => {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  return global.prisma;
};
