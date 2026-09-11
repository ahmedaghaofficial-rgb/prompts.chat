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
};

const ARABIC_TERM_RULES: Array<[RegExp, string]> = [
  [/هندسة البرومبتات/g, "صياغة الأوامر"],
  [/مهندس برومبتات/g, "متخصص صياغة أوامر"],
  [/البرومبتات/g, "الأوامر"],
  [/برومبتات/g, "أوامر"],
  [/البرومبت/g, "الأمر"],
  [/برومبت/g, "أمر"],
  [/التاجات/g, "الوسوم"],
  [/تاجات/g, "وسوم"],
  [/التاج/g, "الوسم"],
  [/تاج/g, "وسم"],
  [/الموديلات/g, "النماذج"],
  [/موديلات/g, "نماذج"],
  [/الموديل/g, "النموذج"],
  [/موديل/g, "نموذج"],
  [/الفيد/g, "آخر التحديثات"],
];

function translateSemanticArabicCopy(value: string): string {
  let result = EXACT_ARABIC_COPY[value] ?? value;

  for (const [pattern, replacement] of ARABIC_TERM_RULES) {
    result = result.replace(pattern, replacement);
  }

  return result;
}

function mapTree(value: unknown): unknown {
  if (typeof value === "string") {
    return translateSemanticArabicCopy(value);
  }

  if (Array.isArray(value)) {
    return value.map(mapTree);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as MessageTree).map(([key, nestedValue]) => [key, mapTree(nestedValue)]),
    );
  }

  return value;
}

/**
 * Final Arabic presentation pass.
 *
 * The upstream locale and the Egyptian override layer are intentionally kept
 * separate. This pass converts borrowed product jargon to the everyday meaning
 * we want in the Arabic UI (for example Prompt -> أمر) and removes leftover
 * source-project phrasing from user-facing copy.
 */
export function applySemanticArabic(messages: MessageTree, locale: string): MessageTree {
  if (locale !== "ar") return messages;
  return mapTree(messages) as MessageTree;
}
