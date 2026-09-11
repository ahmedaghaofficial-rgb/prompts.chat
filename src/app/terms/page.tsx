import Link from "next/link";
import { getLocale } from "next-intl/server";
import config from "@/../prompts.config";

export async function generateMetadata() {
  const locale = await getLocale();
  const isArabic = locale === "ar";

  return {
    title: isArabic ? `شروط الاستخدام - ${config.branding.name}` : `Terms of Service - ${config.branding.name}`,
    description: isArabic ? `شروط استخدام ${config.branding.name}` : `Terms of service for ${config.branding.name}`,
  };
}

export default async function TermsPage() {
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
        <h1 className="text-2xl font-bold mb-6">Terms of Service</h1>
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">Last updated: {updated}</p>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Acceptance</h2>
            <p className="text-muted-foreground">By using {config.branding.name}, you agree to these terms. If you do not agree, do not use the service.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">The service</h2>
            <p className="text-muted-foreground">The service lets users create, organize, discover, save, and share AI prompts and related resources.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Public content and licenses</h2>
            <p className="text-muted-foreground">Content you publish is governed by the license shown by the service. Content published under CC0 is dedicated to the public domain to the extent permitted by law and that dedication cannot normally be revoked later.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Your account</h2>
            <p className="text-muted-foreground">You are responsible for keeping your account credentials secure, for activity under your account, and for providing accurate account information.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Acceptable use</h2>
            <p className="text-muted-foreground">Do not use the service for harmful, illegal, abusive, deceptive, spammy, infringing, or unauthorized activity, and do not attempt to bypass access controls or manipulate the platform.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Moderation</h2>
            <p className="text-muted-foreground">Administrators may review, restrict, unlist, edit metadata for, or remove content and may restrict or suspend accounts when needed to protect the service, enforce these terms, or respond to abuse.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">AI results</h2>
            <p className="text-muted-foreground">Prompts and AI-powered features are provided without a guarantee that they will produce a particular result. Results vary by model, context, and provider.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Changes</h2>
            <p className="text-muted-foreground">These terms may be updated from time to time. Continued use after an update means the updated terms apply to your continued use.</p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-10" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">شروط الاستخدام</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <p className="text-muted-foreground">آخر تحديث: {updated}</p>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">موافقتك على الشروط</h2>
          <p className="text-muted-foreground">باستخدامك {config.branding.name}، إنت بتوافق على الشروط دي. لو مش موافق عليها، متستخدمش الخدمة.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">الخدمة بتعمل إيه؟</h2>
          <p className="text-muted-foreground">الخدمة بتسمح للمستخدمين بإنشاء وتنظيم واكتشاف وحفظ ومشاركة أوامر الذكاء الاصطناعي والموارد المرتبطة بيها.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">المحتوى العام والترخيص</h2>
          <p className="text-muted-foreground">
            المحتوى اللي بتنشره للعموم بيخضع للترخيص الظاهر وقت النشر. لو أمر منشور بترخيص{" "}
            <Link href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">CC0</Link>
            ، فده معناه التنازل عنه للملكية العامة بالقدر اللي يسمح بيه القانون، وعادةً مينفعش ترجع في التنازل ده بعد النشر.
          </p>
          <p className="text-muted-foreground">متنشرش محتوى بحقوق مش من حقك تتصرف فيها، وراجع حالة النشر والترخيص قبل التأكيد.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">حسابك</h2>
          <p className="text-muted-foreground">إنت مسؤول عن الحفاظ على أمان بيانات دخولك، وعن النشاط اللي بيتم من حسابك، وعن إن بيانات الحساب اللي بتقدمها تكون صحيحة.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">الاستخدام المسموح</h2>
          <p className="text-muted-foreground">مينفعش تستخدم الخدمة في:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>محتوى أو نشاط ضار أو غير قانوني أو مسيء.</li>
            <li>انتحال شخصية حد أو تقديم نفسك بصفة مش حقيقية.</li>
            <li>محاولة الوصول لأجزاء أو حسابات من غير تصريح.</li>
            <li>السبام أو المضايقة أو التلاعب بنظام التقييم أو الاكتشاف.</li>
            <li>نشر محتوى بينتهك حقوق ملكية فكرية تخص غيرك.</li>
            <li>إغراق المنصة بمحتوى مكرر أو ضعيف أو إنشاءات آلية بهدف الاستغلال.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">المراجعة والقيود</h2>
          <p className="text-muted-foreground">لو ظهر نشاط غير طبيعي أو إساءة استخدام، ممكن الحساب أو المحتوى يخضع لمراجعة أو قيود مؤقتة. القيود ممكن تشمل تقليل معدل إنشاء الأوامر أو إخفاء محتوى من الاكتشاف العام لحد ما تتم المراجعة.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">إدارة المحتوى</h2>
          <p className="text-muted-foreground">إدارة الخدمة ممكن تراجع أو تخفي من الاكتشاف أو تعدّل بيانات وصفية أو تحذف محتوى، وكمان تقيّد أو توقف حسابات، لما يكون ده ضروري لحماية الخدمة أو تطبيق الشروط أو التعامل مع إساءة الاستخدام.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">المحتوى غير المناسب</h2>
          <p className="text-muted-foreground">الصور والفيديوهات والصوت والمواد المرفوعة لازم تلتزم بسياسات الخدمة. المحتوى الإباحي أو الصادم أو اللي بيتضمن إساءة واضحة ممكن يتم إخفاؤه أو حذفه، وتكرار المخالفة ممكن يؤدي لقيود على الحساب.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">نتائج الذكاء الاصطناعي</h2>
          <p className="text-muted-foreground">الأوامر وأي خصائص معتمدة على الذكاء الاصطناعي بتتقدم من غير ضمان لنتيجة محددة. النتيجة ممكن تختلف حسب النموذج والسياق ومقدم الخدمة وطريقة الاستخدام.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">حدود المسؤولية</h2>
          <p className="text-muted-foreground">استخدامك للأوامر والنتائج اللي بتطلع من أدوات الذكاء الاصطناعي مسؤوليتك. راجع النتائج قبل الاعتماد عليها، خصوصًا في القرارات المهمة أو المتخصصة.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">تحديث الشروط</h2>
          <p className="text-muted-foreground">ممكن الشروط دي تتحدث من وقت للتاني. استمرارك في استخدام الخدمة بعد التحديث معناه إن الشروط الجديدة هتطبق على استخدامك المستمر.</p>
        </section>
      </div>
    </div>
  );
}
