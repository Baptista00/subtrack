import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, type PressableProps, type StyleProp, type ViewStyle } from "react-native";

import { home } from "../theme";

export type FloatingActionButtonProps = Omit<PressableProps, "accessibilityLabel" | "accessibilityRole" | "children" | "style"> & {
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export function FloatingActionButton({ accessibilityLabel = "Adicionar assinatura", onPress, style, ...props }: FloatingActionButtonProps) {
  return (
    <Pressable {...props} accessibilityLabel={accessibilityLabel} accessibilityRole="button" hitSlop={8} onPress={onPress} style={({ pressed }) => [styles.container, pressed && styles.pressed, style]}>
      <Feather accessible={false} color={home.floatingActionButton.iconColor} name="plus" size={home.floatingActionButton.iconSize} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center", backgroundColor: home.floatingActionButton.backgroundColor, borderRadius: home.floatingActionButton.borderRadius,
    bottom: home.floatingActionButton.position.bottom, elevation: home.floatingActionButton.elevation, height: home.floatingActionButton.height,
    justifyContent: "center", position: "absolute", right: home.floatingActionButton.position.right,
    shadowColor: home.floatingActionButton.shadowColor, shadowOffset: home.floatingActionButton.shadowOffset,
    shadowOpacity: home.floatingActionButton.shadowOpacity, shadowRadius: home.floatingActionButton.shadowRadius,
    width: home.floatingActionButton.width, zIndex: 10,
  },
  pressed: { backgroundColor: home.floatingActionButton.pressedBackgroundColor, transform: [{ scale: home.floatingActionButton.pressedScale }] },
});
