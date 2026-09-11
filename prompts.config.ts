import { defineConfig } from "@/lib/config";

const useCloneBranding = true;

export default defineConfig({
  // Temporary neutral branding until the final product identity is approved.
  branding: {
    name: "مكتبة الذكاء الاصطناعي",
    logo: "/brand-neutral.svg",
    logoDark: "/brand-neutral.svg",
    favicon: "/brand-neutral.svg",
    description: "مكتبة بتجمع وتنظم وتشارك أوامر الذكاء الاصطناعي والمهارات ومسارات الشغل والأدوات في مكان واحد.",
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
    // Keep every installed locale available internally. User-facing visibility is
    // controlled separately by visibleLocales in src/lib/i18n/config.ts.
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
    useCloneBranding,
    achievements: {
      enabled: false,
    },
    sponsors: {
      enabled: false,
      items: [],
    },
  },
});