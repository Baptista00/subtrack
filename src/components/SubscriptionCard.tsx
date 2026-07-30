import { Feather } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
} from "react-native";

import { home } from "../theme";
import { AppText } from "./AppText";
import { CategoryBadge } from "./CategoryBadge";

export interface SubscriptionCardProps
  extends Omit<
    PressableProps,
    | "accessibilityLabel"
    | "accessibilityRole"
    | "children"
    | "disabled"
    | "onLongPress"
    | "onPress"
    | "onPressIn"
    | "onPressOut"
  > {
  serviceName: string;
  serviceInitial: string;
  serviceColor: string;
  category: string;
  renewalText: string;
  priceText: string;
  warning?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
}

export function SubscriptionCard({
  accessibilityLabel,
  category,
  onPress,
  priceText,
  renewalText,
  serviceColor,
  serviceInitial,
  serviceName,
  style,
  warning = false,
  ...props
}: SubscriptionCardProps) {
  const serviceIconColors = getServiceIconColors(serviceColor);

  return (
    <Pressable
      {...props}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={onPress ? "button" : undefined}
      onPress={onPress}
      style={(state) => [
        styles.container,
        state.pressed && onPress ? styles.pressed : undefined,
        typeof style === "function" ? style(state) : style,
      ]}
    >
      <View style={styles.leftArea}>
        <View style={[styles.serviceIcon, { backgroundColor: serviceIconColors.backgroundColor }]}>
          <AppText variant="Body" style={[styles.serviceInitial, { color: serviceIconColors.textColor }]}>
            {serviceInitial}
          </AppText>
        </View>

        <View style={styles.content}>
          <AppText numberOfLines={1} variant="Body" style={styles.serviceName}>
            {serviceName}
          </AppText>
          <View style={styles.details}>
            <CategoryBadge category={category} />
            <View style={styles.renewalRow}>
              <AppText
                numberOfLines={1}
                variant="Body"
                style={[styles.renewalText, warning ? styles.warningRenewalText : undefined]}
              >
                {renewalText}
              </AppText>
              {warning ? (
                <Feather
                  accessible={false}
                  color={home.subscriptionCard.content.renewal.warningColor}
                  name="alert-triangle"
                  size={home.subscriptionCard.content.renewal.warningIconSize}
                />
              ) : null}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.rightColumn}>
        <AppText numberOfLines={1} variant="Body" style={styles.priceText}>
          {priceText}
        </AppText>
        <Feather
          accessible={false}
          color={home.subscriptionCard.rightColumn.chevronIconColor}
          name="chevron-right"
          size={home.subscriptionCard.rightColumn.chevronIconSize}
        />
      </View>
    </Pressable>
  );
}

function getServiceIconColors(serviceColor: string): {
  backgroundColor: string;
  textColor: string;
} {
  const backgroundColor = toServiceBackgroundColor(serviceColor);

  if (!backgroundColor) {
    return home.subscriptionCard.serviceIcon.fallback;
  }

  return {
    backgroundColor,
    textColor: serviceColor,
  };
}

function toServiceBackgroundColor(hexColor: string): string | null {
  if (!/^#[0-9A-Fa-f]{6}$/.test(hexColor)) {
    return null;
  }

  const red = Number.parseInt(hexColor.slice(1, 3), 16);
  const green = Number.parseInt(hexColor.slice(3, 5), 16);
  const blue = Number.parseInt(hexColor.slice(5, 7), 16);

  return `rgba(${red}, ${green}, ${blue}, 0.094)`;
}

const styles = StyleSheet.create({
  container: {
    alignItems: home.subscriptionCard.container.alignItems,
    backgroundColor: home.subscriptionCard.container.backgroundColor,
    borderColor: home.subscriptionCard.container.borderColor,
    borderRadius: home.subscriptionCard.container.borderRadius,
    borderWidth: home.subscriptionCard.container.borderWidth,
    flexDirection: "row",
    gap: home.subscriptionCard.container.gap,
    paddingHorizontal: home.subscriptionCard.container.paddingHorizontal,
    paddingVertical: home.subscriptionCard.container.paddingVertical,
    width: home.subscriptionCard.container.width,
    ...home.subscriptionCard.shadow,
  },
  pressed: {
    backgroundColor: home.subscriptionCard.pressed.backgroundColor,
  },
  serviceIcon: {
    alignItems: "center",
    borderRadius: home.subscriptionCard.serviceIcon.borderRadius,
    flexShrink: 0,
    height: home.subscriptionCard.serviceIcon.height,
    justifyContent: "center",
    width: home.subscriptionCard.serviceIcon.width,
  },
  leftArea: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: home.subscriptionCard.container.gap,
    minWidth: 0,
  },
  serviceInitial: {
    fontSize: home.subscriptionCard.serviceIcon.fontSize,
    fontWeight: home.subscriptionCard.serviceIcon.fontWeight,
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  serviceName: {
    color: home.subscriptionCard.content.name.color,
    fontSize: home.subscriptionCard.content.name.fontSize,
    fontWeight: home.subscriptionCard.content.name.fontWeight,
    lineHeight: home.subscriptionCard.content.name.lineHeight,
    marginBottom: home.subscriptionCard.content.name.marginBottom,
  },
  details: {
    alignItems: "flex-start",
    flexDirection: "column",
    gap: home.subscriptionCard.content.details.gap,
  },
  renewalRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: home.subscriptionCard.content.details.gap,
    minWidth: 0,
  },
  renewalText: {
    color: home.subscriptionCard.content.renewal.color,
    flexShrink: 1,
    fontSize: home.subscriptionCard.content.renewal.fontSize,
    fontWeight: home.subscriptionCard.content.renewal.fontWeight,
  },
  warningRenewalText: {
    color: home.subscriptionCard.content.renewal.warningColor,
  },
  rightColumn: {
    alignItems: "center",
    flexDirection: "row",
    flexShrink: 0,
    gap: home.subscriptionCard.rightColumn.gap,
  },
  priceText: {
    color: home.subscriptionCard.price.color,
    flexShrink: 0,
    fontSize: home.subscriptionCard.price.fontSize,
    fontWeight: home.subscriptionCard.price.fontWeight,
  },
});
