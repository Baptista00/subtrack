import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
  normalizeSubscriptionName,
  formatPriceInput,
  getServiceColor,
  validateSubscriptionForm,
  type SubscriptionFormFieldErrors,
} from "../../src/lib/subscription-form";
import {
  cancelSubscriptionReminder,
  getNotificationId,
  getReminderWarningMessage,
  removeNotificationId,
  scheduleSubscriptionReminder,
} from "../../src/lib/notifications";
import {
  fetchUserSubscriptionNames,
  formatDatabaseDate,
  isUniqueViolation,
  normalizeSubscriptions,
  subscriptionSummarySelect,
} from "../../src/lib/subscriptions";
import { supabase } from "../../src/lib/supabase";
import {
  colors,
  home,
  spacing,
  type BillingCycle,
  type SubscriptionCategory,
} from "../../src/theme";

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
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderMessage, setReminderMessage] = useState<string | null>(null);
  const [isAwaitingReminderNotice, setIsAwaitingReminderNotice] = useState(false);
  const activeOperation = useRef<"submit" | "delete" | null>(null);

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
          .select(subscriptionSummarySelect)
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

        const notificationId = await getNotificationId(subscription.id);

        if (!isActive) {
          return;
        }

        setName(subscription.name);
        setCategory(subscription.category);
        setPrice(formatPriceInput(subscription.price));
        setBillingCycle(subscription.billing_cycle);
        setNextRenewalDate(formattedNextRenewalDate);
        setReminderEnabled(Boolean(notificationId));
        setReminderMessage(null);
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
    if (activeOperation.current || isAwaitingReminderNotice) {
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
    setReminderMessage(null);

    if (!validation.values) {
      return;
    }

    if (!user || !subscriptionId) {
      setSubmitError("Não foi possível atualizar a assinatura. Tente novamente.");
      return;
    }

    activeOperation.current = "submit";
    setIsSubmitting(true);

    try {
      const normalizedName = normalizeSubscriptionName(validation.values.name);
      const existingSubscriptions = await fetchUserSubscriptionNames(user.id);
      const hasDuplicateName = existingSubscriptions.some(
        (subscription) =>
          subscription.id !== subscriptionId &&
          normalizeSubscriptionName(subscription.name) === normalizedName,
      );

      if (hasDuplicateName) {
        setSubmitError("Você já possui uma assinatura com este nome.");
        return;
      }

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

      if (error) {
        setSubmitError(
          isUniqueViolation(error)
            ? "Você já possui uma assinatura com este nome."
            : "Não foi possível atualizar a assinatura. Tente novamente.",
        );
        return;
      }

      if (!data) {
        setSubmitError("Não foi possível atualizar a assinatura. Tente novamente.");
        return;
      }

      try {
        await cancelSubscriptionReminder(subscriptionId);
      } catch {
        try {
          await removeNotificationId(subscriptionId);
        } catch {
          // A atualização no banco permanece válida mesmo se a limpeza local falhar.
        }

        setReminderEnabled(false);
        setReminderMessage(
          "A assinatura foi atualizada, mas não foi possível agendar o lembrete.",
        );
        setIsAwaitingReminderNotice(true);
        return;
      }

      if (!reminderEnabled) {
        router.replace("/");
        return;
      }

      const reminderResult = await scheduleSubscriptionReminder({
        subscriptionId,
        name: validation.values.name,
        price: validation.values.price,
        nextRenewalDate: validation.values.nextRenewalDate,
      });

      if (reminderResult.status === "scheduled") {
        router.replace("/");
        return;
      }

      setReminderEnabled(false);
      setReminderMessage(getReminderWarningMessage(reminderResult, "atualizada"));
      setIsAwaitingReminderNotice(true);
    } catch {
      setSubmitError("Não foi possível atualizar a assinatura. Tente novamente.");
    } finally {
      activeOperation.current = null;
      setIsSubmitting(false);
    }
  }

  function handleDeletePress() {
    if (activeOperation.current || isAwaitingReminderNotice) {
      return;
    }

    if (Platform.OS === "web") {
      const isConfirmed = globalThis.confirm(
        "Excluir assinatura?\n\nEsta ação não pode ser desfeita.",
      );

      if (isConfirmed) {
        void handleDelete();
      }

      return;
    }

    Alert.alert(
      "Excluir assinatura?",
      "Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            void handleDelete();
          },
        },
      ],
    );
  }

  async function handleDelete() {
    if (activeOperation.current || isAwaitingReminderNotice) {
      return;
    }

    if (!user || !subscriptionId) {
      setDeleteError("Não foi possível excluir a assinatura. Tente novamente.");
      return;
    }

    activeOperation.current = "delete";
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const { data, error } = await supabase
        .from("subscriptions")
        .delete()
        .eq("id", subscriptionId)
        .eq("user_id", user.id)
        .select("id")
        .single();

      if (error || !data) {
        setDeleteError("Não foi possível excluir a assinatura. Tente novamente.");
        return;
      }

      try {
        await cancelSubscriptionReminder(subscriptionId);
      } catch {
        try {
          await removeNotificationId(subscriptionId);
        } catch {
          // A exclusão no banco não deve ser bloqueada por uma falha local.
        }
      }

      router.replace("/");
    } catch {
      setDeleteError("Não foi possível excluir a assinatura. Tente novamente.");
    } finally {
      activeOperation.current = null;
      setIsDeleting(false);
    }
  }

  function handleReminderChange(value: boolean) {
    setReminderEnabled(value);
    setReminderMessage(
      value && Platform.OS === "web"
        ? "Lembretes estão disponíveis apenas no aplicativo móvel."
        : null,
    );
  }

  function handleContinueAfterReminderNotice() {
    router.replace("/");
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
        behavior={Platform.OS === "ios" ? "padding" : undefined}
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
            footer={
              <>
                {isAwaitingReminderNotice ? (
                  <Button onPress={handleContinueAfterReminderNotice} variant="secondary">
                    Continuar
                  </Button>
                ) : null}
                {deleteError ? (
                  <AppText
                    accessibilityRole="alert"
                    variant="Small/Helper"
                    style={styles.deleteError}
                  >
                    {deleteError}
                  </AppText>
                ) : null}
                <Button
                  disabled={isSubmitting || isAwaitingReminderNotice}
                  loading={isDeleting}
                  onPress={handleDeletePress}
                  style={styles.deleteButton}
                  variant="danger"
                >
                  Excluir assinatura
                </Button>
              </>
            }
            isDisabled={isDeleting || isAwaitingReminderNotice}
            isSubmitting={isSubmitting}
            name={name}
            nextRenewalDate={nextRenewalDate}
            onBillingCycleChange={setBillingCycle}
            onCategoryChange={setCategory}
            onNameChange={setName}
            onNextRenewalDateChange={setNextRenewalDate}
            onPriceChange={setPrice}
            onReminderChange={handleReminderChange}
            onSubmit={handleSubmit}
            price={price}
            reminderEnabled={reminderEnabled}
            reminderMessage={reminderMessage}
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
  deleteError: {
    color: colors.error,
    textAlign: "center",
  },
  deleteButton: {
    width: "100%",
  },
});
