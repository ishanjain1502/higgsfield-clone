import Image from "next/image";
import { Check, Image as ImageIcon, Sparkles, Video } from "lucide-react";

import { HF_FEATURED_TOOLS, HF_SIGNUP_PROMO } from "@/lib/higgsfield-home-constants";

import { HfMedia } from "./hf-media";
import { Badge, DisplayHeading, LandingCta } from "./landing-primitives";

export function SignupPromo() {
  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,640px)_1fr]">
      <HfMedia
        image={HF_SIGNUP_PROMO.image}
        video={HF_SIGNUP_PROMO.video}
        play="always"
        sizes="640px"
        className="min-h-[271px] rounded-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center gap-4 p-6 sm:p-8">
          <DisplayHeading as="h2" className="text-3xl leading-9 sm:text-4xl sm:leading-10">
            {HF_SIGNUP_PROMO.title}
            <br />
            <span className="text-[var(--hf-accent)]">{HF_SIGNUP_PROMO.highlight}</span>
          </DisplayHeading>
          <ul className="flex flex-col gap-1.5 text-sm text-white/70">
            {HF_SIGNUP_PROMO.perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2">
                <Check className="size-3.5" aria-hidden />
                {perk}
              </li>
            ))}
          </ul>
          <LandingCta className="self-start">{HF_SIGNUP_PROMO.cta}</LandingCta>
        </div>
      </HfMedia>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {HF_FEATURED_TOOLS.map((tool) => (
          <li
            key={tool.title}
            className="flex min-h-32 flex-col justify-between rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/5 transition-colors hover:bg-white/[0.07]"
          >
            <div className="flex items-start justify-between">
              {tool.icon ? (
                <Image src={tool.icon} alt="" width={20} height={20} />
              ) : (
                <Sparkles className="size-5 text-white/70" aria-hidden />
              )}
              {tool.category ? (
                <span className="flex items-center gap-1 rounded-lg bg-white/10 px-2 py-1 text-xs">
                  {tool.category === "Video" ? (
                    <Video className="size-3" aria-hidden />
                  ) : (
                    <ImageIcon className="size-3" aria-hidden />
                  )}
                  {tool.category}
                </span>
              ) : null}
            </div>
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold">
                {tool.title}
                {tool.badge ? (
                  <Badge tone={tool.badge === "TOP" ? "hot" : "lime"}>{tool.badge}</Badge>
                ) : null}
              </p>
              <p className="mt-1 text-xs text-[var(--hf-muted)]">{tool.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
