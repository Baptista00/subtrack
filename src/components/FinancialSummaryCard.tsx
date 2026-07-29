import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { home } from "../theme";
import { AppText } from "./AppText";

export interface FinancialSummaryCardProps {
  totalMonthlyText: string;
  activeSubscriptionsCount: string | number;
  upcomingRenewalsCount: string | number;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export function FinancialSummaryCard({
  activeSubscriptionsCount,
  accessibilityLabel,
  style,
  totalMonthlyText,
  upcomingRenewalsCount,
}: FinancialSummaryCardProps) {
  const activeSubscriptionsText = String(activeSubscriptionsCount);
  const upcomingRenewalsText = String(upcomingRenewalsCount);
  const summaryAccessibilityLabel =
    accessibilityLabel ??
    `Total gasto por mês: ${totalMonthlyText}. ${activeSubscriptionsText} assinaturas ativas. ${upcomingRenewalsText} próximas renovações este mês.`;

  return (
    <LinearGradient
      accessible
      accessibilityLabel={summaryAccessibilityLabel}
      accessibilityRole="summary"
      colors={home.financialSummaryCard.gradient.colors}
      end={home.financialSummaryCard.gradient.end}
      start={home.financialSummaryCard.gradient.start}
      style={[styles.container, style]}
    >
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        pointerEvents="none"
        style={[styles.decoration, styles.largeCircle]}
      />
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        pointerEvents="none"
        style={[styles.decoration, styles.smallCircle]}
      />

      <View style={styles.content}>
        <AppText variant="Body" style={styles.totalLabel}>
          TOTAL GASTO POR MÊS
        </AppText>
        <AppText variant="Body" style={styles.totalValue}>
          {totalMonthlyText}
        </AppText>

        <View style={styles.statistics}>
          <View>
            <AppText variant="Body" style={styles.statisticLabel}>
              Assinaturas ativas
            </AppText>
            <AppText variant="Body" style={styles.statisticValue}>
              {activeSubscriptionsText}
            </AppText>
          </View>

          <View style={styles.divider} />

          <View>
            <AppText variant="Body" style={styles.statisticLabel}>
              Próximas renovações
            </AppText>
            <View style={styles.upcomingValueRow}>
              <AppText variant="Body" style={styles.statisticValue}>
                {upcomingRenewalsText}
              </AppText>
              <AppText variant="Body" style={styles.upcomingSuffix}>
                este mês
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: home.financialSummaryCard.container.borderRadius,
    overflow: "hidden",
    padding: home.financialSummaryCard.container.padding,
    position: "relative",
    width: home.financialSummaryCard.container.width,
  },
  decoration: {
    backgroundColor: home.financialSummaryCard.decoration.backgroundColor,
    position: "absolute",
  },
  largeCircle: home.financialSummaryCard.decoration.largeCircle,
  smallCircle: home.financialSummaryCard.decoration.smallCircle,
  content: {
    position: "relative",
    zIndex: 1,
  },
  totalLabel: {
    color: home.financialSummaryCard.totalLabel.color,
    fontSize: home.financialSummaryCard.totalLabel.fontSize,
    fontWeight: home.financialSummaryCard.totalLabel.fontWeight,
    letterSpacing: home.financialSummaryCard.totalLabel.letterSpacing,
    marginBottom: home.financialSummaryCard.totalLabel.marginBottom,
    textTransform: "uppercase",
  },
  totalValue: {
    color: home.financialSummaryCard.totalValue.color,
    fontSize: home.financialSummaryCard.totalValue.fontSize,
    fontVariant: ["tabular-nums"],
    fontWeight: home.financialSummaryCard.totalValue.fontWeight,
    letterSpacing: home.financialSummaryCard.totalValue.letterSpacing,
    lineHeight: home.financialSummaryCard.totalValue.lineHeight,
    marginBottom: home.financialSummaryCard.totalValue.marginBottom,
  },
  statistics: {
    alignItems: "center",
    flexDirection: "row",
    gap: home.financialSummaryCard.statistics.gap,
  },
  statisticLabel: {
    color: home.financialSummaryCard.statistics.label.color,
    fontSize: home.financialSummaryCard.statistics.label.fontSize,
    fontWeight: home.financialSummaryCard.statistics.label.fontWeight,
    marginBottom: home.financialSummaryCard.statistics.label.marginBottom,
  },
  statisticValue: {
    color: home.financialSummaryCard.statistics.value.color,
    fontSize: home.financialSummaryCard.statistics.value.fontSize,
    fontVariant: ["tabular-nums"],
    fontWeight: home.financialSummaryCard.statistics.value.fontWeight,
  },
  divider: home.financialSummaryCard.statistics.divider,
  upcomingValueRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: home.financialSummaryCard.statistics.upcomingValue.gap,
  },
  upcomingSuffix: {
    color: home.financialSummaryCard.statistics.upcomingValue.suffix.color,
    fontSize: home.financialSummaryCard.statistics.upcomingValue.suffix.fontSize,
    fontWeight: home.financialSummaryCard.statistics.upcomingValue.suffix.fontWeight,
  },
});
