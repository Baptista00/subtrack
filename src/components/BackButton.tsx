import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, type PressableProps } from "react-native";

import { home } from "../theme";

export type BackButtonProps = Omit<
  PressableProps,
  "accessibilityLabel" | "accessibilityRole" | "children" | "style"
> & {
  onPress: () => void;
};

export function BackButton({ onPress, ...props }: BackButtonProps) {
  return (
    <Pressable
      {...props}
      accessibilityLabel="Voltar"
      accessibilityRole="button"
      hitSlop={8}
      onPress={onPress}
      style={styles.button}
    >
      <Feather
        accessible={false}
        color={home.header.menuButton.iconColor}
        name="arrow-left"
        size={home.header.menuButton.iconSize}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: home.header.menuButton.backgroundColor,
    borderColor: home.header.menuButton.borderColor,
    borderRadius: home.header.menuButton.borderRadius,
    borderWidth: home.header.menuButton.borderWidth,
    elevation: home.header.menuButton.elevation,
    height: home.header.menuButton.height,
    justifyContent: "center",
    shadowColor: home.header.menuButton.shadowColor,
    shadowOffset: home.header.menuButton.shadowOffset,
    shadowOpacity: home.header.menuButton.shadowOpacity,
    shadowRadius: home.header.menuButton.shadowRadius,
    width: home.header.menuButton.width,
  },
});
