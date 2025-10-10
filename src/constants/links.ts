/**
 * Social media links for Mind Mesh
 * Update these URLs with the actual organization social media handles
 */

export const SOCIAL_LINKS = {
  github: "https://github.com/mind-mesh",
  linkedin: "https://linkedin.com/company/mind-mesh",
  twitter: "https://twitter.com/mindmesh",
  instagram: "https://instagram.com/mindmesh",
  email: "mailto:contact@mindmesh.org",
  discord: "https://discord.gg/mindmesh",
} as const;

export type SocialPlatform = keyof typeof SOCIAL_LINKS;
