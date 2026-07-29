export const borderRadius = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
} as const;

export type BorderRadiusToken = keyof typeof borderRadius;
