import { NextRequest, NextResponse } from "next/server";

const PAT      = process.env.AIRTABLE_PAT!;
const BASE_ID  = process.env.AIRTABLE_BASE_ID!;
const TABLE_ID = process.env.AIRTABLE_TABLE_ID!;

const AIRTABLE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`;

// ── In-memory rate limiter ────────────────────────────────────────────────────
// 5 submissions per IP per 15 minutes
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT     = 5;
const rateMap        = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

// ── Input sanitization ────────────────────────────────────────────────────────
// Strip HTML tags and trim; keeps letters, spaces, hyphens, apostrophes for names
function sanitizeName(raw: string): string {
  return raw
    .replace(/<[^>]*>/g, "")          // strip HTML tags
    .replace(/[<>"'`]/g, "")          // strip remaining dangerous chars
    .trim()
    .slice(0, 120);                    // max length
}

// Normalize Kenyan phone to +254XXXXXXXXX and strip everything else
function sanitizePhone(raw: string): string | null {
  const stripped = raw.replace(/\s/g, "");
  // Accept 07xx, 01xx, +2547xx, +2541xx, 2547xx, 2541xx
  const match = stripped.match(/^(\+?254|0)([17]\d{8})$/);
  if (!match) return null;
  return `+254${match[2]}`;
}

// Escape a string for use in an Airtable formula to prevent formula injection
function escapeFormulaString(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

// ── Airtable helpers ──────────────────────────────────────────────────────────
function airtableHeaders() {
  return {
    Authorization: `Bearer ${PAT}`,
    "Content-Type": "application/json",
  };
}

async function findByPhone(phone: string): Promise<boolean> {
  const safe    = escapeFormulaString(phone);
  const formula = encodeURIComponent(`{Phone} = "${safe}"`);
  const res     = await fetch(`${AIRTABLE_URL}?filterByFormula=${formula}&maxRecords=1`, {
    headers: airtableHeaders(),
  });
  if (!res.ok) return false;
  const data = await res.json();
  return data.records?.length > 0;
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // CSRF: only accept requests from our own origin
  const origin  = req.headers.get("origin")  ?? "";
  const referer = req.headers.get("referer") ?? "";
  const allowed = process.env.NEXT_PUBLIC_SITE_URL ?? "https://werudigital.co.ke";
  const isDev   = process.env.NODE_ENV === "development";

  if (!isDev && !origin.startsWith(allowed) && !referer.startsWith(allowed)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Rate limiting by IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // Parse and validate body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("name" in body) ||
    !("phone" in body)
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;

  // Sanitize name
  if (typeof raw.name !== "string" || !raw.name.trim()) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const name = sanitizeName(raw.name);
  if (!name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Sanitize & validate phone
  if (typeof raw.phone !== "string" || !raw.phone.trim()) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const phone = sanitizePhone(raw.phone);
  if (!phone) {
    return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
  }

  // Sanitize interests (array of known strings only)
  const ALLOWED_INTERESTS = ["News", "Shows", "Business & Ads", "Entertainment", "Sports"];
  const interests = Array.isArray(raw.interests)
    ? (raw.interests as unknown[]).filter(
        (i): i is string => typeof i === "string" && ALLOWED_INTERESTS.includes(i)
      )
    : [];

  // Duplicate check
  const duplicate = await findByPhone(phone);
  if (duplicate) {
    return NextResponse.json({ duplicate: true }, { status: 200 });
  }

  // Write to Airtable
  const res = await fetch(AIRTABLE_URL, {
    method: "POST",
    headers: airtableHeaders(),
    body: JSON.stringify({
      records: [
        {
          fields: {
            Name: name,
            Phone: phone,
            Interests: interests,
            "Subscribed At": new Date().toISOString(),
            Source: "QR Code",
            Status: "New",
          },
        },
      ],
    }),
  });

  if (!res.ok) {
    // Do not expose Airtable error details to the client
    return NextResponse.json({ error: "Subscription failed. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
