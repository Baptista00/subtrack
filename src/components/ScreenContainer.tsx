import { type PropsWithChildren } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  type ViewProps,
} from "react-native";

import { colors } from "../theme";

export type ScreenContainerProps = PropsWithChildren<
  ViewProps & {
    scrollable?: boolean;
  }
>;

export function ScreenContainer({
  children,
  scrollable = false,
  style,
  ...props
}: ScreenContainerProps) {
  return (
    <SafeAreaView {...props} style={[styles.container, style]}>
      {scrollable ? (
        <ScrollView keyboardShouldPersistTaps="handled" style={styles.scroll}>
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
});
