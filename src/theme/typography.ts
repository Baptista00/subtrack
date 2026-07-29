export const typography = {
  family: "Inter",
  Display: {
    fontSize: 28,
    fontWeight: 800,
  },
  "Heading 1": {
    fontSize: 22,
    fontWeight: 700,
  },
  "Heading 2": {
    fontSize: 18,
    fontWeight: 600,
  },
  Body: {
    fontSize: 15,
    fontWeight: 400,
  },
  Label: {
    fontSize: 13,
    fontWeight: 500,
  },
  "Small/Helper": {
    fontSize: 12,
    fontWeight: 400,
  },
  "Section Label": {
    fontSize: 11,
    fontWeight: 700,
  },
} as const;

export type TypographyToken = keyof Omit<typeof typography, "family">;
