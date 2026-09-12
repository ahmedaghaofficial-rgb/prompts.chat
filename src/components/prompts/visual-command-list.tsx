"use client";

import Link from "next/link";
import { Copy, Sparkles, ArrowUpLeft } from "lucide-react";
import { toast } from "sonner";
import { getPromptUrl } from "@/lib/urls";
import type { PromptCardProps } from "@/components/prompts/prompt-card";

interface VisualCommandListProps {
  prompts: PromptCardProps["prompt"][];
}

const CATEGORY_LABELS: Record<string, string> = {
  "arabia-mindmaps": "خريطة ذهنية",
  "arabia-diagrams": "مخطط بصري",
  "arabia-visual-explainers": "شرح بصري",
  "arabia-infographics": "إنفوجرافيك",
  "arabia-system-visuals": "تصميم نظام",
};

function splitDescription(description: string | null) {
  if (!description) return { alias: "/visual", summary: "حوّل فكرتك لشرح بصري واضح ومبهر." };
  const match = description.match(/^\s*(\/[a-z0-9-]+)\s+—\s+(.+)$/i);
  if (!match) return { alias: "/visual", summary: description };
  return { alias: match[1], summary: match[2] };
}

function previewKind(alias: string) {
  const key = alias.toLowerCase();
  if (/(mindmap|radial|concept|knowledge|relationship|ecosystem|systemmap|architecture)/.test(key)) return "network";
  if (/(timeline|roadmap|journey|story|step|sequence|beforeafter)/.test(key)) return "timeline";
  if (/(funnel|pyramid|layers|hierarchy|valuechain)/.test(key)) return "stack";
  if (/(matrix|quadrant|venn|comparison|dashboard|onepager)/.test(key)) return "grid";
  return "flow";
}

function VisualPreview({ alias }: { alias: string }) {
  const kind = previewKind(alias);

  return (
    <div className="relative h-40 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/20 via-sky-500/10 to-emerald-500/20">
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] [background-size:18px_18px]" />

      {kind === "network" && (
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 bg-background/90 shadow-lg" />
          <div className="absolute left-[18%] top-[22%] h-8 w-16 rounded-full border bg-background/85" />
          <div className="absolute right-[14%] top-[24%] h-8 w-16 rounded-full border bg-background/85" />
          <div className="absolute bottom-[18%] left-[18%] h-8 w-16 rounded-full border bg-background/85" />
          <div className="absolute bottom-[16%] right-[16%] h-8 w-16 rounded-full border bg-background/85" />
          <span className="absolute left-[33%] top-[37%] h-px w-[18%] rotate-[25deg] bg-foreground/25" />
          <span className="absolute right-[31%] top-[37%] h-px w-[18%] -rotate-[25deg] bg-foreground/25" />
          <span className="absolute bottom-[34%] left-[33%] h-px w-[18%] -rotate-[25deg] bg-foreground/25" />
          <span className="absolute bottom-[33%] right-[31%] h-px w-[18%] rotate-[25deg] bg-foreground/25" />
        </div>
      )}

      {kind === "timeline" && (
        <div className="absolute inset-x-8 top-1/2 h-px bg-foreground/25">
          {[8, 36, 64, 92].map((left, index) => (
            <div key={left} className="absolute -top-3" style={{ left: `${left}%` }}>
              <div className="h-6 w-6 -translate-x-1/2 rounded-full border-4 border-background bg-primary/70" />
              <div className={`mt-3 h-7 w-16 -translate-x-1/2 rounded-lg border bg-background/80 ${index % 2 ? "-translate-y-16" : ""}`} />
            </div>
          ))}
        </div>
      )}

      {kind === "stack" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <div className="h-7 w-24 rounded-lg border bg-background/85" />
          <div className="h-7 w-36 rounded-lg border bg-background/85" />
          <div className="h-7 w-48 rounded-lg border bg-background/85" />
          <div className="h-7 w-60 max-w-[75%] rounded-lg border bg-background/85" />
        </div>
      )}

      {kind === "grid" && (
        <div className="absolute inset-5 grid grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="rounded-xl border bg-background/75 p-3">
              <div className="mb-2 h-2 w-1/2 rounded bg-foreground/15" />
              <div className="h-2 w-3/4 rounded bg-foreground/10" />
            </div>
          ))}
        </div>
      )}

      {kind === "flow" && (
        <div className="absolute inset-0 flex items-center justify-center gap-3 px-4">
          {[0, 1, 2].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="h-14 w-20 rounded-xl border bg-background/85 shadow-sm" />
              {item < 2 && <div className="text-xl text-foreground/35">←</div>}
            </div>
          ))}
        </div>
      )}

      <div className="absolute bottom-3 right-3 rounded-full border bg-background/80 px-2.5 py-1 text-[11px] font-mono font-semibold" dir="ltr">
        {alias}
      </div>
    </div>
  );
}

export function VisualCommandList({ prompts }: VisualCommandListProps) {
  const copyPrompt = async (content: string) => {
    await navigator.clipboard.writeText(content);
    toast.success("اتنسخ الأمر");
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {prompts.map((prompt) => {
        const { alias, summary } = splitDescription(prompt.description);
        const primaryTagSlug = prompt.tags[0]?.tag.slug;
        const categoryLabel = primaryTagSlug ? CATEGORY_LABELS[primaryTagSlug] || "أمر بصري" : "أمر بصري";
        const url = getPromptUrl(prompt.id, prompt.slug);

        return (
          <article key={prompt.id} className="group rounded-3xl border bg-card p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-lg">
            <VisualPreview alias={alias} />

            <div className="px-1 pb-1 pt-4" dir="rtl">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                  {categoryLabel}
                </span>
                <span className="font-mono text-xs font-semibold text-muted-foreground" dir="ltr">{alias}</span>
              </div>

              <Link href={url} prefetch={false} className="block">
                <h2 className="text-lg font-bold leading-7 group-hover:text-primary">{prompt.title}</h2>
                <p className="mt-1.5 min-h-12 text-sm leading-6 text-muted-foreground">{summary}</p>
              </Link>

              <div className="mt-4 flex gap-2 border-t pt-3">
                <Link href={url} prefetch={false} className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground">
                  جرّب الأمر
                  <ArrowUpLeft className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => copyPrompt(prompt.content)}
                  className="inline-flex h-10 w-11 items-center justify-center rounded-xl border bg-background transition-colors hover:bg-accent"
                  aria-label={`نسخ ${prompt.title}`}
                  title="نسخ الأمر"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        );
      })}

      {prompts.length === 0 && (
        <div className="col-span-full rounded-3xl border border-dashed py-16 text-center text-muted-foreground">
          <Sparkles className="mx-auto mb-3 h-7 w-7" />
          مفيش أوامر مطابقة للبحث ده.
        </div>
      )}
    </div>
  );
}
