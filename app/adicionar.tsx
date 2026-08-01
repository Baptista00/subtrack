import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { router } from "expo-router";

import { useAuth } from "../src/auth";
import {
  AppText,
  BackButton,
  Button,
  ScreenContainer,
  SubscriptionForm,
} from "../src/components";
import {
  getReminderWarningMessage,
  scheduleSubscriptionReminder,
} from "../src/lib/notifications";
import {
  getServiceColor,
  normalizeSubscriptionName,
  validateSubscriptionForm,
  type SubscriptionFormFieldErrors,
} from "../src/lib/subscription-form";
import {
  fetchUserSubscriptionNames,
  isUniqueViolation,
} from "../src/lib/subscriptions";
import { supabase } from "../src/lib/supabase";
import { colors, home, spacing, type BillingCycle, type SubscriptionCategory } from "../src/theme";

export default function Adicionar() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [category, setCategory] = useState<SubscriptionCategory>("streaming");
  const [price, setPrice] = useState("");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [nextRenewalDate, setNextRenewalDate] = useState("");
  const [errors, setErrors] = useState<SubscriptionFormFieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderMessage, setReminderMessage] = useState<string | null>(null);
  const [isAwaitingReminderNotice, setIsAwaitingReminderNotice] = useState(false);
  const submissionInProgress = useRef(false);

  async function handleSubmit() {
    if (submissionInProgress.current || isAwaitingReminderNotice) {
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

    if (!validation.values || !user) {
      if (!user) {
        setSubmitError("Não foi possível salvar a assinatura. Tente novamente.");
      }

      return;
    }

    submissionInProgress.current = true;
    setIsSubmitting(true);

    try {
      const normalizedName = normalizeSubscriptionName(validation.values.name);
      const existingSubscriptions = await fetchUserSubscriptionNames(user.id);
      const hasDuplicateName = existingSubscriptions.some(
        (subscription) =>
          normalizeSubscriptionName(subscription.name) === normalizedName,
      );

      if (hasDuplicateName) {
        setSubmitError("Você já possui uma assinatura com este nome.");
        return;
      }

      const { data, error } = await supabase
        .from("subscriptions")
        .insert({
          user_id: user.id,
          name: validation.values.name,
          price: validation.values.price,
          category: validation.values.category,
          service_color: getServiceColor(validation.values.category),
          next_renewal_date: validation.values.nextRenewalDate,
          billing_cycle: validation.values.billingCycle,
        })
        .select("id, name, price, next_renewal_date")
        .single();

      if (error) {
        setSubmitError(
          isUniqueViolation(error)
            ? "Você já possui uma assinatura com este nome."
            : "Não foi possível salvar a assinatura. Tente novamente.",
        );
        return;
      }

      if (!reminderEnabled) {
        router.replace("/");
        return;
      }

      const createdSubscription = getCreatedSubscription(data);

      if (!createdSubscription) {
        setReminderEnabled(false);
        setReminderMessage(
          "A assinatura foi salva, mas não foi possível agendar o lembrete.",
        );
        setIsAwaitingReminderNotice(true);
        return;
      }

      const reminderResult = await scheduleSubscriptionReminder(createdSubscription);

      if (reminderResult.status === "scheduled") {
        router.replace("/");
        return;
      }

      setReminderEnabled(false);
      setReminderMessage(getReminderWarningMessage(reminderResult, "salva"));
      setIsAwaitingReminderNotice(true);
    } catch {
      setSubmitError("Não foi possível salvar a assinatura. Tente novamente.");
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
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
            <BackButton onPress={() => router.back()} />
            <AppText accessibilityRole="header" variant="Heading 1" style={styles.title}>
              Adicionar assinatura
            </AppText>
          </View>

          <SubscriptionForm
            billingCycle={billingCycle}
            category={category}
            errors={errors}
            footer={
              isAwaitingReminderNotice ? (
                <Button onPress={handleContinueAfterReminderNotice} variant="secondary">
                  Continuar
                </Button>
              ) : undefined
            }
            isDisabled={isAwaitingReminderNotice}
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
            submitLabel="Salvar"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

function getCreatedSubscription(value: unknown): {
  subscriptionId: string;
  name: string;
  price: number;
  nextRenewalDate: string;
} | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const record = value as Record<string, unknown>;
  const price = typeof record.price === "number" || typeof record.price === "string"
    ? Number(record.price)
    : Number.NaN;

  if (
    typeof record.id !== "string" ||
    typeof record.name !== "string" ||
    typeof record.next_renewal_date !== "string" ||
    !Number.isFinite(price)
  ) {
    return null;
  }

  return {
    subscriptionId: record.id,
    name: record.name,
    price,
    nextRenewalDate: record.next_renewal_date,
  };
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
});
