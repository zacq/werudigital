import QRCode from 'qrcode';
import sharp from 'sharp';
import { readFileSync } from 'fs';

// ── Brand palette ────────────────────────────────────────────────────────────
const RED   = '#B01A14';
const AMBER = '#E8781A';
const GOLD  = '#F4A020';
const CREAM = '#FFF5E0';
const WHITE = '#FFFFFF';

const URL     = 'https://werudigital.co.ke/';
const SIZE    = 900;
const MARGIN  = 54;
const BADGE_R = 108;  // large enough to showcase the full landscape logo

// ── Embed logo as base64 ──────────────────────────────────────────────────────
const logoB64    = readFileSync('Weru Logo.png').toString('base64');
const logoData   = `data:image/png;base64,${logoB64}`;

// ── QR matrix ────────────────────────────────────────────────────────────────
const qr = QRCode.create(URL, { errorCorrectionLevel: 'H' });
const { size: modules, data } = qr.modules;

// ── Drawing geometry ─────────────────────────────────────────────────────────
const drawSize = SIZE - MARGIN * 2;
const cellSize = drawSize / modules;
const dotR     = cellSize * 0.42;
const offset   = MARGIN;
const cx       = SIZE / 2;
const cy       = SIZE / 2;

function isFinder(r, c) {
  const end = modules - 1;
  return (r < 8 && c < 8) || (r < 8 && c > end - 8) || (r > end - 8 && c < 8);
}

function isInBadge(r, c) {
  const mx = offset + (c + 0.5) * cellSize;
  const my = offset + (r + 0.5) * cellSize;
  return Math.hypot(mx - cx, my - cy) < BADGE_R + cellSize * 0.6;
}

// ── Build SVG ────────────────────────────────────────────────────────────────
const parts = [];

parts.push(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">`);

parts.push(`
<defs>
  <radialGradient id="bg" cx="50%" cy="50%" r="70%">
    <stop offset="0%"   stop-color="#FAC355"/>
    <stop offset="55%"  stop-color="${GOLD}"/>
    <stop offset="100%" stop-color="${AMBER}"/>
  </radialGradient>

  <radialGradient id="mod" cx="50%" cy="50%" r="70%">
    <stop offset="0%"   stop-color="${RED}"/>
    <stop offset="100%" stop-color="#7A0F0B"/>
  </radialGradient>

  <radialGradient id="finder" cx="30%" cy="30%" r="80%">
    <stop offset="0%"   stop-color="#C0221A"/>
    <stop offset="100%" stop-color="#7A0F0B"/>
  </radialGradient>

  <!-- Circular clip for logo — this eliminates the corner background -->
  <clipPath id="badgeClip">
    <circle cx="${cx}" cy="${cy}" r="${BADGE_R}"/>
  </clipPath>

  <!-- Peach gradient matching the logo's own background -->
  <radialGradient id="logoBg" cx="50%" cy="40%" r="65%">
    <stop offset="0%"   stop-color="#F9DEC0"/>
    <stop offset="100%" stop-color="#EBB48A"/>
  </radialGradient>

  <clipPath id="roundedClip">
    <rect x="0" y="0" width="${SIZE}" height="${SIZE}" rx="60" ry="60"/>
  </clipPath>

  <filter id="shadow" x="-15%" y="-15%" width="130%" height="130%">
    <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#00000040"/>
  </filter>
</defs>

<g clip-path="url(#roundedClip)">
  <rect width="${SIZE}" height="${SIZE}" fill="url(#bg)"/>
`);

// ── QR dot modules ────────────────────────────────────────────────────────────
for (let r = 0; r < modules; r++) {
  for (let c = 0; c < modules; c++) {
    if (!data[r * modules + c]) continue;
    if (isFinder(r, c)) continue;
    if (isInBadge(r, c)) continue;
    const x = offset + (c + 0.5) * cellSize;
    const y = offset + (r + 0.5) * cellSize;
    parts.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${dotR.toFixed(1)}" fill="url(#mod)"/>`);
  }
}

// ── Finder patterns ───────────────────────────────────────────────────────────
function drawFinder(x, y) {
  const s = cellSize;
  const r = s * 0.35;
  const ow = s * 7;
  parts.push(`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${ow.toFixed(1)}" height="${ow.toFixed(1)}"
    rx="${r.toFixed(1)}" ry="${r.toFixed(1)}"
    fill="none" stroke="url(#finder)" stroke-width="${(s * 0.95).toFixed(1)}"/>`);
  parts.push(`<rect x="${(x+s).toFixed(1)}" y="${(y+s).toFixed(1)}" width="${(s*5).toFixed(1)}" height="${(s*5).toFixed(1)}"
    rx="${(r*0.6).toFixed(1)}" ry="${(r*0.6).toFixed(1)}" fill="${CREAM}"/>`);
  parts.push(`<rect x="${(x+s*2).toFixed(1)}" y="${(y+s*2).toFixed(1)}" width="${(s*3).toFixed(1)}" height="${(s*3).toFixed(1)}"
    rx="${(r*0.8).toFixed(1)}" ry="${(r*0.8).toFixed(1)}" fill="url(#finder)"/>`);
}

drawFinder(offset, offset);
drawFinder(offset + (modules - 7) * cellSize, offset);
drawFinder(offset, offset + (modules - 7) * cellSize);

// ── Logo badge (circular clip removes all background corners) ─────────────────
// Drop shadow
parts.push(`<circle cx="${cx}" cy="${cy}" r="${BADGE_R + 5}" fill="#00000030" filter="url(#shadow)"/>`);

// Peach background circle (matches logo background — fills the gap around the logo with meet)
parts.push(`<circle cx="${cx}" cy="${cy}" r="${BADGE_R}" fill="url(#logoBg)" clip-path="url(#badgeClip)"/>`);

// Logo — "meet" keeps full logo visible; peach bg fills any surrounding gap seamlessly
// Give the image a larger viewport so the logo has breathing room inside the circle
const logoX = cx - BADGE_R * 1.05;
const logoY = cy - BADGE_R * 0.72;
const logoW = BADGE_R * 2.1;
const logoH = BADGE_R * 1.44;
parts.push(`<image href="${logoData}"
  x="${logoX.toFixed(1)}" y="${logoY.toFixed(1)}"
  width="${logoW.toFixed(1)}" height="${logoH.toFixed(1)}"
  clip-path="url(#badgeClip)"
  preserveAspectRatio="xMidYMid meet"/>`);

// Gold border ring over the logo
parts.push(`<circle cx="${cx}" cy="${cy}" r="${BADGE_R}"
  fill="none" stroke="${GOLD}" stroke-width="4"/>`);

// ── Header and footer bands ───────────────────────────────────────────────────
const fr = 48;
parts.push(`<rect x="0" y="0" width="${SIZE}" height="${fr}" fill="${RED}" opacity="0.93" clip-path="url(#roundedClip)"/>`);
parts.push(`<rect x="0" y="${SIZE-fr}" width="${SIZE}" height="${fr}" fill="${RED}" opacity="0.93" clip-path="url(#roundedClip)"/>`);

parts.push(`<text x="${SIZE/2}" y="${fr/2+8}" text-anchor="middle" dominant-baseline="middle"
  font-family="Arial Black, Arial, sans-serif" font-size="20" font-weight="900"
  fill="${WHITE}" letter-spacing="8">WERU DIGITAL</text>`);

parts.push(`<text x="${SIZE/2}" y="${SIZE-fr/2+1}" text-anchor="middle" dominant-baseline="middle"
  font-family="Arial, sans-serif" font-size="14" font-weight="600"
  fill="${WHITE}" letter-spacing="2">SCAN TO WATCH  ·  10TH ANNIVERSARY</text>`);

// Side accent dots
for (const [bx, by] of [[28, SIZE/2-30],[28,SIZE/2],[28,SIZE/2+30],[SIZE-28,SIZE/2-30],[SIZE-28,SIZE/2],[SIZE-28,SIZE/2+30]]) {
  parts.push(`<circle cx="${bx}" cy="${by}" r="4" fill="${WHITE}" opacity="0.55"/>`);
}

parts.push(`</g></svg>`);

// ── Render ────────────────────────────────────────────────────────────────────
await sharp(Buffer.from(parts.join('\n')))
  .png({ quality: 100 })
  .toFile('werudigital-qr-anniversary.png');

console.log('✓  werudigital-qr-anniversary.png saved (900×900px)');
