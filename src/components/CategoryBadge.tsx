import { StyleSheet, View } from "react-native";

import { home } from "../theme";
import { AppText } from "./AppText";

export type CategoryBadgeProps = {
  category: string;
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const categoryStyle = home.categoryBadge.categories[category] ?? home.categoryBadge.fallback;

  return (
    <View style={[styles.container, { backgroundColor: categoryStyle.backgroundColor }]}>
      <AppText variant="Body" style={[styles.text, { color: categoryStyle.textColor }]}>
        {category}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: home.categoryBadge.borderRadius,
    paddingHorizontal: home.categoryBadge.paddingHorizontal,
    paddingVertical: home.categoryBadge.paddingVertical,
  },
  text: {
    fontSize: home.categoryBadge.typography.fontSize,
    fontWeight: home.categoryBadge.typography.fontWeight,
  },
});
