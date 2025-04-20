// Adjust this path based on your ACTUAL 'output' setting in schema.prisma
import { PrismaClient } from "../generated/prisma"; // <--- TRY THIS IMPORT PATH

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") {
  global.prisma = prisma;
}

export default prisma;
