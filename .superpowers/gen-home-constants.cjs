// Builds lib/higgsfield-home-constants.ts from a DOM snapshot of higgsfield.ai (Oct 2026).
// Usage: node .superpowers/gen-home-constants.cjs
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const raw = JSON.parse(fs.readFileSync(path.join(__dirname, "hf-home-raw.json"), "utf8")).result.value;
const extra = JSON.parse(fs.readFileSync(path.join(__dirname, "hf-extra.json"), "utf8"));
const S = raw.sections;

const RATIOS = [
  ["9/16", 9 / 16],
  ["2/3", 2 / 3],
  ["3/4", 3 / 4],
  ["1/1", 1],
  ["4/3", 4 / 3],
  ["3/2", 3 / 2],
  ["16/9", 16 / 9],
];
const aspect = (w, h) => RATIOS.reduce((b, r) => (Math.abs(r[1] - w / h) < Math.abs(b[1] - w / h) ? r : b))[0];

const cleanAlt = (a) => {
  if (!a || a.startsWith("Loading") || a.startsWith("{")) return undefined;
  return a.length > 110 ? a.slice(0, 107).trimEnd() + "..." : a;
};

/** Pairs thumbnail <img> with its <video> and author avatar; assigns a masonry column by x. */
function gallery(section) {
  const media = section.media.filter((m) => !m.src.startsWith("data:"));
  const thumbs = media.filter((m) => m.k === "IMG" && m.w > 60);
  const xs = [...new Set(thumbs.map((t) => t.x))].sort((a, b) => a - b);
  const seen = new Set();
  const items = [];
  for (const t of thumbs) {
    if (seen.has(t.src)) continue;
    seen.add(t.src);
    const video = media.find((m) => m.k === "VIDEO" && m.x === t.x && m.y === t.y);
    const avatar = media.find(
      (m) => m.k === "IMG" && m.w === 28 && m.href?.startsWith("/@") && Math.abs(m.x - t.x) < 20 && m.y >= t.y && m.y < t.y + 60,
    );
    items.push({
      column: xs.indexOf(t.x),
      y: t.y,
      item: {
        image: t.src,
        ...(video ? { video: video.src } : {}),
        aspect: aspect(t.w, t.h),
        ...(cleanAlt(t.alt) ? { alt: cleanAlt(t.alt) } : {}),
        ...(avatar ? { author: avatar.href.slice(2) } : {}),
        column: xs.indexOf(t.x),
      },
    });
  }
  return items.sort((a, b) => a.column - b.column || a.y - b.y).map((i) => i.item);
}

// --- Contest submissions: 249x140 thumb + 16x16 avatar ~107px below.
const contest = S[1].media;
const contestVideo = contest.find((m) => m.k === "VIDEO" && m.w > 500);
const submissions = contest
  .filter((m) => m.k === "IMG" && m.w === 249)
  .map((t) => {
    const av = contest.find((m) => m.w === 16 && m.alt && Math.abs(m.y - (t.y + 107)) < 5 && Math.abs(m.x - (t.x + 16)) < 5);
    return { image: t.src, author: av?.alt ?? "", avatar: av?.src ?? "" };
  });

// --- Genjutsu masonry (5 columns of preset thumbs).
const genjutsuThumbs = S[2].media.filter((m) => m.k === "IMG" && !m.src.includes("viral_hub"));
const gxs = [...new Set(genjutsuThumbs.map((t) => t.x))].sort((a, b) => a - b);
const genjutsu = [...new Map(genjutsuThumbs.map((t) => [t.src, t])).values()]
  .sort((a, b) => a.x - b.x || a.y - b.y)
  .map((t) => ({ image: t.src, aspect: aspect(t.w, t.h), column: gxs.indexOf(t.x) }));

// --- Projects row.
const projects = S[4].media
  .filter((m) => m.k === "IMG" && m.w === 328)
  .map((m) => ({
    title: m.card.replace(/ by Higgsfield Studio Public$/, ""),
    author: "Higgsfield Studio",
    image: m.src,
    slug: m.href.split("/").pop(),
  }));
const projectAvatar = S[4].media.find((m) => m.w === 20)?.src;
const projectIcon = S[4].media.find((m) => m.w === 16)?.src;

const spc = Object.fromEntries(
  S[5].media.map((m) => [m.src.split("/").pop().replace(/\.png$/, "").replace("spc-banner-", "").replace("bg-spc-banner", "background"), m.src]),
);

const galleries = [
  { id: "seedance-2-5", title: "SEEDANCE 2.5", description: "The most advanced AI video model", ctaLabel: "View all of Seedance 2.5", items: gallery(S[3]) },
  { id: "gpt-image-2", title: "GPT IMAGE 2", description: "4K images with near-perfect text rendering.", ctaLabel: "View all of GPT Image 2", items: gallery(S[6]) },
  { id: "marketing-studio", title: "MARKETING STUDIO", description: "See what creators and brands are making with Marketing Studio.", ctaLabel: "View all of Marketing Studio", items: gallery(S[8]) },
  { id: "seedance-2-0", title: "SEEDANCE 2.0", description: "Browse premium AI video generations from the Higgsfield community.", ctaLabel: "View all of Seedance 2.0", items: gallery(S[9]) },
  { id: "soul-cinema", title: "HIGGSFIELD SOUL CINEMA", description: "Explore Higgsfield Community gallery for stunning Higgsfield Soul Cinema creations.", ctaLabel: "View all of Higgsfield Soul Cinema", items: gallery(S[11]) },
  {
    id: "soul-2-0",
    title: "HIGGSFIELD SOUL 2.0",
    description: "A culture-native photo model built for fashion, aesthetics, and creative expression.",
    ctaLabel: "View all of Higgsfield Soul 2.0",
    items: extra.soul2.map((m, i) => ({ image: m.src, aspect: aspect(m.w, m.h), alt: cleanAlt(m.alt), column: i % 4 })),
  },
];

const heroVideos = S[0].media.filter((m) => m.k === "VIDEO").map((m) => m.src);
const heroPoster = S[0].media.find((m) => m.k === "IMG")?.src;

const data = {
  HF_ASSETS: {
    defaultAvatar: "https://static.higgsfield.ai/profile/avatar.png",
    filmFestivalLogo: S[1].media.find((m) => m.src.includes("tanstack"))?.src,
    projectAuthorAvatar: projectAvatar,
    higgsIcon: projectIcon,
  },
  HF_PROMO_BAR: {
    text: "Get an additional discount on premium plans after signing up",
    cta: "Get your discount",
  },
  HF_NAV_LINKS: [
    { label: "Explore" },
    { label: "Image" },
    { label: "Video" },
    { label: "Audio" },
    { label: "MCP" },
    { label: "API", badge: "New" },
    { label: "ChatGPT Plugin" },
    { label: "Genjutsu", badge: "Top" },
    { label: "Effects" },
    { label: "Cinema Studio" },
    { label: "Contests" },
    { label: "Ads Studio", badge: "New" },
    { label: "Marketing Studio" },
    { label: "Supercomputer" },
    { label: "3D Jutsu", badge: "New" },
    { label: "Edit" },
    { label: "Academy" },
    { label: "Community" },
    { label: "Plugins" },
    { label: "Canvas" },
    { label: "Originals" },
  ],
  HF_HERO_CARDS: [
    { id: "genjutsu-restyle", title: "GENJUTSU RESTYLE", description: "Keep the motion, change the world: restyle any video in one click", video: heroVideos[0] },
    { id: "chatgpt-extension", title: "HIGGSFIELD EXTENSION IN CHATGPT", description: "Your entire AI production studio, inside ChatGPT", video: heroVideos[1] },
    { id: "production-skills", title: "PRODUCTION SKILLS BUNDLE", description: "3D, VFX, editing, and design. Run it all from ChatGPT or Claude", video: heroVideos[2] },
    { id: "gpt-astra-ads", title: "HIGGSFIELD X GPT-6 ASTRA FOR PAID ADS", description: "Market research to your next ad test - now on ChatGPT", image: heroPoster, video: heroVideos[3] },
  ],
  HF_SIGNUP_PROMO: {
    title: "SIGN UP AND GET YOUR",
    highlight: "EXTRA DISCOUNT",
    perks: ["Get unlimited Nano Banana Pro", "Unlock your extra discount", "Access to Seedance 2.5"],
    cta: "Sign up and get your discount",
    image: S[1].media.find((m) => m.src.includes("sale-hero-poster"))?.src,
    video: S[1].media.find((m) => m.src.includes("explore_image.mp4"))?.src,
  },
  HF_FEATURED_TOOLS: [
    { title: "Seedance 2.5", badge: "TOP", description: "The most advanced video model", category: "Video", icon: "https://static.higgsfield.ai/explore/image-generate-block/seedance-logo.png" },
    { title: "Nano Banana Pro", description: "Generate high-quality visuals", category: "Image" },
    { title: "Higgsfield Genjutsu", badge: "NEW", description: "One video, many versions" },
    { title: "Higgsfield MCP for Claude", description: "Generate images and videos in Claude" },
    { title: "Cinema Studio 4.0", description: "Create cinematic scenes effortlessly", icon: "https://static.higgsfield.ai/explore/image-generate-block/cinema-studio.png" },
    { title: "Supercomputer", description: "Agent powered by GPT-6 Astra", icon: "https://static.higgsfield.ai/explore/image-generate-block/supercomputer-card-icon.svg" },
  ],
  HF_MCP_DOTS: {
    title: "USE CHATGPT DOTS WITH HIGGSFIELD MCP",
    description: "Plan and make a creative project step by step with Higgsfield Dots in ChatGPT",
    cta: "Connect Higgsfield",
    centerDot: "https://static.higgsfield.ai/mcp/dots/v2/dot-white.webp",
    cursor: "https://static.higgsfield.ai/mcp/dots/v2/cursor.svg",
    dots: [
      { label: "Character Creator", image: "https://static.higgsfield.ai/mcp/dots/v2/dot-character-creator.webp" },
      { label: "Cinematic Director", image: "https://static.higgsfield.ai/mcp/dots/v2/dot-cinematic-director.webp" },
      { label: "Content Lead", image: "https://static.higgsfield.ai/mcp/dots/v2/dot-content-lead.webp" },
      { label: "Motion Designer", image: "https://static.higgsfield.ai/mcp/dots/v2/dot-motion-designer.webp" },
    ],
  },
  HF_FILM_FESTIVAL: {
    eyebrow: "GLOBAL FILM FESTIVAL",
    title: "ALL SUBMISSIONS ARE LIVE",
    subtitle: "THE SHORTLIST IS NEXT",
    cta: "Explore all projects",
    poster: contestVideo?.poster,
    video: contestVideo?.src,
    submissions,
  },
  HF_VISUAL_EFFECTS: {
    title: "VISUAL EFFECTS",
    description: "Big-budget visual effects, from explosions to surreal transformations.",
    cta: "Try for free",
    itemCta: "Recreate",
    viewAll: "View all presets",
    items: extra.fx.map((f) => ({ name: f.name, slug: f.slug, image: f.img, ...(f.vid ? { video: f.vid } : {}), aspect: aspect(f.w, f.h) })),
  },
  HF_GENJUTSU: {
    eyebrow: "New model",
    title: "HIGGSFIELD GENJUTSU",
    description: "Reality Manipulation — transfer motion into new scenes, or swap details while everything else stays as filmed.",
    primaryCta: "Start generating",
    secondaryCta: "Learn more",
    viewAll: "View all presets",
    items: genjutsu,
  },
  HF_PROJECTS: {
    title: "EXPLORE THE INSIDE OF EVERY PROJECT",
    description: "See all prompts, assets, and how each project was created",
    cta: "Explore community",
    items: projects,
  },
  HF_SUPERCOMPUTER_BANNER: {
    title: "SUPERCOMPUTER",
    description: "One superagent for your entire creative stack",
    cta: "Try Supercomputer",
    images: spc,
  },
  HF_CANVAS_BANNER: {
    eyebrow: "NEW FEATURE",
    title: "ONE CANVAS. EVERY WORKFLOW.",
    description: "Moodboard, chain workflows, and share with your team - all on one canvas",
    cta: "Try Canvas",
    imageDesktop: "https://static.higgsfield.ai/canvas-banner-desktop-new.webp",
    imageMobile: "https://static.higgsfield.ai/canvas-banner-mobile.webp",
  },
  HF_PHOTODUMP_BANNER: {
    eyebrow: "PHOTODUMP",
    title: "DIFFERENT SCENES SAME STAR",
    description: "Build your character. One click does the rest",
    cta: "Try Photodump",
    imageDesktop: "https://static.higgsfield.ai/public/photodump/cta-desktop.png",
    imageMobile: "https://static.higgsfield.ai/public/photodump/cta-mobile.png",
  },
  HF_GALLERIES: galleries,
  HF_MORE_FEATURES: S[13].links.map((l) => l.t),
  HF_FOOTER: {
    tagline: "AI-NATIVE CREATIVE SUITE",
    columns: [
      { title: "Create", links: ["AI Video", "AI Image", "Edit Image", "Inpaint", "Upscale", "Sora 2 Upscale", "Mixed Media", "AI Face Swap", "AI Influencer", "Apps"] },
      { title: "Video Models", links: ["Seedance 2.5", "Seedance 2.0", "Kling 3.0", "Sora 2 Introduction", "Veo 3.1 Introduction", "WAN 2.6", "Grok Imagine 1.5", "Gemini Omni Flash"] },
      { title: "Image Models", links: ["Nano Banana", "Flux 2", "Seedream 5", "GPT Image 2"] },
      { title: "Studios", links: ["Cinema Studio", "Marketing Studio", "Lipsync Studio", "Photodump Studio", "Fashion Factory", "UGC Factory", "Higgsfield Popcorn", "Higgsfield Canvas"] },
      { title: "Soul", links: ["Soul 2.0", "Soul ID Character", "Soul Cinema"] },
      { title: "Platform", links: ["Supercomputer", "MCP/CLI", "API", "Collab", "Games", "Reference Extension"] },
      { title: "Resources", links: ["Blog", "Creator Hub", "Help Center", "Academy", "Prompt Guide"] },
      { title: "Company", links: ["About", "Trust", "Enterprise", "Team", "Pricing", "Careers", "Contact"] },
      { title: "Community", links: ["Community", "Contests", "Creative Partners"] },
    ],
    address: "535 Mission St, 14th floor, San Francisco, CA, 94105",
    socials: ["X / Twitter", "Youtube", "LinkedIn", "Tiktok", "Discord"],
  },
};

const types = `export type HfAspect = "9/16" | "2/3" | "3/4" | "1/1" | "4/3" | "3/2" | "16/9";

export type HfNavLink = { label: string; badge?: "New" | "Top" };

export type HfHeroCard = {
  id: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
};

export type HfFeaturedTool = {
  title: string;
  description: string;
  badge?: "TOP" | "NEW";
  category?: "Video" | "Image";
  icon?: string;
};

export type HfSubmission = { image: string; author: string; avatar: string };

export type HfEffect = {
  name: string;
  slug: string;
  image: string;
  video?: string;
  aspect: HfAspect;
};

export type HfMasonryItem = {
  image: string;
  video?: string;
  aspect: HfAspect;
  alt?: string;
  author?: string;
  /** Column the item occupies on the reference desktop layout. */
  column: number;
};

export type HfProject = { title: string; author: string; image: string; slug: string };

export type HfGallery = {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  items: HfMasonryItem[];
};

export type HfFooterColumn = { title: string; links: string[] };
`;

const typeOf = {
  HF_NAV_LINKS: "HfNavLink[]",
  HF_HERO_CARDS: "HfHeroCard[]",
  HF_FEATURED_TOOLS: "HfFeaturedTool[]",
  HF_GALLERIES: "HfGallery[]",
  HF_MORE_FEATURES: "string[]",
};

const strip = (v) => JSON.parse(JSON.stringify(v));
let out = `/**
 * Static content for the Higgsfield-style home page, captured from higgsfield.ai.
 * All media is referenced by URL so the page renders without any API calls.
 * Regenerate with \`node .superpowers/gen-home-constants.cjs\`.
 */

${types}`;

for (const [name, value] of Object.entries(data)) {
  const t = typeOf[name];
  let body = JSON.stringify(strip(value), null, 2).replace(/"([A-Za-z_][A-Za-z0-9_]*)":/g, "$1:");
  if (name === "HF_VISUAL_EFFECTS") body = body.replace(/items: \[/, "items: [");
  out += `\nexport const ${name}${t ? `: ${t}` : ""} = ${body}${t ? ";" : " as const;"}\n`;
}

// Keep nested item arrays typed against the exported item types.
out = out
  .replace("export const HF_FILM_FESTIVAL = ", "export const HF_FILM_FESTIVAL: {\n  eyebrow: string;\n  title: string;\n  subtitle: string;\n  cta: string;\n  poster?: string;\n  video?: string;\n  submissions: HfSubmission[];\n} = ")
  .replace("export const HF_VISUAL_EFFECTS = ", "export const HF_VISUAL_EFFECTS: {\n  title: string;\n  description: string;\n  cta: string;\n  itemCta: string;\n  viewAll: string;\n  items: HfEffect[];\n} = ")
  .replace("export const HF_GENJUTSU = ", "export const HF_GENJUTSU: {\n  eyebrow: string;\n  title: string;\n  description: string;\n  primaryCta: string;\n  secondaryCta: string;\n  viewAll: string;\n  items: Omit<HfMasonryItem, \"alt\" | \"author\" | \"video\">[];\n} = ")
  .replace("export const HF_PROJECTS = ", "export const HF_PROJECTS: {\n  title: string;\n  description: string;\n  cta: string;\n  items: HfProject[];\n} = ")
  .replace("export const HF_FOOTER = ", "export const HF_FOOTER: {\n  tagline: string;\n  columns: HfFooterColumn[];\n  address: string;\n  socials: string[];\n} = ");

for (const n of ["HF_FILM_FESTIVAL", "HF_VISUAL_EFFECTS", "HF_GENJUTSU", "HF_PROJECTS", "HF_FOOTER"]) {
  const re = new RegExp(`(export const ${n}:[\\s\\S]*?\\n\\}) as const;`);
  out = out.replace(re, "$1;");
}

// This bucket rejects direct requests (403) and higgsfield's proxy only serves it once warm,
// so its images are vendored into public/ instead of hotlinked.
const VENDORED_HOSTS = ["dqv0cqkoy5oj7.cloudfront.net"];
const VENDOR_DIR = path.join(root, "public", "higgsfield", "home");
const toVendor = [];
out = out.replace(/"(https:\/\/([^/"]+)\/[^"]+)"/g, (match, url, host) => {
  if (!VENDORED_HOSTS.includes(host)) return match;
  const file = url.split("/").pop().replace(/\.\w+$/, ".webp");
  toVendor.push({ url, file });
  return `"/higgsfield/home/${file}"`;
});

async function vendor() {
  fs.mkdirSync(VENDOR_DIR, { recursive: true });
  for (const { url, file } of toVendor) {
    const dest = path.join(VENDOR_DIR, file);
    if (fs.existsSync(dest)) continue;
    const proxied = `https://images.higgs.ai/?default=1&output=webp&url=${encodeURIComponent(url)}&w=1280&q=85`;
    for (let attempt = 0; attempt < 20; attempt++) {
      const res = await fetch(proxied, { headers: { Referer: "https://higgsfield.ai/" }, redirect: "manual" });
      if (res.status === 200) {
        fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
        break;
      }
      await new Promise((r) => setTimeout(r, 2000));
    }
    if (!fs.existsSync(dest)) throw new Error(`could not vendor ${url}`);
  }
}

const hosts = new Set();
for (const m of out.matchAll(/https:\/\/([^/"]+)\//g)) hosts.add(m[1]);
out += `\n/** Every remote host referenced above; mirrored in next.config.ts \`images.remotePatterns\`. */\nexport const HF_MEDIA_HOSTS = ${JSON.stringify([...hosts].sort(), null, 2)} as const;\n`;

vendor().then(() => {
  fs.writeFileSync(path.join(root, "lib", "higgsfield-home-constants.ts"), out);
  const counts = galleries.map((g) => `${g.id}:${g.items.length}`).join(" ");
  console.log("wrote lib/higgsfield-home-constants.ts", {
    submissions: submissions.length,
    genjutsu: genjutsu.length,
    projects: projects.length,
    vendored: toVendor.length,
    counts,
    hosts: [...hosts],
  });
});
