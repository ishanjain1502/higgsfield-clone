import Link from "next/link";

import { HF_MORE_FEATURES } from "@/lib/higgsfield-home-constants";

import { DisplayHeading } from "./landing-primitives";

export function MoreFeatures() {
  return (
    <section className="flex flex-col gap-6">
      <DisplayHeading className="text-4xl leading-10 sm:text-5xl sm:leading-[56px]">
        Explore more AI features
      </DisplayHeading>
      <ul className="flex flex-wrap gap-2">
        {HF_MORE_FEATURES.map((label) => (
          <li key={label}>
            <Link
              href="/login"
              className="inline-flex rounded-xl bg-white/[0.05] px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
