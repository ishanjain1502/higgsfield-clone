import Image from "next/image";

import { HF_ASSETS, HF_PROJECTS } from "@/lib/higgsfield-home-constants";

import { HfMedia } from "./hf-media";
import { LandingCta, SectionHeader } from "./landing-primitives";

export function ProjectsGrid() {
  return (
    <section>
      <SectionHeader title={HF_PROJECTS.title} description={HF_PROJECTS.description} />
      <ul className="grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
        {HF_PROJECTS.items.map((p) => (
          <li key={p.slug}>
            <HfMedia
              image={p.image}
              alt={p.title}
              aspect="16/9"
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="rounded-xl"
            />
            <p className="mt-2 line-clamp-1 text-sm font-medium">{p.title}</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-[var(--hf-muted)]">
              {HF_ASSETS.projectAuthorAvatar ? (
                <Image
                  src={HF_ASSETS.projectAuthorAvatar}
                  alt=""
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              ) : null}
              {p.author}
              {HF_ASSETS.higgsIcon ? (
                <Image src={HF_ASSETS.higgsIcon} alt="" width={14} height={14} />
              ) : null}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center">
        <LandingCta variant="glass">{HF_PROJECTS.cta}</LandingCta>
      </div>
    </section>
  );
}
