import { describe, expect, it } from "vitest";
import { applyWhiteLabel } from "@/lib/i18n/white-label";

describe("applyWhiteLabel", () => {
  it("removes upstream product identity from Arabic public copy", () => {
    const result = applyWhiteLabel(
      {
        support: {
          faq: {
            whatIsPromptschat: {
              question: "ما هو prompts.chat؟",
              answer: "prompts.chat بدأ من Awesome ChatGPT Prompts.",
            },
          },
        },
      },
      "ar",
    );

    expect(result).toEqual({
      support: {
        faq: {
          whatIsPromptschat: {
            question: "إيه هي مكتبة الذكاء الاصطناعي؟",
            answer: "مكتبة لتنظيم واكتشاف وحفظ أوامر الذكاء الاصطناعي والمهارات ومسارات الشغل في مكان واحد.",
          },
        },
      },
    });
  });

  it("scrubs source branding from arbitrary visible strings", () => {
    const result = applyWhiteLabel(
      {
        one: "Visit prompts.chat",
        two: "Awesome ChatGPT Prompts",
      },
      "en",
    );

    expect(result).toEqual({
      one: "Visit AI Library",
      two: "AI Library",
    });
  });

  it("keeps unrelated content unchanged", () => {
    const messages = {
      prompts: {
        title: "Prompts",
        description: "Find useful AI prompts",
      },
    };

    expect(applyWhiteLabel(messages, "en")).toEqual(messages);
  });

  it("uses locale-specific neutral product names", () => {
    expect(applyWhiteLabel({ title: "prompts.chat" }, "fr")).toEqual({
      title: "Bibliothèque IA",
    });
  });
});
