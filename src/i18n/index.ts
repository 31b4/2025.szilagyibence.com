export const SUPPORTED_LOCALES = ["en", "hu", "es"] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];

const dicts: Record<Locale, any> = {
  en: undefined as any,
  hu: undefined as any,
  es: undefined as any,
};

export async function loadDictionary(locale: string) {
  const l = normalizeLocale(locale);
  switch (l) {
    case "hu":
      return (dicts.hu ??= (await import("./hu.json"))).default ?? (await import("./hu.json"));
    case "es":
      return (dicts.es ??= (await import("./es.json"))).default ?? (await import("./es.json"));
    case "en":
    default:
      return (dicts.en ??= (await import("./en.json"))).default ?? (await import("./en.json"));
  }
}

export function normalizeLocale(input?: string): Locale {
  if (!input) return "en";
  const lower = input.toLowerCase();
  if (lower.startsWith("hu")) return "hu";
  if (lower.startsWith("es")) return "es";
  return "en";
}

export function detectLocaleFromHeader(header?: string): Locale {
  if (!header) return "en";
  // Parse Accept-Language like: es-ES,es;q=0.9,en;q=0.8
  const parts = header.split(",").map((p) => p.trim().split(";")[0]);
  for (const p of parts) {
    const n = normalizeLocale(p);
    if (SUPPORTED_LOCALES.includes(n)) return n;
  }
  return "en";
}
