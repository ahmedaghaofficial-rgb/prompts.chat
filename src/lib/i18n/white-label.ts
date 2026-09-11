type MessageTree = Record<string, unknown>;

const PRODUCT_NAMES: Record<string, string> = {
  ar: "مكتبة الذكاء الاصطناعي",
  en: "AI Library",
  fr: "Bibliothèque IA",
};

const PATH_OVERRIDES: Record<string, Record<string, string>> = {
  ar: {
    "admin.import.description": "استيراد الأوامر من ملف prompts.csv",
    "admin.import.fileInfo": "اختار ملف prompts.csv لاستيراد الأوامر",
    "support.faq.whatIsPromptschat.question": "إيه هي مكتبة الذكاء الاصطناعي؟",
    "support.faq.whatIsPromptschat.answer": "مكتبة لتنظيم واكتشاف وحفظ أوامر الذكاء الاصطناعي والمهارات ومسارات الشغل في مكان واحد.",
    "support.faq.license.answer": "قبل أي استخدام تجاري، راجع ترخيص الأمر أو المحتوى نفسه وشروط الاستخدام المرتبطة به.",
    "support.faq.selfHost.question": "هل أقدر أحفظ أوامري وأرجعلها بعدين؟",
    "support.faq.selfHost.answer": "أيوه. بعد تسجيل الدخول تقدر تحفظ أوامرك وتنظمها وترجع لها من حسابك.",
    "support.faq.attribution.answer": "لو لقيت إسناد أو نسبة ملكية غير صحيحة لمحتوى، ابعت التفاصيل من قناة الدعم المتاحة علشان نراجعها.",
    "support.contact.description": "لو ملقتش إجابة لسؤالك، استخدم وسيلة الدعم المتاحة في النسخة دي.",
    "support.contact.openIssue": "تواصل مع الدعم",
    "about.description": "مكتبة عملية لتنظيم أوامر الذكاء الاصطناعي والمهارات ومسارات الشغل ومشاركتها بسهولة.",
    "about.storyTitle": "عن المكتبة",
    "about.story1": "المكتبة معمولة علشان تجمع الموارد العملية للذكاء الاصطناعي في مكان واحد منظم وسهل البحث.",
    "about.story1Rich": "المكتبة معمولة علشان تجمع الموارد العملية للذكاء الاصطناعي في مكان واحد منظم وسهل البحث.",
    "about.story2": "الهدف إنك توصل للأمر أو المهارة أو مسار الشغل المناسب بسرعة، وتحفظ اللي يهمك وتطوره مع الوقت.",
    "about.openSource": "المهم هنا هو المحتوى العملي وسهولة الوصول له واستخدامه.",
    "book.authorIntro": "دليل عملي وتفاعلي يساعدك تتعلم صياغة أوامر الذكاء الاصطناعي خطوة بخطوة.",
    "book.partOfProject": "جزء من مكتبة المحتوى التعليمي للذكاء الاصطناعي.",
    "book.awesomeChatGPTPrompts": "مكتبة الأوامر",
    "book.chapterDescriptions.00b-history": "نظرة سريعة على تطور استخدام الأوامر مع نماذج الذكاء الاصطناعي.",
    "appBanner.message": "استخدم المكتبة بسهولة من الموبايل.",
  },
  en: {
    "admin.import.description": "Import prompts from a prompts.csv file",
    "admin.import.fileInfo": "Choose a prompts.csv file to import prompts",
    "support.faq.whatIsPromptschat.question": "What is AI Library?",
    "support.faq.whatIsPromptschat.answer": "A library for discovering, organizing, saving, and sharing AI prompts, skills, and workflows in one place.",
    "support.faq.license.answer": "Before commercial use, check the license attached to the specific prompt or content and the applicable terms.",
    "support.faq.selfHost.question": "Can I save prompts for later?",
    "support.faq.selfHost.answer": "Yes. After signing in, you can save and organize prompts and return to them from your account.",
    "support.faq.attribution.answer": "If content has incorrect attribution, send the details through the available support channel so it can be reviewed.",
    "support.contact.description": "If you cannot find an answer, use the support option available in this deployment.",
    "support.contact.openIssue": "Contact support",
    "about.description": "A practical library for organizing and sharing AI prompts, skills, and workflows.",
    "about.storyTitle": "About the library",
    "about.story1": "The library brings practical AI resources together in one organized, searchable place.",
    "about.story1Rich": "The library brings practical AI resources together in one organized, searchable place.",
    "about.story2": "The goal is to help you find, save, and improve useful prompts, skills, and workflows quickly.",
    "about.openSource": "The focus is practical content and an easy way to discover and use it.",
    "book.authorIntro": "A practical interactive guide to learning how to write effective AI prompts step by step.",
    "book.partOfProject": "Part of the AI learning library.",
    "book.awesomeChatGPTPrompts": "Prompt Library",
    "book.chapterDescriptions.00b-history": "A short look at how prompting evolved alongside modern AI models.",
    "appBanner.message": "Use the library easily from your phone.",
  },
  fr: {
    "admin.import.description": "Importer des prompts depuis un fichier prompts.csv",
    "admin.import.fileInfo": "Choisissez un fichier prompts.csv pour importer des prompts",
    "support.faq.whatIsPromptschat.question": "Qu’est-ce que Bibliothèque IA ?",
    "support.faq.whatIsPromptschat.answer": "Une bibliothèque pour découvrir, organiser, enregistrer et partager des prompts, compétences et workflows d’IA.",
    "support.faq.license.answer": "Avant tout usage commercial, vérifiez la licence du prompt ou du contenu concerné ainsi que les conditions applicables.",
    "support.faq.selfHost.question": "Puis-je enregistrer des prompts pour plus tard ?",
    "support.faq.selfHost.answer": "Oui. Après connexion, vous pouvez enregistrer et organiser vos prompts et les retrouver depuis votre compte.",
    "support.faq.attribution.answer": "Si un contenu comporte une attribution incorrecte, envoyez les détails via le canal d’assistance disponible afin qu’ils soient vérifiés.",
    "support.contact.description": "Si vous ne trouvez pas de réponse, utilisez l’option d’assistance disponible dans cette version.",
    "support.contact.openIssue": "Contacter l’assistance",
    "about.description": "Une bibliothèque pratique pour organiser et partager des prompts, compétences et workflows d’IA.",
    "about.storyTitle": "À propos de la bibliothèque",
    "about.story1": "La bibliothèque rassemble des ressources d’IA pratiques dans un espace organisé et facile à rechercher.",
    "about.story1Rich": "La bibliothèque rassemble des ressources d’IA pratiques dans un espace organisé et facile à rechercher.",
    "about.story2": "L’objectif est de trouver, enregistrer et améliorer rapidement des prompts, compétences et workflows utiles.",
    "about.openSource": "L’accent est mis sur le contenu pratique et sur sa découverte et son utilisation faciles.",
    "book.authorIntro": "Un guide pratique et interactif pour apprendre à rédiger des prompts d’IA efficaces étape par étape.",
    "book.partOfProject": "Fait partie de la bibliothèque d’apprentissage de l’IA.",
    "book.awesomeChatGPTPrompts": "Bibliothèque de prompts",
    "book.chapterDescriptions.00b-history": "Un bref aperçu de l’évolution du prompting avec les modèles d’IA modernes.",
    "appBanner.message": "Utilisez facilement la bibliothèque depuis votre téléphone.",
  },
};

function replaceSourceBranding(value: string, locale: string): string {
  const productName = PRODUCT_NAMES[locale] ?? PRODUCT_NAMES.en;

  return value
    .replace(/prompts\.chat/gi, productName)
    .replace(/Awesome ChatGPT Prompts/gi, productName)
    .replace(/awesome-chatgpt-prompts/gi, "ai-library");
}

function walk(value: unknown, locale: string, path: string[] = []): unknown {
  if (typeof value === "string") {
    const key = path.join(".");
    const override = PATH_OVERRIDES[locale]?.[key];
    return replaceSourceBranding(override ?? value, locale);
  }

  if (Array.isArray(value)) {
    return value.map((item, index) => walk(item, locale, [...path, String(index)]));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as MessageTree).map(([key, nestedValue]) => [
        key,
        walk(nestedValue, locale, [...path, key]),
      ]),
    );
  }

  return value;
}

/**
 * Scrubs the public message catalogue of upstream product identity without
 * mutating the source locale JSON files. This keeps future upstream syncs easy
 * while ensuring users only see this deployment's neutral product identity.
 */
export function applyWhiteLabel(messages: MessageTree, locale: string): MessageTree {
  return walk(messages, locale) as MessageTree;
}
