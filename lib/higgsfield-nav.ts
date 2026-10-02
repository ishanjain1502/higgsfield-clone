export type HiggsfieldNavItem = {
  label: string;
  href?: string;
  badge?: "New" | "Top";
  comingSoon?: boolean;
};

/** Marketing / product nav inspired by higgsfield.ai (v1: Studio routes + Coming Soon). */
export const HIGGSFIELD_PRODUCT_NAV: HiggsfieldNavItem[] = [
  { label: "Explore", href: "/studio", comingSoon: false },
  { label: "Image", comingSoon: true },
  { label: "Video", comingSoon: true },
  { label: "Audio", comingSoon: true },
  { label: "MCP", comingSoon: true },
  { label: "API", badge: "New", comingSoon: true },
  { label: "Effects", comingSoon: true },
  { label: "Cinema Studio", comingSoon: true },
  { label: "Supercomputer", comingSoon: true },
  { label: "Edit", comingSoon: true },
  { label: "Community", comingSoon: true },
  { label: "Canvas", comingSoon: true },
];
