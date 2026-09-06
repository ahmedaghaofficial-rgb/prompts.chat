type MessageTree = Record<string, unknown>;

const AR_OVERRIDES: Record<string, string> = {
  // Common
  "common.loading": "بيتم التحميل...",
  "common.error": "حصل خطأ",
  "common.somethingWentWrong": "حصل خطأ، جرّب تاني",
  "common.fillVariables": "املا المتغيرات",
  "common.fillVariablesDescription": "املا المتغيرات المطلوبة الأول قبل ما تشغّل البرومبت.",
  "common.copiedToClipboard": "اتنسخ للحافظة",
  "common.failedToCopy": "النسخ ما نجحش",
  "common.previous": "اللي قبله",
  "common.next": "اللي بعده",
  "common.none": "مفيش",
  "common.moreLines": "+{count} سطر كمان",
  "common.expandAll": "افتح الكل",
  "common.collapseAll": "اقفل الكل",

  // Main navigation
  "nav.collection": "مكتبتي",
  "nav.feed": "الفيد",
  "nav.promptmasters": "محترفي البرومبتات",
  "nav.prompts": "البرومبتات",
  "nav.skills": "المهارات",
  "nav.taste": "الذوق",
  "nav.workflows": "مسارات الشغل",
  "nav.categories": "التصنيفات",
  "nav.tags": "التاجات",
  "nav.settings": "الإعدادات",
  "nav.admin": "الإدارة",
  "nav.profile": "حسابي",
  "nav.login": "دخول",
  "nav.register": "اعمل حساب",
  "nav.logout": "خروج",
  "nav.ide": "محرر البرومبتات",
  "nav.developers": "للمطورين",
  "nav.book": "الكتاب",
  "nav.forKids": "للأطفال",
  "nav.more": "المزيد",

  // Authentication
  "auth.login": "دخول",
  "auth.loginDescription": "اكتب بياناتك عشان تكمل",
  "auth.loginDescriptionOAuth": "ادخل بحسابك عشان تكمل",
  "auth.register": "اعمل حساب",
  "auth.registerDescription": "اعمل حساب عشان تبدأ",
  "auth.logout": "خروج",
  "auth.email": "الإيميل",
  "auth.password": "كلمة السر",
  "auth.confirmPassword": "أكد كلمة السر",
  "auth.noAccount": "معندكش حساب؟",
  "auth.hasAccount": "عندك حساب بالفعل؟",
  "auth.signInWith": "ادخل باستخدام {provider}",
  "auth.loginSuccess": "دخلت بنجاح",
  "auth.registerSuccess": "الحساب اتعمل بنجاح",
  "auth.invalidCredentials": "الإيميل أو كلمة السر مش صح",
  "auth.emailTaken": "الإيميل ده مستخدم بالفعل",
  "auth.usernameTaken": "اسم المستخدم ده مستخدم بالفعل",
  "auth.registrationFailed": "معرفناش نعمل الحساب",
  "auth.githubAttributionHint": "ادخل باستخدام GitHub عشان نربط مساهماتك بمجتمع المصادر المفتوحة",

  // Prompts / artifacts
  "prompts.title": "البرومبتات",
  "prompts.create": "اعمل برومبت",
  "prompts.createSkill": "اعمل مهارة",
  "prompts.createTaste": "اعمل ذوق",
  "prompts.edit": "عدّل البرومبت",
  "prompts.delete": "احذف البرومبت",
  "prompts.noPrompts": "ملقيناش برومبتات",
  "prompts.noPromptsDescription": "جرّب تغيّر البحث أو الفلاتر عشان تلاقي اللي بتدور عليه.",
  "prompts.noMorePrompts": "وصلت لآخر النتائج",
  "prompts.loadMore": "حمّل أكتر",
  "prompts.loading": "بيتم التحميل...",
  "prompts.promptTitle": "العنوان",
  "prompts.promptContent": "المحتوى",
  "prompts.promptDescription": "الوصف",
  "prompts.promptType": "النوع",
  "prompts.promptCategory": "التصنيف",
  "prompts.promptTags": "التاجات",
  "prompts.searchTags": "دوّر في التاجات...",
  "prompts.noTagsFound": "ملقيناش تاجات",
  "prompts.worksBestWithModels": "بيشتغل أحسن مع",
  "prompts.selectModel": "اختار موديل...",
  "prompts.add": "ضيف",
  "prompts.advancedOptions": "اختيارات متقدمة",
  "prompts.searchContributors": "دوّر باسم المستخدم...",
  "prompts.noUsersFound": "ملقيناش مستخدمين",
  "prompts.promptPrivate": "خاص",
  "prompts.feature": "ميّز",
  "prompts.featured": "مميز",
  "prompts.adminArea": "منطقة الإدارة",
  "prompts.promptDeleted": "البرومبت ده اتحذف",
  "prompts.promptDelisted": "البرومبت ده اتشال من القايمة",
  "prompts.run": "شغّل",
  "prompts.downloadMarkdown": "نزّل MD",
  "prompts.downloadYaml": "نزّل YAML",
  "prompts.copy": "انسخ",
  "prompts.download": "نزّل",
  "prompts.addFile": "ضيف ملف",
  "prompts.deleteFile": "احذف الملف",
  "prompts.addNewFile": "ضيف ملف جديد",
  "prompts.deleteFileConfirm": "تحذف الملف؟",
  "prompts.downloadStarted": "التحميل بدأ",
  "prompts.downloadFailed": "التحميل ما نجحش",
  "prompts.urlCopied": "الرابط اتنسخ",
  "prompts.promptCopied": "البرومبت اتنسخ",
  "prompts.openPlatform": "افتح {platform}",
  "prompts.titleRequired": "لازم تكتب العنوان",
  "prompts.contentRequired": "لازم تكتب المحتوى",
  "prompts.titlePlaceholder": "اكتب عنوان البرومبت",
  "prompts.descriptionPlaceholder": "اكتب وصف للبرومبت لو حابب",
  "prompts.contentPlaceholder": "اكتب محتوى البرومبت هنا...",
  "prompts.selectCategory": "اختار تصنيف",
  "prompts.noCategory": "من غير تصنيف",
  "prompts.clickToUpload": "اضغط عشان ترفع صورة",
  "prompts.clickToUploadVideo": "اضغط عشان ترفع فيديو",
  "prompts.clickToUploadAudio": "اضغط عشان ترفع ملف صوتي",
  "prompts.uploading": "بيتم الرفع...",
  "prompts.generationComplete": "العملية خلصت",
  "prompts.generationFailed": "العملية ما نجحتش",
  "prompts.close": "اقفل",
  "prompts.previous": "اللي قبله",
  "prompts.next": "اللي بعده",
  "prompts.more": "المزيد",
  "prompts.translateToLanguage": "ترجم للغتك",
  "prompts.translationFailed": "الترجمة ما نجحتش",
  "prompts.alreadyTranslated": "المحتوى مترجم بالفعل",
  "prompts.learnHowToWritePrompts": "اتعلم تكتب برومبتات أحسن ←",

  // Search / discovery
  "search.placeholder": "دوّر في البرومبتات...",
  "search.filters": "الفلاتر",
  "search.noResults": "ملقيناش نتائج",
  "search.sortBy": "رتّب حسب",
  "search.clear": "امسح",
  "search.found": "لقينا {count}",
  "search.searchTags": "دوّر في التاجات...",
  "feed.yourFeed": "الفيد بتاعك",
  "feed.feedDescription": "برومبتات من التصنيفات اللي متابعها",
  "feed.browseAll": "شوف الكل",
  "feed.discover": "اكتشف",
  "feed.noPromptsInFeed": "مفيش برومبتات في الفيد دلوقتي",
  "feed.subscribeToCategories": "تابع تصنيفات عشان البرومبتات تظهر هنا",
  "feed.viewAllCategories": "شوف كل التصنيفات",
  "collection.title": "مكتبتي",
  "collection.description": "البرومبتات اللي حفظتها عشان ترجع لها بعدين",
  "collection.browsePrompts": "شوف البرومبتات",
  "collection.emptyTitle": "مكتبتك فاضية",
  "collection.emptyDescription": "احفظ البرومبتات هنا عشان توصل لها بسرعة",
  "collection.addToCollection": "ضيف للمكتبة",
  "collection.inCollection": "في المكتبة",

  // Workflows / ranking
  "workflows.title": "مسارات الشغل",
  "workflows.description": "برومبتات مترابطة بخطوات واتصالات متسلسلة",
  "workflows.noWorkflows": "مفيش مسارات شغل لسه",
  "workflows.browsePrompts": "شوف البرومبتات",
  "promptmasters.title": "محترفي البرومبتات",
  "promptmasters.description": "أفضل المساهمين حسب التصويتات اللي أخدوها على برومبتاتهم",
  "promptmasters.allTime": "كل الوقت",
  "promptmasters.thisMonth": "الشهر ده",
  "promptmasters.thisWeek": "الأسبوع ده",

  // Homepage
  "homepage.heroTitle": "المكان اللي بيجمع",
  "homepage.heroSubtitle": "برومبتات وأدوات الذكاء الاصطناعي",
  "homepage.heroDescription": "اكتشف البرومبتات والمهارات ومسارات الشغل، احفظ اللي محتاجه وشاركه بسهولة.",
  "homepage.heroFeature1": "مجاني ومفتوح المصدر",
  "homepage.heroFeature2": "تقدر تستضيفه بنفسك",
  "homepage.heroFeature3": "مناسب للأفراد والفرق",
  "homepage.clients": "الأدوات",
  "homepage.setupPrivateServer": "شغّل نسختك الخاصة",
  "homepage.ourHistory": "اعرف أكتر",
  "homepage.browsePrompts": "شوف البرومبتات",
  "homepage.viewFeed": "شوف الفيد",
  "homepage.readyToStart": "جاهز تبدأ؟",
  "homepage.freeAndOpen": "مجاني ومفتوح المصدر.",
  "homepage.createAccount": "اعمل حساب",
  "homepage.featuredPrompts": "برومبتات مميزة",
  "homepage.latestPrompts": "أحدث البرومبتات",

  // Errors / empty states
  "errors.notFound": "الصفحة مش موجودة",
  "errors.unauthorized": "مش مسموح لك تدخل هنا",
  "errors.forbidden": "الدخول مش مسموح",
  "errors.serverError": "حصل خطأ في السيرفر",
  "notFound.title": "الصفحة مش موجودة",
  "notFound.description": "الصفحة اللي بتدور عليها مش موجودة أو مكانها اتغيّر.",
  "notFound.goHome": "الرئيسية",
  "notFound.goBack": "ارجع",
  "notFound.helpfulLinks": "ممكن تروح لـ:",
  "notFound.browsePrompts": "شوف البرومبتات",
  "notFound.createPrompt": "اعمل برومبت",
  "serverError.title": "حصل خطأ في السيرفر",
  "serverError.description": "حصل خطأ. جرّب تاني بعد شوية.",
  "serverError.tryAgain": "جرّب تاني",
  "serverError.goBack": "ارجع",
  "serverError.helpfulLinks": "ممكن تروح لـ:",

  // Builder
  "heroPromptInput.placeholder": "اوصف البرومبت اللي عايز تعمله...",
  "heroPromptInput.ariaLabel": "اوصف البرومبت اللي عايز تعمله",
  "heroPromptInput.submit": "اعمل برومبت",
  "heroPromptInput.hint": "اضغط عشان تبدأ بالذكاء الاصطناعي",
  "heroPromptInput.modelName": "مساعد البرومبتات",
  "promptBuilder.title": "مساعد بناء البرومبتات",
  "promptBuilder.openBuilder": "مساعد البرومبتات",
  "promptBuilder.welcomeTitle": "اعمل برومبت بالذكاء الاصطناعي",
  "promptBuilder.welcomeDescription": "اوصف اللي عايز تعمله وأنا هساعدك تبنيه خطوة بخطوة.",
  "promptBuilder.tryAsking": "جرّب تقول:",
  "promptBuilder.inputPlaceholder": "اوصف اللي عايز تعمله...",
  "promptBuilder.thinking": "بفكر...",
  "promptBuilder.errorMessage": "حصل خطأ. جرّب تاني.",

  // Support / remove source brand from public Arabic copy
  "support.title": "المساعدة",
  "support.description": "دوّر على إجابة لسؤالك أو اعرف تستخدم المنصة إزاي.",
  "support.faq.title": "أسئلة شائعة",
  "support.faq.whatIsPrompt.question": "يعني إيه برومبت؟",
  "support.faq.whatIsPromptschat.question": "إيه هي المنصة دي؟",
  "support.faq.whatIsPromptschat.answer": "دي مكتبة مجتمعية بتخليك تكتشف البرومبتات وتشاركها وتحفظها، ومع الوقت هتضم كمان مهارات ومسارات شغل وأنواع تانية من أدوات الذكاء الاصطناعي.",
  "support.faq.howToUse.question": "أستخدم البرومبتات من هنا إزاي؟",
  "support.faq.license.question": "ينفع أستخدم البرومبتات تجاريًا؟",
  "support.faq.license.answer": "أيوه، بس راجع الترخيص الظاهر مع كل محتوى أو مصدر قبل الاستخدام التجاري، خصوصًا المحتوى اللي جاي من مصادر خارجية.",
  "support.faq.selfHost.question": "ينفع أشغّل نسخة خاصة بيا؟",
  "support.faq.selfHost.answer": "أيوه. المشروع مبني بحيث تقدر تشغّل نسخة خاصة وتتحكم في الإعدادات والبيانات والهوية البصرية.",

  // Footer / cookies
  "footer.howTo": "إزاي تستخدمه",
  "footer.docs": "الشرح",
  "footer.api": "واجهة البرمجة",
  "footer.about": "عن المنصة",
  "footer.privacy": "الخصوصية",
  "footer.terms": "الشروط",
  "footer.support": "المساعدة",
  "cookies.message": "بنستخدم ملفات كوكيز للتحليلات.",
  "cookies.accept": "موافق",
  "cookies.reject": "ارفض",
  "cookies.nevermind": "خلاص سيبها",
  "cookies.confirmReject": "أيوه، ارفض"
};

// Keep these technical/product names intact. They are names or executable formats,
// not untranslated UI copy.
const TECHNICAL_ONLY = /^(https?:\/\/|npx\s|npm\s|yarn\s|pnpm\s|[\w@./:-]+\.(?:md|json|yaml|yml|csv|ts|tsx|js|jsx))/i;

const AR_REPLACEMENTS: Array<[RegExp, string]> = [
  [/جاري /g, "بيتم "],
  [/جارٍ /g, "بيتم "],
  [/حدث خطأ ما/g, "حصل خطأ"],
  [/حدث خطأ/g, "حصل خطأ"],
  [/يرجى /g, "من فضلك "],
  [/الرجاء /g, "من فضلك "],
  [/لم يتم العثور على/g, "ملقيناش"],
  [/تم العثور على/g, "لقينا"],
  [/لا توجد/g, "مفيش"],
  [/لا يوجد/g, "مفيش"],
  [/ليس لديك/g, "معندكش"],
  [/لديك بالفعل/g, "عندك بالفعل"],
  [/لا يمكن/g, "مينفعش"],
  [/يمكنك/g, "تقدر"],
  [/سيتم/g, "هيتم"],
  [/لن يتم/g, "مش هيتم"],
  [/سيظل/g, "هيفضل"],
  [/لن يظهر/g, "مش هيظهر"],
  [/سيظهر/g, "هيظهر"],
  [/اختر/g, "اختار"],
  [/أدخل/g, "اكتب"],
  [/انقر/g, "اضغط"],
  [/حاول/g, "جرّب"],
  [/ابحث/g, "دوّر"],
  [/للبدء/g, "عشان تبدأ"],
  [/للمتابعة/g, "عشان تكمل"],
  [/مرة أخرى/g, "تاني"],
  [/لاحقاً/g, "بعد كده"],
  [/لاحقًا/g, "بعد كده"],
  [/أيضاً/g, "كمان"],
  [/أيضًا/g, "كمان"],
  [/بالإضافة إلى/g, "وكمان"],
  [/من خلال/g, "عن طريق"],
  [/هذا/g, "ده"],
  [/هذه/g, "دي"],
  [/الذي/g, "اللي"],
  [/التي/g, "اللي"],
  [/الذين/g, "اللي"],
  [/جميع/g, "كل"],
  [/أكثر/g, "أكتر"],
  [/أخبرنا/g, "قول لنا"],
  [/لم تقم/g, "ماعملتش"],
  [/غير موجودة/g, "مش موجودة"],
  [/غير موجود/g, "مش موجود"]
];

function neutralBrandReplacement(locale: string): string {
  if (locale === "ar") return "المنصة";
  if (locale === "fr") return "la plateforme";
  if (locale === "en") return "the platform";
  return "AI Library";
}

function normalizeString(value: string, locale: string, path: string): string {
  // Explicit Egyptian copy wins over any generic rewrite.
  if (locale === "ar" && AR_OVERRIDES[path]) {
    return AR_OVERRIDES[path];
  }

  // Never rewrite executable/code-like values.
  if (TECHNICAL_ONLY.test(value.trim())) {
    return value;
  }

  // Remove the upstream trademark from user-facing copy in every locale.
  let result = value.replace(/prompts\.chat/gi, neutralBrandReplacement(locale));

  if (locale !== "ar") return result;

  // Translate the few English UI labels that historically leaked into ar.json.
  const exactEnglishUi: Record<string, string> = {
    Promptmasters: "محترفي البرومبتات",
    Taste: "الذوق",
    "Typed-Prompts IDE": "محرر البرومبتات",
    "App Store": "متجر التطبيقات",
    "Toggle menu": "افتح أو اقفل القايمة",
    "Toggle theme": "غيّر شكل العرض",
    "Get Browser Extension": "نزّل إضافة المتصفح"
  };
  if (exactEnglishUi[result]) return exactEnglishUi[result];

  // Only Egyptianize Arabic prose; leave product/model names and code tokens alone.
  if (!/[\u0600-\u06FF]/.test(result)) return result;

  for (const [pattern, replacement] of AR_REPLACEMENTS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

function walk(value: unknown, locale: string, path = ""): unknown {
  if (typeof value === "string") return normalizeString(value, locale, path);
  if (Array.isArray(value)) return value.map((item, index) => walk(item, locale, `${path}.${index}`));
  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value as MessageTree).map(([key, child]) => {
      const childPath = path ? `${path}.${key}` : key;
      return [key, walk(child, locale, childPath)];
    }),
  );
}

/**
 * Presentation layer for localized messages.
 * - Arabic is presented as professional Egyptian Arabic.
 * - prompts.chat trademark copy is removed from all user-facing locales.
 * - Original locale files stay untouched for easier upstream syncing.
 */
export function prepareMessagesForLocale(messages: MessageTree, locale: string): MessageTree {
  return walk(messages, locale) as MessageTree;
}
