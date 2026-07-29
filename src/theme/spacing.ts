export const spacing = [4, 8, 12, 16, 24, 32, 48] as const;

export type SpacingToken = (typeof spacing)[number];
