import { describe, expect, it } from "vitest";
import { applySemanticArabic } from "@/lib/i18n/semantic-ar";

describe("applySemanticArabic", () => {
  it("translates borrowed prompt jargon by meaning", () => {
    const result = applySemanticArabic(
      {
        nav: {
          prompts: "البرومبتات",
          ide: "محرر البرومبتات",
        },
        actions: {
          create: "اعمل برومبت",
          copy: "انسخ البرومبت",
        },
      },
      "ar",
    );

    expect(result).toEqual({
      nav: {
        prompts: "الأوامر",
        ide: "محرر الأوامر",
      },
      actions: {
        create: "اعمل أمر",
        copy: "انسخ الأمر",
      },
    });
  });

  it("uses natural Arabic UI terms for tags, models, and feed", () => {
    const result = applySemanticArabic(
      {
        tags: "دوّر في التاجات...",
        model: "اختار موديل...",
        feed: "شوف الفيد",
      },
      "ar",
    );

    expect(result).toEqual({
      tags: "دوّر في الوسوم...",
      model: "اختار نموذج...",
      feed: "شوف آخر التحديثات",
    });
  });

  it("removes source-project marketing language from Arabic copy", () => {
    const result = applySemanticArabic(
      {
        openSource: "مجاني ومفتوح المصدر",
        selfHost: "تقدر تستضيفه بنفسك",
        setup: "شغّل نسختك الخاصة",
      },
      "ar",
    );

    expect(result).toEqual({
      openSource: "منظم وسهل الاستخدام",
      selfHost: "كل حاجة متاحة من مكان واحد",
      setup: "ابدأ استخدام المكتبة",
    });
  });

  it("does not change non-Arabic locales", () => {
    const messages = { title: "Prompts", description: "Open source" };
    expect(applySemanticArabic(messages, "en")).toBe(messages);
  });
});
