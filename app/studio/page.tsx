import { requireOnboardedUser } from "@/lib/require-user";

export const dynamic = "force-dynamic";

export default async function StudioPage() {
  await requireOnboardedUser();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Studio</h1>
      <p className="mt-2 text-muted-foreground">Explore — coming in a later task.</p>
    </main>
  );
}
