import { defineConfig } from "@/lib/config";

// White-label mode: keep upstream/source attribution in the repository,
// but never expose prompts.chat branding in the public product UI.
const useCloneBranding = true;

export default defineConfig({
  // Temporary neutral branding until the final product identity is approved.
  branding: {
    name: "مكتبة الذكاء الاصطناعي",
    logo: "/brand-neutral.svg",
    logoDark: "/brand-neutral.svg",
    favicon: "/brand-neutral.svg",
    description: "مكتبة بتجمع وتنظم وتشارك البرومبتات والمهارات ومسارات الشغل وأدوات الذكاء الاصطناعي.",
  },

  theme: {
    radius: "sm",
    variant: "default",
    density: "default",
    colors: {
      primary: "#6366f1",
    },
  },

  auth: {
    providers: ["github", "google", "apple"],
    allowRegistration: false,
  },

  i18n: {
    // Keep every upstream locale installed. User-facing visibility is controlled
    // separately by visibleLocales in src/lib/i18n/config.ts.
    locales: ["en", "tr", "es", "zh", "ja", "ar", "pt", "fr", "it", "de", "nl", "ko", "ru", "he", "el", "az", "fa"],
    defaultLocale: "ar",
  },

  features: {
    privatePrompts: true,
    changeRequests: true,
    categories: true,
    tags: true,
    aiSearch: true,
    aiGeneration: true,
    mcp: true,
    comments: true,
  },

  homepage: {
    // Hides original prompts.chat achievements, source-brand links, sponsors,
    // book/kids promotion and other upstream commercial branding.
    useCloneBranding,
    achievements: {
      enabled: false,
    },
    sponsors: {
      enabled: false,
      // Retained internally for upstream compatibility; never rendered while
      // white-label mode is enabled.
      items: [
        { name: "Neon", className: "py-1", logo: "/sponsors/neon.svg", darkLogo: "/sponsors/neon-dark.svg", url: "https://get.neon.com/VqfnMo4" },
        { name: "Clemta", logo: "/sponsors/clemta.webp", url: "https://clemta.com/?utm_source=prompts.chat" },
        { name: "Wiro.ai", className: "py-1", darkLogo: "/sponsors/wiro.png", logo: "/sponsors/wiro.png", url: "https://wiro.ai/?utm_source=prompts.chat" },
        { name: "Cognition", logo: "/sponsors/cognition.svg", url: "https://wind.surf/prompts-chat" },
        { name: "CodeRabbit", className: "py-1", logo: "/sponsors/coderabbit.svg", darkLogo: "/sponsors/coderabbit-dark.svg", url: "https://coderabbit.link/fatih" },
        { name: "Sentry", className: "py-1", logo: "/sponsors/sentry.svg", darkLogo: "/sponsors/sentry-dark.svg", url: "https://sentry.io/?utm_source=prompts.chat" },
        { name: "eachlabs", className: "py-[6px]", logo: "/sponsors/eachlabs.png", darkLogo: "/sponsors/eachlabs-dark.png", url: "https://www.eachlabs.ai/?utm_source=promptschat&utm_medium=referral" },
        { name: "CommandCode", className: "py-1", logo: "/sponsors/commandcode.svg", darkLogo: "/sponsors/commandcode-dark.svg", url: "https://commandcode.ai/?utm_source=prompts.chat" },
      ],
    },
  },
});