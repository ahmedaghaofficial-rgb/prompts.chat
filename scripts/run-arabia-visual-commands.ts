import { PrismaClient } from "@prisma/client";
import {
  importArabiaVisualCommands,
  validateArabiaVisualCommands,
} from "./import-arabia-visual-commands";

function normalizeDatabaseUrl() {
  const value = process.env.DATABASE_URL;
  if (!value) return;

  try {
    const url = new URL(value);
    const isSupabaseTransactionPooler =
      url.hostname.endsWith(".pooler.supabase.com") && url.port === "6543";

    if (isSupabaseTransactionPooler) {
      if (!url.searchParams.has("pgbouncer")) {
        url.searchParams.set("pgbouncer", "true");
      }
      if (!url.searchParams.has("connection_limit")) {
        url.searchParams.set("connection_limit", "1");
      }
      process.env.DATABASE_URL = url.toString();
    }
  } catch {
    // Let Prisma surface the original connection error in write mode.
  }
}

async function main() {
  normalizeDatabaseUrl();
  validateArabiaVisualCommands();

  const writeMode =
    process.env.CONTENT_IMPORT_WRITE === "1" || process.env.VERCEL_ENV === "production";

  if (!writeMode) {
    console.log("🧪 Arabia visual commands dry run complete — 50 commands validated; no database writes.");
    return;
  }

  const prisma = new PrismaClient();
  try {
    const libraryUser = await prisma.user.upsert({
      where: { email: "library@local.invalid" },
      update: {
        username: "library",
        name: "Content Library",
        verified: true,
      },
      create: {
        email: "library@local.invalid",
        username: "library",
        name: "Content Library",
        role: "USER",
        verified: true,
        locale: "ar",
      },
    });

    await importArabiaVisualCommands(prisma, libraryUser.id);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("❌ Arabia visual commands import failed:", error);
  process.exit(1);
});
