import { borderRadius } from "./border-radius";
import { colors } from "./colors";
import { spacing } from "./spacing";

export const button = {
  layout: {
    height: 52,
    minWidth: 160,
    borderRadius: borderRadius.md,
    gap: spacing[1],
    ghostPaddingVertical: spacing[0],
    ghostPaddingHorizontal: 0,
  },
  typography: {
    default: {
      fontSize: 15,
      fontWeight: "600",
    },
    ghost: {
      fontSize: 14,
      fontWeight: "600",
    },
  },
  border: {
    none: 0,
    outline: 1.5,
  },
  shadow: {
    none: "none",
  },
  primary: {
    default: {
      backgroundColor: colors.primary,
      textColor: colors.surface,
      boxShadow: "0px 2px 8px rgba(27, 77, 62, 0.25)",
    },
    pressed: {
      backgroundColor: "#143D30",
      textColor: colors.surface,
      boxShadow: "none",
      scale: 0.98,
    },
    disabled: {
      backgroundColor: "#9CA3AF",
      textColor: colors.border,
      boxShadow: "none",
    },
    loading: {
      indicatorColor: colors.surface,
      indicatorSize: 20,
    },
    iconSize: 20,
  },
  secondary: {
    default: {
      backgroundColor: "transparent",
      borderColor: colors.primary,
      textColor: colors.primary,
    },
    pressed: {
      backgroundColor: "#EAF2EF",
      borderColor: "#143D30",
      textColor: colors.primary,
    },
  },
  danger: {
    backgroundColor: "transparent",
    borderColor: colors.error,
    textColor: colors.error,
    loading: {
      indicatorColor: colors.error,
      indicatorSize: 20,
    },
    iconSize: 18,
  },
  ghost: {
    backgroundColor: "transparent",
    textColor: colors.primary,
  },
} as const;

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
