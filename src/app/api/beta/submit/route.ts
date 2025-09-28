import { NextRequest, NextResponse } from "next/server";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function initAdmin() {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      }),
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Optional API key gate
    const key = req.headers.get("x-api-key");
    if (process.env.BETA_API_KEY && key !== process.env.BETA_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Bad payload" }, { status: 400 });
    }

    const { email, consent, responses, meta, surveyType } = body ?? {};
    if (!consent) return NextResponse.json({ error: "Consent required" }, { status: 400 });
    if (!responses || typeof responses !== "object") {
      return NextResponse.json({ error: "Missing responses" }, { status: 400 });
    }

    // Payload size guard (512KB limit)
    const rawSize = Buffer.byteLength(JSON.stringify(body), "utf8");
    if (rawSize > 512_000) return NextResponse.json({ error: "Payload too large" }, { status: 413 });

    initAdmin();
    const db = getFirestore();
    const now = new Date();

    await db.collection("promptabilityBetaResponses").add({
      email: email || null,
      consent: consent || false,
      responses,
      surveyType: surveyType || "full", // Mark survey type (full/short)
      meta: {
        collectedAt: meta?.collectedAt || null,
        durationMs: meta?.durationMs ?? null,
        language: meta?.language || null,
        userAgent: req.headers.get("user-agent") || meta?.userAgent || null,
        tester: meta?.tester || null,
        cohort: meta?.cohort || null,
        source: meta?.source || null,
        receivedAt: now.toISOString(),
        ip: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || null,
        appVersion: process.env.NEXT_PUBLIC_APP_VERSION || null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Beta submission error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}