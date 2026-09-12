import type { PrismaClient } from "@prisma/client";

interface VisualCommandDefinition {
  id: string;
  alias: string;
  slug: string;
  title: string;
  description: string;
  goal: string;
  layout: string;
  tags: Array<"mindmaps" | "diagrams" | "explainers" | "infographics" | "systems">;
}

const CATEGORY = {
  name: "الأوامر البصرية",
  slug: "arabia-visual-commands",
  description: "أوامر عربية جاهزة لتحويل الأفكار والمعلومات إلى خرائط ورسومات وشروحات بصرية مبهرة.",
  icon: "✨",
};

const TAGS = {
  mindmaps: { name: "خرائط ذهنية عربية", slug: "arabia-mindmaps" },
  diagrams: { name: "مخططات بصرية عربية", slug: "arabia-diagrams" },
  explainers: { name: "شرح بصري عربي", slug: "arabia-visual-explainers" },
  infographics: { name: "إنفوجرافيك عربي", slug: "arabia-infographics" },
  systems: { name: "تصميم الأنظمة بصريًا", slug: "arabia-system-visuals" },
} as const;

// First-party pack for 1000 PROMPTS ARABIA.
// The commands are original Arabic instructions inspired by common visual-thinking patterns;
// no third-party prompt text is copied verbatim.
export const ARABIA_VISUAL_COMMANDS: VisualCommandDefinition[] = [
  { id: "arabia-visual-001", alias: "/mindmap", slug: "mindmap-arabia", title: "خريطة ذهنية مبهرة", description: "حوّل أي موضوع إلى خريطة ذهنية واضحة وسهلة الحفظ.", goal: "استخرج الفكرة المركزية ثم الفروع الرئيسية والفرعية، واختصر كل عقدة إلى كلمات قليلة قوية.", layout: "تكوين شعاعي متوازن؛ الفكرة في المنتصف، الفروع الرئيسية كبيرة وواضحة، والفروع الثانوية أخف بصريًا.", tags: ["mindmaps", "explainers"] },
  { id: "arabia-visual-002", alias: "/radialmap", slug: "radialmap-arabia", title: "خريطة دائرية شعاعية", description: "اعرض موضوعًا من مركز واحد يمتد إلى محاور مترابطة.", goal: "قسّم الموضوع إلى محاور متساوية تقريبًا وأظهر درجة قرب كل محور من الفكرة الأساسية.", layout: "دوائر أو حلقات شعاعية حول مركز واضح مع مسافات تمنع التزاحم.", tags: ["mindmaps", "diagrams"] },
  { id: "arabia-visual-003", alias: "/conceptmap", slug: "conceptmap-arabia", title: "خريطة مفاهيم", description: "وضّح المفاهيم والعلاقات بينها بدل عرضها كقائمة.", goal: "استخرج المفاهيم الأساسية، سمِّ نوع العلاقة بين كل مفهومين، وأظهر العلاقات المتقاطعة المهمة.", layout: "شبكة عقد مترابطة؛ استخدم أسهمًا عليها أفعال قصيرة تشرح نوع العلاقة.", tags: ["mindmaps", "systems"] },
  { id: "arabia-visual-004", alias: "/knowledgegraph", slug: "knowledgegraph-arabia", title: "شبكة معرفة", description: "حوّل معلومات كثيرة إلى شبكة معرفة مترابطة قابلة للاستكشاف.", goal: "حدّد الكيانات والأفكار والعلاقات، واجمع المتشابه في مجموعات واضحة.", layout: "شبكة Nodes وConnections مع تمييز المجموعات بصريًا وتقليل الخطوط المتقاطعة قدر الإمكان.", tags: ["mindmaps", "systems"] },
  { id: "arabia-visual-005", alias: "/argumentmap", slug: "argumentmap-arabia", title: "خريطة حجج وآراء", description: "اعرض الرأي والحجج المؤيدة والمعارضة والأدلة بشكل محايد.", goal: "افصل الادعاء الرئيسي عن الأدلة والاعتراضات والردود، ووضّح قوة كل رابط منطقيًا.", layout: "الادعاء في المنتصف أو الأعلى، مؤيدات في جهة، معارضات في الجهة الأخرى، والأدلة تحت كل نقطة.", tags: ["mindmaps", "explainers"] },
  { id: "arabia-visual-006", alias: "/roadmap", slug: "roadmap-arabia", title: "خريطة طريق", description: "حوّل هدفًا إلى مراحل تنفيذ واضحة بصريًا.", goal: "قسّم الطريق إلى مراحل، وكل مرحلة إلى أهداف ونتيجة قابلة للقياس ومخاطر أو اعتماديات إن وجدت.", layout: "مسار أفقي أو متعرج يبدأ من الوضع الحالي وينتهي بالهدف النهائي مع نقاط إنجاز واضحة.", tags: ["diagrams", "systems"] },
  { id: "arabia-visual-007", alias: "/timeline", slug: "timeline-arabia", title: "خط زمني بصري", description: "اعرض الأحداث أو المراحل حسب الزمن بطريقة سهلة المسح البصري.", goal: "رتّب الأحداث زمنيًا، اختصر وصف كل حدث، وأبرز نقاط التحول.", layout: "خط زمني أفقي للمحتوى القصير أو رأسي للمحتوى الطويل، مع أحجام مختلفة للأحداث المهمة.", tags: ["diagrams", "explainers"] },
  { id: "arabia-visual-008", alias: "/decisiontree", slug: "decisiontree-arabia", title: "شجرة قرار", description: "حوّل الاختيارات المتعددة إلى مسارات قرار مفهومة.", goal: "ابدأ بسؤال القرار، أنشئ فروع نعم/لا أو بدائل واضحة، وانتهِ بنتيجة أو توصية لكل مسار.", layout: "شجرة من أعلى لأسفل مع أسئلة قصيرة وعلامات واضحة لنهايات المسارات.", tags: ["mindmaps", "diagrams"] },
  { id: "arabia-visual-009", alias: "/relationshipmap", slug: "relationshipmap-arabia", title: "خريطة علاقات", description: "وضّح العلاقات والتأثيرات بين أشخاص أو فرق أو عناصر.", goal: "حدّد الأطراف ونوع العلاقة واتجاهها وقوتها عند الإمكان.", layout: "شبكة نظيفة؛ سمك الخط أو قرب العناصر يعكس قوة العلاقة مع مفتاح بصري صغير.", tags: ["mindmaps", "systems"] },
  { id: "arabia-visual-010", alias: "/ecosystem", slug: "ecosystem-arabia", title: "خريطة منظومة كاملة", description: "اعرض منظومة كاملة ومن يؤثر على من داخلها.", goal: "حدّد اللاعبين والمكونات والتدفقات والمدخلات والمخرجات ونقاط التأثير.", layout: "مجموعات مترابطة حول قلب المنظومة مع أسهم تدفق واضحة ومناطق منفصلة لكل نوع عنصر.", tags: ["systems", "diagrams"] },

  { id: "arabia-visual-011", alias: "/flowchart", slug: "flowchart-arabia", title: "مخطط تدفق", description: "حوّل خطوات أي عملية إلى Flowchart واضح.", goal: "رتّب الخطوات، اكتشف نقاط القرار والتكرار والنهايات، ولا تترك خطوة غامضة.", layout: "من أعلى لأسفل افتراضيًا؛ مستطيلات للخطوات ومعينات للقرارات وأسهم واضحة بلا تقاطعات مربكة.", tags: ["diagrams", "systems"] },
  { id: "arabia-visual-012", alias: "/processmap", slug: "processmap-arabia", title: "خريطة عملية", description: "صوّر عملية عمل كاملة من البداية للنهاية.", goal: "بيّن المدخلات والخطوات والمخرجات ونقاط التسليم والاختناقات المحتملة.", layout: "مراحل متتابعة في Blocks كبيرة، وتحت كل مرحلة التفاصيل الأساسية فقط.", tags: ["diagrams", "systems"] },
  { id: "arabia-visual-013", alias: "/swimlane", slug: "swimlane-arabia", title: "مخطط مسؤوليات Swimlane", description: "وضّح مين مسؤول عن كل خطوة ومتى تنتقل المهمة لغيره.", goal: "قسّم المشاركين إلى مسارات، وضع كل خطوة داخل مسار صاحب المسؤولية، وأظهر نقاط التسليم.", layout: "مسارات أفقية أو رأسية بأسماء الأطراف، والعملية تتحرك خلالها بأسهم واضحة.", tags: ["diagrams", "systems"] },
  { id: "arabia-visual-014", alias: "/sequence", slug: "sequence-arabia", title: "تسلسل الأحداث", description: "وضّح من يتفاعل مع من وبأي ترتيب.", goal: "حدّد الأطراف، الرسائل أو الأفعال، وترتيبها الزمني مع الحالات البديلة المهمة.", layout: "أعمدة للأطراف من اليمين لليسار عند العربية، وأسهم مرتبة من أعلى لأسفل.", tags: ["diagrams", "systems"] },
  { id: "arabia-visual-015", alias: "/customerjourney", slug: "customerjourney-arabia", title: "رحلة العميل", description: "حوّل تجربة العميل إلى مراحل ومشاعر ونقاط احتكاك وفرص تحسين.", goal: "اعرض المرحلة، هدف العميل، ما يفعله، شعوره، المشكلة، وفرصة التحسين في كل محطة.", layout: "مسار أفقي بالمراحل مع صفوف ثابتة للمشاعر والمشاكل والفرص.", tags: ["diagrams", "infographics"] },
  { id: "arabia-visual-016", alias: "/storymap", slug: "storymap-arabia", title: "خريطة قصة", description: "حوّل قصة أو فكرة أو سيناريو إلى مسار بصري مترابط.", goal: "استخرج البداية والتصاعد ونقاط التحول والذروة والنهاية، مع الشخصيات أو العناصر المهمة.", layout: "مسار سردي متتابع ببطاقات قصيرة وصورة ذهنية أو رمز لكل محطة.", tags: ["explainers", "infographics"] },
  { id: "arabia-visual-017", alias: "/causemap", slug: "causemap-arabia", title: "خريطة أسباب ونتائج", description: "حلّل لماذا حدث شيء وما الذي نتج عنه.", goal: "افصل الأسباب المباشرة والجذرية والعوامل المساعدة عن النتائج القريبة والبعيدة.", layout: "الأسباب على جانب، الحدث في المنتصف، النتائج على الجانب الآخر مع أسهم سببية واضحة.", tags: ["mindmaps", "diagrams"] },
  { id: "arabia-visual-018", alias: "/fishbone", slug: "fishbone-arabia", title: "تحليل عظمة السمكة", description: "حلّل جذور مشكلة عبر مجموعات أسباب رئيسية.", goal: "ضع المشكلة في الرأس، واجمع الأسباب في محاور منطقية ثم أضف الأسباب الفرعية تحت كل محور.", layout: "Fishbone نظيف مع 4 إلى 8 عظام رئيسية فقط وتدرج واضح للأسباب.", tags: ["diagrams", "explainers"] },
  { id: "arabia-visual-019", alias: "/valuechain", slug: "valuechain-arabia", title: "سلسلة القيمة", description: "اعرض كيف تنتقل القيمة بين المراحل من المصدر حتى النتيجة النهائية.", goal: "حدّد الأنشطة الأساسية والمساندة وما تضيفه كل مرحلة وأين يحدث الهدر أو التحسين.", layout: "سلسلة مراحل متصلة مع شريط منفصل للأنشطة الداعمة.", tags: ["systems", "diagrams"] },
  { id: "arabia-visual-020", alias: "/hierarchy", slug: "hierarchy-arabia", title: "هيكل هرمي", description: "اعرض أي هيكل إداري أو معرفي أو تصنيفي بطريقة هرمية.", goal: "حدّد المستوى الأعلى ثم المستويات التابعة، وحافظ على توازن الفروع وعدم خلط المستويات.", layout: "هرم أو شجرة من الأعلى للأسفل مع مسافات ثابتة بين المستويات.", tags: ["diagrams", "systems"] },

  { id: "arabia-visual-021", alias: "/infographic", slug: "infographic-arabia", title: "إنفوجرافيك كامل", description: "حوّل محتوى كثيف إلى إنفوجرافيك جذاب وسريع الفهم.", goal: "استخرج الرسالة الرئيسية، 3 إلى 7 حقائق أو محاور، والأرقام أو المقارنات التي تستحق الإبراز.", layout: "عنوان قوي، Hero insight، أقسام قصيرة متتابعة، أرقام كبيرة، أيقونات، ومساحات بيضاء مريحة.", tags: ["infographics", "explainers"] },
  { id: "arabia-visual-022", alias: "/onepager", slug: "onepager-arabia", title: "ملخص بصري في صفحة واحدة", description: "لخّص موضوعًا كاملًا في صفحة واحدة بدون فقد الفكرة الأساسية.", goal: "اختصر المحتوى إلى ما يجب أن يعرفه القارئ خلال دقيقة واحدة.", layout: "صفحة واحدة بشبكة واضحة: عنوان، ملخص، أهم النقاط، أرقام/أمثلة، ثم الخلاصة.", tags: ["infographics", "explainers"] },
  { id: "arabia-visual-023", alias: "/poster", slug: "poster-arabia", title: "بوستر معلوماتي", description: "حوّل رسالة أو معلومة إلى بوستر بصري قوي.", goal: "ركّز على رسالة واحدة رئيسية ودع كل العناصر البصرية تخدمها.", layout: "عنوان ضخم، عنصر بصري مركزي، 2 إلى 4 معلومات مساندة، وخاتمة أو Callout قصير.", tags: ["infographics"] },
  { id: "arabia-visual-024", alias: "/dashboard", slug: "dashboard-arabia", title: "لوحة مؤشرات", description: "حوّل البيانات والمعلومات إلى Dashboard سهلة القراءة.", goal: "حدّد أهم مؤشرات الأداء، الاتجاهات، المقارنات، والتنبيهات التي تحتاج قرارًا.", layout: "KPI cards بالأعلى، ثم رسوم الاتجاه والمقارنات، ثم التفاصيل؛ لا تعرض رقمًا بلا سياق.", tags: ["infographics", "systems"] },
  { id: "arabia-visual-025", alias: "/matrix", slug: "matrix-arabia", title: "مصفوفة بصرية", description: "رتّب العناصر داخل مصفوفة تكشف المقارنات والأنماط بسرعة.", goal: "اختر محورين مفيدين للتصنيف، ثم ضع كل عنصر في مكانه مع تفسير مختصر.", layout: "شبكة واضحة بمحاور معنونة، وقواعد ثابتة لموضع وحجم كل عنصر.", tags: ["infographics", "diagrams"] },
  { id: "arabia-visual-026", alias: "/quadrant", slug: "quadrant-arabia", title: "مخطط الأرباع الأربعة", description: "قسّم عناصر كثيرة إلى أربعة أرباع تساعد على اتخاذ قرار.", goal: "اختر محور X ومحور Y لهما معنى، سمِّ الأرباع، ثم وزّع العناصر مع توضيح سبب الموضع.", layout: "مربع 2×2 بعناوين قوية لكل ربع وعناصر قصيرة لا تتداخل.", tags: ["infographics", "diagrams"] },
  { id: "arabia-visual-027", alias: "/pyramid", slug: "pyramid-arabia", title: "هرم بصري", description: "اعرض مستويات أو أولويات أو نضجًا على شكل هرم.", goal: "رتّب المستويات من القاعدة للقمة ووضّح معنى الانتقال بين كل مستوى والذي يليه.", layout: "هرم من 3 إلى 7 طبقات، كل طبقة تحمل عنوانًا وجملة قصيرة فقط.", tags: ["infographics", "explainers"] },
  { id: "arabia-visual-028", alias: "/funnel", slug: "funnel-arabia", title: "قمع مراحل", description: "اعرض كيف تقل الكمية أو تتصفى العناصر عبر مراحل متتابعة.", goal: "حدّد كل مرحلة والعدد أو النسبة فيها، واحسب الفقد أو التحول بين المراحل إن توفرت البيانات.", layout: "Funnel واضح من الأعلى للأسفل مع الرقم والاسم داخل كل مرحلة وملاحظات جانبية عند نقاط التسرب.", tags: ["infographics", "diagrams"] },
  { id: "arabia-visual-029", alias: "/cycle", slug: "cycle-arabia", title: "دورة مستمرة", description: "حوّل عملية متكررة إلى دورة بصرية توضح الرجوع للبداية.", goal: "حدّد المراحل التي تعيد إنتاج بعضها وأظهر نقطة التغذية الراجعة.", layout: "دائرة أو حلقة من 3 إلى 8 مراحل بأسهم اتجاهية ومساحة مركزية لاسم الدورة.", tags: ["diagrams", "explainers"] },
  { id: "arabia-visual-030", alias: "/venn", slug: "venn-arabia", title: "مخطط فن للمقارنة", description: "وضّح أوجه التشابه والاختلاف بين مجموعتين أو ثلاث.", goal: "ضع الخصائص الفريدة لكل مجموعة في منطقتها، والمشترك الحقيقي فقط في مناطق التداخل.", layout: "دائرتان أو ثلاث بحد أقصى مع تسميات قليلة وواضحة داخل كل منطقة.", tags: ["infographics", "explainers"] },

  { id: "arabia-visual-031", alias: "/visualexplain", slug: "visualexplain-arabia", title: "اشرحها بصريًا", description: "حوّل أي شرح نصي طويل إلى شرح بصري مفهوم من أول نظرة.", goal: "اكتشف أنسب استعارة أو مخطط للمحتوى بدل إجبار كل شيء على شكل واحد.", layout: "اختر تلقائيًا بين خريطة، مخطط، مقارنة، Timeline أو Infographic حسب طبيعة الموضوع.", tags: ["explainers", "infographics"] },
  { id: "arabia-visual-032", alias: "/eli5visual", slug: "eli5visual-arabia", title: "اشرحها لطفل بصريًا", description: "بسّط موضوعًا صعبًا جدًا باستخدام صور ذهنية وأمثلة قصيرة.", goal: "استبدل المصطلحات المعقدة بتشبيهات مألوفة، ثم ابنِ الفكرة خطوة خطوة بلا قفزات.", layout: "3 إلى 6 مشاهد أو بطاقات كبيرة برسوم بسيطة وكلام قليل جدًا.", tags: ["explainers", "infographics"] },
  { id: "arabia-visual-033", alias: "/stepbystep", slug: "stepbystep-arabia", title: "شرح مرئي خطوة بخطوة", description: "حوّل تعليمات أو طريقة تنفيذ إلى خطوات بصرية لا تُفهم غلط.", goal: "اجعل كل خطوة فعلًا واحدًا واضحًا مع نتيجة متوقعة وتحذير إن لزم.", layout: "بطاقات مرقمة متتابعة مع سهم بين الخطوات ورمز أو لقطة توضيحية لكل خطوة.", tags: ["explainers", "diagrams"] },
  { id: "arabia-visual-034", alias: "/comparison", slug: "comparison-arabia", title: "مقارنة بصرية", description: "قارن بين خيارين أو أكثر بسرعة ومن غير جداول مملة.", goal: "اختر معايير حقيقية للمقارنة، أظهر الفروق المهمة، وانتهِ بملخص لمن يناسبه كل خيار.", layout: "أعمدة أو Cards متوازية بنفس المعايير وبإشارات بصرية للفائز أو التعادل عند الحاجة.", tags: ["explainers", "infographics"] },
  { id: "arabia-visual-035", alias: "/beforeafter", slug: "beforeafter-arabia", title: "قبل وبعد", description: "اعرض التغيير بين حالتين بطريقة مباشرة ومقنعة.", goal: "حدّد ما تغيّر فعلًا، لماذا تغيّر، وما الأثر الناتج بدون مبالغة.", layout: "تقسيم نصفين Before/After أو Slider بصري؛ حافظ على نفس المقاييس في الجانبين.", tags: ["infographics", "explainers"] },
  { id: "arabia-visual-036", alias: "/framework", slug: "framework-arabia", title: "إطار عمل بصري", description: "حوّل فكرة أو منهج إلى Framework له أجزاء وعلاقات واضحة.", goal: "استخرج المكونات الأساسية، ترتيب استخدامها، وما ينتج عن كل جزء.", layout: "نموذج بصري واحد متماسك؛ دوائر أو أعمدة أو طبقات حسب طبيعة الإطار.", tags: ["explainers", "systems"] },
  { id: "arabia-visual-037", alias: "/cheatsheet", slug: "cheatsheet-arabia", title: "ورقة مرجعية سريعة", description: "حوّل موضوعًا إلى Cheat Sheet ترجع لها في ثوانٍ.", goal: "احتفظ بالقواعد والأوامر والاختصارات والأمثلة التي يحتاجها المستخدم وقت التنفيذ فقط.", layout: "شبكة كثيفة لكن مرتبة من Cards صغيرة بعناوين واضحة وأمثلة قصيرة.", tags: ["explainers", "infographics"] },
  { id: "arabia-visual-038", alias: "/summaryboard", slug: "summaryboard-arabia", title: "لوحة تلخيص", description: "لخّص محتوى طويل في لوحة واحدة تربط الأفكار بدل اختصارها عشوائيًا.", goal: "استخرج الفكرة الرئيسية، أهم المحاور، الروابط، القرارات، والأرقام أو الأمثلة التي لا يجب فقدها.", layout: "لوحة مقسمة إلى مناطق: الفكرة، المحاور، الروابط، الأمثلة، والخلاصة.", tags: ["mindmaps", "explainers"] },
  { id: "arabia-visual-039", alias: "/sketchnote", slug: "sketchnote-arabia", title: "ملاحظات مرسومة Sketchnote", description: "حوّل الشرح إلى ملاحظات مرسومة تبدو بشرية وسهلة التذكر.", goal: "استخدم كلمات مفتاحية، أسهم، أيقونات وتشبيهات رسومية بدل الفقرات الطويلة.", layout: "صفحة تشبه دفتر ملاحظات منظم مع Hand-drawn feel ومسارات قراءة واضحة.", tags: ["explainers", "infographics"] },
  { id: "arabia-visual-040", alias: "/whiteboard", slug: "whiteboard-arabia", title: "سبورة شرح متكاملة", description: "حوّل موضوعًا إلى Whiteboard كأن خبيرًا يشرحه أمامك.", goal: "ابدأ بالسؤال، ابنِ الفكرة أمام القارئ، اربط العناصر، وانتهِ بخلاصة أو قرار.", layout: "سبورة واسعة بها مجموعات Sticky notes ورسومات وأسهم وعناوين، لكن بترتيب مقصود وليس عشوائيًا.", tags: ["explainers", "mindmaps"] },

  { id: "arabia-visual-041", alias: "/xray", slug: "xray-arabia", title: "عرض بالأشعة X-Ray", description: "اكشف البنية الداخلية لمنتج أو فكرة مع الحفاظ على الشكل الخارجي.", goal: "حدّد المكونات الداخلية ومكان كل منها ووظيفته والعلاقة بين الداخل والخارج.", layout: "عنصر رئيسي شبه شفاف مع Callouts خارجية وأسهم دقيقة لكل مكوّن.", tags: ["explainers", "infographics"] },
  { id: "arabia-visual-042", alias: "/cutaway", slug: "cutaway-arabia", title: "قطاع Cutaway", description: "اعرض جزءًا مقطوعًا من الشيء لكشف ما بداخله وكيف يعمل.", goal: "اختر زاوية القطع التي تكشف أكبر قدر من المعلومات بأقل تشويش.", layout: "منظور 3D أو إيزومتريك بسيط مع سطح القطع واضح وتسميات مرتبة حول الجسم.", tags: ["explainers", "infographics"] },
  { id: "arabia-visual-043", alias: "/explodedview", slug: "explodedview-arabia", title: "منظور الأجزاء المفككة", description: "فكّك منتجًا أو نظامًا إلى أجزائه وأظهر ترتيب تجميعها.", goal: "رتّب الأجزاء حسب موضعها الحقيقي، سمِّ كل جزء، واشرح وظيفته بإيجاز.", layout: "Exploded view على محور واحد أو أكثر مع مسافات منتظمة وخطوط إرشاد للتجميع.", tags: ["explainers", "systems"] },
  { id: "arabia-visual-044", alias: "/anatomy", slug: "anatomy-arabia", title: "تشريح المكونات", description: "اشرح ممّ يتكون شيء وما وظيفة كل جزء.", goal: "قسّم الكيان إلى مكوّنات وظيفية، واشرح وظيفة كل مكوّن وتأثيره على الكل.", layout: "العنصر في المنتصف، المكونات مرقمة، وحولها Callouts قصيرة ومتوازنة.", tags: ["explainers", "systems"] },
  { id: "arabia-visual-045", alias: "/layers", slug: "layers-arabia", title: "عرض الطبقات", description: "حوّل نظامًا أو مفهومًا إلى طبقات توضح ما يبنى فوق ماذا.", goal: "رتّب الطبقات من الأساس إلى الأعلى وبيّن وظيفة كل طبقة والاعتماديات بينها.", layout: "طبقات أفقية متراكبة أو منظور 3D منفصل قليلًا بين الطبقات.", tags: ["systems", "diagrams"] },
  { id: "arabia-visual-046", alias: "/annotate", slug: "annotate-arabia", title: "شرح بالصورة والأسهم", description: "أضف أسهمًا وتسميات وتعليقات تجعل صورة أو تصميمًا مفهومًا بذاته.", goal: "حدّد فقط النقاط التي تحتاج شرحًا، واكتب Callouts قصيرة تصف الوظيفة أو الملاحظة بدقة.", layout: "الصورة هي البطل؛ التعليقات خارج مناطق التفاصيل قدر الإمكان وخطوط الإرشاد لا تتقاطع.", tags: ["explainers", "infographics"] },
  { id: "arabia-visual-047", alias: "/architecture", slug: "architecture-arabia", title: "معمارية نظام", description: "اعرض مكونات نظام كامل وكيف تتواصل مع بعضها.", goal: "قسّم النظام إلى طبقات أو خدمات، وضّح تدفق البيانات والاعتماديات والحدود الخارجية.", layout: "Blocks كبيرة للمجموعات، مكونات بداخلها، وأسهم مسماة للتدفقات المهمة فقط.", tags: ["systems", "diagrams"] },
  { id: "arabia-visual-048", alias: "/systemmap", slug: "systemmap-arabia", title: "خريطة نظام", description: "اعرض المدخلات والمكونات والتفاعلات والمخرجات في صورة واحدة.", goal: "حدّد حدود النظام، ما يدخل إليه، ما يحدث داخله، وما يخرج منه، مع حلقات التغذية الراجعة.", layout: "من اليمين لليسار للمحتوى العربي أو حسب تدفق النظام، مع حدود واضحة للنظام والبيئة الخارجية.", tags: ["systems", "mindmaps"] },
  { id: "arabia-visual-049", alias: "/storyboard", slug: "storyboard-arabia", title: "Storyboard بصري", description: "حوّل فكرة أو تجربة إلى مشاهد متتابعة قبل تنفيذها.", goal: "قسّم القصة إلى لقطات، وحدّد ما يراه المستخدم وما يحدث وما الرسالة في كل لقطة.", layout: "شبكة مشاهد مرقمة، كل مشهد يحتوي وصفًا بصريًا قصيرًا وتعليقًا أو حركة أساسية.", tags: ["explainers", "infographics"] },
  { id: "arabia-visual-050", alias: "/comicexplainer", slug: "comicexplainer-arabia", title: "شرح بقصة مصورة", description: "اشرح موضوعًا على هيئة Comic ممتع بدل الشرح التقليدي.", goal: "اختر شخصيات بسيطة وموقفًا واقعيًا، واجعل الحوار نفسه ينقل الفكرة خطوة بخطوة.", layout: "4 إلى 8 Panels متتابعة، نص قليل داخل كل Panel، ونهاية تلخّص الفكرة في لقطة واحدة.", tags: ["explainers", "infographics"] },
];

function buildPromptContent(command: VisualCommandDefinition): string {
  return `أنت خبير في التصميم البصري وتبسيط المعلومات. نفّذ الأمر ${command.alias} على المحتوى الذي سأضعه في آخر الرسالة.

الهدف:
${command.goal}

شكل التصميم المطلوب:
${command.layout}

قواعد الجودة:
- اجعل النتيجة مبهرة بصريًا لكن سهلة الفهم قبل أي شيء.
- استخدم العربية من اليمين لليسار RTL بشكل صحيح، مع خط عربي واضح لو كانت البيئة تدعم ذلك.
- اختصر النصوص داخل الرسم لأقصر صياغة تحافظ على المعنى؛ ممنوع تحويل الرسم إلى حائط كلام.
- أنشئ تسلسلًا بصريًا واضحًا: ماذا يرى المستخدم أولًا، ثم ثانيًا، ثم ثالثًا.
- استخدم أحجامًا ومسافات وتباينًا يوضح أهمية العناصر بدل الزخرفة العشوائية.
- استخدم ألوانًا محدودة ومتناسقة؛ لا تجعل اللون هو الوسيلة الوحيدة لفهم الفرق بين العناصر.
- استعمل أيقونات أو رموزًا فقط عندما تضيف معنى.
- راجع العلاقات والمنطق والأرقام قبل التسليم، ولا تخترع معلومة غير موجودة.
- لو المحتوى ناقص، استخدم افتراضات بسيطة ومعلنة بدل إيقاف التنفيذ بأسئلة كثيرة.
- لو المنصة تدعم إخراجًا بصريًا مباشرًا فأنشئ التصميم مباشرة. لو لا، استخدم أفضل صيغة قابلة للرسم أو التعديل متاحة مثل Mermaid أو SVG أو HTML أو مخطط منظم، واختر الأنسب تلقائيًا.
- اجعل التصميم مناسبًا للموبايل قدر الإمكان، وتجنب التفاصيل الصغيرة التي لا تُقرأ على شاشة صغيرة.

طريقة التسليم:
1) ابدأ بالنسخة البصرية النهائية مباشرة.
2) بعدها أضف سطرين فقط يشرحان منطق التنظيم البصري لو كان ذلك مفيدًا.
3) لا تضف مقدمة طويلة ولا تعيد كتابة المحتوى كاملًا خارج التصميم.

المحتوى المطلوب تحويله:
[ضع هنا الموضوع أو النص أو البيانات]`;
}

export function validateArabiaVisualCommands(): void {
  if (ARABIA_VISUAL_COMMANDS.length !== 50) {
    throw new Error(`Expected 50 Arabia visual commands, found ${ARABIA_VISUAL_COMMANDS.length}`);
  }

  const ids = new Set<string>();
  const slugs = new Set<string>();
  const aliases = new Set<string>();

  for (const command of ARABIA_VISUAL_COMMANDS) {
    if (ids.has(command.id)) throw new Error(`Duplicate visual command id: ${command.id}`);
    if (slugs.has(command.slug)) throw new Error(`Duplicate visual command slug: ${command.slug}`);
    if (aliases.has(command.alias)) throw new Error(`Duplicate visual command alias: ${command.alias}`);
    ids.add(command.id);
    slugs.add(command.slug);
    aliases.add(command.alias);

    const content = buildPromptContent(command);
    if (content.length < 900) {
      throw new Error(`Visual command content is unexpectedly short: ${command.alias}`);
    }
  }

  console.log(`✨ Arabia visual commands validated: ${ARABIA_VISUAL_COMMANDS.length}`);
}

export async function importArabiaVisualCommands(
  prisma: PrismaClient,
  authorId: string
): Promise<void> {
  validateArabiaVisualCommands();

  const category = await prisma.category.upsert({
    where: { slug: CATEGORY.slug },
    update: {
      name: CATEGORY.name,
      description: CATEGORY.description,
      icon: CATEGORY.icon,
      pinned: true,
      order: 50,
    },
    create: {
      name: CATEGORY.name,
      slug: CATEGORY.slug,
      description: CATEGORY.description,
      icon: CATEGORY.icon,
      pinned: true,
      order: 50,
    },
  });

  const tagIds = new Map<keyof typeof TAGS, string>();
  for (const [key, tag] of Object.entries(TAGS) as Array<
    [keyof typeof TAGS, (typeof TAGS)[keyof typeof TAGS]]
  >) {
    const saved = await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: { name: tag.name },
      create: { name: tag.name, slug: tag.slug },
    });
    tagIds.set(key, saved.id);
  }

  let created = 0;
  let updated = 0;
  let unchanged = 0;

  for (const command of ARABIA_VISUAL_COMMANDS) {
    const content = buildPromptContent(command);
    const desiredTagIds = command.tags.map((key) => tagIds.get(key)!).filter(Boolean);
    const existing = await prisma.prompt.findUnique({
      where: { id: command.id },
      select: { id: true, content: true },
    });

    if (!existing) {
      await prisma.prompt.create({
        data: {
          id: command.id,
          title: command.title,
          slug: command.slug,
          description: `${command.alias} — ${command.description}`,
          content,
          type: "TEXT",
          authorId,
          categoryId: category.id,
          isPrivate: false,
          isUnlisted: false,
          isFeatured: false,
          tags: {
            create: desiredTagIds.map((tagId) => ({ tagId })),
          },
          versions: {
            create: {
              version: 1,
              content,
              changeNote: "إطلاق حزمة الأوامر البصرية العربية",
              createdBy: authorId,
            },
          },
        },
      });
      created++;
      continue;
    }

    const contentChanged = existing.content !== content;
    await prisma.prompt.update({
      where: { id: command.id },
      data: {
        title: command.title,
        slug: command.slug,
        description: `${command.alias} — ${command.description}`,
        content,
        type: "TEXT",
        authorId,
        categoryId: category.id,
        isPrivate: false,
        isUnlisted: false,
        deletedAt: null,
        tags: {
          deleteMany: {},
          create: desiredTagIds.map((tagId) => ({ tagId })),
        },
      },
    });

    if (contentChanged) {
      const latestVersion = await prisma.promptVersion.findFirst({
        where: { promptId: command.id },
        orderBy: { version: "desc" },
        select: { version: true },
      });
      await prisma.promptVersion.create({
        data: {
          promptId: command.id,
          version: (latestVersion?.version || 0) + 1,
          content,
          changeNote: "تحديث حزمة الأوامر البصرية العربية",
          createdBy: authorId,
        },
      });
      updated++;
    } else {
      unchanged++;
    }
  }

  const visibleCount = await prisma.prompt.count({
    where: {
      id: { in: ARABIA_VISUAL_COMMANDS.map((command) => command.id) },
      isPrivate: false,
      isUnlisted: false,
      deletedAt: null,
    },
  });

  if (visibleCount !== ARABIA_VISUAL_COMMANDS.length) {
    throw new Error(`Visual commands verification failed: ${visibleCount}/50 are public`);
  }

  console.log("\n✨ 1000 PROMPTS ARABIA visual pack imported");
  console.log(`   created: ${created}`);
  console.log(`   updated: ${updated}`);
  console.log(`   unchanged: ${unchanged}`);
  console.log(`   public: ${visibleCount}/50`);
}
