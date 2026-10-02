import Image from "next/image";

import { HF_ASSETS, HF_FILM_FESTIVAL } from "@/lib/higgsfield-home-constants";

import { HfMedia } from "./hf-media";
import { DisplayHeading, LandingCta } from "./landing-primitives";

export function FilmFestival() {
  return (
    <section className="grid gap-4 overflow-hidden rounded-2xl bg-black p-4 ring-1 ring-white/5 lg:grid-cols-[minmax(0,584px)_1fr]">
      <HfMedia
        image={HF_FILM_FESTIVAL.poster}
        video={HF_FILM_FESTIVAL.video}
        play="always"
        sizes="584px"
        className="min-h-[420px] rounded-xl lg:min-h-[718px]"
      >
        <div className="absolute inset-x-0 top-0 flex flex-col items-center gap-4 bg-gradient-to-b from-black/70 to-transparent px-6 pt-10 pb-24 text-center">
          {HF_ASSETS.filmFestivalLogo ? (
            <Image src={HF_ASSETS.filmFestivalLogo} alt="Higgsfield" width={131} height={27} />
          ) : null}
          <p className="font-display bg-gradient-to-b from-[#f2dca6] to-[#a88449] bg-clip-text text-4xl leading-none font-bold text-transparent uppercase">
            {HF_FILM_FESTIVAL.eyebrow}
          </p>
          <DisplayHeading className="text-3xl leading-9 text-white/85">
            {HF_FILM_FESTIVAL.title}
            <br />
            {HF_FILM_FESTIVAL.subtitle}
          </DisplayHeading>
        </div>
      </HfMedia>

      <div className="relative">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {HF_FILM_FESTIVAL.submissions.map((s) => (
            <li key={s.image}>
              <HfMedia image={s.image} aspect="16/9" sizes="250px" className="rounded-xl" />
              <p className="mt-2 flex items-center gap-1.5 text-xs text-white/70">
                {s.avatar ? (
                  <Image src={s.avatar} alt="" width={16} height={16} className="rounded-full" />
                ) : null}
                {s.author}
              </p>
            </li>
          ))}
        </ul>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-40 items-end justify-center bg-gradient-to-t from-black to-transparent pb-4">
          <LandingCta variant="gold" className="pointer-events-auto">
            {HF_FILM_FESTIVAL.cta}
          </LandingCta>
        </div>
      </div>
    </section>
  );
}
