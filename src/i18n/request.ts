import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { LOCALE_COOKIE, supportedLocales, defaultLocale } from "@/lib/i18n/config";
import { IntlErrorCode } from "next-intl";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();

  // Respect an explicit saved preference. Otherwise always start in Arabic.
  // Hidden locales remain technically supported, but are not exposed in the UI.
  let locale = cookieStore.get(LOCALE_COOKIE)?.value;
  if (!locale || !supportedLocales.includes(locale)) {
    locale = defaultLocale;
  }

  // Load messages for the locale
  let messages;
  try {
    messages = (await import(`@/../messages/${locale}.json`)).default;
  } catch {
    // Fall back to default locale messages
    messages = (await import(`@/../messages/${defaultLocale}.json`)).default;
  }

  return {
    locale,
    messages,
    timeZone: "UTC",
    // Handle missing messages gracefully in production
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        // Log missing messages but don't throw
        console.warn(`Missing translation: ${error.originalMessage}`);
      } else if (error.code === "ENVIRONMENT_FALLBACK" as IntlErrorCode) {
        // Silently ignore environment fallback warnings
      } else {
        console.error(error);
      }
    },
    getMessageFallback({ namespace, key }) {
      return `${namespace}.${key}`;
    },
  };
});
