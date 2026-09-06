import { getLocale } from "next-intl/server";
import { getConfig } from "@/lib/config";

interface StructuredDataProps {
  type: "website" | "organization" | "breadcrumb" | "prompt" | "softwareApp" | "itemList";
  data?: {
    breadcrumbs?: Array<{ name: string; url: string }>;
    prompt?: {
      id: string;
      name: string;
      description: string;
      content: string;
      author?: string;
      authorUrl?: string;
      datePublished?: string;
      dateModified?: string;
      category?: string;
      tags?: string[];
      voteCount?: number;
    };
    items?: Array<{
      name: string;
      url: string;
      description?: string;
      image?: string;
    }>;
  };
}

function getPublicBaseUrl() {
  const configured = process.env.NEXTAUTH_URL?.replace(/\/$/, "");
  if (configured) return configured;

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (productionHost) return `https://${productionHost}`;

  const deploymentHost = process.env.VERCEL_URL;
  if (deploymentHost) return `https://${deploymentHost}`;

  return "http://localhost:3000";
}

export async function StructuredData({ type, data }: StructuredDataProps) {
  const config = await getConfig();
  const locale = await getLocale();
  const baseUrl = getPublicBaseUrl();
  const isWhiteLabel = config.homepage?.useCloneBranding === true;
  const isArabic = locale === "ar";

  const promptSteps = isArabic
    ? [
        { name: "انسخ البرومبت", text: data?.prompt?.content || "" },
        { name: "حطه في أداة الذكاء الاصطناعي", text: "افتح ChatGPT أو Claude أو Gemini أو الأداة اللي بتستخدمها، والصق البرومبت." },
        { name: "خد النتيجة", text: "أداة الذكاء الاصطناعي هترد حسب تعليمات البرومبت." },
      ]
    : [
        { name: "Copy the prompt", text: data?.prompt?.content || "" },
        { name: "Paste it into your AI assistant", text: "Open ChatGPT, Claude, Gemini, or your preferred AI assistant and paste the prompt." },
        { name: "Get the result", text: "The AI assistant will respond according to the prompt instructions." },
      ];

  const featureList = isArabic
    ? ["مكتبة برومبتات", "مشاركة واكتشاف البرومبتات", "مساهمات المجتمع", "سجل الإصدارات", "تصنيفات وتاجات"]
    : ["AI prompt library", "Prompt sharing and discovery", "Community contributions", "Version history", "Categories and tags"];

  const schemas: Record<string, object | null> = {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: config.branding.name,
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}${config.branding.logo}`,
        width: 512,
        height: 512,
      },
      description: config.branding.description,
      ...(isWhiteLabel
        ? {}
        : {
            sameAs: [
              "https://github.com/f/prompts.chat",
              "https://x.com/promptschat",
              "https://x.com/fkadev",
            ],
          }),
    },
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: config.branding.name,
      url: baseUrl,
      description: config.branding.description,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}/prompts?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      publisher: {
        "@type": "Organization",
        name: config.branding.name,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}${config.branding.logo}`,
        },
      },
    },
    breadcrumb:
      data?.breadcrumbs && data.breadcrumbs.length > 0
        ? {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: data.breadcrumbs.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
            })),
          }
        : null,
    prompt: data?.prompt
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "@id": `${baseUrl}/prompts/${data.prompt.id}`,
          name: data.prompt.name,
          description: data.prompt.description || (isArabic ? `برومبت: ${data.prompt.name}` : `AI prompt: ${data.prompt.name}`),
          step: promptSteps.map((step, index) => ({
            "@type": "HowToStep",
            name: step.name,
            text: index === 0
              ? data.prompt!.content.substring(0, 500) + (data.prompt!.content.length > 500 ? "..." : "")
              : step.text,
            position: index + 1,
          })),
          tool: [
            {
              "@type": "HowToTool",
              name: "AI Assistant (ChatGPT, Claude, Gemini, etc.)",
            },
          ],
          totalTime: "PT2M",
          author: data.prompt.author
            ? {
                "@type": "Person",
                name: data.prompt.author,
                url: data.prompt.authorUrl,
              }
            : undefined,
          datePublished: data.prompt.datePublished,
          dateModified: data.prompt.dateModified,
          publisher: {
            "@type": "Organization",
            name: config.branding.name,
            logo: {
              "@type": "ImageObject",
              url: `${baseUrl}${config.branding.logo}`,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${baseUrl}/prompts/${data.prompt.id}`,
          },
          aggregateRating: data.prompt.voteCount && data.prompt.voteCount > 0
            ? {
                "@type": "AggregateRating",
                ratingValue: 5,
                bestRating: 5,
                ratingCount: data.prompt.voteCount,
              }
            : undefined,
          keywords: data.prompt.tags?.join(", ") || data.prompt.category,
        }
      : null,
    softwareApp: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: config.branding.name,
      description: config.branding.description,
      url: baseUrl,
      applicationCategory: "UtilitiesApplication",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      softwareVersion: "1.0",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      featureList,
    },
    itemList: data?.items
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: data.items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "HowTo",
              name: item.name,
              description: item.description,
              url: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
            },
          })),
        }
      : null,
  };

  const schema = schemas[type];
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}

export async function WebsiteStructuredData() {
  return (
    <>
      <StructuredData type="organization" />
      <StructuredData type="website" />
      <StructuredData type="softwareApp" />
    </>
  );
}
