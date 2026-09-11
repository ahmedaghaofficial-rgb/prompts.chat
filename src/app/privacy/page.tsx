import Link from "next/link";
import { getLocale } from "next-intl/server";
import config from "@/../prompts.config";

export async function generateMetadata() {
  const locale = await getLocale();
  const isArabic = locale === "ar";

  return {
    title: isArabic ? `سياسة الخصوصية - ${config.branding.name}` : `Privacy Policy - ${config.branding.name}`,
    description: isArabic ? `سياسة الخصوصية الخاصة بـ ${config.branding.name}` : `Privacy policy for ${config.branding.name}`,
  };
}

export default async function PrivacyPage() {
  const locale = await getLocale();
  const isArabic = locale === "ar";
  const updated = new Date().toLocaleDateString(isArabic ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (!isArabic) {
    return (
      <div className="container max-w-3xl py-10">
        <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">Last updated: {updated}</p>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Overview</h2>
            <p className="text-muted-foreground">
              {config.branding.name} is a library for collecting, organizing, saving, and sharing AI prompts and related resources. Public prompts may be made available under the license shown by the service.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Information we collect</h2>
            <p className="text-muted-foreground">When you create an account, we may store your email address, username, display name, and profile information you choose to provide. When you use the service, we may also store content you create, categories and tags you assign, and service analytics.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">How we use information</h2>
            <p className="text-muted-foreground">We use this information to provide and maintain the service, associate content with your account, support discovery features, improve the product, and detect abuse or unusual activity.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Public content</h2>
            <p className="text-muted-foreground">Content you publish publicly can be visible to other users together with your public profile information. Review a prompt&apos;s visibility and license before publishing it.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Cookies and analytics</h2>
            <p className="text-muted-foreground">Essential cookies may be used for authentication and session management. Analytics may be used to understand product usage when analytics are enabled for this deployment.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Your account</h2>
            <p className="text-muted-foreground">You can review and update the account information exposed through your profile and settings. Public-domain or otherwise licensed public content may continue to be usable according to the license that applied when it was published.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Questions</h2>
            <p className="text-muted-foreground">For privacy questions, use the support channel made available by this service.</p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-10" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">سياسة الخصوصية</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <p className="text-muted-foreground">آخر تحديث: {updated}</p>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">باختصار</h2>
          <p className="text-muted-foreground">
            {config.branding.name} مكتبة بتساعدك تجمع وتنظم وتحفظ وتشارك أوامر الذكاء الاصطناعي والموارد المرتبطة بيها. أي محتوى بتنشره بشكل عام ممكن يبقى ظاهر للمستخدمين حسب إعدادات النشر والترخيص المعروض في الخدمة.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">إيه البيانات اللي ممكن نجمعها؟</h2>
          <p className="text-muted-foreground">لما تعمل حساب، ممكن نحتفظ بـ:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>البريد الإلكتروني المستخدم في تسجيل الدخول.</li>
            <li>اسم المستخدم والاسم الظاهر.</li>
            <li>بيانات الملف الشخصي اللي تختار تضيفها.</li>
          </ul>
          <p className="text-muted-foreground">وأثناء استخدام الخدمة، ممكن نحتفظ بالمحتوى اللي بتنشئه، والتصنيفات والوسوم المرتبطة بيه، وبيانات استخدام تساعدنا نفهم أداء الخدمة.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">بنستخدم البيانات دي في إيه؟</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>تشغيل الخدمة والحفاظ عليها.</li>
            <li>ربط الأوامر والمحتوى بحسابك.</li>
            <li>تشغيل البحث والاكتشاف والخصائص المرتبطة بحسابك.</li>
            <li>تحسين التجربة وفهم طريقة استخدام المنتج.</li>
            <li>اكتشاف الإساءة والسبام والنشاط غير الطبيعي.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">المحتوى العام</h2>
          <p className="text-muted-foreground">
            أي أمر أو محتوى تختار تنشره بشكل عام ممكن يظهر لمستخدمين تانيين ومعاه بيانات حسابك العامة. قبل النشر، راجع حالة الظهور والترخيص المرتبط بالمحتوى. لو المحتوى منشور بترخيص عام زي{" "}
            <Link href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">CC0</Link>
            ، استخدامه بعد كده بيخضع لشروط الترخيص ده.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">الكوكيز وبيانات الاستخدام</h2>
          <p className="text-muted-foreground">
            الخدمة ممكن تستخدم كوكيز أساسية علشان تسجيل الدخول وإدارة الجلسة. ولو أدوات التحليل مفعلة في النسخة الحالية، ممكن نستخدم بيانات مجمعة عن المشاهدات والبحث والتفاعل علشان نفهم الاستخدام ونحسن المنتج.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">حسابك وبياناتك</h2>
          <p className="text-muted-foreground">
            تقدر تراجع وتحدّث البيانات المتاحة من خلال ملفك الشخصي والإعدادات. خليك واخد بالك إن المحتوى اللي اتنشر للعموم بترخيص غير قابل للسحب ممكن يفضل متاح للاستخدام وفقًا للترخيص اللي كان ساري وقت النشر.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">أسئلة عن الخصوصية</h2>
          <p className="text-muted-foreground">لو عندك سؤال متعلق بالخصوصية، استخدم وسيلة الدعم المتاحة داخل الخدمة.</p>
        </section>
      </div>
    </div>
  );
}
