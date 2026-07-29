import { borderRadius } from "./border-radius";
import { colors } from "./colors";
import { spacing } from "./spacing";

type CategoryBadgeColor = {
  backgroundColor: string;
  textColor: string;
};

const categoryBadgeColors: Record<string, CategoryBadgeColor> = {
  Streaming: {
    backgroundColor: "#E8F5F0",
    textColor: colors.primary,
  },
  Música: {
    backgroundColor: "#F3E8FF",
    textColor: "#7C3AED",
  },
  Produtividade: {
    backgroundColor: "#EFF6FF",
    textColor: "#1D4ED8",
  },
  Saúde: {
    backgroundColor: "#FFF7ED",
    textColor: "#C2410C",
  },
};

export const home = {
  financialSummaryCard: {
    gradient: {
      colors: [colors.primary, "#163D31"],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
    container: {
      width: "100%",
      borderRadius: 24,
      padding: spacing[4],
    },
    decoration: {
      backgroundColor: "rgba(255, 255, 255, 0.04)",
      largeCircle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        top: -32,
        right: -32,
      },
      smallCircle: {
        width: 112,
        height: 112,
        borderRadius: 56,
        bottom: -40,
        right: -16,
      },
    },
    totalLabel: {
      fontSize: 10,
      fontWeight: "600",
      color: "rgba(255, 255, 255, 0.50)",
      letterSpacing: 1,
      marginBottom: spacing[1],
    },
    totalValue: {
      fontSize: 40,
      fontWeight: "800",
      color: colors.surface,
      lineHeight: 40,
      letterSpacing: -1,
      marginBottom: spacing[4],
    },
    statistics: {
      gap: spacing[3],
      label: {
        fontSize: 11,
        fontWeight: "500",
        color: "rgba(255, 255, 255, 0.50)",
        marginBottom: 2,
      },
      value: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.surface,
      },
      divider: {
        width: 1,
        height: 32,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
      },
      upcomingValue: {
        gap: 6,
        suffix: {
          fontSize: 11,
          fontWeight: "600",
          color: colors.success,
        },
      },
    },
  },
  categoryBadge: {
    borderRadius: 9999,
    paddingHorizontal: spacing[1],
    paddingVertical: 2,
    typography: {
      fontSize: 10,
      fontWeight: "600",
    },
    fallback: {
      backgroundColor: "#F3F4F6",
      textColor: "#374151",
    },
    categories: categoryBadgeColors,
  },
  subscriptionCard: {
    container: {
      width: "100%",
      backgroundColor: colors.surface,
      borderRadius: borderRadius.lg,
      paddingHorizontal: spacing[3],
      paddingVertical: 14,
      gap: spacing[2],
      borderWidth: 1,
      borderColor: "#F3F4F6",
      alignItems: "center",
    },
    shadow: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 1,
      elevation: 1,
    },
    pressed: {
      backgroundColor: "#F9FAFB",
    },
    serviceIcon: {
      width: 44,
      height: 44,
      borderRadius: borderRadius.lg,
      fontSize: 15,
      fontWeight: "700",
      fallback: {
        backgroundColor: "#F3F4F6",
        textColor: "#374151",
      },
    },
    content: {
      name: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.textPrimary,
        lineHeight: 17.5,
        marginBottom: spacing[0],
      },
      details: {
        gap: spacing[1],
      },
      renewal: {
        fontSize: 11,
        fontWeight: "500",
        color: "#9CA3AF",
        warningColor: colors.warning,
        warningIconSize: 12,
      },
    },
    price: {
      fontSize: 14,
      fontWeight: "700",
      color: colors.textPrimary,
    },
    rightColumn: {
      gap: 6,
      chevronIconSize: 14,
      chevronIconColor: colors.toggleOff,
    },
  },
} as const;
