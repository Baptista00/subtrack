import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import { input } from "../theme";
import { Input, type InputProps } from "./Input";

export type PasswordInputProps = Omit<InputProps, "rightElement" | "secureTextEntry">;

export function PasswordInput(props: PasswordInputProps) {
  const [isSecure, setIsSecure] = useState(true);

  return (
    <Input
      {...props}
      rightElement={
        <Pressable
          accessibilityLabel={isSecure ? "Mostrar senha" : "Ocultar senha"}
          accessibilityRole="button"
          onPress={() => setIsSecure((currentValue) => !currentValue)}
          style={styles.visibilityButton}
        >
          <Feather
            color={input.password.iconColor}
            name={isSecure ? "eye" : "eye-off"}
            size={input.password.iconSize}
          />
        </Pressable>
      }
      secureTextEntry={isSecure}
    />
  );
}

const styles = StyleSheet.create({
  visibilityButton: {
    paddingHorizontal: input.password.iconPaddingHorizontal,
  },
});
