import Image from "next/image";

import {
  HF_CANVAS_BANNER,
  HF_PHOTODUMP_BANNER,
  HF_SUPERCOMPUTER_BANNER,
} from "@/lib/higgsfield-home-constants";
import { cn } from "@/lib/utils";

import { DisplayHeading, LandingCta } from "./landing-primitives";

/** Floating product shots placed around the Supercomputer title on desktop. */
const SPC_FLOATERS: {
  key: keyof typeof HF_SUPERCOMPUTER_BANNER.images;
  className: string;
  width: number;
  height: number;
}[] = [
  { key: "creative", className: "left-[6%] top-[18%]", width: 257, height: 209 },
  { key: "visualizing", className: "right-[24%] top-[16%]", width: 114, height: 52 },
  { key: "marketing", className: "right-[6%] top-[14%]", width: 217, height: 200 },
  { key: "production", className: "right-[20%] bottom-[8%]", width: 221, height: 106 },
];

export function SupercomputerBanner() {
  const images = HF_SUPERCOMPUTER_BANNER.images;
  return (
    <section className="relative min-h-[320px] overflow-hidden rounded-2xl lg:min-h-[424px]">
      <Image src={images.background} alt="" fill sizes="100vw" className="object-cover" />
      {SPC_FLOATERS.map((f) => (
        <Image
          key={f.key}
          src={images[f.key]}
          alt=""
          width={f.width}
          height={f.height}
          className={cn("absolute hidden lg:block", f.className)}
        />
      ))}
      <div className="relative flex min-h-[320px] flex-col items-center justify-center gap-4 p-6 text-center lg:min-h-[424px]">
        <Image src={images.logo} alt={HF_SUPERCOMPUTER_BANNER.title} width={193} height={40} />
        <p className="max-w-xs text-lg text-white/80">{HF_SUPERCOMPUTER_BANNER.description}</p>
        <LandingCta>{HF_SUPERCOMPUTER_BANNER.cta}</LandingCta>
      </div>
    </section>
  );
}

function ImageBanner({
  eyebrow,
  title,
  description,
  cta,
  imageDesktop,
  imageMobile,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  imageDesktop: string;
  imageMobile: string;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden rounded-2xl bg-white/[0.03]", className)}>
      <Image
        src={imageDesktop}
        alt=""
        fill
        sizes="100vw"
        className="hidden object-cover object-right sm:block"
      />
      <Image src={imageMobile} alt="" fill sizes="100vw" className="object-cover sm:hidden" />
      <div className="relative flex h-full flex-col justify-center gap-3 bg-gradient-to-r from-black/70 via-black/30 to-transparent p-6 sm:p-10">
        <span className="text-xs font-semibold tracking-wider text-[var(--hf-accent)] uppercase">
          {eyebrow}
        </span>
        <DisplayHeading className="max-w-md text-3xl leading-9 sm:text-4xl sm:leading-10">
          {title}
        </DisplayHeading>
        <p className="max-w-sm text-sm text-white/70">{description}</p>
        <LandingCta className="self-start">{cta}</LandingCta>
      </div>
    </section>
  );
}

export function CanvasBanner() {
  return <ImageBanner {...HF_CANVAS_BANNER} className="min-h-[300px]" />;
}

export function PhotodumpBanner() {
  return <ImageBanner {...HF_PHOTODUMP_BANNER} className="min-h-[280px]" />;
}
