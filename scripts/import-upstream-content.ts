import {
  PrismaClient,
  PromptType,
  StructuredFormat,
  RequiredMediaType,
} from "@prisma/client";

const prisma = new PrismaClient();

const UPSTREAM_URL =
  process.env.UPSTREAM_CONTENT_URL || "https://prompts.chat/prompts.json";
const PAGE_SIZE = 100;
const IMPORT_CONCURRENCY = 8;
const WRITE_MODE =
  process.env.CONTENT_IMPORT_WRITE === "1" || process.env.VERCEL_ENV === "production";

const SUPPORTED_TYPES = new Set<PromptType>([
  "TEXT",
  "IMAGE",
  "VIDEO",
  "AUDIO",
  "STRUCTURED",
  "SKILL",
  "TASTE",
]);

const SUPPORTED_FORMATS = new Set<StructuredFormat>(["JSON", "YAML"]);
const SUPPORTED_MEDIA_TYPES = new Set<RequiredMediaType>([
  "IMAGE",
  "VIDEO",
  "DOCUMENT",
]);

interface RemotePrompt {
  id: string;
  title: string;
  slug: string | null;
  description: string | null;
  content?: string;
  type: string;
  structuredFormat: string | null;
  mediaUrl: string | null;
  viewCount: number;
  isFeatured: boolean;
  featuredAt: string | null;
  requiresMediaUpload: boolean;
  requiredMediaType: string | null;
  requiredMediaCount: number | null;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    slug: string;
    icon: string | null;
  } | null;
  tags: Array<{
    id: string;
    name: string;
    slug: string;
    color: string | null;
  }>;
}

interface RemotePage {
  count: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
  prompts: RemotePrompt[];
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJsonWithRetry<T>(url: string, attempts = 4): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "prompts-chat-self-host-content-importer/1.0",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        await sleep(500 * attempt);
      }
    }
  }

  throw lastError;
}

async function fetchAllPrompts(): Promise<RemotePrompt[]> {
  console.log(`📡 Fetching full upstream library from ${UPSTREAM_URL}`);

  const firstUrl = `${UPSTREAM_URL}?full_content=true&page=1&limit=${PAGE_SIZE}`;
  const first = await fetchJsonWithRetry<RemotePage>(firstUrl);

  if (!Number.isInteger(first.count) || first.count <= 0) {
    throw new Error(`Upstream returned invalid count: ${first.count}`);
  }

  if (!Array.isArray(first.prompts) || first.prompts.length === 0) {
    throw new Error("Upstream returned zero prompts on page 1");
  }

  const all = [...first.prompts];
  const totalPages = Math.max(1, first.totalPages || Math.ceil(first.count / PAGE_SIZE));

  for (let page = 2; page <= totalPages; page++) {
    const url = `${UPSTREAM_URL}?full_content=true&page=${page}&limit=${PAGE_SIZE}`;
    const data = await fetchJsonWithRetry<RemotePage>(url);
    all.push(...data.prompts);
    console.log(`   fetched page ${page}/${totalPages} (${all.length}/${first.count})`);
    await sleep(75);
  }

  if (all.length !== first.count) {
    throw new Error(
      `Upstream count mismatch: expected ${first.count}, fetched ${all.length}`
    );
  }

  return all;
}

function validateAndSummarize(prompts: RemotePrompt[]) {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const counts = new Map<string, number>();
  let multiFileSkills = 0;

  for (const prompt of prompts) {
    if (!prompt.id || ids.has(prompt.id)) {
      throw new Error(`Duplicate or missing upstream id: ${prompt.id}`);
    }
    ids.add(prompt.id);

    const slug = prompt.slug || `upstream-${prompt.id}`;
    if (slugs.has(slug)) {
      throw new Error(`Duplicate upstream slug: ${slug}`);
    }
    slugs.add(slug);

    if (typeof prompt.content !== "string" || prompt.content.length === 0) {
      throw new Error(`Prompt has no full content: ${prompt.id} (${prompt.title})`);
    }

    if (!SUPPORTED_TYPES.has(prompt.type as PromptType)) {
      throw new Error(
        `Unsupported upstream type ${prompt.type} on ${prompt.id} (${prompt.title})`
      );
    }

    if (
      prompt.structuredFormat &&
      !SUPPORTED_FORMATS.has(prompt.structuredFormat as StructuredFormat)
    ) {
      throw new Error(
        `Unsupported structured format ${prompt.structuredFormat} on ${prompt.id}`
      );
    }

    if (
      prompt.requiredMediaType &&
      !SUPPORTED_MEDIA_TYPES.has(prompt.requiredMediaType as RequiredMediaType)
    ) {
      throw new Error(
        `Unsupported required media type ${prompt.requiredMediaType} on ${prompt.id}`
      );
    }

    counts.set(prompt.type, (counts.get(prompt.type) || 0) + 1);

    if (prompt.type === "SKILL" && prompt.content.includes("\x1FFILE:")) {
      multiFileSkills++;
    }
  }

  console.log("\n📊 Upstream content summary");
  console.log(`   total: ${prompts.length}`);
  for (const type of [
    "TEXT",
    "IMAGE",
    "VIDEO",
    "AUDIO",
    "STRUCTURED",
    "SKILL",
    "TASTE",
  ]) {
    console.log(`   ${type}: ${counts.get(type) || 0}`);
  }
  console.log(`   multi-file skills: ${multiFileSkills}`);

  return { counts, slugs };
}

async function getOrCreateLibraryUser() {
  return prisma.user.upsert({
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
      locale: "en",
    },
  });
}

async function buildTaxonomy(prompts: RemotePrompt[]) {
  const categorySource = new Map<
    string,
    { name: string; slug: string; icon: string | null }
  >();
  const tagSource = new Map<
    string,
    { name: string; slug: string; color: string | null }
  >();

  for (const prompt of prompts) {
    if (prompt.category) {
      categorySource.set(prompt.category.slug, {
        name: prompt.category.name,
        slug: prompt.category.slug,
        icon: prompt.category.icon,
      });
    }

    for (const tag of prompt.tags || []) {
      tagSource.set(tag.slug, {
        name: tag.name,
        slug: tag.slug,
        color: tag.color,
      });
    }
  }

  const categoryIds = new Map<string, string>();
  let order = 1;
  for (const category of categorySource.values()) {
    const saved = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        icon: category.icon,
        order,
      },
      create: {
        name: category.name,
        slug: category.slug,
        icon: category.icon,
        order,
      },
    });
    categoryIds.set(category.slug, saved.id);
    order++;
  }

  const tagIds = new Map<string, string>();
  for (const tag of tagSource.values()) {
    const saved = await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {
        name: tag.name,
        color: tag.color || "#6366f1",
      },
      create: {
        name: tag.name,
        slug: tag.slug,
        color: tag.color || "#6366f1",
      },
    });
    tagIds.set(tag.slug, saved.id);
  }

  console.log(
    `📁 Taxonomy ready: ${categoryIds.size} categories, ${tagIds.size} tags`
  );

  return { categoryIds, tagIds };
}

function promptData(
  remote: RemotePrompt,
  authorId: string,
  categoryIds: Map<string, string>
) {
  const type = remote.type as PromptType;
  const structuredFormat = remote.structuredFormat
    ? (remote.structuredFormat as StructuredFormat)
    : null;
  const requiredMediaType = remote.requiredMediaType
    ? (remote.requiredMediaType as RequiredMediaType)
    : null;

  return {
    title: remote.title,
    slug: remote.slug || `upstream-${remote.id}`,
    description: remote.description,
    content: remote.content!,
    type,
    structuredFormat,
    mediaUrl: remote.mediaUrl,
    viewCount: Number.isFinite(remote.viewCount) ? remote.viewCount : 0,
    isFeatured: Boolean(remote.isFeatured),
    featuredAt: remote.featuredAt ? new Date(remote.featuredAt) : null,
    requiresMediaUpload: Boolean(remote.requiresMediaUpload),
    requiredMediaType,
    requiredMediaCount: remote.requiredMediaCount,
    authorId,
    categoryId: remote.category
      ? categoryIds.get(remote.category.slug) || null
      : null,
    isPrivate: false,
    isUnlisted: false,
    deletedAt: null,
  };
}

async function importOnePrompt(
  remote: RemotePrompt,
  authorId: string,
  categoryIds: Map<string, string>,
  tagIds: Map<string, string>
) {
  const slug = remote.slug || `upstream-${remote.id}`;
  const desiredTagIds = (remote.tags || [])
    .map((tag) => tagIds.get(tag.slug))
    .filter((id): id is string => Boolean(id));

  const existing = await prisma.prompt.findFirst({
    where: { slug },
    select: { id: true, content: true },
  });

  if (!existing) {
    const created = await prisma.prompt.create({
      data: {
        ...promptData(remote, authorId, categoryIds),
        tags: {
          create: desiredTagIds.map((tagId) => ({ tagId })),
        },
      },
      select: { id: true },
    });

    await prisma.promptVersion.create({
      data: {
        promptId: created.id,
        version: 1,
        content: remote.content!,
        changeNote: "Initial upstream library import",
        createdBy: authorId,
      },
    });

    return "created" as const;
  }

  const contentChanged = existing.content !== remote.content;

  await prisma.prompt.update({
    where: { id: existing.id },
    data: {
      ...promptData(remote, authorId, categoryIds),
      tags: {
        deleteMany: {},
        create: desiredTagIds.map((tagId) => ({ tagId })),
      },
    },
  });

  const latestVersion = await prisma.promptVersion.findFirst({
    where: { promptId: existing.id },
    orderBy: { version: "desc" },
    select: { version: true },
  });

  if (!latestVersion || contentChanged) {
    await prisma.promptVersion.create({
      data: {
        promptId: existing.id,
        version: (latestVersion?.version || 0) + 1,
        content: remote.content!,
        changeNote: latestVersion
          ? "Synced from upstream library"
          : "Initial upstream library import",
        createdBy: authorId,
      },
    });
  }

  return contentChanged ? ("updated" as const) : ("unchanged" as const);
}

async function runPool<T>(
  items: T[],
  worker: (item: T) => Promise<"created" | "updated" | "unchanged">
) {
  let created = 0;
  let updated = 0;
  let unchanged = 0;

  for (let i = 0; i < items.length; i += IMPORT_CONCURRENCY) {
    const batch = items.slice(i, i + IMPORT_CONCURRENCY);
    const results = await Promise.all(batch.map(worker));

    for (const result of results) {
      if (result === "created") created++;
      if (result === "updated") updated++;
      if (result === "unchanged") unchanged++;
    }

    const done = Math.min(i + IMPORT_CONCURRENCY, items.length);
    if (done % 100 < IMPORT_CONCURRENCY || done === items.length) {
      console.log(`   imported ${done}/${items.length}`);
    }
  }

  return { created, updated, unchanged };
}

async function verifyImportedContent(prompts: RemotePrompt[]) {
  const expected = new Map(
    prompts.map((p) => [p.slug || `upstream-${p.id}`, p] as const)
  );
  const slugs = [...expected.keys()];

  const localRows = await prisma.prompt.findMany({
    where: { slug: { in: slugs } },
    select: {
      slug: true,
      content: true,
      type: true,
      isPrivate: true,
      isUnlisted: true,
      deletedAt: true,
    },
  });

  if (localRows.length !== prompts.length) {
    throw new Error(
      `Verification failed: expected ${prompts.length} imported rows, found ${localRows.length}`
    );
  }

  const localMap = new Map(localRows.map((row) => [row.slug!, row]));
  const mismatches: string[] = [];

  for (const [slug, remote] of expected) {
    const local = localMap.get(slug);
    if (!local) {
      mismatches.push(`${slug}: missing`);
      continue;
    }

    if (local.content !== remote.content) {
      mismatches.push(`${slug}: content mismatch`);
    }
    if (local.type !== remote.type) {
      mismatches.push(`${slug}: type ${local.type} != ${remote.type}`);
    }
    if (local.isPrivate || local.isUnlisted || local.deletedAt) {
      mismatches.push(`${slug}: not publicly visible`);
    }

    if (mismatches.length >= 20) break;
  }

  if (mismatches.length > 0) {
    throw new Error(
      `Verification failed:\n${mismatches.map((x) => ` - ${x}`).join("\n")}`
    );
  }

  const grouped = await prisma.prompt.groupBy({
    by: ["type"],
    where: { slug: { in: slugs } },
    _count: { _all: true },
  });

  console.log("\n✅ Verification passed");
  console.log(`   exact content matches: ${localRows.length}/${prompts.length}`);
  for (const row of grouped.sort((a, b) => a.type.localeCompare(b.type))) {
    console.log(`   ${row.type}: ${row._count._all}`);
  }
}

async function main() {
  console.log("🌱 Master content import starting");
  console.log(
    `   mode: ${WRITE_MODE ? "WRITE (production database)" : "DRY RUN (no database writes)"}`
  );

  const prompts = await fetchAllPrompts();
  validateAndSummarize(prompts);

  if (!WRITE_MODE) {
    console.log("\n🧪 Dry run complete — upstream library is valid; no DB writes performed.");
    return;
  }

  const libraryUser = await getOrCreateLibraryUser();
  const { categoryIds, tagIds } = await buildTaxonomy(prompts);

  const stats = await runPool(prompts, (prompt) =>
    importOnePrompt(prompt, libraryUser.id, categoryIds, tagIds)
  );

  console.log("\n📝 Import finished");
  console.log(`   created: ${stats.created}`);
  console.log(`   updated: ${stats.updated}`);
  console.log(`   unchanged: ${stats.unchanged}`);

  await verifyImportedContent(prompts);
  console.log("\n🎉 Master content import completed successfully.");
}

main()
  .catch((error) => {
    console.error("❌ Master content import failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
