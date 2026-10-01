import { CapabilityGrid } from "@/components/studio/capability-grid";
import { requireOnboardedUser } from "@/lib/require-user";

export const dynamic = "force-dynamic";

export default async function StudioPage() {
  await requireOnboardedUser();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex max-w-2xl flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Explore Studio
        </h1>
        <p className="text-muted-foreground">
          Browse creative workflows inspired by Higgsfield. Highlight Reel is
          ready end-to-end; everything else opens with a coming-soon preview.
        </p>
      </div>

      <div className="mt-10">
        <CapabilityGrid />
      </div>
    </main>
  );
}
