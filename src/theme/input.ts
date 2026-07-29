import { borderRadius } from "./border-radius";
import { colors } from "./colors";

export const input = {
  layout: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
  },
  colors: {
    background: colors.surface,
    text: colors.textPrimary,
    placeholder: colors.textSecondary,
    borderDefault: colors.border,
    borderFocused: colors.primary,
    borderError: colors.error,
  },
  typography: {
    inputFontSize: 14,
    label: {
      fontSize: 13,
      fontWeight: "500",
    },
    error: {
      fontSize: 12,
      fontWeight: "500",
    },
  },
  spacing: {
    labelMarginBottom: 6,
    errorMarginTop: 5,
  },
  password: {
    iconSize: 20,
    iconColor: colors.textSecondary,
    iconPaddingHorizontal: 14,
  },
} as const;
