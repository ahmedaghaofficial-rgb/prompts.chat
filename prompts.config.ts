import { defineConfig } from "@/lib/config";

const useCloneBranding = true;

export default defineConfig({
  branding: {
    name: "1000 PROMPTS ARABIA",
    logo: "/arabia-logo.svg",
    logoDark: "/arabia-logo.svg",
    favicon: "/arabia-logo.svg",
    description: "مكتبة عربية للأوامر والمهارات وأدوات الذكاء الاصطناعي",
  },

  theme: {
    radius: "lg",
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
