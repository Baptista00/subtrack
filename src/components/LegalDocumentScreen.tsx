import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import type { LegalSection } from "../content/legal";
import { colors, home, spacing } from "../theme";
import { AppText } from "./AppText";
import { BackButton } from "./BackButton";
import { ScreenContainer } from "./ScreenContainer";

export type LegalDocumentScreenProps = {
  title: string;
  notice: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export function LegalDocumentScreen({
  lastUpdated,
  notice,
  sections,
  title,
}: LegalDocumentScreenProps) {
  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
      >
        <View style={styles.header}>
          <BackButton onPress={() => router.back()} />
          <AppText accessibilityRole="header" variant="Heading 1" style={styles.title}>
            {title}
          </AppText>
        </View>

        <View style={styles.content}>
          <View accessibilityLabel={notice} style={styles.notice}>
            <AppText variant="Small/Helper" style={styles.noticeText}>
              {notice}
            </AppText>
          </View>

          <AppText variant="Small/Helper" style={styles.lastUpdated}>
            Última atualização: {lastUpdated}
          </AppText>

          {sections.map((section) => (
            <View key={section.title} style={styles.section}>
              <AppText accessibilityRole="header" variant="Heading 2" style={styles.sectionTitle}>
                {section.title}
              </AppText>

              {section.paragraphs.map((paragraph) => (
                <AppText key={paragraph} variant="Body" style={styles.paragraph}>
                  {paragraph}
                </AppText>
              ))}

              {section.items ? (
                <View style={styles.items}>
                  {section.items.map((item) => (
                    <View key={item} style={styles.item}>
                      <View accessible={false} style={styles.bullet} />
                      <AppText variant="Body" style={styles.itemText}>
                        {item}
                      </AppText>
                    </View>
                  ))}
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[5],
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing[3],
    paddingHorizontal: home.header.container.paddingHorizontal,
    paddingVertical: spacing[3],
  },
  title: {
    color: colors.textPrimary,
    flex: 1,
  },
  content: {
    gap: spacing[3],
    paddingHorizontal: home.header.container.paddingHorizontal,
  },
  notice: {
    backgroundColor: colors.surface,
    borderColor: colors.warning,
    borderRadius: home.subscriptionCard.container.borderRadius,
    borderWidth: 1,
    borderLeftWidth: 3,
    padding: spacing[3],
  },
  noticeText: {
    color: colors.textSecondary,
    lineHeight: 18,
  },
  lastUpdated: {
    color: colors.textSecondary,
  },
  section: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: home.subscriptionCard.container.borderRadius,
    borderWidth: home.subscriptionCard.container.borderWidth,
    gap: spacing[2],
    padding: spacing[3],
  },
  sectionTitle: {
    color: colors.textPrimary,
  },
  paragraph: {
    color: colors.textPrimary,
    lineHeight: 23,
  },
  items: {
    gap: spacing[2],
  },
  item: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing[2],
  },
  bullet: {
    backgroundColor: colors.primary,
    borderRadius: 9999,
    height: 6,
    marginTop: 9,
    width: 6,
  },
  itemText: {
    color: colors.textPrimary,
    flex: 1,
    lineHeight: 23,
  },
});
