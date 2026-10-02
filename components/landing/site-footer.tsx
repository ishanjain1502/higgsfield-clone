import { HF_FOOTER } from "@/lib/higgsfield-home-constants";

import { DisplayHeading } from "./landing-primitives";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#0c0d0f]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-14 lg:grid-cols-[minmax(0,400px)_1fr]">
        <div className="flex flex-col gap-6">
          <DisplayHeading className="text-3xl leading-9">{HF_FOOTER.tagline}</DisplayHeading>
          <p className="text-sm text-[var(--hf-muted)]">{HF_FOOTER.address}</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/70">
            {HF_FOOTER.socials.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {HF_FOOTER.columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-sm font-semibold">{col.title}</h3>
              <ul className="flex flex-col gap-2 text-sm text-[var(--hf-muted)]">
                {col.links.map((l) => (
                  <li key={l} className="transition-colors hover:text-white">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
