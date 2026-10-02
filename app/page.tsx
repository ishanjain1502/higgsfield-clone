import { CommunityGallery } from "@/components/landing/community-gallery";
import {
  CanvasBanner,
  PhotodumpBanner,
  SupercomputerBanner,
} from "@/components/landing/feature-banners";
import { FilmFestival } from "@/components/landing/film-festival";
import { GenjutsuShowcase } from "@/components/landing/genjutsu-showcase";
import { HeroCarousel } from "@/components/landing/hero-carousel";
import { McpDots } from "@/components/landing/mcp-dots";
import { MoreFeatures } from "@/components/landing/more-features";
import { ProjectsGrid } from "@/components/landing/projects-grid";
import { SignupPromo } from "@/components/landing/signup-promo";
import { SiteFooter } from "@/components/landing/site-footer";
import { VisualEffects } from "@/components/landing/visual-effects";
import { HF_GALLERIES } from "@/lib/higgsfield-home-constants";

const gallery = Object.fromEntries(HF_GALLERIES.map((g) => [g.id, g]));

export default function Home() {
  return (
    <>
      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-12 px-4 pt-3 pb-16 lg:gap-16">
        
        <HeroCarousel />
        <SignupPromo />
        <McpDots />
        <FilmFestival />
        <VisualEffects />
        <GenjutsuShowcase />
        <CommunityGallery gallery={gallery["seedance-2-5"]} />
        <ProjectsGrid />
        <SupercomputerBanner />
        <CommunityGallery gallery={gallery["gpt-image-2"]} />
        <CanvasBanner />
        <CommunityGallery gallery={gallery["marketing-studio"]} />
        <CommunityGallery gallery={gallery["seedance-2-0"]} />
        <PhotodumpBanner />
        <CommunityGallery gallery={gallery["soul-cinema"]} />
        <CommunityGallery gallery={gallery["soul-2-0"]} />
        <MoreFeatures />
      </main>
      <SiteFooter />
    </>
  );
}
