export async function runMockGeneration(
  onStep: (label: string) => void,
  labels = [
    "Selected moments",
    "Arranged clips",
    "Added soundtrack",
    "Applied visual style",
    "Rendering final video",
  ],
) {
  for (const label of labels) {
    onStep(label);
    await new Promise((r) => setTimeout(r, 600));
  }
}
