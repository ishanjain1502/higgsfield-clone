import { HF_HERO_CARDS } from "@/lib/higgsfield-home-constants";

import { HfMedia } from "./hf-media";

export function HeroCarousel() {
  return (
    <section aria-label="Featured" className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none]">
      <ul className="flex snap-x snap-mandatory gap-5">
        {HF_HERO_CARDS.map((card, i) => (
          <li key={card.id} className="w-[min(85vw,512px)] shrink-0 snap-start">
            <HfMedia
              image={card.image}
              video={card.video}
              aspect="16/9"
              play="always"
              priority={i < 2}
              sizes="512px"
              className="rounded-2xl"
            />
            <h3 className="font-display mt-4 text-base font-bold tracking-[-0.04em] uppercase">
              {card.title}
            </h3>
            <p className="mt-1 truncate text-sm text-[var(--hf-muted)]">{card.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
