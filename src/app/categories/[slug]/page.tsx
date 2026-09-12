import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import config from "@/../prompts.config";
import { Button } from "@/components/ui/button";
import { PromptList } from "@/components/prompts/prompt-list";
import { VisualCommandList } from "@/components/prompts/visual-command-list";
import { SubscribeButton } from "@/components/categories/subscribe-button";
import { CategoryFilters } from "@/components/categories/category-filters";
import { McpServerPopup } from "@/components/mcp/mcp-server-popup";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; sort?: string; q?: string }>;
}

const PROMPTS_PER_PAGE = 30;
const VISUAL_COMMANDS_SLUG = "arabia-visual-commands";

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await db.category.findUnique({
    where: { slug },
    select: { name: true, description: true },
  });

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: category.name,
    description: category.description || `Browse prompts in ${category.name}`,
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { page, sort, q } = await searchParams;
  const isVisualCommands = slug === VISUAL_COMMANDS_SLUG;
  const promptsPerPage = isVisualCommands ? 60 : PROMPTS_PER_PAGE;
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);
  const sortOption = sort || "newest";
  const session = await auth();
  const t = await getTranslations();

  const category = await db.category.findUnique({
    where: { slug },
    include: {
      _count: {
        select: { prompts: true, subscribers: true },
      },
    },
  });

  if (!category) {
    notFound();
  }

  const isSubscribed = !isVisualCommands && session?.user
    ? await db.categorySubscription.findUnique({
        where: {
          userId_categoryId: {
            userId: session.user.id,
            categoryId: category.id,
          },
        },
      })
    : null;

  const whereClause = {
    categoryId: category.id,
    isPrivate: false,
    isUnlisted: false,
    deletedAt: null,
    ...(q && {
      OR: [
        { title: { contains: q, mode: "insensitive" as const } },
        { description: { contains: q, mode: "insensitive" as const } },
        { content: { contains: q, mode: "insensitive" as const } },
      ],
    }),
  };

  const getOrderBy = () => {
    if (isVisualCommands) return { id: "asc" as const };
    switch (sortOption) {
      case "oldest":
        return { createdAt: "asc" as const };
      case "most_upvoted":
        return { votes: { _count: "desc" as const } };
      case "most_contributors":
        return { contributors: { _count: "desc" as const } };
      default:
        return { createdAt: "desc" as const };
    }
  };

  const totalPrompts = await db.prompt.count({ where: whereClause });
  const totalPages = Math.ceil(totalPrompts / promptsPerPage);

  const promptsRaw = await db.prompt.findMany({
    where: whereClause,
    orderBy: getOrderBy(),
    skip: (currentPage - 1) * promptsPerPage,
    take: promptsPerPage,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
          verified: true,
        },
      },
      category: {
        include: {
          parent: {
            select: { id: true, name: true, slug: true },
          },
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
      _count: {
        select: {
          votes: true,
          contributors: true,
          outgoingConnections: { where: { label: { not: "related" } } },
          incomingConnections: { where: { label: { not: "related" } } },
        },
      },
    },
  });

  const prompts = promptsRaw.map((p) => ({
    ...p,
    voteCount: p._count.votes,
    contributorCount: p._count.contributors,
  }));

  if (isVisualCommands) {
    return (
      <div className="container py-5 md:py-8" dir="rtl">
        <div className="mb-5">
          <Button variant="ghost" size="sm" className="mb-3 -mr-2" asChild>
            <Link href="/categories">
              <ArrowRight className="ml-1 h-4 w-4" />
              {t("categories.allCategories")}
            </Link>
          </Button>

          <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/15 via-background to-sky-500/10 p-5 md:p-8">
            <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-16 right-8 h-44 w-44 rounded-full bg-sky-500/10 blur-3xl" />

            <div className="relative max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1.5 text-xs font-medium backdrop-blur">
                <Sparkles className="h-4 w-4 text-primary" />
                مكتبة بصرية عربية
              </div>
              <h1 className="text-3xl font-black tracking-tight md:text-4xl">{category.name}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                {category.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded-full border bg-background/70 px-3 py-1.5">{totalPrompts} أمر بصري جاهز</span>
                <span className="rounded-full border bg-background/70 px-3 py-1.5">مصمم للعربي والموبايل</span>
                <span className="rounded-full border bg-background/70 px-3 py-1.5">نسخ وتجربة بضغطة</span>
              </div>
            </div>
          </section>

          <div className="mt-4 rounded-2xl border bg-card p-3 md:p-4">
            <CategoryFilters categorySlug={slug} showSort={false} />
          </div>
        </div>

        <VisualCommandList prompts={prompts} />
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="mb-4 -ml-2" asChild>
          <Link href="/categories">
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t("categories.allCategories")}
          </Link>
        </Button>

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">{category.name}</h1>
              {session?.user && (
                <SubscribeButton
                  categoryId={category.id}
                  categoryName={category.name}
                  initialSubscribed={!!isSubscribed}
                  pill
                />
              )}
            </div>
            {category.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {category.description}
              </p>
            )}
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span>{t("categories.promptCount", { count: totalPrompts })}</span>
              <span>•</span>
              <span>{t("categories.subscriberCount", { count: category._count.subscribers })}</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <CategoryFilters categorySlug={slug} />
            {config.features.mcp !== false && <McpServerPopup initialCategories={[slug]} showOfficialBranding={!config.homepage?.useCloneBranding} />}
          </div>
        </div>

        <div className="flex md:hidden items-center gap-2 mt-4">
          <CategoryFilters categorySlug={slug} />
          {config.features.mcp !== false && <McpServerPopup initialCategories={[slug]} showOfficialBranding={!config.homepage?.useCloneBranding} />}
        </div>
      </div>

      <PromptList prompts={prompts} currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
