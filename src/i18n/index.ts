export const SUPPORTED_LOCALES = ["en", "hu", "es", "zh", "ja", "hi", "fr", "ar", "ru", "pt", "id", "ascii", "morse", "binary", "hex", "hier", "braille", "asl"] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];

const dicts: Record<Locale, any> = {
  en: undefined as any,
  hu: undefined as any,
  es: undefined as any,
  zh: undefined as any,
  ja: undefined as any,
  hi: undefined as any,
  fr: undefined as any,
  ar: undefined as any,
  ru: undefined as any,
  pt: undefined as any,
  id: undefined as any,
  ascii: undefined as any,
  morse: undefined as any,
  binary: undefined as any,
  hex: undefined as any,
  hier: undefined as any,
  braille: undefined as any,
  asl: undefined as any,
};

function deepMerge<T extends Record<string, any>>(base: T, override: Partial<T>): T {
  const out: any = Array.isArray(base) ? [...(base as any)] : { ...base };
  for (const key of Object.keys(override || {})) {
    const b = (base as any)[key];
    const o = (override as any)[key];
    if (o === undefined) continue;
    if (b && typeof b === 'object' && !Array.isArray(b) && o && typeof o === 'object' && !Array.isArray(o)) {
      out[key] = deepMerge(b, o);
    } else {
      out[key] = o;
    }
  }
  return out;
}

export async function loadDictionary(locale: string) {
  const l = normalizeLocale(locale);
  switch (l) {
    case "hu":
      return (dicts.hu ??= (await import("./hu.json"))).default ?? (await import("./hu.json"));
    case "es":
      return (dicts.es ??= (await import("./es.json"))).default ?? (await import("./es.json"));
    case "zh":
      return (dicts.zh ??= (await import("./zh.json"))).default ?? (await import("./zh.json"));
    case "ja":
      return (dicts.ja ??= (await import("./ja.json"))).default ?? (await import("./ja.json"));
    case "hi":
      return (dicts.hi ??= (await import("./hi.json"))).default ?? (await import("./hi.json"));
    case "fr":
      return (dicts.fr ??= (await import("./fr.json"))).default ?? (await import("./fr.json"));
    case "ar":
      return (dicts.ar ??= (await import("./ar.json"))).default ?? (await import("./ar.json"));
    case "ru":
      return (dicts.ru ??= (await import("./ru.json"))).default ?? (await import("./ru.json"));
    case "pt":
      return (dicts.pt ??= (await import("./pt.json"))).default ?? (await import("./pt.json"));
    case "id":
      return (dicts.id ??= (await import("./id.json"))).default ?? (await import("./id.json"));
    case "ascii": {
      // Build an ASCII-coded dictionary based on English
      const base = (dicts.en ??= (await import("./en.json")).default ?? (await import("./en.json")));
      const toCodes = (s: string): string => {
        // Preserve the {age} token so About.astro can inject the age span
        const parts = s.split("{age}");
        const enc = (x: string) => Array.from(x).map((ch) => ch.charCodeAt(0).toString()).join(" ");
        return parts.map(enc).join(" {age} ");
      };
      const transform = (val: any): any => {
        if (typeof val === "string") return toCodes(val);
        if (Array.isArray(val)) return val.map(transform);
        if (val && typeof val === "object") {
          const out: Record<string, any> = {};
          for (const k of Object.keys(val)) out[k] = transform(val[k]);
          return out;
        }
        return val;
      };
      return (dicts.ascii ??= transform(base));
    }
    case "morse": {
      // Build a Morse-coded dictionary based on English
      const base = (dicts.en ??= (await import("./en.json")).default ?? (await import("./en.json")));
      const map: Record<string, string> = {
        a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".", f: "..-.", g: "--.", h: "....",
        i: "..", j: ".---", k: "-.-", l: ".-..", m: "--", n: "-.", o: "---", p: ".--.",
        q: "--.-", r: ".-.", s: "...", t: "-", u: "..-", v: "...-", w: ".--", x: "-..-",
        y: "-.--", z: "--..",
        0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-", 5: ".....",
        6: "-....", 7: "--...", 8: "---..", 9: "----.",
        ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--",
        "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...",
        ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-",
        '"': ".-..-.", "$": "...-..-", "@": ".--.-.", "¿": "..-.-", "¡": "--...-"
      };
      const encWord = (word: string) => Array.from(word).map((ch) => {
        const m = map[ch.toLowerCase()];
        return m ?? ch;
      }).join(" ");
      const toMorse = (s: string): string => {
        const parts = s.split("{age}");
        const enc = (x: string) => x.split(/\s+/).map(encWord).join(" / ");
        return parts.map(enc).join(" {age} ");
      };
      const transform = (val: any): any => {
        if (typeof val === "string") return toMorse(val);
        if (Array.isArray(val)) return val.map(transform);
        if (val && typeof val === "object") {
          const out: Record<string, any> = {};
          for (const k of Object.keys(val)) out[k] = transform(val[k]);
          return out;
        }
        return val;
      };
      return (dicts.morse ??= transform(base));
    }
    case "binary": {
      // Build a Binary-coded dictionary based on English (8-bit space-separated)
      const base = (dicts.en ??= (await import("./en.json")).default ?? (await import("./en.json")));
      const toBin = (s: string): string => {
        const parts = s.split("{age}");
        const enc = (x: string) => Array.from(x).map((ch) => ch.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
        return parts.map(enc).join(" {age} ");
      };
      const transform = (val: any): any => {
        if (typeof val === "string") return toBin(val);
        if (Array.isArray(val)) return val.map(transform);
        if (val && typeof val === "object") {
          const out: Record<string, any> = {};
          for (const k of Object.keys(val)) out[k] = transform(val[k]);
          return out;
        }
        return val;
      };
      return (dicts.binary ??= transform(base));
    }
    case "hex": {
      // Build a Hex-coded dictionary based on English (2-digit uppercase hex, space-separated)
      const base = (dicts.en ??= (await import("./en.json")).default ?? (await import("./en.json")));
      const toHex = (s: string): string => {
        const parts = s.split("{age}");
        const enc = (x: string) => Array.from(x).map((ch) => ch.charCodeAt(0).toString(16).padStart(2, "0").toUpperCase()).join(" ");
        return parts.map(enc).join(" {age} ");
      };
      const transform = (val: any): any => {
        if (typeof val === "string") return toHex(val);
        if (Array.isArray(val)) return val.map(transform);
        if (val && typeof val === "object") {
          const out: Record<string, any> = {};
          for (const k of Object.keys(val)) out[k] = transform(val[k]);
          return out;
        }
        return val;
      };
      return (dicts.hex ??= transform(base));
    }
    case "hier": {
      const base = (dicts.en ??= (await import("./en.json")).default ?? (await import("./en.json")));
      const overrides = (await import("./hier.json")).default ?? (await import("./hier.json"));
      return (dicts.hier ??= deepMerge(base, overrides));
    }
    case "braille": {
      // Basic Grade-1-like mapping for a-z and digits; others preserved
      const base = (dicts.en ??= (await import("./en.json")).default ?? (await import("./en.json")));
      const map: Record<string, string> = {
        a: "\u2801", b: "\u2803", c: "\u2809", d: "\u2819", e: "\u2811", f: "\u280B", g: "\u281B", h: "\u2813",
        i: "\u280A", j: "\u281A", k: "\u2805", l: "\u2807", m: "\u280D", n: "\u281D", o: "\u2815", p: "\u280F",
        q: "\u281F", r: "\u2817", s: "\u280E", t: "\u281E", u: "\u2825", v: "\u2827", w: "\u283A", x: "\u282D",
        y: "\u283D", z: "\u2835",
        // digits 0..9 mapped like j(10)->0, a->1, ...
        '0': "\u281A", '1': "\u2801", '2': "\u2803", '3': "\u2809", '4': "\u2819", '5': "\u2811",
        '6': "\u280B", '7': "\u281B", '8': "\u2813", '9': "\u280A"
      };
      const toBraille = (s: string): string => {
        const parts = s.split("{age}");
        const enc = (x: string) => Array.from(x).map((ch) => map[ch.toLowerCase()] ?? ch).join("");
        return parts.map(enc).join("{age}");
      };
      const transform = (val: any): any => {
        if (typeof val === "string") return toBraille(val);
        if (Array.isArray(val)) return val.map(transform);
        if (val && typeof val === "object") {
          const out: Record<string, any> = {};
          for (const k of Object.keys(val)) out[k] = transform(val[k]);
          return out;
        }
        return val;
      };
      return (dicts.braille ??= transform(base));
    }
    case "asl": {
      // Fun "hand emojis" pseudo-locale: each word becomes N random hand emojis, where N = word length (stable per word)
      const base = (dicts.en ??= (await import("./en.json")).default ?? (await import("./en.json")));
      const HANDS = [
        "👋","🤚","✋","🖐️","🖖","👌","🤌","🤏","✌️","🤞","🤟","🤘","👍","👎",
        "👏","🫶","🙏","🤙","☝️","👆","👇","👉","👈","✊","🤝","🫰","🫱","🫲","🫳","🫴"
      ];
      const hash = (w: string) => {
        let h = 2166136261 >>> 0; // FNV-1a 32-bit
        for (let i=0;i<w.length;i++) { h ^= w.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
        return h >>> 0;
      };
      const pickEmojis = (w: string) => {
        const n = w.length;
        let seed = hash(w) || 1;
        const arr: string[] = [];
        for (let i=0;i<n;i++) {
          // xorshift32
          seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; seed >>>= 0;
          const idx = seed % HANDS.length;
          arr.push(HANDS[idx]);
        }
        return arr.join("");
      };
      const toHands = (s: string): string => {
        const parts = s.split("{age}");
        const enc = (x: string) => x
          .replace(/[.,!?;:()"']/g, " ")
          .split(/\s+/)
          .filter(Boolean)
          .map(pickEmojis)
          .join(" ");
        return parts.map(enc).join(" {age} ");
      };
      const transform = (val: any): any => {
        if (typeof val === "string") return toHands(val);
        if (Array.isArray(val)) return val.map(transform);
        if (val && typeof val === "object") {
          const out: Record<string, any> = {};
          for (const k of Object.keys(val)) out[k] = transform(val[k]);
          return out;
        }
        return val;
      };
      return (dicts.asl ??= transform(base));
    }
    case "en":
    default:
      return (dicts.en ??= (await import("./en.json"))).default ?? (await import("./en.json"));
  }
}

export function normalizeLocale(input?: string): Locale {
  if (!input) return "en";
  const lower = input.toLowerCase();
  // Check more specific pseudo-locales before prefixes that could clash (e.g., 'hier' vs 'hi')
  if (lower.startsWith("hier") || lower.startsWith("egypt")) return "hier";
  if (lower.startsWith("braille")) return "braille";
  if (lower.startsWith("ascii")) return "ascii";
  if (lower.startsWith("morse")) return "morse";
  if (lower.startsWith("binary")) return "binary";
  if (lower === "hex" || lower.startsWith("hex-")) return "hex";
  if (lower.startsWith("asl") || lower.startsWith("sign")) return "asl";
  if (lower.startsWith("hu")) return "hu";
  if (lower.startsWith("es")) return "es";
  if (lower.startsWith("zh")) return "zh";
  if (lower.startsWith("ja")) return "ja";
  if (lower.startsWith("hi")) return "hi";
  if (lower.startsWith("fr")) return "fr";
  if (lower.startsWith("ar")) return "ar";
  if (lower.startsWith("ru")) return "ru";
  if (lower.startsWith("pt")) return "pt";
  if (lower.startsWith("id")) return "id";
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
