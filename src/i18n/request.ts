import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { LOCALE_COOKIE, supportedLocales, defaultLocale } from "@/lib/i18n/config";
import { prepareMessagesForLocale } from "@/lib/i18n/egyptian-ui";
import { applyWhiteLabel } from "@/lib/i18n/white-label";
import { applySemanticArabic } from "@/lib/i18n/semantic-ar";
import { IntlErrorCode } from "next-intl";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();

  // Respect an explicit saved preference. Otherwise always start in Arabic.
  // Hidden locales remain technically supported, but are not exposed in the UI.
  const savedLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = savedLocale && supportedLocales.includes(savedLocale)
    ? savedLocale
    : defaultLocale;

  // Load messages for the locale.
  let messages;
  try {
    messages = (await import(`@/../messages/${locale}.json`)).default;
  } catch {
    messages = (await import(`@/../messages/${defaultLocale}.json`)).default;
  }

  // Keep upstream locale files unchanged and apply our presentation layers here.
  // 1) Egyptian tone, 2) white-label source scrub, 3) semantic Arabic wording.
  messages = prepareMessagesForLocale(messages, locale);
  messages = applyWhiteLabel(messages, locale);
  messages = applySemanticArabic(messages, locale);

  return {
    locale,
    messages,
    timeZone: "UTC",
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        console.warn(`Missing translation: ${error.originalMessage}`);
      } else if (error.code === "ENVIRONMENT_FALLBACK" as IntlErrorCode) {
        // Silently ignore environment fallback warnings.
      } else {
        console.error(error);
      }
    },
    getMessageFallback({ namespace, key }) {
      return `${namespace}.${key}`;
    },
  };
});