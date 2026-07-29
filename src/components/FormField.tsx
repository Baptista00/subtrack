import { type ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type TextStyle, type ViewStyle } from "react-native";

import { input } from "../theme";
import { AppText } from "./AppText";

export type FormFieldProps = {
  children: ReactNode;
  error?: string;
  focused?: boolean;
  label?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
};

export function FormField({
  children,
  error,
  focused = false,
  label,
  style,
  labelStyle,
  errorStyle,
}: FormFieldProps) {
  const hasError = Boolean(error);

  return (
    <View style={style}>
      {label ? (
        <AppText
          variant="Label"
          style={[styles.label, getLabelStateStyle(hasError, focused), labelStyle]}
        >
          {label}
        </AppText>
      ) : null}
      {children}
      {hasError ? (
        <AppText variant="Small/Helper" style={[styles.error, errorStyle]}>
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

function getLabelStateStyle(hasError: boolean, focused: boolean): TextStyle {
  if (hasError) {
    return styles.labelError;
  }

  return focused ? styles.labelFocused : styles.labelDefault;
}

const styles = StyleSheet.create({
  label: {
    fontSize: input.typography.label.fontSize,
    fontWeight: input.typography.label.fontWeight,
    marginBottom: input.spacing.labelMarginBottom,
  },
  labelDefault: {
    color: input.colors.placeholder,
  },
  labelFocused: {
    color: input.colors.borderFocused,
  },
  labelError: {
    color: input.colors.borderError,
  },
  error: {
    color: input.colors.borderError,
    fontSize: input.typography.error.fontSize,
    fontWeight: input.typography.error.fontWeight,
    marginTop: input.spacing.errorMarginTop,
  },
});
