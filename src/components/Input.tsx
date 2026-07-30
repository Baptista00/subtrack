import { type ReactNode, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import { input } from "../theme";
import { FormField } from "./FormField";

export type InputProps = Omit<
  TextInputProps,
  "editable" | "placeholderTextColor" | "readOnly" | "style"
> & {
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
  errorStyle?: StyleProp<TextStyle>;
  fieldStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
};

export function Input({
  containerStyle,
  error,
  errorStyle,
  fieldStyle,
  inputStyle,
  label,
  labelStyle,
  leftElement,
  onBlur,
  onFocus,
  rightElement,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = Boolean(error);

  return (
    <FormField
      error={error}
      errorStyle={errorStyle}
      focused={isFocused}
      label={label}
      labelStyle={labelStyle}
      style={containerStyle}
    >
      <View style={[styles.field, getFieldStateStyle(hasError, isFocused), fieldStyle]}>
        {leftElement}
        <TextInput
          {...props}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          placeholderTextColor={input.colors.placeholder}
          style={[styles.textInput, inputStyle]}
        />
        {rightElement}
      </View>
    </FormField>
  );
}

function getFieldStateStyle(hasError: boolean, isFocused: boolean): ViewStyle {
  if (hasError) {
    return styles.fieldError;
  }

  return isFocused ? styles.fieldFocused : styles.fieldDefault;
}

const styles = StyleSheet.create({
  field: {
    alignItems: "center",
    backgroundColor: input.colors.background,
    borderRadius: input.layout.borderRadius,
    borderWidth: input.layout.borderWidth,
    flexDirection: "row",
    width: input.layout.width,
  },
  fieldDefault: {
    borderColor: input.colors.borderDefault,
  },
  fieldFocused: {
    borderColor: input.colors.borderFocused,
  },
  fieldError: {
    borderColor: input.colors.borderError,
  },
  textInput: {
    color: input.colors.text,
    flex: 1,
    fontSize: input.typography.inputFontSize,
    paddingHorizontal: input.layout.paddingHorizontal,
    paddingVertical: input.layout.paddingVertical,
  },
});
