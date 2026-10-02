import Image from "next/image";

import { HF_MCP_DOTS } from "@/lib/higgsfield-home-constants";
import { cn } from "@/lib/utils";

import { DisplayHeading, LandingCta } from "./landing-primitives";

/** Desktop positions of the floating mascots, matching the reference layout. */
const DOT_POSITIONS = [
  "left-[17%] top-[62%]",
  "left-[14%] top-[22%]",
  "right-[9%] top-[52%]",
  "right-[9%] top-[8%]",
];

export function McpDots() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#1c1e21] to-[#121416] px-6 py-14 ring-1 ring-white/5">
      {HF_MCP_DOTS.dots.map((dot, i) => (
        <div
          key={dot.label}
          className={cn("absolute hidden flex-col items-center gap-2 lg:flex", DOT_POSITIONS[i])}
        >
          <span className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-medium backdrop-blur">
            {dot.label}
          </span>
          <Image src={dot.image} alt="" width={64} height={64} />
        </div>
      ))}

      <div className="relative mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
        <DisplayHeading className="text-4xl leading-[1.1] sm:text-5xl">
          {HF_MCP_DOTS.title}
        </DisplayHeading>
        <p className="max-w-sm text-sm text-[var(--hf-muted)]">{HF_MCP_DOTS.description}</p>
        <LandingCta className="mt-2">{HF_MCP_DOTS.cta}</LandingCta>
      </div>
    </section>
  );
}
