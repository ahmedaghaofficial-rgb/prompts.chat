"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Copy, Sparkles, ArrowUpLeft } from "lucide-react";
import { toast } from "sonner";
import { getPromptUrl } from "@/lib/urls";
import type { PromptCardProps } from "@/components/prompts/prompt-card";

interface VisualCommandListProps {
  prompts: PromptCardProps["prompt"][];
}

type CommandGroup =
  | "الكل"
  | "خرائط"
  | "تخطيط"
  | "تحليل"
  | "مقارنة"
  | "شرح بصري"
  | "عرض معلومات";

type PreviewKind =
  | "mindmap"
  | "timeline"
  | "roadmap"
  | "flowchart"
  | "pyramid"
  | "venn"
  | "fishbone"
  | "matrix"
  | "network"
  | "storyboard"
  | "infographic"
  | "whiteboard";

const GROUPS: CommandGroup[] = [
  "الكل",
  "خرائط",
  "تخطيط",
  "تحليل",
  "مقارنة",
  "شرح بصري",
  "عرض معلومات",
];

function splitDescription(description: string | null) {
  if (!description) {
    return { alias: "/visual", summary: "حوّل فكرتك لشرح بصري واضح وسهل الفهم." };
  }

  const match = description.match(/^\s*(\/[a-z0-9-]+)\s+—\s+(.+)$/i);
  if (!match) return { alias: "/visual", summary: description };
  return { alias: match[1], summary: match[2] };
}

function normalizeKey(alias: string, title: string, summary: string) {
  return `${alias} ${title} ${summary}`.toLowerCase();
}

function getCommandGroup(alias: string, title: string, summary: string): Exclude<CommandGroup, "الكل"> {
  const key = normalizeKey(alias, title, summary);

  if (/(venn|comparison|compare|versus|vs-|beforeafter|before-after|matrix|quadrant|مقارن|فين|مصفوف)/.test(key)) {
    return "مقارنة";
  }

  if (/(fishbone|rootcause|root-cause|swot|xray|x-ray|diagnos|analysis|funnel|pyramid|تحليل|سبب|جذر|هرم|قمع)/.test(key)) {
    return "تحليل";
  }

  if (/(roadmap|timeline|gantt|calendar|journey|sequence|workflow|process|plan|milestone|خطة|تخطيط|زمني|رحلة|مراحل)/.test(key)) {
    return "تخطيط";
  }

  if (/(mindmap|mind-map|conceptmap|concept-map|storymap|story-map|network|ecosystem|relationship|systemmap|knowledge|map-|خريطة|شبكة|علاقات)/.test(key)) {
    return "خرائط";
  }

  if (/(whiteboard|explainer|cutaway|exploded|blueprint|flowchart|flow-chart|diagram|architecture|sketch|annotat|شرح|مخطط|سبورة|تفكيك|قطاع)/.test(key)) {
    return "شرح بصري";
  }

  return "عرض معلومات";
}

function getUseWhen(alias: string, group: Exclude<CommandGroup, "الكل">) {
  const key = alias.toLowerCase();

  if (/(mindmap|mind-map)/.test(key)) return "عندك فكرة كبيرة وعايز ترتّب فروعها بسرعة.";
  if (/(roadmap)/.test(key)) return "عايز تحوّل هدف لمراحل واضحة تمشي عليها.";
  if (/(timeline)/.test(key)) return "عايز تعرض أحداث أو خطوات بالترتيب الزمني.";
  if (/(flowchart|flow-chart)/.test(key)) return "عايز تشرح خطوات أو قرارات بتمشي إزاي.";
  if (/(fishbone)/.test(key)) return "عايز تفهم أسباب المشكلة وتوصل لجذورها.";
  if (/(venn)/.test(key)) return "عايز تبيّن التشابه والاختلاف بين حاجتين أو أكتر.";
  if (/(pyramid)/.test(key)) return "عايز ترتّب المعلومات في مستويات واضحة.";
  if (/(matrix|quadrant)/.test(key)) return "عايز تقارن اختيارات على محورين بشكل سريع.";
  if (/(storyboard|storymap|story-map)/.test(key)) return "عايز تحوّل قصة أو تجربة لمشاهد مترتبة.";
  if (/(infographic)/.test(key)) return "عايز تلخّص معلومات كتير في شكل واحد سهل.";
  if (/(whiteboard)/.test(key)) return "عايز تشرح فكرة بحرية كأنك واقف على سبورة.";
  if (/(xray|x-ray|cutaway|exploded)/.test(key)) return "عايز تكشف اللي جوه الشيء أو تشرح مكوّناته.";
  if (/(beforeafter|before-after)/.test(key)) return "عايز توضّح الفرق قبل وبعد في لقطة واحدة.";
  if (/(dashboard)/.test(key)) return "عايز تجمع أهم الأرقام والمؤشرات في شاشة واحدة.";

  const fallback: Record<Exclude<CommandGroup, "الكل">, string> = {
    خرائط: "عايز تربط أفكار أو عناصر ببعض بشكل مفهوم.",
    تخطيط: "عايز ترتّب خطوات أو مراحل قبل ما تبدأ.",
    تحليل: "عايز تفكّك موضوع وتفهمه أسرع.",
    مقارنة: "عايز تشوف الفروق والعلاقات من أول نظرة.",
    "شرح بصري": "عايز تشرح فكرة معقدة بشكل أبسط من الكلام.",
    "عرض معلومات": "عايز تعرض معلوماتك بشكل مرتب وسهل المسح بالعين.",
  };

  return fallback[group];
}

function getPreviewKind(alias: string): PreviewKind {
  const key = alias.toLowerCase();
  if (/(venn)/.test(key)) return "venn";
  if (/(fishbone|rootcause|root-cause)/.test(key)) return "fishbone";
  if (/(matrix|quadrant|comparison|compare|beforeafter|before-after)/.test(key)) return "matrix";
  if (/(timeline|sequence|milestone)/.test(key)) return "timeline";
  if (/(roadmap|journey|gantt|calendar)/.test(key)) return "roadmap";
  if (/(pyramid|funnel|hierarchy|layers|valuechain)/.test(key)) return "pyramid";
  if (/(storyboard|storymap|story-map)/.test(key)) return "storyboard";
  if (/(infographic|dashboard|onepager|one-pager|poster|chart)/.test(key)) return "infographic";
  if (/(whiteboard|sketch)/.test(key)) return "whiteboard";
  if (/(flowchart|flow-chart|workflow|process|diagram|blueprint|cutaway|exploded|xray|x-ray)/.test(key)) return "flowchart";
  if (/(network|ecosystem|relationship|architecture|systemmap)/.test(key)) return "network";
  return "mindmap";
}

function PreviewShell({ alias, children }: { alias: string; children: React.ReactNode }) {
  return (
    <div className="relative h-32 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/15 via-sky-500/10 to-emerald-500/15 sm:h-36">
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] [background-size:18px_18px]" />
      {children}
      <div className="absolute bottom-2.5 right-2.5 rounded-full border bg-background/85 px-2 py-0.5 text-[10px] font-mono font-semibold backdrop-blur" dir="ltr">
        {alias}
      </div>
    </div>
  );
}

function VisualPreview({ alias }: { alias: string }) {
  const kind = getPreviewKind(alias);

  if (kind === "venn") {
    return (
      <PreviewShell alias={alias}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-20 w-20 translate-x-3 rounded-full border-2 border-primary/45 bg-primary/10" />
          <div className="h-20 w-20 -translate-x-3 rounded-full border-2 border-sky-400/45 bg-sky-400/10" />
        </div>
      </PreviewShell>
    );
  }

  if (kind === "fishbone") {
    return (
      <PreviewShell alias={alias}>
        <div className="absolute left-[12%] right-[14%] top-1/2 h-px bg-foreground/40" />
        <div className="absolute right-[9%] top-[43%] h-5 w-5 rotate-45 border-r-2 border-t-2 border-foreground/45" />
        {[24, 43, 62, 78].map((left, index) => (
          <div key={left} className="absolute top-1/2 h-12 w-px origin-top bg-foreground/35" style={{ left: `${left}%`, transform: `rotate(${index % 2 ? 45 : -45}deg)` }} />
        ))}
      </PreviewShell>
    );
  }

  if (kind === "matrix") {
    return (
      <PreviewShell alias={alias}>
        <div className="absolute inset-5 grid grid-cols-2 gap-1.5">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="rounded-lg border bg-background/70 p-2">
              <div className="h-2 w-1/2 rounded bg-foreground/20" />
              <div className="mt-2 h-1.5 w-3/4 rounded bg-foreground/10" />
            </div>
          ))}
        </div>
      </PreviewShell>
    );
  }

  if (kind === "timeline") {
    return (
      <PreviewShell alias={alias}>
        <div className="absolute left-7 right-7 top-1/2 h-px bg-foreground/35">
          {[8, 36, 64, 92].map((left, index) => (
            <div key={left} className="absolute -top-2.5" style={{ left: `${left}%` }}>
              <div className="h-5 w-5 -translate-x-1/2 rounded-full border-4 border-background bg-primary/75" />
              <div className={`mt-2 h-4 w-10 -translate-x-1/2 rounded-md border bg-background/80 ${index % 2 ? "-translate-y-11" : ""}`} />
            </div>
          ))}
        </div>
      </PreviewShell>
    );
  }

  if (kind === "roadmap") {
    return (
      <PreviewShell alias={alias}>
        <div className="absolute left-[12%] right-[12%] top-1/2 h-1 -translate-y-1/2 rounded-full bg-foreground/15" />
        {[16, 38, 61, 84].map((left, index) => (
          <div key={left} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: `${left}%` }}>
            <div className="mx-auto h-5 w-5 rounded-full border-4 border-background bg-primary/75" />
            <div className={`mt-2 h-5 w-12 rounded-md border bg-background/85 ${index % 2 ? "-translate-y-12" : ""}`} />
          </div>
        ))}
      </PreviewShell>
    );
  }

  if (kind === "pyramid") {
    return (
      <PreviewShell alias={alias}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
          <div className="h-5 w-16 rounded-md border bg-background/85" />
          <div className="h-5 w-24 rounded-md border bg-background/85" />
          <div className="h-5 w-32 rounded-md border bg-background/85" />
          <div className="h-5 w-40 max-w-[68%] rounded-md border bg-background/85" />
        </div>
      </PreviewShell>
    );
  }

  if (kind === "storyboard") {
    return (
      <PreviewShell alias={alias}>
        <div className="absolute inset-4 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((item) => (
            <div key={item} className="flex flex-col rounded-lg border bg-background/75 p-1.5">
              <div className="flex-1 rounded-md bg-foreground/10" />
              <div className="mt-1.5 h-1.5 w-3/4 rounded bg-foreground/15" />
            </div>
          ))}
        </div>
      </PreviewShell>
    );
  }

  if (kind === "infographic") {
    return (
      <PreviewShell alias={alias}>
        <div className="absolute inset-4 grid grid-cols-3 gap-2">
          <div className="col-span-2 rounded-lg border bg-background/75 p-2">
            <div className="flex h-full items-end gap-1.5">
              {[45, 75, 55, 90].map((height) => <div key={height} className="flex-1 rounded-t bg-primary/35" style={{ height: `${height}%` }} />)}
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-[45%] rounded-lg border bg-background/75" />
            <div className="h-[45%] rounded-lg border bg-background/75" />
          </div>
        </div>
      </PreviewShell>
    );
  }

  if (kind === "whiteboard") {
    return (
      <PreviewShell alias={alias}>
        <div className="absolute inset-5 rotate-[-1deg] rounded-xl border bg-background/80 p-3">
          <div className="h-2 w-1/3 rounded bg-foreground/20" />
          <div className="mt-3 flex items-center gap-2">
            <div className="h-7 w-16 rounded-md border-2 border-dashed border-foreground/30" />
            <span className="text-foreground/35">←</span>
            <div className="h-9 w-9 rounded-full border-2 border-dashed border-primary/45" />
            <span className="text-foreground/35">←</span>
            <div className="h-7 w-14 rounded-md border-2 border-dashed border-foreground/30" />
          </div>
        </div>
      </PreviewShell>
    );
  }

  if (kind === "flowchart") {
    return (
      <PreviewShell alias={alias}>
        <div className="absolute inset-0 flex items-center justify-center gap-2 px-4">
          <div className="h-11 w-16 rounded-full border bg-background/85" />
          <span className="text-lg text-foreground/35">←</span>
          <div className="h-12 w-16 rotate-45 rounded-md border bg-background/85" />
          <span className="text-lg text-foreground/35">←</span>
          <div className="h-11 w-16 rounded-lg border bg-background/85" />
        </div>
      </PreviewShell>
    );
  }

  if (kind === "network") {
    return (
      <PreviewShell alias={alias}>
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/40 bg-background/90" />
          {[[20, 24], [78, 22], [20, 72], [78, 70]].map(([left, top], index) => (
            <div key={index} className="absolute h-7 w-12 -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background/85" style={{ left: `${left}%`, top: `${top}%` }} />
          ))}
          <span className="absolute left-[28%] top-[35%] h-px w-[24%] rotate-[25deg] bg-foreground/30" />
          <span className="absolute right-[28%] top-[35%] h-px w-[24%] -rotate-[25deg] bg-foreground/30" />
          <span className="absolute bottom-[34%] left-[28%] h-px w-[24%] -rotate-[25deg] bg-foreground/30" />
          <span className="absolute bottom-[34%] right-[28%] h-px w-[24%] rotate-[25deg] bg-foreground/30" />
        </div>
      </PreviewShell>
    );
  }

  return (
    <PreviewShell alias={alias}>
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/45 bg-background/90" />
        {["left-[12%] top-[20%]", "right-[12%] top-[20%]", "left-[12%] bottom-[18%]", "right-[12%] bottom-[18%]"].map((position) => (
          <div key={position} className={`absolute h-7 w-16 rounded-full border bg-background/85 ${position}`} />
        ))}
        <span className="absolute left-[31%] top-[36%] h-px w-[20%] rotate-[28deg] bg-foreground/30" />
        <span className="absolute right-[31%] top-[36%] h-px w-[20%] -rotate-[28deg] bg-foreground/30" />
        <span className="absolute bottom-[34%] left-[31%] h-px w-[20%] -rotate-[28deg] bg-foreground/30" />
        <span className="absolute bottom-[34%] right-[31%] h-px w-[20%] rotate-[28deg] bg-foreground/30" />
      </div>
    </PreviewShell>
  );
}

export function VisualCommandList({ prompts }: VisualCommandListProps) {
  const [activeGroup, setActiveGroup] = useState<CommandGroup>("الكل");

  const preparedPrompts = useMemo(
    () =>
      prompts.map((prompt) => {
        const { alias, summary } = splitDescription(prompt.description);
        const group = getCommandGroup(alias, prompt.title, summary);
        return { prompt, alias, summary, group };
      }),
    [prompts],
  );

  const groupCounts = useMemo(() => {
    const counts = new Map<CommandGroup, number>();
    counts.set("الكل", preparedPrompts.length);
    GROUPS.slice(1).forEach((group) => {
      counts.set(group, preparedPrompts.filter((item) => item.group === group).length);
    });
    return counts;
  }, [preparedPrompts]);

  const visiblePrompts = activeGroup === "الكل"
    ? preparedPrompts
    : preparedPrompts.filter((item) => item.group === activeGroup);

  const copyPrompt = async (content: string) => {
    await navigator.clipboard.writeText(content);
    toast.success("اتنسخ الأمر");
  };

  return (
    <div dir="rtl">
      <div className="mb-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max gap-2">
          {GROUPS.map((group) => {
            const active = activeGroup === group;
            const count = groupCounts.get(group) ?? 0;
            return (
              <button
                key={group}
                type="button"
                onClick={() => setActiveGroup(group)}
                className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground"}`}
                aria-pressed={active}
              >
                {group}
                <span className={`text-[10px] ${active ? "text-primary-foreground/75" : "text-muted-foreground/70"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between px-1 text-xs text-muted-foreground">
        <span>{visiblePrompts.length} أمر</span>
        <span>اختار حسب النتيجة اللي محتاجها</span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {visiblePrompts.map(({ prompt, alias, summary, group }) => {
          const url = getPromptUrl(prompt.id, prompt.slug);
          const useWhen = getUseWhen(alias, group);

          return (
            <article key={prompt.id} className="group rounded-3xl border bg-card p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md">
              <VisualPreview alias={alias} />

              <div className="px-1 pb-1 pt-3">
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
                    {group}
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-muted-foreground" dir="ltr">{alias}</span>
                </div>

                <Link href={url} prefetch={false} className="block">
                  <h2 className="text-base font-bold leading-7 group-hover:text-primary sm:text-lg">{prompt.title}</h2>
                  <p className="mt-0.5 line-clamp-2 text-sm leading-6 text-muted-foreground">{summary}</p>
                </Link>

                <div className="mt-2 rounded-xl bg-muted/50 px-3 py-2 text-xs leading-5 text-foreground/80">
                  <span className="font-bold text-foreground">استخدمه لما: </span>
                  {useWhen}
                </div>

                <div className="mt-3 flex items-center gap-2 border-t pt-3">
                  <Link
                    href={url}
                    prefetch={false}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border bg-background px-4 text-xs font-semibold transition-colors hover:bg-accent"
                  >
                    افتح الأمر
                    <ArrowUpLeft className="h-3.5 w-3.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => copyPrompt(prompt.content)}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border bg-background px-3 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    aria-label={`نسخ ${prompt.title}`}
                    title="نسخ الأمر"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    نسخ
                  </button>
                </div>
              </div>
            </article>
          );
        })}

        {visiblePrompts.length === 0 && (
          <div className="col-span-full rounded-3xl border border-dashed py-14 text-center text-muted-foreground">
            <Sparkles className="mx-auto mb-3 h-7 w-7" />
            مفيش أوامر في المجموعة دي دلوقتي.
          </div>
        )}
      </div>
    </div>
  );
}
