import { NextRequest, NextResponse } from "next/server";

const GHL_WEBHOOK =
  process.env.GHL_CONTACT_WEBHOOK ||
  "https://services.leadconnectorhq.com/hooks/Sqd3WdWGgoefvce96mhp/webhook-trigger/18940dc5-9d6b-4f6f-88d2-a87582431b46";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("[contact] submission received — email:", body.email, "/ service:", body.service);

    const payload = {
      firstName: String(body.firstName ?? "").slice(0, 100),
      lastName:  String(body.lastName  ?? "").slice(0, 100),
      email:     String(body.email     ?? "").slice(0, 200),
      phone:     String(body.phone     ?? "").slice(0, 30),
      service:   String(body.service   ?? "").slice(0, 100),
      city:      String(body.city      ?? "").slice(0, 100),
      message:   String(body.message   ?? "").slice(0, 2000),
      source:    "contact-form",
    };

    console.log("[contact] GHL_WEBHOOK env set?", !!process.env.GHL_CONTACT_WEBHOOK);
    console.log("[contact] GHL_WEBHOOK url:", GHL_WEBHOOK);
    console.log("[contact] payload JSON:", JSON.stringify(payload, null, 2));
    console.log("[contact] posting to GHL webhook:", GHL_WEBHOOK);

    const res = await fetch(GHL_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const responseText = await res.text();
    console.log("[contact] GHL response — status:", res.status, "/ body:", responseText.slice(0, 500));

    if (res.ok) {
      console.log("[contact] success — lead forwarded to GHL");
      return NextResponse.json({ success: true });
    }

    console.error("[contact] GHL webhook error — status:", res.status, "/ body:", responseText);
    return NextResponse.json({ success: false, detail: `GHL ${res.status}` }, { status: 502 });

  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
