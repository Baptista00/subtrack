import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { home } from "../theme";
import { AppText } from "./AppText";

type HeaderWithoutMenu = { showMenuButton?: false; onMenuPress?: never };
type HeaderWithMenu = { showMenuButton: true; onMenuPress: () => void };

export type HomeHeaderProps = {
  userName: string;
  style?: StyleProp<ViewStyle>;
} & (HeaderWithoutMenu | HeaderWithMenu);

export function HomeHeader({ userName, style, ...menuProps }: HomeHeaderProps) {
  const showMenuButton = menuProps.showMenuButton === true;

  return (
    <View style={[styles.container, showMenuButton && styles.withMenu, style]}>
      <AppText accessibilityRole="header" variant="Heading 1" style={styles.title}>
        {`Olá, ${userName} 👋`}
      </AppText>
      {showMenuButton ? (
        <Pressable accessibilityLabel="Mais opções" accessibilityRole="button" hitSlop={8} onPress={menuProps.onMenuPress} style={styles.menuButton}>
          <Feather accessible={false} color={home.header.menuButton.iconColor} name="more-vertical" size={home.header.menuButton.iconSize} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: home.header.container.paddingBottom, paddingHorizontal: home.header.container.paddingHorizontal, paddingTop: home.header.container.paddingTop },
  withMenu: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  title: { color: home.header.title.color, fontSize: home.header.title.fontSize, fontWeight: home.header.title.fontWeight, letterSpacing: home.header.title.letterSpacing },
  menuButton: {
    alignItems: "center", backgroundColor: home.header.menuButton.backgroundColor, borderColor: home.header.menuButton.borderColor,
    borderRadius: home.header.menuButton.borderRadius, borderWidth: home.header.menuButton.borderWidth, elevation: home.header.menuButton.elevation,
    height: home.header.menuButton.height, justifyContent: "center", shadowColor: home.header.menuButton.shadowColor,
    shadowOffset: home.header.menuButton.shadowOffset, shadowOpacity: home.header.menuButton.shadowOpacity,
    shadowRadius: home.header.menuButton.shadowRadius, width: home.header.menuButton.width,
  },
});
