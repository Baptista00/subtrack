import { Feather } from "@expo/vector-icons";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { home } from "../theme";
import { AppText } from "./AppText";
import { Button } from "./Button";

export type EmptyStateProps = {
  onAddSubscription?: () => void;
  title?: string;
  description?: string;
  actionLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export function EmptyState({
  actionLabel = "Adicionar assinatura",
  description = "Adicione sua primeira assinatura\npara começar.",
  onAddSubscription,
  style,
  title = "Nenhuma assinatura cadastrada",
}: EmptyStateProps) {
  return (
    <View style={[styles.container, style]}>
      <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" pointerEvents="none" style={styles.illustration}>
        <View style={styles.illustrationCard} />
        <View style={[styles.rowCircle, styles.firstRowCircle]} />
        <View style={[styles.line, styles.firstRowPrimaryLine]} />
        <View style={[styles.line, styles.firstRowSecondaryLine]} />
        <View style={styles.illustrationDivider} />
        <View style={[styles.rowCircle, styles.secondRowCircle]} />
        <View style={[styles.line, styles.secondRowPrimaryLine]} />
        <View style={[styles.line, styles.secondRowSecondaryLine]} />
        <View style={styles.addCircle}>
          <Feather accessible={false} color={home.emptyState.illustration.addIcon.color} name="plus" size={home.emptyState.illustration.addIcon.size} />
        </View>
      </View>
      <View style={styles.copy}>
        <AppText variant="Heading 2" style={styles.title}>{title}</AppText>
        <AppText variant="Body" style={styles.description}>{description}</AppText>
      </View>
      <Button accessibilityLabel="Adicionar assinatura" icon={<Feather accessible={false} color={home.emptyState.callToAction.iconColor} name="plus" size={home.emptyState.callToAction.iconSize} />} onPress={onAddSubscription} style={({ pressed }) => [styles.callToAction, pressed && styles.callToActionPressed]} variant="primary">
        {actionLabel}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", flex: home.emptyState.container.flex, gap: home.emptyState.container.gap, justifyContent: "center", marginTop: home.emptyState.container.marginTop, paddingHorizontal: home.emptyState.container.paddingHorizontal },
  illustration: { height: home.emptyState.illustration.height, position: "relative", width: home.emptyState.illustration.width },
  illustrationCard: { backgroundColor: home.emptyState.illustration.card.backgroundColor, borderColor: home.emptyState.illustration.card.borderColor, borderRadius: home.emptyState.illustration.card.borderRadius, borderWidth: home.emptyState.illustration.card.borderWidth, height: home.emptyState.illustration.card.height, left: home.emptyState.illustration.card.left, position: "absolute", top: home.emptyState.illustration.card.top, width: home.emptyState.illustration.card.width },
  rowCircle: { borderRadius: home.emptyState.illustration.firstRow.circle.size / 2, height: home.emptyState.illustration.firstRow.circle.size, position: "absolute", width: home.emptyState.illustration.firstRow.circle.size },
  firstRowCircle: { backgroundColor: home.emptyState.illustration.firstRow.circle.backgroundColor, left: home.emptyState.illustration.firstRow.circle.left, top: home.emptyState.illustration.firstRow.circle.top },
  secondRowCircle: { backgroundColor: home.emptyState.illustration.secondRow.circle.backgroundColor, left: home.emptyState.illustration.secondRow.circle.left, top: home.emptyState.illustration.secondRow.circle.top },
  line: { borderRadius: 9999, position: "absolute" },
  firstRowPrimaryLine: { backgroundColor: home.emptyState.illustration.firstRow.primaryLine.backgroundColor, height: home.emptyState.illustration.firstRow.primaryLine.height, left: home.emptyState.illustration.firstRow.primaryLine.left, top: home.emptyState.illustration.firstRow.primaryLine.top, width: home.emptyState.illustration.firstRow.primaryLine.width },
  firstRowSecondaryLine: { backgroundColor: home.emptyState.illustration.firstRow.secondaryLine.backgroundColor, height: home.emptyState.illustration.firstRow.secondaryLine.height, left: home.emptyState.illustration.firstRow.secondaryLine.left, top: home.emptyState.illustration.firstRow.secondaryLine.top, width: home.emptyState.illustration.firstRow.secondaryLine.width },
  illustrationDivider: { backgroundColor: home.emptyState.illustration.divider.backgroundColor, height: home.emptyState.illustration.divider.height, left: home.emptyState.illustration.divider.left, position: "absolute", top: home.emptyState.illustration.divider.top, width: home.emptyState.illustration.divider.width },
  secondRowPrimaryLine: { backgroundColor: home.emptyState.illustration.secondRow.primaryLine.backgroundColor, height: home.emptyState.illustration.secondRow.primaryLine.height, left: home.emptyState.illustration.secondRow.primaryLine.left, top: home.emptyState.illustration.secondRow.primaryLine.top, width: home.emptyState.illustration.secondRow.primaryLine.width },
  secondRowSecondaryLine: { backgroundColor: home.emptyState.illustration.secondRow.secondaryLine.backgroundColor, height: home.emptyState.illustration.secondRow.secondaryLine.height, left: home.emptyState.illustration.secondRow.secondaryLine.left, top: home.emptyState.illustration.secondRow.secondaryLine.top, width: home.emptyState.illustration.secondRow.secondaryLine.width },
  addCircle: { alignItems: "center", backgroundColor: home.emptyState.illustration.addCircle.backgroundColor, borderColor: home.emptyState.illustration.addCircle.borderColor, borderRadius: home.emptyState.illustration.addCircle.borderRadius, borderWidth: home.emptyState.illustration.addCircle.borderWidth, height: home.emptyState.illustration.addCircle.size, justifyContent: "center", left: home.emptyState.illustration.addCircle.left, position: "absolute", top: home.emptyState.illustration.addCircle.top, width: home.emptyState.illustration.addCircle.size },
  copy: { alignItems: "center" },
  title: { color: home.emptyState.text.title.color, fontSize: home.emptyState.text.title.fontSize, fontWeight: home.emptyState.text.title.fontWeight, marginBottom: home.emptyState.text.title.marginBottom, textAlign: "center" },
  description: { color: home.emptyState.text.description.color, fontSize: home.emptyState.text.description.fontSize, fontWeight: home.emptyState.text.description.fontWeight, lineHeight: home.emptyState.text.description.lineHeight, textAlign: "center" },
  callToAction: { alignSelf: "stretch", borderRadius: home.emptyState.callToAction.borderRadius, boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)", elevation: home.emptyState.callToAction.elevation, shadowColor: home.emptyState.callToAction.shadowColor, shadowOffset: home.emptyState.callToAction.shadowOffset, shadowOpacity: home.emptyState.callToAction.shadowOpacity, shadowRadius: home.emptyState.callToAction.shadowRadius, width: home.emptyState.callToAction.width },
  callToActionPressed: { backgroundColor: home.emptyState.callToAction.pressedBackgroundColor, transform: [{ scale: home.emptyState.callToAction.pressedScale }] },
});
