import { CapabilityGrid } from "@/components/studio/capability-grid";
import { requireOnboardedUser } from "@/lib/require-user";
import { partitionStudioCapabilities } from "@/lib/studio-capabilities";

export const dynamic = "force-dynamic";

export default async function StudioPage() {
  await requireOnboardedUser();
  const { visible, overflow, overflowLabel } = partitionStudioCapabilities();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex max-w-2xl flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Explore Studio
        </h1>
        <p className="text-muted-foreground">
          Start with Highlight Reel — the v1 golden path from subject and clips
          through polish and export.
        </p>
      </div>

      <div className="mt-10">
        <CapabilityGrid
          visible={visible}
          overflow={overflow}
          overflowLabel={overflowLabel}
        />
      </div>
    </main>
  );
}
