import { NextRequest, NextResponse } from "next/server";

const GHL_WEBHOOK =
  process.env.GHL_CONTACT_WEBHOOK ||
  "https://services.leadconnectorhq.com/hooks/Sqd3WdWGgoefvce96mhp/webhook-trigger/18940dc5-9d6b-4f6f-88d2-a87582431b46";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const payload = {
      firstName: String(body.firstName ?? "").slice(0, 100),
      lastName: String(body.lastName ?? "").slice(0, 100),
      email: String(body.email ?? "").slice(0, 200),
      service: String(body.service ?? "").slice(0, 100),
      city: String(body.city ?? "").slice(0, 100),
      message: String(body.message ?? "").slice(0, 2000),
    };

    const res = await fetch(GHL_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok || res.status === 200 || res.status === 201 || res.status === 204) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false }, { status: 502 });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
