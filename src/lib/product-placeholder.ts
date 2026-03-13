import { brand } from "@/lib/brand";
import { slugToLabel } from "@/lib/format";
import type { ProductCategory } from "@/lib/types";

interface ProductPlaceholderOptions {
  slug: string;
  mode: "front" | "back";
  title?: string;
  collection?: string;
  category?: ProductCategory;
  accent?: string;
}

const accentPalette = ["#ffae03", "#66e6ff", "#cfb1dc", "#f6a0d1", "#ffe7be"];

function accentFromKey(key: string) {
  const hash = Array.from(key).reduce(
    (sum, character) => sum + character.charCodeAt(0),
    0,
  );

  return accentPalette[hash % accentPalette.length];
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function wrapText(input: string, limit: number, maxLines: number) {
  const words = input
    .replace(/&/g, "AND")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase()
    .split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;

    if (next.length <= limit) {
      current = next;
      continue;
    }

    if (current) {
      lines.push(current);
      current = word;
    } else {
      lines.push(word.slice(0, limit));
      current = word.slice(limit);
    }

    if (lines.length === maxLines - 1) {
      break;
    }
  }

  if (lines.length < maxLines && current) {
    lines.push(current);
  }

  return lines.slice(0, maxLines).map(escapeXml);
}

function renderTextBlock(
  lines: string[],
  x: number,
  y: number,
  fontSize: number,
  lineHeight: number,
  fill: string,
) {
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="Arial Black, Arial, sans-serif" font-size="${fontSize}" letter-spacing="-3">${lines
    .map(
      (line, index) =>
        `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${line}</tspan>`,
    )
    .join("")}</text>`;
}

function productShape(category: ProductCategory, mode: "front" | "back", accent: string) {
  if (category === "Posters") {
    return `
      <rect x="248" y="176" width="584" height="774" rx="34" fill="white" stroke="rgba(17,17,17,0.12)" stroke-width="8" />
      <rect x="288" y="222" width="504" height="680" rx="18" fill="rgba(17,17,17,0.05)" />
      <rect x="320" y="254" width="440" height="116" rx="20" fill="${accent}" opacity="0.18" />
      <path d="M338 824h404" stroke="rgba(17,17,17,0.22)" stroke-width="12" stroke-linecap="round" />
      <circle cx="334" cy="188" r="12" fill="#111111" />
      <circle cx="746" cy="188" r="12" fill="#111111" />
    `;
  }

  if (category === "Books") {
    return `
      <path d="M322 244h350c54 0 98 44 98 98v392c0 56-42 108-98 122H322c-44 0-82 20-108 56V324c26-52 64-80 108-80Z" fill="white" stroke="rgba(17,17,17,0.12)" stroke-width="8" />
      <path d="M272 286h70v612h-70c-18 0-34 10-58 34V328c16-26 34-42 58-42Z" fill="${accent}" opacity="0.18" />
      <rect x="360" y="314" width="302" height="142" rx="22" fill="rgba(17,17,17,0.05)" />
      <path d="M390 520h270" stroke="rgba(17,17,17,0.16)" stroke-width="12" stroke-linecap="round" />
      <path d="M390 570h240" stroke="rgba(17,17,17,0.12)" stroke-width="12" stroke-linecap="round" />
      <path d="M390 620h260" stroke="rgba(17,17,17,0.12)" stroke-width="12" stroke-linecap="round" />
    `;
  }

  if (category === "Collectibles") {
    return `
      <rect x="296" y="188" width="488" height="720" rx="42" fill="white" stroke="rgba(17,17,17,0.12)" stroke-width="8" />
      <rect x="344" y="236" width="392" height="470" rx="26" fill="rgba(17,17,17,0.05)" />
      <circle cx="540" cy="452" r="150" fill="${accent}" opacity="0.14" />
      <circle cx="540" cy="430" r="66" fill="rgba(255,255,255,0.9)" />
      <rect x="452" y="514" width="176" height="154" rx="88" fill="rgba(255,255,255,0.88)" />
      <rect x="356" y="742" width="368" height="108" rx="24" fill="rgba(17,17,17,0.05)" />
    `;
  }

  return mode === "back"
    ? `
      <path d="M358 236h364l92 132v392H266V368l92-132Z" fill="white" stroke="rgba(17,17,17,0.12)" stroke-width="8" />
      <path d="M356 238l-60 124h488l-62-124H356Z" fill="${accent}" opacity="0.15" />
      <rect x="432" y="432" width="216" height="140" rx="32" fill="rgba(17,17,17,0.05)" />
      <path d="M410 650h260" stroke="rgba(17,17,17,0.16)" stroke-width="12" stroke-linecap="round" />
      <path d="M446 704h188" stroke="rgba(17,17,17,0.12)" stroke-width="10" stroke-linecap="round" />
    `
    : `
      <path d="M358 236h364l92 132v392H266V368l92-132Z" fill="white" stroke="rgba(17,17,17,0.12)" stroke-width="8" />
      <path d="M356 238l-60 124h488l-62-124H356Z" fill="${accent}" opacity="0.15" />
      <circle cx="540" cy="376" r="44" fill="rgba(17,17,17,0.08)" />
      <rect x="406" y="458" width="268" height="168" rx="36" fill="${accent}" opacity="0.16" />
      <path d="M422 676h236" stroke="rgba(17,17,17,0.16)" stroke-width="12" stroke-linecap="round" />
      <path d="M458 726h164" stroke="rgba(17,17,17,0.12)" stroke-width="10" stroke-linecap="round" />
    `;
}

export function buildProductPlaceholderSvg({
  slug,
  mode,
  title,
  collection,
  category = "Apparel",
  accent,
}: ProductPlaceholderOptions) {
  const resolvedAccent = accent ?? accentFromKey(slug);
  const resolvedTitle = title ?? slugToLabel(slug);
  const resolvedCollection = collection ?? `${brand.shortName} Edition`;
  const collectionLines = wrapText(resolvedCollection, 16, 2);
  const titleLines = wrapText(resolvedTitle, 18, 3);
  const label = `${category.toUpperCase()} · ${mode.toUpperCase()} VIEW`;

  return `
    <svg width="1080" height="1320" viewBox="0 0 1080 1320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1080" height="1320" fill="#F4F0E9" />
      <rect x="24" y="24" width="1032" height="1272" rx="40" fill="url(#surface)" stroke="rgba(17,17,17,0.08)" />
      <path d="M0 0h1080v252L0 446z" fill="${resolvedAccent}" opacity="0.16" />
      <path d="M1080 1320H0v-248l1080-174z" fill="${resolvedAccent}" opacity="0.08" />
      <text x="90" y="124" fill="rgba(17,17,17,0.48)" font-family="Arial, sans-serif" font-size="26" letter-spacing="7">${brand.shortName} EDITION</text>
      <text x="986" y="124" text-anchor="end" fill="#111111" font-family="Arial Black, Arial, sans-serif" font-size="28" letter-spacing="-1">${escapeXml(mode.toUpperCase())}</text>
      <text x="540" y="648" text-anchor="middle" fill="rgba(17,17,17,0.05)" font-family="Arial Black, Arial, sans-serif" font-size="220" letter-spacing="-12">${brand.shortName}</text>
      ${productShape(category, mode, resolvedAccent)}
      ${renderTextBlock(collectionLines, 90, 1002, 64, 68, "#111111")}
      ${renderTextBlock(titleLines, 90, 1128, 82, 84, "#111111")}
      <text x="90" y="1222" fill="rgba(17,17,17,0.56)" font-family="Arial, sans-serif" font-size="28" letter-spacing="3">${escapeXml(label)}</text>
      <defs>
        <linearGradient id="surface" x1="0" y1="0" x2="1080" y2="1320" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FFFCF8" />
          <stop offset="1" stop-color="#ECE7DF" />
        </linearGradient>
      </defs>
    </svg>
  `.trim();
}

export function createProductPlaceholderImage(options: ProductPlaceholderOptions) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(buildProductPlaceholderSvg(options))}`;
}
