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
  bottomNav: {
    container: {
      width: "100%",
      flexShrink: 0,
      backgroundColor: colors.surface,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    tab: {
      paddingTop: spacing[2],
      paddingBottom: 20,
      gap: spacing[0],
    },
    active: {
      color: colors.primary,
    },
    inactive: {
      color: "#9CA3AF",
    },
    icon: {
      size: 22,
    },
    label: {
      fontSize: 10,
      fontWeight: "600",
      lineHeight: 10,
    },
  },
  header: {
    container: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 16,
    },
    title: {
      fontSize: 22,
      fontWeight: "700",
      color: colors.textPrimary,
      letterSpacing: -0.55,
    },
    menuButton: {
      width: 36,
      height: 36,
      borderRadius: 9999,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 1,
      elevation: 1,
      iconSize: 18,
      iconColor: colors.textPrimary,
    },
  },
  subscriptionsSection: {
    marginBottom: spacing[2],
    title: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.textPrimary,
    },
    action: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.primary,
    },
  },
  emptyState: {
    container: {
      flex: 1,
      paddingHorizontal: 32,
      gap: 24,
      marginTop: -32,
    },
    illustration: {
      width: 200,
      height: 168,
      card: {
        left: 32,
        top: 24,
        width: 136,
        height: 100,
        borderRadius: 16,
        backgroundColor: "rgba(27, 77, 62, 0.05)",
        borderColor: "rgba(27, 77, 62, 0.12)",
        borderWidth: 1.5,
      },
      firstRow: {
        circle: { left: 52, top: 46, size: 28, backgroundColor: "rgba(27, 77, 62, 0.09)" },
        primaryLine: { left: 90, top: 52, width: 56, height: 7, backgroundColor: "rgba(27, 77, 62, 0.12)" },
        secondaryLine: { left: 90, top: 64, width: 36, height: 5, backgroundColor: "rgba(27, 77, 62, 0.07)" },
      },
      divider: { left: 52, top: 79, width: 96, height: 1, backgroundColor: "rgba(27, 77, 62, 0.08)" },
      secondRow: {
        circle: { left: 52, top: 84, size: 28, backgroundColor: "rgba(27, 77, 62, 0.05)" },
        primaryLine: { left: 90, top: 90, width: 56, height: 7, backgroundColor: "rgba(27, 77, 62, 0.07)" },
        secondaryLine: { left: 90, top: 102, width: 36, height: 5, backgroundColor: "rgba(27, 77, 62, 0.04)" },
      },
      addCircle: {
        left: 82,
        top: 130,
        size: 36,
        borderRadius: 18,
        backgroundColor: "rgba(27, 77, 62, 0.07)",
        borderColor: "rgba(27, 77, 62, 0.20)",
        borderWidth: 1.5,
      },
      addIcon: { size: 16, color: "rgba(27, 77, 62, 0.55)" },
    },
    text: {
      title: { fontSize: 17, fontWeight: "700", color: colors.textPrimary, marginBottom: 8 },
      description: { fontSize: 14, fontWeight: "400", color: colors.textSecondary, lineHeight: 22.75 },
    },
    callToAction: {
      width: "100%",
      borderRadius: 16,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 1,
      elevation: 1,
      pressedBackgroundColor: "#163D31",
      pressedScale: 0.98,
      iconSize: 16,
      iconColor: colors.surface,
    },
  },
  floatingActionButton: {
    position: { bottom: 88, right: 20 },
    width: 56,
    height: 56,
    borderRadius: 9999,
    backgroundColor: colors.primary,
    pressedBackgroundColor: "#163D31",
    pressedScale: 0.95,
    shadowColor: "#1B4D3E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 6,
    iconSize: 22,
    iconColor: colors.surface,
  },
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
        fontWeight: "400",
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
