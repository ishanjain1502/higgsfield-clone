import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { isAuthConfigured } from "@/lib/auth-env";
import { prisma } from "@/lib/db";
import { isEvaluatorUserId } from "@/lib/evaluator";

export async function POST() {
  if (!isAuthConfigured()) {
    return NextResponse.json(
      { error: "Auth is not configured." },
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

  await prisma.user.update({
    where: { id: userId },
    data: { hasSeenHomeOnboardingModal: true },
  });

  return NextResponse.json({ ok: true });
}
