import { Feather } from "@expo/vector-icons";
import { useCallback, useMemo, useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { router, useFocusEffect } from "expo-router";

import { useAuth } from "../src/auth";
import {
  AppText,
  BottomNav,
  Button,
  EmptyState,
  FloatingActionButton,
  Input,
  ScreenContainer,
  SubscriptionCard,
} from "../src/components";
import {
  fetchUserSubscriptions,
  formatCurrency,
  formatDatabaseDate,
  getCategoryLabel,
  getServiceInitials,
} from "../src/lib/subscriptions";
import { colors, home, input, spacing } from "../src/theme";
import type { Subscription } from "../src/types/subscription";

type SubscriptionsListHeaderProps = {
  hasLoadError: boolean;
  onRetry: () => void;
  onSearchQueryChange: (value: string) => void;
  resultsCountText: string;
  searchQuery: string;
};

export default function Assinaturas() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [hasLoadError, setHasLoadError] = useState(false);
  const activeRequestId = useRef(0);
  const userId = user?.id;

  const loadSubscriptions = useCallback(
    async (isActive: () => boolean) => {
      if (!userId) {
        if (isActive()) {
          setSubscriptions([]);
          setHasLoadError(true);
          setIsInitialLoading(false);
        }

        return;
      }

      try {
        const nextSubscriptions = await fetchUserSubscriptions(userId);

        if (!isActive()) {
          return;
        }

        setSubscriptions(nextSubscriptions);
        setHasLoadError(false);
      } catch {
        if (isActive()) {
          setHasLoadError(true);
        }
      } finally {
        if (isActive()) {
          setIsInitialLoading(false);
        }
      }
    },
    [userId],
  );

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const requestId = activeRequestId.current + 1;

      activeRequestId.current = requestId;

      async function fetchSubscriptions() {
        await loadSubscriptions(
          () => isActive && activeRequestId.current === requestId,
        );
      }

      void fetchSubscriptions();

      return () => {
        isActive = false;
        activeRequestId.current += 1;
      };
    }, [loadSubscriptions]),
  );

  const normalizedSearchQuery = useMemo(
    () => normalizeSearchText(searchQuery),
    [searchQuery],
  );
  const filteredSubscriptions = useMemo(
    () =>
      normalizedSearchQuery
        ? subscriptions.filter((subscription) =>
            normalizeSearchText(subscription.name).includes(normalizedSearchQuery),
          )
        : subscriptions,
    [normalizedSearchQuery, subscriptions],
  );
  const hasSubscriptions = subscriptions.length > 0;
  const hasSearchQuery = normalizedSearchQuery.length > 0;
  const resultsCountText = getResultsCountText(
    filteredSubscriptions.length,
    hasSearchQuery,
  );

  function handleRetry() {
    const requestId = activeRequestId.current + 1;

    activeRequestId.current = requestId;
    void loadSubscriptions(() => activeRequestId.current === requestId);
  }

  function renderMainContent() {
    if (isInitialLoading) {
      return (
        <View style={styles.statusContainer}>
          <ActivityIndicator color={colors.primary} />
          <AppText variant="Body" style={styles.statusText}>
            Carregando assinaturas...
          </AppText>
        </View>
      );
    }

    if (hasLoadError && !hasSubscriptions) {
      return (
        <>
          <View style={styles.statusContainer}>
            <AppText accessibilityRole="alert" variant="Body" style={styles.errorText}>
              Não foi possível carregar suas assinaturas.
            </AppText>
            <Button onPress={handleRetry} variant="secondary">
              Tentar novamente
            </Button>
          </View>
          <FloatingActionButton onPress={() => router.push("/adicionar")} />
        </>
      );
    }

    if (!hasSubscriptions) {
      return (
        <EmptyState
          description="Adicione sua primeira assinatura para começar a acompanhar seus gastos."
          onAddSubscription={() => router.push("/adicionar")}
          title="Você ainda não possui assinaturas"
        />
      );
    }

    return (
      <>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={filteredSubscriptions}
          ItemSeparatorComponent={ListItemSeparator}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          keyExtractor={(item) => item.id}
          ListEmptyComponent={NoSearchResults}
          ListHeaderComponent={
            <SubscriptionsListHeader
              hasLoadError={hasLoadError}
              onRetry={handleRetry}
              onSearchQueryChange={setSearchQuery}
              resultsCountText={resultsCountText}
              searchQuery={searchQuery}
            />
          }
          renderItem={({ item }) => {
            const renewalDate = formatDatabaseDate(item.next_renewal_date);

            return (
              <SubscriptionCard
                accessibilityLabel={`Editar ${item.name}`}
                category={getCategoryLabel(item.category)}
                onPress={() =>
                  router.push({
                    pathname: "/assinatura/[id]",
                    params: { id: item.id },
                  })
                }
                priceText={formatCurrency(item.price)}
                renewalText={
                  renewalDate === "Data indisponível"
                    ? renewalDate
                    : `Renova ${renewalDate}`
                }
                serviceColor={item.service_color}
                serviceInitial={getServiceInitials(item.name)}
                serviceName={item.name}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          style={styles.list}
        />
        <FloatingActionButton onPress={() => router.push("/adicionar")} />
      </>
    );
  }

  return (
    <ScreenContainer style={styles.screen}>
      <View style={styles.header}>
        <AppText accessibilityRole="header" variant="Heading 1" style={styles.title}>
          Assinaturas
        </AppText>
        <AppText variant="Body" style={styles.subtitle}>
          Gerencie seus serviços recorrentes.
        </AppText>
      </View>

      {renderMainContent()}

      <BottomNav
        activeTab="subscriptions"
        onHomePress={() => router.replace("/")}
        onProfilePress={() => router.replace("/perfil")}
        onSubscriptionsPress={() => router.replace("/assinaturas")}
      />
    </ScreenContainer>
  );
}

function SubscriptionsListHeader({
  hasLoadError,
  onRetry,
  onSearchQueryChange,
  resultsCountText,
  searchQuery,
}: SubscriptionsListHeaderProps) {
  return (
    <View style={styles.listHeader}>
      {hasLoadError ? (
        <View style={styles.inlineErrorContainer}>
          <AppText accessibilityRole="alert" variant="Body" style={styles.inlineErrorText}>
            Não foi possível carregar suas assinaturas.
          </AppText>
          <Button onPress={onRetry} variant="secondary">
            Tentar novamente
          </Button>
        </View>
      ) : null}

      <Input
        accessibilityLabel="Buscar assinatura"
        autoCapitalize="none"
        autoCorrect={false}
        leftElement={
          <View style={styles.searchIcon}>
            <Feather
              accessible={false}
              color={colors.textSecondary}
              name="search"
              size={20}
            />
          </View>
        }
        onChangeText={onSearchQueryChange}
        placeholder="Buscar assinatura"
        returnKeyType="search"
        value={searchQuery}
      />

      <AppText variant="Label" style={styles.resultsCount}>
        {resultsCountText}
      </AppText>
    </View>
  );
}

function ListItemSeparator() {
  return <View style={styles.itemSeparator} />;
}

function NoSearchResults() {
  return (
    <View style={styles.noResultsContainer}>
      <AppText variant="Heading 2" style={styles.noResultsTitle}>
        Nenhuma assinatura encontrada
      </AppText>
      <AppText variant="Body" style={styles.noResultsDescription}>
        Tente buscar por outro nome.
      </AppText>
    </View>
  );
}

function getResultsCountText(count: number, hasSearchQuery: boolean): string {
  if (hasSearchQuery) {
    if (count === 0) {
      return "Nenhum resultado";
    }

    return count === 1 ? "1 resultado" : `${count} resultados`;
  }

  return count === 1 ? "1 assinatura" : `${count} assinaturas`;
}

function normalizeSearchText(text: string): string {
  const normalizedText = text.trim().toLowerCase();

  return typeof normalizedText.normalize === "function"
    ? normalizedText.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    : normalizedText;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
  },
  header: {
    gap: spacing[1],
    paddingBottom: home.header.container.paddingBottom,
    paddingHorizontal: home.header.container.paddingHorizontal,
    paddingTop: home.header.container.paddingTop,
  },
  title: {
    color: home.header.title.color,
    fontSize: home.header.title.fontSize,
    fontWeight: home.header.title.fontWeight,
    letterSpacing: home.header.title.letterSpacing,
  },
  subtitle: {
    color: colors.textSecondary,
  },
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 112,
    paddingHorizontal: home.header.container.paddingHorizontal,
  },
  listHeader: {
    gap: spacing[2],
    paddingBottom: spacing[3],
  },
  searchIcon: {
    paddingLeft: input.layout.paddingHorizontal,
  },
  resultsCount: {
    color: colors.textSecondary,
  },
  itemSeparator: {
    height: 10,
  },
  statusContainer: {
    alignItems: "center",
    flex: 1,
    gap: spacing[3],
    justifyContent: "center",
    paddingHorizontal: home.header.container.paddingHorizontal,
  },
  statusText: {
    color: colors.textSecondary,
  },
  errorText: {
    color: colors.error,
    textAlign: "center",
  },
  inlineErrorContainer: {
    alignItems: "center",
    gap: spacing[2],
  },
  inlineErrorText: {
    color: colors.error,
    textAlign: "center",
  },
  noResultsContainer: {
    alignItems: "center",
    flex: 1,
    gap: spacing[1],
    justifyContent: "center",
    paddingHorizontal: spacing[4],
  },
  noResultsTitle: {
    color: colors.textPrimary,
    textAlign: "center",
  },
  noResultsDescription: {
    color: colors.textSecondary,
    textAlign: "center",
  },
});
