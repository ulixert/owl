import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  omit: {
    user: {
      role: true,
      password: true,
    },
  },
});
