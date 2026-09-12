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
    // Let Prisma surface the original connection error.
  }
}

async function main() {
  normalizeDatabaseUrl();
  await import("./import-upstream-content");
}

main().catch((error) => {
  console.error("❌ Content import bootstrap failed:", error);
  process.exit(1);
});
