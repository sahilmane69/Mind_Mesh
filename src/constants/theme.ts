export const THEME = {
  colors: {
    primary: '#6366F1',      // Indigo
    secondary: '#A855F7',    // Purple
    accent: '#A855F7',       // Purple (alias for compatibility)
    tertiary: '#8B5CF6',     // Violet
    primaryRgb: '99, 102, 241',
    secondaryRgb: '168, 85, 247',
    accentRgb: '168, 85, 247',
  },
  gradients: {
    primary: 'linear-gradient(to right, #6366F1, #A855F7)',
    primaryTailwind: 'from-[#6366F1] to-[#A855F7]',
    primaryRadial: 'radial-gradient(circle, #6366F1, #A855F7)',
  },
  shadows: {
    primary: '0 0 20px rgba(99, 102, 241, 0.5)',
    secondary: '0 0 20px rgba(168, 85, 247, 0.5)',
    glow: '0 0 30px rgba(99, 102, 241, 0.3)',
  },
} as const;

export type ThemeColors = typeof THEME.colors;
export type ThemeGradients = typeof THEME.gradients;
