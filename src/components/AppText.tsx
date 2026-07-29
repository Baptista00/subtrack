import { Text, type TextProps, type TextStyle } from "react-native";

import { typography, type TypographyToken } from "../theme";

export type AppTextProps = TextProps & {
  variant: TypographyToken;
};

const variantStyles = {
  Display: {
    fontSize: typography.Display.fontSize,
    fontWeight: typography.Display.fontWeight,
  },
  "Heading 1": {
    fontSize: typography["Heading 1"].fontSize,
    fontWeight: typography["Heading 1"].fontWeight,
  },
  "Heading 2": {
    fontSize: typography["Heading 2"].fontSize,
    fontWeight: typography["Heading 2"].fontWeight,
  },
  Body: {
    fontSize: typography.Body.fontSize,
    fontWeight: typography.Body.fontWeight,
  },
  Label: {
    fontSize: typography.Label.fontSize,
    fontWeight: typography.Label.fontWeight,
  },
  "Small/Helper": {
    fontSize: typography["Small/Helper"].fontSize,
    fontWeight: typography["Small/Helper"].fontWeight,
  },
  "Section Label": {
    fontSize: typography["Section Label"].fontSize,
    fontWeight: typography["Section Label"].fontWeight,
  },
} as const satisfies Record<TypographyToken, TextStyle>;

export function AppText({ variant, style, ...props }: AppTextProps) {
  return <Text {...props} style={[variantStyles[variant], style]} />;
}
