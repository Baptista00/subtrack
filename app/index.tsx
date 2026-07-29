import { FlatList, StyleSheet, View } from "react-native";

import {
  BottomNav,
  EmptyState,
  FinancialSummaryCard,
  FloatingActionButton,
  HomeHeader,
  ScreenContainer,
  SubscriptionCard,
  AppText,
} from "../src/components";
import { home } from "../src/theme";

interface PresentationSubscription {
  id: string;
  serviceName: string;
  serviceInitial: string;
  serviceColor: string;
  category: string;
  renewalText: string;
  priceText: string;
  warning?: boolean;
}

// Dados temporários de apresentação aprovados no Figma para validação visual.
const subscriptions: PresentationSubscription[] = [
  {
    id: "netflix",
    serviceName: "Netflix",
    serviceInitial: "N",
    serviceColor: "#E50914",
    category: "Streaming",
    renewalText: "Renova 02/08/2025",
    priceText: "R$ 55,90",
    warning: true,
  },
  {
    id: "spotify",
    serviceName: "Spotify",
    serviceInitial: "S",
    serviceColor: "#1DB954",
    category: "Música",
    renewalText: "Renova 10/08/2025",
    priceText: "R$ 21,90",
    warning: false,
  },
  {
    id: "chatgpt-plus",
    serviceName: "ChatGPT Plus",
    serviceInitial: "G",
    serviceColor: "#10A37F",
    category: "Produtividade",
    renewalText: "Renova 15/08/2025",
    priceText: "R$ 30,00",
    warning: false,
  },
  {
    id: "disney-plus",
    serviceName: "Disney+",
    serviceInitial: "D",
    serviceColor: "#0B3D91",
    category: "Streaming",
    renewalText: "Renova 20/08/2025",
    priceText: "R$ 27,90",
    warning: false,
  },
];

function ListHeader() {
  return (
    <View>
      <FinancialSummaryCard
        activeSubscriptionsCount={5}
        totalMonthlyText="R$ 149,90"
        upcomingRenewalsCount={3}
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
  const hasSubscriptions = subscriptions.length > 0;

  return (
    <ScreenContainer style={styles.screen}>
      <HomeHeader showMenuButton={hasSubscriptions} userName="Lucas" />
      {hasSubscriptions ? (
        <>
          <FlatList
            contentContainerStyle={styles.listContent}
            data={subscriptions}
            ItemSeparatorComponent={ListItemSeparator}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={ListHeader}
            renderItem={({ item }) => (
              <SubscriptionCard
                category={item.category}
                priceText={item.priceText}
                renewalText={item.renewalText}
                serviceColor={item.serviceColor}
                serviceInitial={item.serviceInitial}
                serviceName={item.serviceName}
                warning={item.warning}
              />
            )}
            showsVerticalScrollIndicator={false}
            style={styles.list}
          />
          <FloatingActionButton />
        </>
      ) : (
        <EmptyState />
      )}
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
});
