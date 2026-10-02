import { HF_GENJUTSU } from "@/lib/higgsfield-home-constants";

import { HfMedia } from "./hf-media";
import { DisplayHeading, LandingCta } from "./landing-primitives";
import { Masonry } from "./masonry";

export function GenjutsuShowcase() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/5">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-xl flex-col gap-2">
          <span className="text-xs font-medium tracking-wider text-[var(--hf-accent)] uppercase">
            {HF_GENJUTSU.eyebrow}
          </span>
          <DisplayHeading className="text-4xl leading-10">{HF_GENJUTSU.title}</DisplayHeading>
          <p className="text-sm text-[var(--hf-muted)]">{HF_GENJUTSU.description}</p>
        </div>
        <div className="flex gap-2">
          <LandingCta>{HF_GENJUTSU.primaryCta}</LandingCta>
          <LandingCta variant="glass">{HF_GENJUTSU.secondaryCta}</LandingCta>
        </div>
      </div>

      <div className="relative max-h-[760px] overflow-hidden">
        <Masonry
          items={HF_GENJUTSU.items}
          columns={5}
          renderItem={(item) => (
            <HfMedia
              image={item.image}
              aspect={item.aspect}
              sizes="(min-width: 1024px) 20vw, 50vw"
              className="rounded-xl"
            />
          )}
        />
        <div className="absolute inset-x-0 bottom-0 flex h-48 items-end justify-center bg-gradient-to-t from-[#141618] to-transparent pb-2">
          <LandingCta variant="glass">{HF_GENJUTSU.viewAll}</LandingCta>
        </div>
      </div>
    </section>
  );
}
