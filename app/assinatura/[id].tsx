import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { useAuth } from "../../src/auth";
import {
  AppText,
  BackButton,
  Button,
  ScreenContainer,
  SubscriptionForm,
} from "../../src/components";
import {
  formatPriceInput,
  getServiceColor,
  validateSubscriptionForm,
  type SubscriptionFormFieldErrors,
} from "../../src/lib/subscription-form";
import { formatDatabaseDate, normalizeSubscriptions } from "../../src/lib/subscriptions";
import { supabase } from "../../src/lib/supabase";
import {
  colors,
  home,
  spacing,
  type BillingCycle,
  type SubscriptionCategory,
} from "../../src/theme";

const subscriptionsSelect =
  "id, user_id, name, price, category, service_color, next_renewal_date, billing_cycle, created_at, updated_at";

export default function EditarAssinatura() {
  const { id: routeId } = useLocalSearchParams<{ id?: string | string[] }>();
  const { user } = useAuth();
  const subscriptionId =
    typeof routeId === "string" && routeId.trim().length > 0 ? routeId : null;
  const [name, setName] = useState("");
  const [category, setCategory] = useState<SubscriptionCategory>("streaming");
  const [price, setPrice] = useState("");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [nextRenewalDate, setNextRenewalDate] = useState("");
  const [errors, setErrors] = useState<SubscriptionFormFieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [hasLoadError, setHasLoadError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function loadSubscription() {
      if (!subscriptionId || !user) {
        if (isActive) {
          setHasLoadError(true);
          setIsInitialLoading(false);
        }

        return;
      }

      setIsInitialLoading(true);
      setHasLoadError(false);
      setSubmitError(null);

      try {
        const { data, error } = await supabase
          .from("subscriptions")
          .select(subscriptionsSelect)
          .eq("id", subscriptionId)
          .eq("user_id", user.id)
          .maybeSingle();

        if (!isActive) {
          return;
        }

        const subscription = data
          ? normalizeSubscriptions([data])[0]
          : undefined;
        const formattedNextRenewalDate = subscription
          ? formatDatabaseDate(subscription.next_renewal_date)
          : null;

        if (
          error ||
          !subscription ||
          !formattedNextRenewalDate ||
          formattedNextRenewalDate === "Data indisponível"
        ) {
          setHasLoadError(true);
          return;
        }

        setName(subscription.name);
        setCategory(subscription.category);
        setPrice(formatPriceInput(subscription.price));
        setBillingCycle(subscription.billing_cycle);
        setNextRenewalDate(formattedNextRenewalDate);
        setErrors({});
        setHasLoadError(false);
      } catch {
        if (isActive) {
          setHasLoadError(true);
        }
      } finally {
        if (isActive) {
          setIsInitialLoading(false);
        }
      }
    }

    void loadSubscription();

    return () => {
      isActive = false;
    };
  }, [subscriptionId, user]);

  function returnToHome() {
    router.replace("/");
  }

  async function handleSubmit() {
    if (isSubmitting) {
      return;
    }

    const validation = validateSubscriptionForm({
      name,
      category,
      price,
      billingCycle,
      nextRenewalDate,
    });

    setErrors(validation.errors);
    setSubmitError(null);

    if (!validation.values) {
      return;
    }

    if (!user || !subscriptionId) {
      setSubmitError("Não foi possível atualizar a assinatura. Tente novamente.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from("subscriptions")
        .update({
          name: validation.values.name,
          price: validation.values.price,
          category: validation.values.category,
          service_color: getServiceColor(validation.values.category),
          next_renewal_date: validation.values.nextRenewalDate,
          billing_cycle: validation.values.billingCycle,
          updated_at: new Date().toISOString(),
        })
        .eq("id", subscriptionId)
        .eq("user_id", user.id)
        .select("id")
        .single();

      if (error || !data) {
        setSubmitError("Não foi possível atualizar a assinatura. Tente novamente.");
        return;
      }

      router.replace("/");
    } catch {
      setSubmitError("Não foi possível atualizar a assinatura. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isInitialLoading) {
    return (
      <ScreenContainer style={styles.statusContainer}>
        <ActivityIndicator color={colors.primary} />
        <AppText variant="Body" style={styles.statusText}>
          Carregando assinatura...
        </AppText>
      </ScreenContainer>
    );
  }

  if (hasLoadError) {
    return (
      <ScreenContainer style={styles.statusContainer}>
        <AppText accessibilityRole="alert" variant="Body" style={styles.errorText}>
          Não foi possível carregar esta assinatura.
        </AppText>
        <Button onPress={returnToHome} variant="secondary">
          Voltar
        </Button>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <BackButton onPress={returnToHome} />
            <AppText accessibilityRole="header" variant="Heading 1" style={styles.title}>
              Editar assinatura
            </AppText>
          </View>

          <SubscriptionForm
            billingCycle={billingCycle}
            category={category}
            errors={errors}
            isSubmitting={isSubmitting}
            name={name}
            nextRenewalDate={nextRenewalDate}
            onBillingCycleChange={setBillingCycle}
            onCategoryChange={setCategory}
            onNameChange={setName}
            onNextRenewalDateChange={setNextRenewalDate}
            onPriceChange={setPrice}
            onSubmit={handleSubmit}
            price={price}
            submitError={submitError}
            submitLabel="Salvar alterações"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing[6],
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing[3],
    paddingBottom: home.header.container.paddingBottom,
    paddingHorizontal: home.header.container.paddingHorizontal,
    paddingTop: home.header.container.paddingTop,
  },
  title: {
    color: colors.textPrimary,
    fontSize: home.header.title.fontSize,
    fontWeight: home.header.title.fontWeight,
    letterSpacing: home.header.title.letterSpacing,
  },
  statusContainer: {
    alignItems: "center",
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
