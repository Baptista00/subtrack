import { borderRadius } from "./border-radius";
import { colors } from "./colors";
import { spacing } from "./spacing";
import type { BillingCycle, SubscriptionCategory } from "../types/subscription";

export type { BillingCycle, SubscriptionCategory } from "../types/subscription";

export const subscriptionCategories = [
  { label: "Streaming", value: "streaming", serviceColor: "#E50914" },
  { label: "Música", value: "musica", serviceColor: "#1DB954" },
  { label: "Produtividade", value: "produtividade", serviceColor: "#1B4D3E" },
  { label: "Saúde", value: "saude", serviceColor: "#2F80ED" },
  { label: "Educação", value: "educacao", serviceColor: "#F2994A" },
  { label: "Outros", value: "outros", serviceColor: "#6B7280" },
] as const satisfies readonly {
  label: string;
  value: SubscriptionCategory;
  serviceColor: string;
}[];

export const billingCycles = [
  { label: "Mensal", value: "monthly" },
  { label: "Anual", value: "yearly" },
] as const satisfies readonly {
  label: string;
  value: BillingCycle;
}[];

export const addSubscription = {
  form: {
    gap: spacing[4],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  selector: {
    gap: spacing[1],
    chip: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: 9999,
      borderWidth: 1,
      paddingHorizontal: spacing[2],
      paddingVertical: spacing[1],
    },
    selectedChip: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    text: {
      color: colors.textPrimary,
    },
    selectedText: {
      color: colors.surface,
    },
  },
  billingCycle: {
    container: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      gap: spacing[1],
      padding: spacing[0],
    },
    option: {
      borderRadius: borderRadius.sm,
      paddingVertical: spacing[2],
    },
    selectedOption: {
      backgroundColor: colors.primary,
    },
    text: {
      color: colors.textSecondary,
    },
    selectedText: {
      color: colors.surface,
    },
  },
  reminder: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing[3],
    title: {
      color: colors.textPrimary,
    },
  },
} as const;
