import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getRuntimeDatabaseUrl() {
  const value = process.env.DATABASE_URL;
  if (!value) return value;

  try {
    const url = new URL(value);
    const isSupabaseTransactionPooler =
      url.hostname.endsWith(".pooler.supabase.com") && url.port === "6543";

    if (isSupabaseTransactionPooler) {
      // Supabase transaction mode does not support prepared statements.
      // Prisma's pgbouncer flag disables them; connection_limit=1 is recommended
      // for serverless runtimes such as Vercel.
      if (!url.searchParams.has("pgbouncer")) {
        url.searchParams.set("pgbouncer", "true");
      }
      if (!url.searchParams.has("connection_limit")) {
        url.searchParams.set("connection_limit", "1");
      }
    }

    return url.toString();
  } catch {
    // Preserve the original value so Prisma can surface a useful connection error.
    return value;
  }
}

// Configure Prisma for serverless environments with connection pooling.
const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    datasourceUrl: getRuntimeDatabaseUrl(),
  });
};

export const db = globalForPrisma.prisma ?? prismaClientSingleton();

// Always reuse the same instance to prevent connection pool exhaustion.
globalForPrisma.prisma = db;
