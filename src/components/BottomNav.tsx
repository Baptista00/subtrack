import { Ionicons } from "@expo/vector-icons";
import { type ComponentProps } from "react";
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { home } from "../theme";
import { AppText } from "./AppText";

export type BottomNavTab = "home" | "subscriptions" | "profile";

export interface BottomNavProps {
  activeTab: BottomNavTab;
  onHomePress?: () => void;
  onSubscriptionsPress?: () => void;
  onProfilePress?: () => void;
  style?: StyleProp<ViewStyle>;
}

type BottomNavItem = {
  tab: BottomNavTab;
  label: string;
  activeIcon: ComponentProps<typeof Ionicons>["name"];
  inactiveIcon: ComponentProps<typeof Ionicons>["name"];
  onPress?: () => void;
};

export function BottomNav({
  activeTab,
  onHomePress,
  onProfilePress,
  onSubscriptionsPress,
  style,
}: BottomNavProps) {
  const items: BottomNavItem[] = [
    {
      tab: "home",
      label: "Início",
      activeIcon: "home",
      inactiveIcon: "home-outline",
      onPress: onHomePress,
    },
    {
      tab: "subscriptions",
      label: "Assinaturas",
      activeIcon: "card",
      inactiveIcon: "card-outline",
      onPress: onSubscriptionsPress,
    },
    {
      tab: "profile",
      label: "Perfil",
      activeIcon: "person",
      inactiveIcon: "person-outline",
      onPress: onProfilePress,
    },
  ];

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        {items.map((item) => {
          const isActive = item.tab === activeTab;
          const color = isActive ? home.bottomNav.active.color : home.bottomNav.inactive.color;

          return (
            <Pressable
              key={item.tab}
              accessibilityLabel={item.label}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              onPress={item.onPress}
              style={styles.tab}
            >
              <Ionicons
                accessible={false}
                color={color}
                name={isActive ? item.activeIcon : item.inactiveIcon}
                size={home.bottomNav.icon.size}
              />
              <AppText variant="Body" style={[styles.label, { color }]}>
                {item.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: home.bottomNav.container.backgroundColor,
    borderTopColor: home.bottomNav.container.borderTopColor,
    borderTopWidth: home.bottomNav.container.borderTopWidth,
    flexShrink: home.bottomNav.container.flexShrink,
    width: home.bottomNav.container.width,
  },
  content: {
    alignItems: "center",
    flexDirection: "row",
  },
  tab: {
    alignItems: "center",
    flex: 1,
    gap: home.bottomNav.tab.gap,
    justifyContent: "center",
    paddingBottom: home.bottomNav.tab.paddingBottom,
    paddingTop: home.bottomNav.tab.paddingTop,
  },
  label: {
    fontSize: home.bottomNav.label.fontSize,
    fontWeight: home.bottomNav.label.fontWeight,
    lineHeight: home.bottomNav.label.lineHeight,
  },
});
