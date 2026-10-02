/**
 * Static content for the Higgsfield-style home page, captured from higgsfield.ai.
 * All media is referenced by URL so the page renders without any API calls.
 * Regenerate with `node .superpowers/gen-home-constants.cjs`.
 */

export type HfAspect = "9/16" | "2/3" | "3/4" | "1/1" | "4/3" | "3/2" | "16/9";

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

export const HF_ASSETS = {
  defaultAvatar: "https://static.higgsfield.ai/profile/avatar.png",
  filmFestivalLogo: "https://assets.higgsfield.ai/tanstack/assets/a5284bed-oCSd9ySZVrwe4vNI.svg",
  projectAuthorAvatar: "https://d2ol7oe51mr4n9.cloudfront.net/user_3GNcyaSCltezE7ot4WtRdn0jfo0/4203e91f-4612-411f-a567-36265f8ee8b9.png",
  higgsIcon: "https://static.higgsfield.ai/public/home/higgsfield-projects/higgs-icon.svg"
} as const;

export const HF_PROMO_BAR = {
  text: "Get an additional discount on premium plans after signing up",
  cta: "Get your discount"
} as const;

export const HF_NAV_LINKS: HfNavLink[] = [
  {
    label: "Explore"
  },
  {
    label: "Image"
  },
  {
    label: "Video"
  },
  {
    label: "Audio"
  },
  {
    label: "MCP"
  },
  {
    label: "API",
    badge: "New"
  },
  {
    label: "ChatGPT Plugin"
  },
  {
    label: "Genjutsu",
    badge: "Top"
  },
  {
    label: "Effects"
  },
  {
    label: "Cinema Studio"
  },
  {
    label: "Contests"
  },
  {
    label: "Ads Studio",
    badge: "New"
  },
  {
    label: "Marketing Studio"
  },
  {
    label: "Supercomputer"
  },
  {
    label: "3D Jutsu",
    badge: "New"
  },
  {
    label: "Edit"
  },
  {
    label: "Academy"
  },
  {
    label: "Community"
  },
  {
    label: "Plugins"
  },
  {
    label: "Canvas"
  },
  {
    label: "Originals"
  }
];

export const HF_HERO_CARDS: HfHeroCard[] = [
  {
    id: "genjutsu-restyle",
    title: "GENJUTSU RESTYLE",
    description: "Keep the motion, change the world: restyle any video in one click",
    video: "https://static-public-media.higgsfield.ai/cards/33cd35c5-e687-46cd-8fa5-2d097d4206dc.mp4"
  },
  {
    id: "chatgpt-extension",
    title: "HIGGSFIELD EXTENSION IN CHATGPT",
    description: "Your entire AI production studio, inside ChatGPT",
    video: "https://static-public-media.higgsfield.ai/cards/3e852ebd-c1ac-43f5-a590-df550d5f4a34.mp4"
  },
  {
    id: "production-skills",
    title: "PRODUCTION SKILLS BUNDLE",
    description: "3D, VFX, editing, and design. Run it all from ChatGPT or Claude",
    video: "https://static-public-media.higgsfield.ai/cards/30d10c8a-64f1-48ac-ab44-7656ba8b75a4.mp4"
  },
  {
    id: "gpt-astra-ads",
    title: "HIGGSFIELD X GPT-6 ASTRA FOR PAID ADS",
    description: "Market research to your next ad test - now on ChatGPT",
    image: "https://cdn.higgsfield.ai/card/5d82f80b-6607-447a-9a50-2250d1181fc3.webp",
    video: "https://cdn.higgsfield.ai/card/dce4e8cd-b0cf-4920-9826-11af59199d01.mp4"
  }
];

export const HF_SIGNUP_PROMO = {
  title: "SIGN UP AND GET YOUR",
  highlight: "EXTRA DISCOUNT",
  perks: [
    "Get unlimited Nano Banana Pro",
    "Unlock your extra discount",
    "Access to Seedance 2.5"
  ],
  cta: "Sign up and get your discount",
  image: "https://static.higgsfield.ai/public/promotions/seedance-2-5-sale-hero-poster.jpg",
  video: "https://static.higgsfield.ai/promotions/seedance_2_5_explore_image.mp4"
} as const;

export const HF_FEATURED_TOOLS: HfFeaturedTool[] = [
  {
    title: "Seedance 2.5",
    badge: "TOP",
    description: "The most advanced video model",
    category: "Video",
    icon: "https://static.higgsfield.ai/explore/image-generate-block/seedance-logo.png"
  },
  {
    title: "Nano Banana Pro",
    description: "Generate high-quality visuals",
    category: "Image"
  },
  {
    title: "Higgsfield Genjutsu",
    badge: "NEW",
    description: "One video, many versions"
  },
  {
    title: "Higgsfield MCP for Claude",
    description: "Generate images and videos in Claude"
  },
  {
    title: "Cinema Studio 4.0",
    description: "Create cinematic scenes effortlessly",
    icon: "https://static.higgsfield.ai/explore/image-generate-block/cinema-studio.png"
  },
  {
    title: "Supercomputer",
    description: "Agent powered by GPT-6 Astra",
    icon: "https://static.higgsfield.ai/explore/image-generate-block/supercomputer-card-icon.svg"
  }
];

export const HF_MCP_DOTS = {
  title: "USE CHATGPT DOTS WITH HIGGSFIELD MCP",
  description: "Plan and make a creative project step by step with Higgsfield Dots in ChatGPT",
  cta: "Connect Higgsfield",
  centerDot: "https://static.higgsfield.ai/mcp/dots/v2/dot-white.webp",
  cursor: "https://static.higgsfield.ai/mcp/dots/v2/cursor.svg",
  dots: [
    {
      label: "Character Creator",
      image: "https://static.higgsfield.ai/mcp/dots/v2/dot-character-creator.webp"
    },
    {
      label: "Cinematic Director",
      image: "https://static.higgsfield.ai/mcp/dots/v2/dot-cinematic-director.webp"
    },
    {
      label: "Content Lead",
      image: "https://static.higgsfield.ai/mcp/dots/v2/dot-content-lead.webp"
    },
    {
      label: "Motion Designer",
      image: "https://static.higgsfield.ai/mcp/dots/v2/dot-motion-designer.webp"
    }
  ]
} as const;

export const HF_FILM_FESTIVAL: {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  poster?: string;
  video?: string;
  submissions: HfSubmission[];
} = {
  eyebrow: "GLOBAL FILM FESTIVAL",
  title: "ALL SUBMISSIONS ARE LIVE",
  subtitle: "THE SHORTLIST IS NEXT",
  cta: "Explore all projects",
  poster: "",
  video: "https://static.higgsfield.ai/promotions/seedance_2_5_explore_image.mp4",
  submissions: [
    {
      image: "https://d2ol7oe51mr4n9.cloudfront.net/user_2vi8lJJuCtaqBPiyWMQuTmMCqcv/7d5a53be-5b3d-4676-ac51-53120bcb1117.png",
      author: "benhamin",
      avatar: "https://d2ol7oe51mr4n9.cloudfront.net/user_2vi8lJJuCtaqBPiyWMQuTmMCqcv/5ec8fed8-3a5b-4640-8969-d51f1461e513.png"
    },
    {
      image: "https://d2ol7oe51mr4n9.cloudfront.net/user_37ZTN7CzWJpsQXgBb20ZC5wizDo/3cec7531-ac4f-455a-b4dc-244b6929ae5e.png",
      author: "ollkorrect",
      avatar: "https://d2ol7oe51mr4n9.cloudfront.net/user_37ZTN7CzWJpsQXgBb20ZC5wizDo/a17f55ef-ff92-4623-80ed-82295f87ca42.png"
    },
    {
      image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3HHoco5yVBrnJykveIPIqe1y4AP/35a6acb4-2e2e-46a6-bd4f-db622b57a38f.png",
      author: "shotbyhzee",
      avatar: "https://d2ol7oe51mr4n9.cloudfront.net/user_3HHoco5yVBrnJykveIPIqe1y4AP/37feead2-77ff-40b7-9899-4563748b907c.jpg"
    },
    {
      image: "https://d2ol7oe51mr4n9.cloudfront.net/user_2vOlZqHm9l70zjwiloUuTFoQts9/3a83321e-bfcf-46bd-8519-7c9ed8a52584.png",
      author: "aist",
      avatar: "https://d2ol7oe51mr4n9.cloudfront.net/user_2vOlZqHm9l70zjwiloUuTFoQts9/48175b82-f5e6-423a-b38e-157829b7d79b.png"
    },
    {
      image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3HaaTL5Ipv9mbnmREY8KioT6TWH/cca9fc2f-65a2-46bb-ae99-c0c9ec9b0dbd.png",
      author: "lejardinier",
      avatar: "https://d2ol7oe51mr4n9.cloudfront.net/user_3HaaTL5Ipv9mbnmREY8KioT6TWH/e914a019-2026-423d-b24d-7e02df444ac2.png"
    },
    {
      image: "https://d2ol7oe51mr4n9.cloudfront.net/user_2vazcpIaHtTR6Zky17mP5qaAvdj/0ac256c9-f4da-4932-a6cb-4d876fd284fe.png",
      author: "seeyousoonx",
      avatar: "https://d2ol7oe51mr4n9.cloudfront.net/user_2vazcpIaHtTR6Zky17mP5qaAvdj/98ec87d0-7a26-4cae-9f2c-50d6967c3837.png"
    },
    {
      image: "https://d2ol7oe51mr4n9.cloudfront.net/user_2yvPAQhHPa3gTPOEPmB8Z2tWlet/30269fa0-1530-4536-bb28-148283cf7597.webp",
      author: "jamil_safari",
      avatar: "https://d2ol7oe51mr4n9.cloudfront.net/user_2yvPAQhHPa3gTPOEPmB8Z2tWlet/f17d4ea6-1eb6-4909-966c-8df53deb227b.png"
    },
    {
      image: "https://d8j0ntlcm91z4.cloudfront.net/user_3BJS1I4NBcMrJCQ85pGl7IK3vWK/hf_20260828_175909_330764cc-eb0b-4028-bbca-e45ce5037641_min.webp",
      author: "jacob_everett",
      avatar: "https://d2ol7oe51mr4n9.cloudfront.net/user_3BJS1I4NBcMrJCQ85pGl7IK3vWK/b1a4a906-d62d-4b51-980a-44316c488f04.jpg"
    },
    {
      image: "https://d8j0ntlcm91z4.cloudfront.net/user_3Gl5kZJgyusrPdzLtfZxpLcmYJi/hf_20260912_070349_86188b9f-57f5-4ff6-9a2c-43d841d77243_min.webp",
      author: "outrealproduction",
      avatar: "https://d2ol7oe51mr4n9.cloudfront.net/user_3E08pHgd1TNnvrI8UBTKC59qYli/6097907a-dfc7-4c84-89bc-439eef76bb33.jpg"
    },
    {
      image: "https://d8j0ntlcm91z4.cloudfront.net/user_391c1veqSIPf2fiveRaYaLV2GxI/hf_20260822_173418_19f73675-b69e-4314-b3a1-f74802df1da2_min.webp",
      author: "seifhussam",
      avatar: "https://d2ol7oe51mr4n9.cloudfront.net/user_391c1veqSIPf2fiveRaYaLV2GxI/aa20ff89-757e-4e1e-bc34-3b9e7fe44c90.jpg"
    },
    {
      image: "https://d2ol7oe51mr4n9.cloudfront.net/user_2z48uxE2O5vQ9OjsGuyDZmbQkp5/6e676a9e-c2a3-4fdf-9c97-23f82c35b8c6.jpg",
      author: "hebertfreiree",
      avatar: "https://d2ol7oe51mr4n9.cloudfront.net/user_2z48uxE2O5vQ9OjsGuyDZmbQkp5/b49f6175-9006-4fb4-b51c-2df44ff7a9d6.jpg"
    },
    {
      image: "https://d2ol7oe51mr4n9.cloudfront.net/user_31T0v3IDGaklW7jp6QCqmGJecjF/6aa41d9e-d857-415e-9fbd-5e4c7445337e.png",
      author: "stadolnikstudio",
      avatar: "https://d2ol7oe51mr4n9.cloudfront.net/user_31T0v3IDGaklW7jp6QCqmGJecjF/37d75df7-3669-4e15-bda5-8bf7d6c6b78e.png"
    }
  ]
};

export const HF_VISUAL_EFFECTS: {
  title: string;
  description: string;
  cta: string;
  itemCta: string;
  viewAll: string;
  items: HfEffect[];
} = {
  title: "VISUAL EFFECTS",
  description: "Big-budget visual effects, from explosions to surreal transformations.",
  cta: "Try for free",
  itemCta: "Recreate",
  viewAll: "View all presets",
  items: [
    {
      name: "INCLINE",
      slug: "incline",
      image: "https://cdn.higgsfield.ai/viral_hub/30142c8a-46ee-4930-aca3-6fa5321dd84a.webp",
      video: "https://cdn.higgsfield.ai/viral_hub/bade6252-7039-42eb-a50c-45c142c7f70f.mp4",
      aspect: "3/4"
    },
    {
      name: "ACT NATURAL",
      slug: "act-natural",
      image: "https://cdn.higgsfield.ai/viral_hub/17cc1333-9822-442c-adaa-d208c59e3e01.webp",
      video: "https://cdn.higgsfield.ai/viral_hub/7a261cff-8d6c-4bab-84e7-515364061f3e.mp4",
      aspect: "9/16"
    },
    {
      name: "LACEWALKER",
      slug: "lacewalker",
      image: "https://cdn.higgsfield.ai/viral_hub/ef3dfc4c-a4c2-44a0-af27-d005bd1c319d.webp",
      video: "https://cdn.higgsfield.ai/viral_hub/d806368c-0d8a-4a7b-b43a-8ff22fa64563.mp4",
      aspect: "16/9"
    },
    {
      name: "BURNING MAN",
      slug: "burning-man",
      image: "https://cdn.higgsfield.ai/viral_hub/a1560137-597c-455a-be9e-9622cccf76a3.webp",
      aspect: "3/4"
    },
    {
      name: "MELTING",
      slug: "melting",
      image: "https://cdn.higgsfield.ai/viral_hub/6ecca888-1780-46ae-a86d-a05b69b2fe34.webp",
      aspect: "1/1"
    },
    {
      name: "WORLD MORPHING",
      slug: "world-morphing",
      image: "https://cdn.higgsfield.ai/viral_hub/0abb112e-068d-45e4-acea-9c8c44a16781.webp",
      video: "https://cdn.higgsfield.ai/viral_hub/950efc04-6ae6-4b31-bfa5-83c87244014c.mp4",
      aspect: "9/16"
    },
    {
      name: "HIGH FLIP",
      slug: "high-flip",
      image: "https://cdn.higgsfield.ai/viral_hub/95cd0d73-4f3c-40d1-ac0b-c8668a99440b.webp",
      video: "https://cdn.higgsfield.ai/viral_hub/001156a7-cfdb-4e16-8f13-68c246ddc06c.mp4",
      aspect: "9/16"
    },
    {
      name: "STREET COLOSSUS",
      slug: "street-colossus",
      image: "https://cdn.higgsfield.ai/viral_hub/5e67ff0a-60f7-4c0a-8ace-18c9bf3e5426.webp",
      video: "https://cdn.higgsfield.ai/viral_hub/e0278141-12c9-4139-91eb-b4294d833ed9.mp4",
      aspect: "9/16"
    },
    {
      name: "SELFCEPTION",
      slug: "selfception",
      image: "https://cdn.higgsfield.ai/viral_hub/495d9e85-0417-47d9-9e0a-722ace805852.webp",
      video: "https://cdn.higgsfield.ai/viral_hub/6ef62a07-2609-4693-8225-e6263b76afab.mp4",
      aspect: "3/4"
    },
    {
      name: "CUTOUT",
      slug: "cutout",
      image: "https://cdn.higgsfield.ai/viral_hub/b5c90864-c3c5-4b14-87a0-3739250fd00b.webp",
      video: "https://cdn.higgsfield.ai/viral_hub/a64711ac-93b8-46ee-a9ce-37ee5c18e148.mp4",
      aspect: "4/3"
    },
    {
      name: "FLOATING FALL",
      slug: "floating-fall",
      image: "https://cdn.higgsfield.ai/viral_hub/151664fa-7f7f-43d6-80fa-4683104a3c02.webp",
      video: "https://cdn.higgsfield.ai/viral_hub/d877f71c-d2f3-44df-9317-f3ce6889bcb6.mp4",
      aspect: "9/16"
    },
    {
      name: "EYES IN",
      slug: "eyes-in",
      image: "https://cdn.higgsfield.ai/viral_hub/5354ce11-c68c-45a0-8a97-5aab94f52833.webp",
      video: "https://cdn.higgsfield.ai/viral_hub/dba03734-6e8a-4337-acb4-17ce943563d8.mp4",
      aspect: "9/16"
    },
    {
      name: "WILD RIDE",
      slug: "wild-ride",
      image: "https://cdn.higgsfield.ai/viral_hub/99aa3365-5ae0-4616-9722-ce0dc087607d.webp",
      video: "https://cdn.higgsfield.ai/viral_hub/8cd9e3fc-8e4f-4071-abff-8934f3381507.mp4",
      aspect: "9/16"
    },
    {
      name: "SMASH AND GRAB",
      slug: "smash-and-grab",
      image: "https://cdn.higgsfield.ai/viral_hub/4a2315f6-57e1-4378-82a5-598ddbbfbbcb.webp",
      video: "https://cdn.higgsfield.ai/viral_hub/c32886ee-2d15-4697-a366-041a9deaffe2.mp4",
      aspect: "9/16"
    },
    {
      name: "STUDIO SLIDE",
      slug: "studio-slide",
      image: "https://cdn.higgsfield.ai/viral_hub/05201733-c72f-43ed-8393-8b8cea28b8ce.webp",
      video: "https://cdn.higgsfield.ai/viral_hub/c129fb83-2014-4a37-a3f8-6c7dfeab0254.mp4",
      aspect: "4/3"
    }
  ]
};

export const HF_GENJUTSU: {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  viewAll: string;
  items: Omit<HfMasonryItem, "alt" | "author" | "video">[];
} = {
  eyebrow: "New model",
  title: "HIGGSFIELD GENJUTSU",
  description: "Reality Manipulation — transfer motion into new scenes, or swap details while everything else stays as filmed.",
  primaryCta: "Start generating",
  secondaryCta: "Learn more",
  viewAll: "View all presets",
  items: [
    {
      image: "https://cdn.higgsfield.ai/higgsfield_multiplier_video_explore_variant/54b6f52b-08b2-5acf-9557-2e599560acd8.webp",
      aspect: "16/9",
      column: 0
    },
    {
      image: "https://cdn.higgsfield.ai/higgsfield_multiplier_video_explore_variant/067a9f92-94b2-5e63-accf-2c57fe1a0cdf.webp",
      aspect: "9/16",
      column: 0
    },
    {
      image: "https://cdn.higgsfield.ai/higgsfield_multiplier_video_explore_variant/80918ab3-d0cf-5c86-af99-29d53184edf0.webp",
      aspect: "9/16",
      column: 0
    },
    {
      image: "https://cdn.higgsfield.ai/higgsfield_multiplier_video_explore_variant/4a716a67-a71a-4496-9df6-d6d337b996d1.webp",
      aspect: "16/9",
      column: 0
    },
    {
      image: "https://cdn.higgsfield.ai/higgsfield_multiplier_video_explore_variant/c045b52b-ab93-5d96-8e2b-72115697cb50.webp",
      aspect: "16/9",
      column: 1
    },
    {
      image: "https://cdn.higgsfield.ai/higgsfield_multiplier_video_explore_variant/f0ad452c-2254-54cb-932e-d85d0b06dca7.webp",
      aspect: "16/9",
      column: 1
    },
    {
      image: "https://cdn.higgsfield.ai/higgsfield_multiplier_video_explore_variant/24daa737-06d4-530d-b2ff-18f0eeb2c289.webp",
      aspect: "3/2",
      column: 1
    },
    {
      image: "https://cdn.higgsfield.ai/higgsfield_multiplier_video_explore_variant/167113f5-32ca-5c5f-ae3f-7f8e7599e964.webp",
      aspect: "16/9",
      column: 1
    },
    {
      image: "https://cdn.higgsfield.ai/higgsfield_multiplier_video_explore_variant/06aaeffd-33c0-5add-a61c-eacf299154fa.webp",
      aspect: "16/9",
      column: 1
    },
    {
      image: "https://cdn.higgsfield.ai/higgsfield_multiplier_video_explore_variant/56475b81-bfc4-5cf1-ace4-902c5c0797e3.webp",
      aspect: "9/16",
      column: 1
    },
    {
      image: "https://cdn.higgsfield.ai/higgsfield_multiplier_video_explore_variant/9650072f-7ed8-5c91-bc2f-edc3a30ba02e.webp",
      aspect: "9/16",
      column: 2
    },
    {
      image: "https://cdn.higgsfield.ai/higgsfield_multiplier_video_explore_variant/08edcef0-2205-5490-a4e3-014f32e77587.webp",
      aspect: "3/2",
      column: 2
    },
    {
      image: "https://cdn.higgsfield.ai/higgsfield_multiplier_video_explore_variant/a3177c9f-c068-54bb-96b2-abc85054ef9b.webp",
      aspect: "3/2",
      column: 2
    },
    {
      image: "https://cdn.higgsfield.ai/higgsfield_multiplier_video_explore_variant/03252833-d6bb-5a61-95df-a199d9fe2a5d.webp",
      aspect: "9/16",
      column: 2
    },
    {
      image: "https://cdn.higgsfield.ai/higgsfield_multiplier_video_explore_variant/e1db4f4b-3101-5151-91bf-a06be7a8a316.webp",
      aspect: "9/16",
      column: 3
    },
    {
      image: "https://cdn.higgsfield.ai/higgsfield_multiplier_video_explore_variant/f32779dd-b4be-5f1d-ac1f-71f59b92d476.webp",
      aspect: "9/16",
      column: 3
    },
    {
      image: "https://cdn.higgsfield.ai/genjutsu/video-explore/01/edit/c2394654-9775-4512-af95-d60250cfaabf.webp",
      aspect: "16/9",
      column: 3
    },
    {
      image: "https://cdn.higgsfield.ai/higgsfield_multiplier_video_explore_variant/1bc47dfd-2af0-509b-bd76-3896ec07bf3d.webp",
      aspect: "16/9",
      column: 4
    },
    {
      image: "https://cdn.higgsfield.ai/higgsfield_multiplier_video_explore_variant/d34e684b-0ed7-50fa-befb-d550e7a43881.webp",
      aspect: "9/16",
      column: 4
    },
    {
      image: "https://cdn.higgsfield.ai/higgsfield_multiplier_video_explore_variant/33ab59ac-cee3-57eb-95ce-5e754de9f021.webp",
      aspect: "9/16",
      column: 4
    }
  ]
};

export const HF_PROJECTS: {
  title: string;
  description: string;
  cta: string;
  items: HfProject[];
} = {
  title: "EXPLORE THE INSIDE OF EVERY PROJECT",
  description: "See all prompts, assets, and how each project was created",
  cta: "Explore community",
  items: [
    {
      title: "If you stop loving me, I'll die — I don't like dying, but for our love I'm ready to go that far",
      author: "Higgsfield Studio",
      image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3GNcyaSCltezE7ot4WtRdn0jfo0/821f8180-f5de-4a1b-b827-57b34a7cbc4d.jpg",
      slug: "if-you-stop-loving-me-ill-die"
    },
    {
      title: "Cully Hill Boys",
      author: "Higgsfield Studio",
      image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3GNcyaSCltezE7ot4WtRdn0jfo0/75d860f8-6dde-45d6-ae81-756ddbfe563e.jpg",
      slug: "cully-hill-boys"
    },
    {
      title: "Red Flag",
      author: "Higgsfield Studio",
      image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3GNcyaSCltezE7ot4WtRdn0jfo0/f6bf4ce5-2a41-45cb-a099-12bdc1e117c1.jpg",
      slug: "red-flag"
    },
    {
      title: "Kok Boru",
      author: "Higgsfield Studio",
      image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3GNcyaSCltezE7ot4WtRdn0jfo0/f3ca6ccc-a45c-4111-a66e-ecb2e5d38dba.jpg",
      slug: "kok-boru-film"
    },
    {
      title: "Adiliada",
      author: "Higgsfield Studio",
      image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3GNcyaSCltezE7ot4WtRdn0jfo0/07c550cd-d621-46a1-8cb1-420986027ac9.jpg",
      slug: "adiliada"
    },
    {
      title: "ONEIRIC",
      author: "Higgsfield Studio",
      image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3GNcyaSCltezE7ot4WtRdn0jfo0/6984c17e-8f23-4a86-896c-ff0d3be920ca.jpg",
      slug: "oneiric"
    },
    {
      title: "ZEPHYR: Special",
      author: "Higgsfield Studio",
      image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3GNcyaSCltezE7ot4WtRdn0jfo0/9655238c-398d-4403-bc7d-68e3b43238cf.jpg",
      slug: "zephyr-special"
    },
    {
      title: "HELL GRIND",
      author: "Higgsfield Studio",
      image: "https://d2ol7oe51mr4n9.cloudfront.net/user_2v5txepAmNYZwyzml1nIizlWURE/df7107b3-1dd6-438a-a168-ed382e2ad901.png",
      slug: "hell-grind"
    }
  ]
};

export const HF_SUPERCOMPUTER_BANNER = {
  title: "SUPERCOMPUTER",
  description: "One superagent for your entire creative stack",
  cta: "Try Supercomputer",
  images: {
    background: "https://static.higgsfield.ai/spc-banner/bg-spc-banner.png",
    creative: "https://static.higgsfield.ai/spc-banner/spc-banner-creative.png",
    visualizing: "https://static.higgsfield.ai/spc-banner/spc-banner-visualizing.png",
    marketing: "https://static.higgsfield.ai/spc-banner/spc-banner-marketing.png",
    production: "https://static.higgsfield.ai/spc-banner/spc-banner-production.png",
    logo: "https://static.higgsfield.ai/spc-banner/spc-banner-logo.png"
  }
} as const;

export const HF_CANVAS_BANNER = {
  eyebrow: "NEW FEATURE",
  title: "ONE CANVAS. EVERY WORKFLOW.",
  description: "Moodboard, chain workflows, and share with your team - all on one canvas",
  cta: "Try Canvas",
  imageDesktop: "https://static.higgsfield.ai/canvas-banner-desktop-new.webp",
  imageMobile: "https://static.higgsfield.ai/canvas-banner-mobile.webp"
} as const;

export const HF_PHOTODUMP_BANNER = {
  eyebrow: "PHOTODUMP",
  title: "DIFFERENT SCENES SAME STAR",
  description: "Build your character. One click does the rest",
  cta: "Try Photodump",
  imageDesktop: "https://static.higgsfield.ai/public/photodump/cta-desktop.png",
  imageMobile: "https://static.higgsfield.ai/public/photodump/cta-mobile.png"
} as const;

export const HF_GALLERIES: HfGallery[] = [
  {
    id: "seedance-2-5",
    title: "SEEDANCE 2.5",
    description: "The most advanced AI video model",
    ctaLabel: "View all of Seedance 2.5",
    items: [
      {
        image: "https://cdn.higgsfield.ai/user_3DgH8zZ7H7xieJnKMyo5N4NA9ge/hf_20260828_133607_f265c973-82fe-4f27-83a9-42d913a2289c_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3DgH8zZ7H7xieJnKMyo5N4NA9ge/hf_20260828_133607_f265c973-82fe-4f27-83a9-42d913a2289c.mp4",
        aspect: "9/16",
        column: 0
      },
      {
        image: "https://cdn.higgsfield.ai/user_3HrUZEqvogBOowmw1C0BIb3oNDN/hf_20260814_040632_12ff4cdd-bba8-4a6d-bff5-312d4a2cbb23_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3HrUZEqvogBOowmw1C0BIb3oNDN/hf_20260814_040632_12ff4cdd-bba8-4a6d-bff5-312d4a2cbb23_wm3.mp4",
        aspect: "16/9",
        column: 0
      },
      {
        image: "https://cdn.higgsfield.ai/user_3Btsg1RieQOoYK6o6x65C3UYqNH/hf_20260814_024423_23e78b00-c455-420b-b72f-fc8e9b14244c_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3Btsg1RieQOoYK6o6x65C3UYqNH/hf_20260814_024423_23e78b00-c455-420b-b72f-fc8e9b14244c_wm3.mp4",
        aspect: "16/9",
        column: 0
      },
      {
        image: "https://cdn.higgsfield.ai/user_3Bu4J9LdRqhDHpwVUmDuiPIuIy0/hf_20260807_115856_816bc5fd-ea64-42ed-9c0c-d70e666a148f_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3FRnqOjr7P4vUmrsWyEzZbKAqVU/77406d67-d5db-4b1d-81e2-9e0139b39249_hs_wm.mp4",
        aspect: "16/9",
        column: 0
      },
      {
        image: "https://cdn.higgsfield.ai/user_3DgH8zZ7H7xieJnKMyo5N4NA9ge/hf_20260828_132351_79618fbd-cc98-4ee0-ae44-cb79da5349f3_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3DgH8zZ7H7xieJnKMyo5N4NA9ge/hf_20260828_132351_79618fbd-cc98-4ee0-ae44-cb79da5349f3.mp4",
        aspect: "4/3",
        column: 1
      },
      {
        image: "https://cdn.higgsfield.ai/user_3HrUZEqvogBOowmw1C0BIb3oNDN/hf_20260814_040418_e674bc76-e8c5-4099-bd5c-f871a9345cda_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3HrUZEqvogBOowmw1C0BIb3oNDN/hf_20260814_040418_e674bc76-e8c5-4099-bd5c-f871a9345cda_wm3.mp4",
        aspect: "16/9",
        column: 1
      },
      {
        image: "https://cdn.higgsfield.ai/user_3Btsg1RieQOoYK6o6x65C3UYqNH/hf_20260814_013039_5cf05b01-4cea-4c9e-8af5-1b9122611c9b_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3Btsg1RieQOoYK6o6x65C3UYqNH/hf_20260814_013039_5cf05b01-4cea-4c9e-8af5-1b9122611c9b_wm3.mp4",
        aspect: "16/9",
        column: 1
      },
      {
        image: "https://cdn.higgsfield.ai/user_3Bu4J9LdRqhDHpwVUmDuiPIuIy0/hf_20260807_101838_4b30080f-2172-46dd-add5-b813276d04f9_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_2urnL94WJ71YKcCUCm8E5tfhGy9/437a80c2-3e11-4650-8777-c06e7ca567c5_hs_wm.mp4",
        aspect: "16/9",
        column: 1
      },
      {
        image: "https://cdn.higgsfield.ai/user_3HrUZEqvogBOowmw1C0BIb3oNDN/hf_20260814_041544_b5f84d9d-a9db-472c-9ece-fed23857b096_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3HrUZEqvogBOowmw1C0BIb3oNDN/hf_20260814_041544_b5f84d9d-a9db-472c-9ece-fed23857b096_wm3.mp4",
        aspect: "16/9",
        column: 2
      },
      {
        image: "https://cdn.higgsfield.ai/user_3HrUZEqvogBOowmw1C0BIb3oNDN/hf_20260814_035550_51b6328c-1648-411a-917a-1d8cecbd166c_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3HrUZEqvogBOowmw1C0BIb3oNDN/hf_20260814_035550_51b6328c-1648-411a-917a-1d8cecbd166c_wm3.mp4",
        aspect: "16/9",
        column: 2
      },
      {
        image: "https://cdn.higgsfield.ai/user_3HrUZEqvogBOowmw1C0BIb3oNDN/hf_20260814_002238_83054aec-92b9-4efe-b015-6c33e4bd7ba3_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3HrUZEqvogBOowmw1C0BIb3oNDN/hf_20260814_002238_83054aec-92b9-4efe-b015-6c33e4bd7ba3_wm3.mp4",
        aspect: "16/9",
        column: 2
      },
      {
        image: "https://cdn.higgsfield.ai/user_3Bu4J9LdRqhDHpwVUmDuiPIuIy0/hf_20260807_100920_bc5eed39-89b5-449c-925f-933727ac4c07_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3CN3NlActPxxUfaXfH903u7EnPq/468db48f-512d-4ca0-b475-8011acc1e8eb_hs_wm.mp4",
        aspect: "16/9",
        column: 2
      },
      {
        image: "https://cdn.higgsfield.ai/user_3HrUZEqvogBOowmw1C0BIb3oNDN/hf_20260814_041459_e02ab22b-6d8e-46bd-874e-8090a8f00799_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3HrUZEqvogBOowmw1C0BIb3oNDN/hf_20260814_041459_e02ab22b-6d8e-46bd-874e-8090a8f00799_wm3.mp4",
        aspect: "16/9",
        column: 3
      },
      {
        image: "https://cdn.higgsfield.ai/user_3HrUZEqvogBOowmw1C0BIb3oNDN/hf_20260814_034505_9389c8eb-ce22-45df-8755-addfb794552f_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3HrUZEqvogBOowmw1C0BIb3oNDN/hf_20260814_034505_9389c8eb-ce22-45df-8755-addfb794552f_wm3.mp4",
        aspect: "16/9",
        column: 3
      },
      {
        image: "https://cdn.higgsfield.ai/user_3Btsg1RieQOoYK6o6x65C3UYqNH/hf_20260813_235221_7969f2f0-4868-4639-b8f2-85ca915bdd6e_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3Btsg1RieQOoYK6o6x65C3UYqNH/hf_20260813_235221_7969f2f0-4868-4639-b8f2-85ca915bdd6e_wm3.mp4",
        aspect: "16/9",
        column: 3
      },
      {
        image: "https://cdn.higgsfield.ai/user_3H8EAjd4lvlOfCDCxt4J3ZVPr1c/hf_20260807_105454_a60ef591-46a4-49a2-b01a-607dad928ede_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_2urRVI1bCfxGUsP28tBUphocCbh/507bc86d-a335-48fb-8732-06695a749350_hs_wm.mp4",
        aspect: "16/9",
        column: 3
      }
    ]
  },
  {
    id: "gpt-image-2",
    title: "GPT IMAGE 2",
    description: "4K images with near-perfect text rendering.",
    ctaLabel: "View all of GPT Image 2",
    items: [
      {
        image: "/higgsfield/home/hf_20260422_215626_8f188629-c5bb-441a-a0fe-a0be4d976fc6.webp",
        aspect: "9/16",
        alt: "Vertical mobile-first landing page for a fictional streetwear brand called \"LOUD KIDS CLUB\" (placeholder)....",
        author: "cezanne_cupcake_haze12",
        column: 0
      },
      {
        image: "/higgsfield/home/hf_20260422_202551_baf580a8-979d-486e-b0a0-b0b09ee83d6d.webp",
        aspect: "3/4",
        alt: "Vertical editorial poster in the style of a premium design magazine spread. Clean paper-textured background...",
        author: "piffle_jack",
        column: 0
      },
      {
        image: "/higgsfield/home/hf_20260422_144420_5f74e1a3-ff9e-4f59-b8f8-799982bdd36b.webp",
        aspect: "9/16",
        alt: "Contemporary commercial lifestyle photograph, luxury snow-sports campaign aesthetic, Moncler × Prada Linea...",
        author: "adapting_potato_keen39",
        column: 0
      },
      {
        image: "/higgsfield/home/hf_20260422_211323_4cc2cdec-06a1-4d10-93b9-a63a44ae5d93.webp",
        aspect: "16/9",
        alt: "Here's the updated prompt — same surreal coastal Mediterranean composition and dreamy mood, now featuring a...",
        author: "modular_pufferfish_swift82",
        column: 1
      },
      {
        image: "/higgsfield/home/hf_20260422_212125_23fa9b40-6c58-4bb9-a831-ca4cf02c861c.webp",
        aspect: "16/9",
        alt: "Horizontal desktop landing page hero section for a fictional playful homeware store called \"kiln & co.\" (pl...",
        author: "impressionist_cookie_haze96",
        column: 1
      },
      {
        image: "/higgsfield/home/hf_20260422_215112_09f9313d-4c93-40d5-8d5b-e6a502fa93c1.webp",
        aspect: "16/9",
        alt: "Horizontal desktop landing page hero section for a fictional snowboard eyewear and mountain gear store call...",
        author: "surreal_pencil_sage24",
        column: 1
      },
      {
        image: "/higgsfield/home/hf_20260422_201904_0d9cf28b-bbb3-452f-9ef9-6caf994c02f7.webp",
        aspect: "3/4",
        alt: "A vertical exhibition invitation poster in the aesthetic of 1970s–80s punk silkscreen print design. Gritty,...",
        author: "prompt_beetlez",
        column: 2
      },
      {
        image: "/higgsfield/home/hf_20260422_212327_3e910da2-86aa-4fac-adbe-4215fe2110a5.webp",
        aspect: "3/4",
        alt: "Vertical advertising poster with a surreal playful concept, photorealistic rendering. The entire compositio...",
        author: "wer",
        column: 2
      },
      {
        image: "/higgsfield/home/hf_20260422_134519_6fed7b56-35c6-4f75-a58a-7ba86674d801.webp",
        aspect: "3/4",
        alt: "Cinematic urban photograph, contemporary Tokyo street photography aesthetic, hyperreal 3D billboard phenome...",
        author: "gaziziz",
        column: 2
      },
      {
        image: "/higgsfield/home/hf_20260422_200634_8bb59f51-35d3-4639-b5a9-673f64940854.webp",
        aspect: "16/9",
        alt: "Vertical 90s manga-style poster with a clean pure white paper background and subtle grain. Massive arched b...",
        author: "folk_rainbow_wise28",
        column: 3
      },
      {
        image: "/higgsfield/home/hf_20260422_213610_8f9804a3-5fce-48c0-94e0-5147ab7cf3fd.webp",
        aspect: "16/9",
        alt: "Horizontal desktop landing page for a fictional virtual outfit try-on service called \"DRESSR\" (placeholder)...",
        author: "steampunk_donut_jade65",
        column: 3
      },
      {
        image: "/higgsfield/home/hf_20260421_144013_38e67ed5-cd38-4509-9855-9c4cc9b32fe6.webp",
        aspect: "3/2",
        alt: "Bold graphic illustration poster design, Japanese street art meets vintage propaganda aesthetic, centered p...",
        author: "singing_pencillin",
        column: 3
      }
    ]
  },
  {
    id: "marketing-studio",
    title: "MARKETING STUDIO",
    description: "See what creators and brands are making with Marketing Studio.",
    ctaLabel: "View all of Marketing Studio",
    items: [
      {
        image: "https://cdn.higgsfield.ai/user_3Bu8kApHUBmQcoBNUYoyCcOGJne/hf_20260414_170749_3474b08b-9dc4-49e6-b6e2-4af862eff61d_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3Bu8kApHUBmQcoBNUYoyCcOGJne/hf_20260414_170749_3474b08b-9dc4-49e6-b6e2-4af862eff61d.mp4",
        aspect: "16/9",
        author: "byzantinetiger1459",
        column: 0
      },
      {
        image: "https://cdn.higgsfield.ai/user_3CIezRC2bfkh5fn1Cl8MjaHdSlp/hf_20260415_012608_2c21b2ad-368a-4199-bde3-e2c648d78186_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3CIezRC2bfkh5fn1Cl8MjaHdSlp/hf_20260415_012608_2c21b2ad-368a-4199-bde3-e2c648d78186.mp4",
        aspect: "9/16",
        author: "byzantinetiger1459",
        column: 0
      },
      {
        image: "https://cdn.higgsfield.ai/user_3Bu8kApHUBmQcoBNUYoyCcOGJne/hf_20260414_232148_e856f696-c60e-4c40-921e-3fc3ac60224f_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3Bu8kApHUBmQcoBNUYoyCcOGJne/hf_20260414_232148_e856f696-c60e-4c40-921e-3fc3ac60224f.mp4",
        aspect: "16/9",
        author: "byzantinetiger1459",
        column: 0
      },
      {
        image: "https://cdn.higgsfield.ai/user_3CIjqzTsrKEUr8OzFBaYO4ux3nG/hf_20260413_121933_7dfa9582-a536-4a83-9041-ee5aa102ff8c_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3CIjqzTsrKEUr8OzFBaYO4ux3nG/hf_20260413_121933_7dfa9582-a536-4a83-9041-ee5aa102ff8c.mp4",
        aspect: "3/4",
        author: "byzantinetiger1459",
        column: 1
      },
      {
        image: "https://cdn.higgsfield.ai/user_3Cfdr00kbZ1hJCLpPQkaicInqxv/hf_20260421_221116_5e4782a0-5148-4832-9362-d17ba238b58b_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3Cfdr00kbZ1hJCLpPQkaicInqxv/hf_20260421_221116_5e4782a0-5148-4832-9362-d17ba238b58b.mp4",
        aspect: "9/16",
        author: "chapman",
        column: 1
      },
      {
        image: "https://cdn.higgsfield.ai/user_34hPp7fXOu4gkTrKKk2ESqFSfG1/hf_20260413_124545_9ae0acdc-4d0e-4c03-a065-b572bf9c66cf_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_34hPp7fXOu4gkTrKKk2ESqFSfG1/hf_20260413_124545_9ae0acdc-4d0e-4c03-a065-b572bf9c66cf.mp4",
        aspect: "3/4",
        author: "byzantinetiger1459",
        column: 1
      },
      {
        image: "https://cdn.higgsfield.ai/user_3BuPFKmNsBjkEgZ5LeOvNlL8ShO/hf_20260415_014636_4873f538-b114-48c3-b604-05e32945d184_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3BuPFKmNsBjkEgZ5LeOvNlL8ShO/hf_20260415_014636_4873f538-b114-48c3-b604-05e32945d184.mp4",
        aspect: "9/16",
        author: "byzantinetiger1459",
        column: 2
      },
      {
        image: "https://cdn.higgsfield.ai/user_3Cfdr00kbZ1hJCLpPQkaicInqxv/hf_20260422_011129_528f4835-f2b2-4b35-90a0-e4471af95636_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3Cfdr00kbZ1hJCLpPQkaicInqxv/hf_20260422_011129_528f4835-f2b2-4b35-90a0-e4471af95636.mp4",
        aspect: "4/3",
        author: "chapman",
        column: 2
      },
      {
        image: "https://cdn.higgsfield.ai/user_3B9ysSkvPFs8NnELOqJwjcodGpA/hf_20260410_200105_6b9142b4-9ac9-4c42-9206-84b70c939e52_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3B9ysSkvPFs8NnELOqJwjcodGpA/hf_20260410_200105_6b9142b4-9ac9-4c42-9206-84b70c939e52.mp4",
        aspect: "3/4",
        author: "byzantinetiger1459",
        column: 2
      },
      {
        image: "https://cdn.higgsfield.ai/user_39acLUpaKDzX3Ox7Ekzzl7vlQ67/hf_20260413_132040_3db6758b-7eef-4046-87e1-ec81097c126e_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_39acLUpaKDzX3Ox7Ekzzl7vlQ67/hf_20260413_132040_3db6758b-7eef-4046-87e1-ec81097c126e.mp4",
        aspect: "3/4",
        author: "byzantinetiger1459",
        column: 3
      },
      {
        image: "https://cdn.higgsfield.ai/user_3BtuMjeO56IlCCzTiD419c4NiyM/hf_20260415_011357_9dd4f822-d35c-4a43-9102-61ad0bb14331_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_3BtuMjeO56IlCCzTiD419c4NiyM/hf_20260415_011357_9dd4f822-d35c-4a43-9102-61ad0bb14331.mp4",
        aspect: "3/4",
        author: "byzantinetiger1459",
        column: 3
      },
      {
        image: "https://cdn.higgsfield.ai/user_34hPp7fXOu4gkTrKKk2ESqFSfG1/hf_20260410_231619_0c2814a2-9a87-48f8-a18f-811265d90dca_thumbnail.webp",
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_34hPp7fXOu4gkTrKKk2ESqFSfG1/hf_20260410_231619_0c2814a2-9a87-48f8-a18f-811265d90dca.mp4",
        aspect: "3/4",
        author: "byzantinetiger1459",
        column: 3
      }
    ]
  },
  {
    id: "seedance-2-0",
    title: "SEEDANCE 2.0",
    description: "Browse premium AI video generations from the Higgsfield community.",
    ctaLabel: "View all of Seedance 2.0",
    items: [
      {
        image: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094513_629920b7-4009-46de-b3b6-b80cc2185275_thumbnail_min.webp",
        video: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094513_629920b7-4009-46de-b3b6-b80cc2185275_min.mp4",
        aspect: "16/9",
        author: "modular_pufferfish_swift82",
        column: 0
      },
      {
        image: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094615_1849e0bf-3c53-4790-80d7-d83d03968910_thumbnail_min.webp",
        video: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094615_1849e0bf-3c53-4790-80d7-d83d03968910_min.mp4",
        aspect: "16/9",
        author: "romantic_grappe",
        column: 0
      },
      {
        image: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094557_c0e3952b-1ecf-4621-9b06-eb86a7fe29e8_thumbnail_min.webp",
        video: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094557_c0e3952b-1ecf-4621-9b06-eb86a7fe29e8_min.mp4",
        aspect: "16/9",
        author: "steampunk_donut_jade65",
        column: 0
      },
      {
        image: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094501_61b9fb78-2e54-44d2-bcea-ed0aae4cc707_thumbnail_min.webp",
        video: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094501_61b9fb78-2e54-44d2-bcea-ed0aae4cc707_min.mp4",
        aspect: "16/9",
        author: "art_nouveau_apple_bold66",
        column: 0
      },
      {
        image: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094445_b0de712b-ae62-4fb9-9b07-2757b2d0338b_thumbnail_min.webp",
        video: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094445_b0de712b-ae62-4fb9-9b07-2757b2d0338b_min.mp4",
        aspect: "16/9",
        author: "sketching_manatee_peak94",
        column: 1
      },
      {
        image: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094601_f698d8f7-c96a-42c6-ad0c-8e830417201e_thumbnail_min.webp",
        video: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094601_f698d8f7-c96a-42c6-ad0c-8e830417201e_min.mp4",
        aspect: "16/9",
        author: "rococo_pen",
        column: 1
      },
      {
        image: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094505_e898193e-ec14-4ecc-92ed-be976174fc88_thumbnail_min.webp",
        video: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094505_e898193e-ec14-4ecc-92ed-be976174fc88_min.mp4",
        aspect: "16/9",
        author: "atompunk_cupcake_aero96",
        column: 1
      },
      {
        image: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094426_5355bac3-67d4-4c59-812c-6ad6b9ce7956_thumbnail_min.webp",
        video: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094426_5355bac3-67d4-4c59-812c-6ad6b9ce7956_min.mp4",
        aspect: "16/9",
        author: "prefab_diamond",
        column: 1
      },
      {
        image: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094417_ba8bf934-a387-4bf5-8a24-f34be2a65d46_thumbnail_min.webp",
        video: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094417_ba8bf934-a387-4bf5-8a24-f34be2a65d46_min.mp4",
        aspect: "16/9",
        author: "almasyan",
        column: 2
      },
      {
        image: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094612_2b122af8-b47a-4518-9d91-9675dd8e3f41_thumbnail_min.webp",
        video: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094612_2b122af8-b47a-4518-9d91-9675dd8e3f41_min.mp4",
        aspect: "16/9",
        author: "crafting_capybara_live88",
        column: 2
      },
      {
        image: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094412_fbc2c33e-b861-4744-8aa3-13047b3b83c3_thumbnail_min.webp",
        video: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094412_fbc2c33e-b861-4744-8aa3-13047b3b83c3_min.mp4",
        aspect: "16/9",
        author: "parametric_llama_swift35",
        column: 2
      },
      {
        image: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094639_253d329f-1093-4efa-aee2-430c9e66de64_thumbnail_min.webp",
        video: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094639_253d329f-1093-4efa-aee2-430c9e66de64_min.mp4",
        aspect: "16/9",
        author: "steampunk_donut_jade65",
        column: 2
      },
      {
        image: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094509_a0443ee0-fd26-4f6a-9938-ee153fde5822_thumbnail_min.webp",
        video: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094509_a0443ee0-fd26-4f6a-9938-ee153fde5822_min.mp4",
        aspect: "16/9",
        author: "quantized_porcupine",
        column: 3
      },
      {
        image: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094654_27691a7e-7a4c-4511-95e2-cd3ae1a11273_thumbnail_min.webp",
        video: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094654_27691a7e-7a4c-4511-95e2-cd3ae1a11273_min.mp4",
        aspect: "16/9",
        author: "institutional_butterflying",
        column: 3
      },
      {
        image: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094622_41c4ed95-c7c2-49a8-933e-1cec2ea4e6d9_thumbnail_min.webp",
        video: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094622_41c4ed95-c7c2-49a8-933e-1cec2ea4e6d9_min.mp4",
        aspect: "16/9",
        author: "zhanay",
        column: 3
      },
      {
        image: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094618_bd067d15-5a16-4ebe-986a-3c1d1a9d919d_thumbnail_min.webp",
        video: "https://cdn.higgsfield.ai/user_3AvFCf0aoS6DTSHhwoX3QgsDzIR/hf_20260409_094618_bd067d15-5a16-4ebe-986a-3c1d1a9d919d_min.mp4",
        aspect: "16/9",
        author: "rococo_pen",
        column: 3
      }
    ]
  },
  {
    id: "soul-cinema",
    title: "HIGGSFIELD SOUL CINEMA",
    description: "Explore Higgsfield Community gallery for stunning Higgsfield Soul Cinema creations.",
    ctaLabel: "View all of Higgsfield Soul Cinema",
    items: [
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_35h9Zqn0Bk5qurQOPUM7laOSfXO/hf_20260312_154113_5d74b1d6-5c2d-46b2-873a-d595a0188383.png",
        aspect: "16/9",
        author: "institutional_butterflying",
        column: 0
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_35h9Zqn0Bk5qurQOPUM7laOSfXO/hf_20260311_130530_2a625748-3ec7-411d-98b8-ee4fc1cf4c8c.png",
        aspect: "16/9",
        author: "aibek_zh",
        column: 0
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_35h9Zqn0Bk5qurQOPUM7laOSfXO/hf_20260314_104627_9b8d5df1-45f2-4f8a-9a00-dd69a60c0a17.png",
        aspect: "16/9",
        author: "transforming_cupcake_zero12",
        column: 0
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_35h9Zqn0Bk5qurQOPUM7laOSfXO/hf_20260311_132332_4050f80b-d8a7-43ab-87e6-e421ae1cf1fb.png",
        aspect: "16/9",
        author: "religious_raccoon_dark36",
        column: 0
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_35h9Zqn0Bk5qurQOPUM7laOSfXO/hf_20260313_150735_0b3401a1-0031-45fa-9402-808bc8315fbf.png",
        aspect: "16/9",
        author: "piffle_jack",
        column: 1
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_35h9Zqn0Bk5qurQOPUM7laOSfXO/hf_20260313_171039_1e41c7ae-2fcf-4051-81b8-e955dd615bd2.png",
        aspect: "16/9",
        author: "daulett",
        column: 1
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_35h9Zqn0Bk5qurQOPUM7laOSfXO/hf_20260314_194923_c279d800-65c9-4711-bc6a-2715bda503e2.png",
        aspect: "16/9",
        author: "adapting_potato_keen39",
        column: 1
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_35h9Zqn0Bk5qurQOPUM7laOSfXO/hf_20260305_162045_a76abb05-b221-4147-bb8d-2d32ea1da060.png",
        aspect: "16/9",
        author: "wer",
        column: 1
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_35h9Zqn0Bk5qurQOPUM7laOSfXO/hf_20260314_110254_4adda8fc-103e-4cdc-8e28-4c0dcd9084b6.png",
        aspect: "16/9",
        author: "crafting_capybara_live88",
        column: 2
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_35h9Zqn0Bk5qurQOPUM7laOSfXO/hf_20260313_151147_f4dd9d81-fe2d-4a5b-9e12-9ff44c1758fb.png",
        aspect: "16/9",
        author: "cooking_orangutan",
        column: 2
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_35h9Zqn0Bk5qurQOPUM7laOSfXO/hf_20260314_105240_3310f979-94bc-4f47-8888-8ccf5a1b3731.png",
        aspect: "16/9",
        author: "qwerty_322",
        column: 2
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_35h9Zqn0Bk5qurQOPUM7laOSfXO/hf_20260313_113622_5c4f39d1-9bf9-4e26-b022-29f644c52b18.png",
        aspect: "16/9",
        author: "higgsfield_hall_of_fame",
        column: 2
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_35h9Zqn0Bk5qurQOPUM7laOSfXO/hf_20260314_185418_423093b6-7eef-4284-af68-e774b4b818f2.png",
        aspect: "16/9",
        author: "madi_k",
        column: 3
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_35h9Zqn0Bk5qurQOPUM7laOSfXO/hf_20260313_171242_984d7aac-e3da-42de-b8b1-ccd4f0e70979.png",
        aspect: "16/9",
        author: "laplacetiger_haze75",
        column: 3
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_35h9Zqn0Bk5qurQOPUM7laOSfXO/hf_20260313_113643_2b7c8f81-f4d6-4988-86cf-f33d5dfe8200.png",
        aspect: "16/9",
        author: "dankol",
        column: 3
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_35h9Zqn0Bk5qurQOPUM7laOSfXO/hf_20260312_171646_b4c262b5-9cb1-46bd-a526-307656fa0866.png",
        aspect: "16/9",
        author: "quantized_porcupine",
        column: 3
      }
    ]
  },
  {
    id: "soul-2-0",
    title: "HIGGSFIELD SOUL 2.0",
    description: "A culture-native photo model built for fashion, aesthetics, and creative expression.",
    ctaLabel: "View all of Higgsfield Soul 2.0",
    items: [
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_35h9Zqn0Bk5qurQOPUM7laOSfXO/hf_20260217_184432_7af6e3df-a5ad-4e8a-a3b4-c6d8637ce85c.png",
        aspect: "3/4",
        alt: "A straight-on medium shot captures a handmade jellyfish-shaped lamp sitting on a light green tabletop",
        column: 0
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_36Hwty94QweUxs82UEGsxmReIrf/hf_20260217_175012_2482b23d-7762-4366-b718-3fde133ac10e.png",
        aspect: "3/4",
        alt: "A low-angle medium shot captures a young adult woman standing in a snowy mountainous landscape",
        column: 1
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_35h9Zqn0Bk5qurQOPUM7laOSfXO/hf_20260218_140621_0659e72b-b64a-44f5-ae26-8cc53ebbdb68.png",
        aspect: "4/3",
        alt: "A high-angle shot of an open notebook placed on a wooden table",
        column: 2
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_35h9Zqn0Bk5qurQOPUM7laOSfXO/hf_20260207_193655_711f3c26-8d2b-4e66-89e4-8357c0100b62.png",
        aspect: "4/3",
        alt: "A low-angle full-body shot of a young adult subject",
        column: 3
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_36Hwty94QweUxs82UEGsxmReIrf/hf_20260218_182218_2cfc8314-b866-479e-a70e-b8f27b950e11.png",
        aspect: "3/4",
        alt: "A high-angle, full-body fashion editorial photograph of a young adult South Asian woman",
        column: 0
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_36Hwty94QweUxs82UEGsxmReIrf/hf_20260218_124914_3497c398-0398-44f7-a5b7-395d6c832886.png",
        aspect: "3/4",
        alt: "A straight-on, recumbent close-up of a young woman with porcelain skin",
        column: 1
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_35h9Zqn0Bk5qurQOPUM7laOSfXO/hf_20260213_201650_322c2e1d-2643-4f06-8c06-dfda0246b527.png",
        aspect: "3/4",
        alt: "A medium shot of a young Asian woman in a stylized outfit against a weathered wall",
        column: 2
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_36Hwty94QweUxs82UEGsxmReIrf/hf_20260218_120631_b4bade9f-5e82-4e87-bc66-cea3e15d46de.png",
        aspect: "3/4",
        alt: "Two young women reclining outdoors before a traditional building",
        column: 3
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_36Hwty94QweUxs82UEGsxmReIrf/hf_20260218_190742_2ffd28b9-6a71-4772-8eeb-1a63d989f0d9.png",
        aspect: "3/4",
        alt: "Close-up overhead shot of a young woman in a monochrome outfit",
        column: 0
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_36Hwty94QweUxs82UEGsxmReIrf/hf_20260218_184556_0e4b2d2d-e4b7-4d49-91e8-a67ed83fb932.png",
        aspect: "3/4",
        alt: "Close-up side profile of a young man at an outdoor café table",
        column: 1
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_35h9Zqn0Bk5qurQOPUM7laOSfXO/hf_20260218_141135_4468ae61-47be-4396-834b-8bbc78054909.png",
        aspect: "3/4",
        alt: "A mixed-media artwork with a weathered, vintage aesthetic",
        column: 2
      },
      {
        image: "https://d8j0ntlcm91z4.cloudfront.net/user_36Hwty94QweUxs82UEGsxmReIrf/hf_20260218_123341_5eeff76b-7e3b-4826-ae1c-ec7ac8b66643.png",
        aspect: "3/4",
        alt: "A two-frame composite of a young woman with long blonde hair relaxing",
        column: 3
      }
    ]
  }
];

export const HF_MORE_FEATURES: string[] = [
  "Cinema Studio",
  "Visual Effects",
  "Higgsfield Soul",
  "Camera Controls",
  "Viral",
  "Action movements",
  "Commercial",
  "MiniMax Hailuo 02",
  "Seedance Pro",
  "Community",
  "Wan 2.2 Image",
  "Seedream 4.0",
  "Nano Banana",
  "Flux Kontext",
  "GPT Image",
  "Topaz",
  "Google Veo3",
  "Kling 2.5 Turbo",
  "Kling Avatars 2.0",
  "Claude MCP",
  "Wan 2.5",
  "Sora 2",
  "Sora 2 Presets",
  "Banana Placement",
  "Edit Image",
  "Multi Reference",
  "Upscale",
  "YouTube",
  "TikTok",
  "Instagram Reels",
  "YouTube Shorts",
  "Nano Banana Pro",
  "Kling o1",
  "Mixed Media Community",
  "Soul Presets",
  "Visual Effects Collection"
];

export const HF_FOOTER: {
  tagline: string;
  columns: HfFooterColumn[];
  address: string;
  socials: string[];
} = {
  tagline: "AI-NATIVE CREATIVE SUITE",
  columns: [
    {
      title: "Create",
      links: [
        "AI Video",
        "AI Image",
        "Edit Image",
        "Inpaint",
        "Upscale",
        "Sora 2 Upscale",
        "Mixed Media",
        "AI Face Swap",
        "AI Influencer",
        "Apps"
      ]
    },
    {
      title: "Video Models",
      links: [
        "Seedance 2.5",
        "Seedance 2.0",
        "Kling 3.0",
        "Sora 2 Introduction",
        "Veo 3.1 Introduction",
        "WAN 2.6",
        "Grok Imagine 1.5",
        "Gemini Omni Flash"
      ]
    },
    {
      title: "Image Models",
      links: [
        "Nano Banana",
        "Flux 2",
        "Seedream 5",
        "GPT Image 2"
      ]
    },
    {
      title: "Studios",
      links: [
        "Cinema Studio",
        "Marketing Studio",
        "Lipsync Studio",
        "Photodump Studio",
        "Fashion Factory",
        "UGC Factory",
        "Higgsfield Popcorn",
        "Higgsfield Canvas"
      ]
    },
    {
      title: "Soul",
      links: [
        "Soul 2.0",
        "Soul ID Character",
        "Soul Cinema"
      ]
    },
    {
      title: "Platform",
      links: [
        "Supercomputer",
        "MCP/CLI",
        "API",
        "Collab",
        "Games",
        "Reference Extension"
      ]
    },
    {
      title: "Resources",
      links: [
        "Blog",
        "Creator Hub",
        "Help Center",
        "Academy",
        "Prompt Guide"
      ]
    },
    {
      title: "Company",
      links: [
        "About",
        "Trust",
        "Enterprise",
        "Team",
        "Pricing",
        "Careers",
        "Contact"
      ]
    },
    {
      title: "Community",
      links: [
        "Community",
        "Contests",
        "Creative Partners"
      ]
    }
  ],
  address: "535 Mission St, 14th floor, San Francisco, CA, 94105",
  socials: [
    "X / Twitter",
    "Youtube",
    "LinkedIn",
    "Tiktok",
    "Discord"
  ]
};

/** Every remote host referenced above; mirrored in next.config.ts `images.remotePatterns`. */
export const HF_MEDIA_HOSTS = [
  "assets.higgsfield.ai",
  "cdn.higgsfield.ai",
  "d2ol7oe51mr4n9.cloudfront.net",
  "d8j0ntlcm91z4.cloudfront.net",
  "static-public-media.higgsfield.ai",
  "static.higgsfield.ai"
] as const;
