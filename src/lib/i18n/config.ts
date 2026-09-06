// Cookie name for storing locale preference
export const LOCALE_COOKIE = "NEXT_LOCALE";

// Supported locales - keep in sync with prompts.config.ts.
// Do not remove hidden locales: they remain available for future reactivation.
export const supportedLocales = ["en", "tr", "es", "zh", "ja", "ar", "pt", "fr", "it", "de", "nl", "ko", "ru", "he", "el", "fa", "az"];

// Arabic is the primary language for first-time visitors.
export const defaultLocale = "ar";

// Only these locales are exposed in the user-facing language selector.
// Re-enable a hidden locale later by adding its code here; no translation files
// or underlying locale support need to be restored.
export const visibleLocales = ["ar", "en", "fr"];

// RTL locales
export const rtlLocales = ["ar", "he", "fa"];

// Check if a locale is RTL
export function isRtlLocale(locale: string): boolean {
  return rtlLocales.includes(locale);
}

// Get supported locales
export function getSupportedLocales() {
  return supportedLocales;
}

// Get visible locales
export function getVisibleLocales() {
  return visibleLocales;
}

// Get default locale
export function getDefaultLocale() {
  return defaultLocale;
}
