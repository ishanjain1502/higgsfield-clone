import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { isAuthConfigured } from "@/lib/auth-env";
import { prisma } from "@/lib/db";
import { isEvaluatorUserId } from "@/lib/evaluator";
import {
  isValidOnboardingPreferences,
  type OnboardingPreferences,
} from "@/lib/onboarding-preferences";

export async function POST(request: Request) {
  if (!isAuthConfigured()) {
    return NextResponse.json(
      { error: "Auth is not configured. Set environment variables first." },
      { status: 503 },
    );
  }

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (isEvaluatorUserId(userId)) {
    return NextResponse.json({ ok: true });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const prefs = body as OnboardingPreferences;
  if (!isValidOnboardingPreferences(prefs)) {
    return NextResponse.json(
      { error: "Select at least one option in each section." },
      { status: 400 },
    );
  }

  await prisma.user.update({
    where: { id: userId },
    data: { onboardingPreferences: prefs },
  });

  return NextResponse.json({ ok: true });
}
