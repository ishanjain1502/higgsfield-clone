import Image from "next/image";

import { HF_ASSETS, type HfGallery } from "@/lib/higgsfield-home-constants";

import { HfMedia } from "./hf-media";
import { LandingCta, SectionHeader } from "./landing-primitives";
import { Masonry } from "./masonry";

export function CommunityGallery({ gallery }: { gallery: HfGallery }) {
  return (
    <section aria-label={gallery.title}>
      <SectionHeader title={gallery.title} description={gallery.description} />
      <div className="relative max-h-[880px] overflow-hidden">
        <Masonry
          items={gallery.items}
          columns={4}
          renderItem={(item) => (
            <HfMedia
              image={item.image}
              video={item.video}
              alt={item.alt}
              aspect={item.aspect}
              className="rounded-2xl"
            >
              {item.author ? (
                <span className="absolute top-2 left-2 flex items-center gap-1.5 rounded-full bg-black/40 py-0.5 pr-2 pl-0.5 text-xs backdrop-blur">
                  <Image
                    src={HF_ASSETS.defaultAvatar}
                    alt=""
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  {item.author}
                </span>
              ) : null}
            </HfMedia>
          )}
        />
        <div className="absolute inset-x-0 bottom-0 flex h-56 items-end justify-center bg-gradient-to-t from-background via-background/80 to-transparent pb-4">
          <LandingCta variant="glass">{gallery.ctaLabel}</LandingCta>
        </div>
      </div>
    </section>
  );
}
