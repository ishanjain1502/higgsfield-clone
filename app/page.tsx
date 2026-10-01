import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const showcaseCards = [
  {
    label: "Highlight reel",
    tag: "9:16",
    src: "/demo-assets/thumbs/bg-cinematic.svg",
  },
  {
    label: "Neon energy",
    tag: "Style",
    src: "/demo-assets/thumbs/bg-neon.svg",
  },
  {
    label: "Genjutsu mood",
    tag: "Background",
    src: "/demo-assets/thumbs/bg-genjutsu.svg",
  },
  {
    label: "Studio polish",
    tag: "Preset",
    src: "/demo-assets/thumbs/bg-studio.svg",
  },
] as const;

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.45_0.2_280/0.35),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[480px] bg-[radial-gradient(ellipse_60%_40%_at_70%_50%,oklch(0.55_0.18_330/0.12),transparent)]"
      />

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-24 pt-16 sm:px-6 sm:pt-20 lg:pt-24">
        <div className="flex flex-col items-center gap-8 text-center lg:gap-10">
          <p className="rounded-full border border-border/60 bg-muted/30 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Creative AI studio
          </p>
          <div className="mx-auto flex max-w-3xl flex-col gap-5">
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Turn clips into{" "}
              <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                scroll-stopping reels
              </span>
            </h1>
            <p className="text-pretty text-lg text-muted-foreground sm:text-xl">
              A focused take on the Higgsfield experience — one complete
              workflow, Studio control, and guided Focus mode. See the quality
              before you sign in.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/login"
              className={cn(buttonVariants({ size: "lg" }), "min-w-[160px]")}
            >
              Start Creating
            </Link>
            <Link
              href="/studio"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "min-w-[160px] border-border/80 bg-background/40 backdrop-blur-sm",
              )}
            >
              Explore
            </Link>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-foreground/60" />
              Studio Highlight Reel
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-foreground/60" />
              Preset-driven polish
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-foreground/60" />
              Export-ready 9:16
            </li>
          </ul>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,320px)_1fr] lg:gap-6">
          <div className="hidden flex-col gap-4 lg:flex">
            {showcaseCards.slice(0, 2).map((card) => (
              <ShowcaseCard key={card.label} {...card} className="ml-auto w-[200px]" />
            ))}
          </div>

          <div className="mx-auto w-full max-w-[280px] sm:max-w-[320px]">
            <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[0_0_80px_-20px_oklch(0.55_0.2_280/0.5)] ring-1 ring-foreground/5">
              <Image
                src="/demo-assets/thumbs/bg-cinematic.svg"
                alt=""
                fill
                className="object-cover opacity-90"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                <div className="flex size-14 items-center justify-center rounded-full border border-foreground/20 bg-background/50 backdrop-blur-sm">
                  <span className="ml-1 text-lg text-foreground">▶</span>
                </div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Demo output
                </p>
                <p className="text-sm text-foreground/90">
                  Preview placeholder — your reel renders here
                </p>
              </div>
            </div>
          </div>

          <div className="hidden flex-col gap-4 lg:flex">
            {showcaseCards.slice(2).map((card) => (
              <ShowcaseCard key={card.label} {...card} className="w-[200px]" />
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
          {showcaseCards.map((card) => (
            <ShowcaseCard key={card.label} {...card} />
          ))}
        </div>
      </section>
    </main>
  );
}

function ShowcaseCard({
  label,
  tag,
  src,
  className,
}: {
  label: string;
  tag: string;
  src: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative aspect-[9/16] overflow-hidden rounded-xl border border-border/50 bg-card ring-1 ring-foreground/5 transition-transform hover:-translate-y-0.5",
        className,
      )}
    >
      <Image src={src} alt="" fill className="object-cover transition-opacity group-hover:opacity-95" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-3 pt-10">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {tag}
        </p>
        <p className="text-sm font-medium text-foreground">{label}</p>
      </div>
    </div>
  );
}
