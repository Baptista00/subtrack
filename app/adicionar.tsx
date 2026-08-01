import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { router } from "expo-router";

import { useAuth } from "../src/auth";
import { AppText, BackButton, ScreenContainer, SubscriptionForm } from "../src/components";
import {
  getServiceColor,
  validateSubscriptionForm,
  type SubscriptionFormFieldErrors,
} from "../src/lib/subscription-form";
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

    if (!validation.values || !user) {
      if (!user) {
        setSubmitError("Não foi possível salvar a assinatura. Tente novamente.");
      }

      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("subscriptions").insert({
        user_id: user.id,
        name: validation.values.name,
        price: validation.values.price,
        category: validation.values.category,
        service_color: getServiceColor(validation.values.category),
        next_renewal_date: validation.values.nextRenewalDate,
        billing_cycle: validation.values.billingCycle,
      });

      if (error) {
        setSubmitError("Não foi possível salvar a assinatura. Tente novamente.");
        return;
      }

      router.replace("/");
    } catch {
      setSubmitError("Não foi possível salvar a assinatura. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
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
            <BackButton onPress={() => router.back()} />
            <AppText accessibilityRole="header" variant="Heading 1" style={styles.title}>
              Adicionar assinatura
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
            submitLabel="Salvar"
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
});
