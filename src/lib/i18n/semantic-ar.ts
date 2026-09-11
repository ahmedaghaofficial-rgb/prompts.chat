type MessageTree = Record<string, unknown>;

const EXACT_ARABIC_COPY: Record<string, string> = {
  "مجاني ومفتوح المصدر": "منظم وسهل الاستخدام",
  "مجاني ومفتوح المصدر.": "منظم وسهل الاستخدام.",
  "تقدر تستضيفه بنفسك": "كل حاجة متاحة من مكان واحد",
  "شغّل نسختك الخاصة": "ابدأ استخدام المكتبة",
  "لقاء GitHub عن المصادر المفتوحة": "فيديو تعريفي",
  "ادخل باستخدام GitHub عشان نربط مساهماتك بمجتمع المصادر المفتوحة": "ادخل باستخدام GitHub عشان تكمل بحسابك",
  "محترفي البرومبتات": "أفضل صانعي الأوامر",
  "الفيد بتاعك": "تحديثاتك",
  "شوف الفيد": "شوف آخر التحديثات",
  "الخلاصة": "التحديثات",
  "Promptmasters": "صنّاع الأوامر",
  "Typed-Prompts IDE": "محرر الأوامر",
  "Prompt Builder": "منشئ الأوامر",
  "Taste": "أسلوبك",
  "Tastes": "أساليب البرمجة",
};

const ARABIC_PATH_OVERRIDES: Record<string, string> = {
  "nav.feed": "التحديثات",
  "nav.promptmasters": "صنّاع الأوامر",
  "nav.taste": "أسلوبك",
  "nav.ide": "محرر الأوامر",
  "prompts.createTaste": "إنشاء أسلوب برمجة",
  "prompts.tastesDescription": "أساليب البرمجة هي ملفات بسيطة بتوضح طريقتك وتفضيلاتك في كتابة الكود، علشان أدوات البرمجة بالذكاء الاصطناعي تقدر تقرّب من أسلوبك وتلتزم بقواعدك.",
  "heroIndustries.videoTitle": "فيديو تعريفي",
  "ide.title": "محرر الأوامر",
  "developers.promptBuilder": "محرر الأوامر",
  "feed.yourFeed": "تحديثاتك",
  "feed.feedDescription": "أوامر من التصنيفات اللي متابعها",
};

const ARABIC_TERM_RULES: Array<[RegExp, string]> = [
  [/هندسة البرومبتات/g, "صياغة الأوامر"],
  [/مهندس برومبتات/g, "متخصص صياغة أوامر"],
  [/البرومبتات/g, "الأوامر"],
  [/برومبتات/g, "أوامر"],
  [/البرومبت/g, "الأمر"],
  [/برومبت/g, "أمر"],
  [/المطالبات/g, "الأوامر"],
  [/مطالبات/g, "أوامر"],
  [/المطالبة/g, "الأمر"],
  [/مطالبة/g, "أمر"],
  [/التاجات/g, "الوسوم"],
  [/تاجات/g, "وسوم"],
  [/التاج/g, "الوسم"],
  [/تاج/g, "وسم"],
  [/الموديلات/g, "النماذج"],
  [/موديلات/g, "نماذج"],
  [/الموديل/g, "النموذج"],
  [/موديل/g, "نموذج"],
  [/الفيد/g, "آخر التحديثات"],
  [/Typed-Prompts IDE/g, "محرر الأوامر"],
  [/Prompt Builder/g, "منشئ الأوامر"],
  [/Promptmasters/g, "صنّاع الأوامر"],
  [/Tastes/g, "أساليب البرمجة"],
  [/Taste/g, "أسلوب البرمجة"],
];

function translateSemanticArabicCopy(value: string): string {
  let result = EXACT_ARABIC_COPY[value] ?? value;

  for (const [pattern, replacement] of ARABIC_TERM_RULES) {
    result = result.replace(pattern, replacement);
  }

  return result;
}

function mapTree(value: unknown, path: string[] = []): unknown {
  if (typeof value === "string") {
    const key = path.join(".");
    return translateSemanticArabicCopy(ARABIC_PATH_OVERRIDES[key] ?? value);
  }

  if (Array.isArray(value)) {
    return value.map((item, index) => mapTree(item, [...path, String(index)]));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as MessageTree).map(([key, nestedValue]) => [
        key,
        mapTree(nestedValue, [...path, key]),
      ]),
    );
  }

  return value;
}

/**
 * Final Arabic presentation pass.
 *
 * The upstream locale and the Egyptian override layer are intentionally kept
 * separate. This pass converts borrowed product jargon to everyday Egyptian
 * Arabic meaning (for example Prompt -> أمر) without changing internal keys.
 */
export function applySemanticArabic(messages: MessageTree, locale: string): MessageTree {
  if (locale !== "ar") return messages;
  return mapTree(messages) as MessageTree;
}
