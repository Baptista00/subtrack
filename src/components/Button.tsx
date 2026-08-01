import { type ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type AccessibilityState,
  type PressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import { button, type ButtonVariant } from "../theme";
import { AppText } from "./AppText";

type SharedButtonProps = Omit<
  PressableProps,
  "accessibilityRole" | "accessibilityState" | "children" | "disabled" | "style"
> & {
  accessibilityState?: AccessibilityState;
  children: ReactNode;
  disabled?: boolean;
  style?: PressableProps["style"];
};

type PrimaryButtonProps = SharedButtonProps & {
  variant: "primary";
  loading?: boolean;
  /** O chamador define o tamanho visual indicado por `button.primary.iconSize`. */
  icon?: ReactNode;
};

type SecondaryButtonProps = SharedButtonProps & {
  variant: "secondary";
  icon?: never;
  loading?: never;
};

type DangerButtonProps = SharedButtonProps & {
  variant: "danger";
  loading?: boolean;
  /** O chamador define o tamanho visual indicado por `button.danger.iconSize`. */
  icon?: ReactNode;
};

type GhostButtonProps = SharedButtonProps & {
  variant: "ghost";
  icon?: never;
  loading?: never;
};

export type ButtonProps =
  | PrimaryButtonProps
  | SecondaryButtonProps
  | DangerButtonProps
  | GhostButtonProps;

export function Button({
  accessibilityState,
  children,
  disabled = false,
  icon,
  loading,
  style,
  variant,
  ...props
}: ButtonProps) {
  const isLoading =
    (variant === "primary" || variant === "danger") && loading === true;
  const isDisabled = disabled || isLoading;
  const loadingConfig =
    variant === "danger" ? button.danger.loading : button.primary.loading;
  const loadingText = variant === "danger" ? "Excluindo..." : "Carregando...";

  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      accessibilityState={{
        ...accessibilityState,
        busy: isLoading,
        disabled: isDisabled,
      }}
      disabled={isDisabled}
      style={(state) => [
        styles.base,
        variant === "ghost" ? styles.ghostLayout : styles.fixedLayout,
        getButtonStyle(variant, state, isDisabled),
        typeof style === "function" ? style(state) : style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator
          color={loadingConfig.indicatorColor}
          size={loadingConfig.indicatorSize}
          style={styles.leadingElement}
        />
      ) : (
        icon && <View style={styles.leadingElement}>{icon}</View>
      )}
      <AppText variant="Body" style={getTextStyle(variant, isDisabled)}>
        {isLoading ? loadingText : children}
      </AppText>
    </Pressable>
  );
}

function getButtonStyle(
  variant: ButtonVariant,
  state: PressableStateCallbackType,
  isDisabled: boolean,
): StyleProp<ViewStyle> {
  if (variant === "primary") {
    if (isDisabled) {
      return styles.primaryDisabled;
    }

    return state.pressed ? styles.primaryPressed : styles.primaryDefault;
  }

  if (variant === "secondary") {
    return state.pressed ? styles.secondaryPressed : styles.secondaryDefault;
  }

  if (variant === "danger") {
    return styles.dangerDefault;
  }

  return styles.ghostDefault;
}

function getTextStyle(variant: ButtonVariant, isDisabled: boolean): StyleProp<TextStyle> {
  if (variant === "primary") {
    return isDisabled ? styles.primaryDisabledText : styles.primaryText;
  }

  if (variant === "secondary") {
    return styles.secondaryText;
  }

  if (variant === "danger") {
    return styles.dangerText;
  }

  return styles.ghostText;
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  fixedLayout: {
    borderRadius: button.layout.borderRadius,
    height: button.layout.height,
    minWidth: button.layout.minWidth,
  },
  ghostLayout: {
    borderWidth: button.border.none,
    paddingHorizontal: button.layout.ghostPaddingHorizontal,
    paddingVertical: button.layout.ghostPaddingVertical,
  },
  leadingElement: {
    marginRight: button.layout.gap,
  },
  primaryDefault: {
    backgroundColor: button.primary.default.backgroundColor,
    borderWidth: button.border.none,
    boxShadow: button.primary.default.boxShadow,
  },
  primaryPressed: {
    backgroundColor: button.primary.pressed.backgroundColor,
    borderWidth: button.border.none,
    boxShadow: button.primary.pressed.boxShadow,
    transform: [{ scale: button.primary.pressed.scale }],
  },
  primaryDisabled: {
    backgroundColor: button.primary.disabled.backgroundColor,
    borderWidth: button.border.none,
    boxShadow: button.primary.disabled.boxShadow,
  },
  secondaryDefault: {
    backgroundColor: button.secondary.default.backgroundColor,
    borderColor: button.secondary.default.borderColor,
    borderWidth: button.border.outline,
    boxShadow: button.shadow.none,
  },
  secondaryPressed: {
    backgroundColor: button.secondary.pressed.backgroundColor,
    borderColor: button.secondary.pressed.borderColor,
    borderWidth: button.border.outline,
    boxShadow: button.shadow.none,
  },
  dangerDefault: {
    backgroundColor: button.danger.backgroundColor,
    borderColor: button.danger.borderColor,
    borderWidth: button.border.outline,
    boxShadow: button.shadow.none,
  },
  ghostDefault: {
    backgroundColor: button.ghost.backgroundColor,
    boxShadow: button.shadow.none,
  },
  primaryText: {
    color: button.primary.default.textColor,
    fontSize: button.typography.default.fontSize,
    fontWeight: button.typography.default.fontWeight,
  },
  primaryDisabledText: {
    color: button.primary.disabled.textColor,
    fontSize: button.typography.default.fontSize,
    fontWeight: button.typography.default.fontWeight,
  },
  secondaryText: {
    color: button.secondary.default.textColor,
    fontSize: button.typography.default.fontSize,
    fontWeight: button.typography.default.fontWeight,
  },
  dangerText: {
    color: button.danger.textColor,
    fontSize: button.typography.default.fontSize,
    fontWeight: button.typography.default.fontWeight,
  },
  ghostText: {
    color: button.ghost.textColor,
    fontSize: button.typography.ghost.fontSize,
    fontWeight: button.typography.ghost.fontWeight,
  },
});
