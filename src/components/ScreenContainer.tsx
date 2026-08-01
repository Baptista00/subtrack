import { type PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  type ViewProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../theme";

export type ScreenContainerProps = PropsWithChildren<
  ViewProps & {
    bottomSafeArea?: boolean;
    scrollable?: boolean;
  }
>;

export function ScreenContainer({
  bottomSafeArea = true,
  children,
  scrollable = false,
  style,
  ...props
}: ScreenContainerProps) {
  return (
    <SafeAreaView
      {...props}
      edges={bottomSafeArea ? undefined : ["top", "left", "right"]}
      style={[styles.container, style]}
    >
      {scrollable ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            style={styles.scroll}
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardAvoidingView: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
