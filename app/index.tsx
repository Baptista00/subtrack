import { useCallback, useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { router, useFocusEffect } from "expo-router";

import {
  BottomNav,
  EmptyState,
  FinancialSummaryCard,
  FloatingActionButton,
  HomeHeader,
  ScreenContainer,
  SubscriptionCard,
  AppText,
  Button,
} from "../src/components";
import { useAuth } from "../src/auth";
import {
  calculateMonthlyTotal,
  countUpcomingRenewals,
  formatCurrency,
  formatDatabaseDate,
  getCategoryLabel,
  getServiceInitials,
  normalizeSubscriptions,
} from "../src/lib/subscriptions";
import { supabase } from "../src/lib/supabase";
import { colors, home, spacing } from "../src/theme";
import type { Subscription } from "../src/types/subscription";

const subscriptionsSelect =
  "id, user_id, name, price, category, service_color, next_renewal_date, billing_cycle, created_at, updated_at";

type ListHeaderProps = {
  subscriptions: Subscription[];
};

function ListHeader({ subscriptions }: ListHeaderProps) {
  return (
    <View>
      <FinancialSummaryCard
        activeSubscriptionsCount={subscriptions.length}
        totalMonthlyText={formatCurrency(calculateMonthlyTotal(subscriptions))}
        upcomingRenewalsCount={countUpcomingRenewals(subscriptions)}
      />
      <View style={styles.summarySpacer} />
      <View style={styles.sectionHeader}>
        <AppText variant="Body" style={styles.sectionTitle}>
          Minhas assinaturas
        </AppText>
        <AppText variant="Label" style={styles.sectionAction}>
          Ver todas
        </AppText>
      </View>
    </View>
  );
}

function ListItemSeparator() {
  return <View style={styles.itemSeparator} />;
}

export default function Index() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [hasLoadError, setHasLoadError] = useState(false);
  const activeRequestId = useRef(0);
  const userId = user?.id;
  const fullName = user?.user_metadata.full_name;
  const userName =
    typeof fullName === "string" && fullName.trim().length > 0
      ? fullName.trim().split(/\s+/)[0]
      : "Usuário";

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
        const { data, error } = await supabase
          .from("subscriptions")
          .select(subscriptionsSelect)
          .eq("user_id", userId)
          .order("next_renewal_date", { ascending: true })
          .order("created_at", { ascending: false });

        if (!isActive()) {
          return;
        }

        if (error) {
          setHasLoadError(true);
          return;
        }

        setSubscriptions(normalizeSubscriptions(data as unknown));
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

  const hasSubscriptions = subscriptions.length > 0;

  function handleRetry() {
    const requestId = activeRequestId.current;

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
            <AppText variant="Body" style={styles.errorText}>
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
      return <EmptyState onAddSubscription={() => router.push("/adicionar")} />;
    }

    return (
      <>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={subscriptions}
          ItemSeparatorComponent={ListItemSeparator}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<ListHeader subscriptions={subscriptions} />}
          renderItem={({ item }) => {
            const renewalDate = formatDatabaseDate(item.next_renewal_date);

            return (
              <SubscriptionCard
                category={getCategoryLabel(item.category)}
                priceText={formatCurrency(item.price)}
                renewalText={
                  renewalDate === "Data indisponível"
                    ? renewalDate
                    : `Renova ${renewalDate}`
                }
                serviceColor={item.service_color}
                serviceInitial={getServiceInitials(item.name)}
                serviceName={item.name}
                accessibilityLabel={`Editar ${item.name}`}
                onPress={() =>
                  router.push({
                    pathname: "/assinatura/[id]",
                    params: { id: item.id },
                  })
                }
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
      <HomeHeader showMenuButton={hasSubscriptions} userName={userName} />
      {renderMainContent()}
      <BottomNav activeTab="home" />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    position: "relative",
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 112,
    paddingHorizontal: home.header.container.paddingHorizontal,
  },
  summarySpacer: {
    height: 20,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: home.subscriptionsSection.marginBottom,
  },
  sectionTitle: {
    color: home.subscriptionsSection.title.color,
    fontSize: home.subscriptionsSection.title.fontSize,
    fontWeight: home.subscriptionsSection.title.fontWeight,
  },
  sectionAction: {
    color: home.subscriptionsSection.action.color,
    fontSize: home.subscriptionsSection.action.fontSize,
    fontWeight: home.subscriptionsSection.action.fontWeight,
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
});
