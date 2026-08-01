import { Feather } from "@expo/vector-icons";
import { type ComponentProps, useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { router } from "expo-router";

import { useAuth } from "../src/auth";
import { AppText, BottomNav, Button, ScreenContainer } from "../src/components";
import { button, colors, home, spacing, typography } from "../src/theme";

type ProfileOptionRowProps = {
  icon: ComponentProps<typeof Feather>["name"];
  label: string;
  value?: string;
  onPress?: () => void;
  showDivider?: boolean;
};

export default function Perfil() {
  const { signOut, user } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);
  const userName = getUserName(user?.user_metadata.full_name);
  const userEmail = getUserEmail(user?.email);

  function handleSignOutPress() {
    if (isSigningOut) {
      return;
    }

    setSignOutError(null);

    if (Platform.OS === "web") {
      const isConfirmed = globalThis.confirm(
        "Sair da conta?\n\nVocê precisará entrar novamente para acessar suas assinaturas.",
      );

      if (isConfirmed) {
        void handleSignOut();
      }

      return;
    }

    Alert.alert(
      "Sair da conta?",
      "Você precisará entrar novamente para acessar suas assinaturas.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: () => {
            void handleSignOut();
          },
        },
      ],
    );
  }

  async function handleSignOut() {
    if (isSigningOut) {
      return;
    }

    setIsSigningOut(true);
    setSignOutError(null);

    try {
      await signOut();
    } catch {
      setSignOutError("Não foi possível sair da conta. Tente novamente.");
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
      >
        <View style={styles.header}>
          <View accessible={false} style={styles.avatar}>
            <AppText variant="Display" style={styles.avatarInitials}>
              {getUserInitials(userName)}
            </AppText>
          </View>
          <AppText variant="Heading 1" style={styles.userName}>
            {userName}
          </AppText>
          <AppText variant="Body" style={styles.userEmail}>
            {userEmail}
          </AppText>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <AppText variant="Label" style={styles.sectionTitle}>
              CONTA
            </AppText>
            <View style={styles.optionsCard}>
              <ProfileOptionRow
                icon="user"
                label="Editar perfil"
                onPress={showComingSoon}
                showDivider
              />
              <ProfileOptionRow
                icon="bell"
                label="Notificações"
                onPress={showComingSoon}
              />
            </View>
          </View>

          <View style={styles.section}>
            <AppText variant="Label" style={styles.sectionTitle}>
              PREFERÊNCIAS
            </AppText>
            <View style={styles.optionsCard}>
              <ProfileOptionRow
                icon="dollar-sign"
                label="Moeda"
                showDivider
                value="BRL (R$)"
              />
              <ProfileOptionRow
                icon="settings"
                label="Configurações"
                onPress={showComingSoon}
              />
            </View>
          </View>

          <View style={styles.signOutSection}>
            {signOutError ? (
              <AppText
                accessibilityRole="alert"
                variant="Small/Helper"
                style={styles.errorText}
              >
                {signOutError}
              </AppText>
            ) : null}
            <Button
              icon={
                <Feather
                  accessible={false}
                  color={colors.error}
                  name="log-out"
                  size={button.danger.iconSize}
                />
              }
              loading={isSigningOut}
              loadingText="Saindo..."
              onPress={handleSignOutPress}
              style={styles.signOutButton}
              variant="danger"
            >
              Sair da conta
            </Button>
          </View>
        </View>
      </ScrollView>

      <BottomNav
        activeTab="profile"
        onHomePress={() => router.replace("/")}
        onProfilePress={() => router.replace("/perfil")}
        onSubscriptionsPress={() => router.replace("/assinaturas")}
      />
    </ScreenContainer>
  );
}

function ProfileOptionRow({
  icon,
  label,
  onPress,
  showDivider = false,
  value,
}: ProfileOptionRowProps) {
  const content = (
    <>
      <Feather
        accessible={false}
        color={colors.textSecondary}
        name={icon}
        size={20}
      />
      <AppText variant="Body" style={styles.optionLabel}>
        {label}
      </AppText>
      <View style={styles.optionEnd}>
        {value ? (
          <AppText variant="Label" style={styles.optionValue}>
            {value}
          </AppText>
        ) : null}
        {onPress ? (
          <Feather
            accessible={false}
            color={colors.toggleOff}
            name="chevron-right"
            size={20}
          />
        ) : null}
      </View>
    </>
  );

  if (!onPress) {
    return <View style={[styles.optionRow, showDivider && styles.optionDivider]}>{content}</View>;
  }

  return (
    <Pressable
      accessibilityHint="Esta funcionalidade será implementada em breve."
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.optionRow,
        showDivider && styles.optionDivider,
        pressed ? styles.optionRowPressed : undefined,
      ]}
    >
      {content}
    </Pressable>
  );
}

function showComingSoon() {
  const message = "Esta funcionalidade ainda será implementada.";

  if (Platform.OS === "web") {
    if (typeof globalThis.alert === "function") {
      globalThis.alert(`Em breve\n\n${message}`);
    }

    return;
  }

  Alert.alert("Em breve", message);
}

function getUserName(fullName: unknown): string {
  if (typeof fullName !== "string") {
    return "Usuário";
  }

  const trimmedName = fullName.trim();

  return trimmedName || "Usuário";
}

function getUserEmail(email: string | undefined): string {
  const trimmedEmail = email?.trim();

  return trimmedEmail || "E-mail indisponível";
}

function getUserInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return "U";
  }

  return words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing[6],
  },
  header: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderBottomLeftRadius: home.financialSummaryCard.container.borderRadius,
    borderBottomRightRadius: home.financialSummaryCard.container.borderRadius,
    gap: spacing[2],
    paddingBottom: spacing[5],
    paddingHorizontal: home.header.container.paddingHorizontal,
    paddingTop: spacing[5],
  },
  avatar: {
    alignItems: "center",
    backgroundColor: colors.success,
    borderRadius: 9999,
    height: 84,
    justifyContent: "center",
    width: 84,
  },
  avatarInitials: {
    color: colors.primary,
    fontSize: typography.Display.fontSize,
    fontWeight: typography.Display.fontWeight,
  },
  userName: {
    color: colors.surface,
    fontSize: home.header.title.fontSize,
    fontWeight: home.header.title.fontWeight,
    textAlign: "center",
  },
  userEmail: {
    color: colors.surface,
    fontSize: home.subscriptionCard.price.fontSize,
    opacity: 0.75,
    textAlign: "center",
  },
  content: {
    gap: spacing[4],
    paddingHorizontal: home.header.container.paddingHorizontal,
    paddingTop: spacing[4],
  },
  section: {
    gap: spacing[2],
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: typography.Label.fontSize,
    fontWeight: "600",
  },
  optionsCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: home.subscriptionCard.container.borderRadius,
    borderWidth: home.subscriptionCard.container.borderWidth,
    overflow: "hidden",
    ...home.subscriptionCard.shadow,
  },
  optionRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing[2],
    minHeight: 54,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  optionDivider: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  optionRowPressed: {
    backgroundColor: home.subscriptionCard.pressed.backgroundColor,
  },
  optionLabel: {
    color: colors.textPrimary,
    flex: 1,
    flexShrink: 1,
  },
  optionEnd: {
    alignItems: "center",
    flexDirection: "row",
    flexShrink: 0,
    gap: spacing[1],
  },
  optionValue: {
    color: colors.textSecondary,
  },
  signOutSection: {
    gap: spacing[2],
    paddingTop: spacing[1],
  },
  errorText: {
    color: colors.error,
    textAlign: "center",
  },
  signOutButton: {
    width: "100%",
  },
});
