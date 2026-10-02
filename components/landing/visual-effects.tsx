import Link from "next/link";

import { HF_VISUAL_EFFECTS } from "@/lib/higgsfield-home-constants";

import { HfMedia } from "./hf-media";
import { LandingCta, SectionHeader } from "./landing-primitives";
import { Masonry } from "./masonry";

export function VisualEffects() {
  return (
    <section>
      <SectionHeader
        title={HF_VISUAL_EFFECTS.title}
        description={HF_VISUAL_EFFECTS.description}
        accent
        action={
          <LandingCta variant="glass" className="hidden sm:inline-flex">
            {HF_VISUAL_EFFECTS.cta}
          </LandingCta>
        }
      />
      <Masonry
        items={HF_VISUAL_EFFECTS.items}
        columns={5}
        renderItem={(fx) => (
          <HfMedia
            image={fx.image}
            video={fx.video}
            alt={fx.name}
            aspect={fx.aspect}
            sizes="(min-width: 1024px) 20vw, 50vw"
            className="rounded-2xl"
          >
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/80 to-transparent p-3 pt-12">
              <h3 className="font-display text-sm font-bold tracking-[-0.04em] uppercase">
                {fx.name}
              </h3>
              <Link
                href="/login"
                className="rounded-lg bg-white/15 px-2.5 py-1 text-xs font-medium backdrop-blur hover:bg-white/25"
              >
                {HF_VISUAL_EFFECTS.itemCta}
              </Link>
            </div>
          </HfMedia>
        )}
      />
      <div className="mt-4 flex justify-center">
        <LandingCta variant="glass">{HF_VISUAL_EFFECTS.viewAll}</LandingCta>
      </div>
    </section>
  );
}
