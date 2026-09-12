function normalizeDatabaseUrl() {
  const value = process.env.DATABASE_URL;
  if (!value) return;

  try {
    const url = new URL(value);
    const isSupabaseTransactionPooler =
      url.hostname.endsWith(".pooler.supabase.com") && url.port === "6543";

    if (isSupabaseTransactionPooler) {
      url.searchParams.set("pgbouncer", "true");

      // This script runs as a single, short-lived bulk-import process during the
      // controlled bootstrap deployment. Match Prisma's pool to the importer's
      // bounded concurrency so the 2k+ row snapshot completes well within the
      // build window. The normal app runtime keeps its conservative limit of 1.
      const importConnectionLimit =
        process.env.CONTENT_IMPORT_CONNECTION_LIMIT || "8";
      url.searchParams.set("connection_limit", importConnectionLimit);
      process.env.DATABASE_URL = url.toString();

      console.log(
        `🔌 Content import using Supabase transaction pooler with connection_limit=${importConnectionLimit}`
      );
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
