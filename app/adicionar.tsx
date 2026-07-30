import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  View,
} from "react-native";
import { router } from "expo-router";

import { useAuth } from "../src/auth";
import {
  AppText,
  BackButton,
  Button,
  FormField,
  Input,
  ScreenContainer,
} from "../src/components";
import { supabase } from "../src/lib/supabase";
import {
  addSubscription,
  billingCycles,
  colors,
  home,
  spacing,
  subscriptionCategories,
  type BillingCycle,
  type SubscriptionCategory,
} from "../src/theme";

type AddSubscriptionFieldErrors = {
  name?: string;
  price?: string;
  nextRenewalDate?: string;
};

function parsePrice(priceInput: string): number | null {
  const trimmedPrice = priceInput.trim();

  if (!/^\d{1,3}(\.\d{3})*(,\d{1,2})?$/.test(trimmedPrice) && !/^\d+(,\d{1,2})?$/.test(trimmedPrice)) {
    return null;
  }

  const parsedPrice = Number(trimmedPrice.replace(/\./g, "").replace(",", "."));

  return Number.isFinite(parsedPrice) && parsedPrice >= 0 ? parsedPrice : null;
}

export function formatDateInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function parseDate(dateInput: string): string | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(dateInput.trim());

  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    year < 1 ||
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return `${match[3]}-${match[2]}-${match[1]}`;
}

function getServiceColor(category: SubscriptionCategory): string {
  return subscriptionCategories.find((option) => option.value === category)?.serviceColor ?? "#6B7280";
}

export default function Adicionar() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [category, setCategory] = useState<SubscriptionCategory>("streaming");
  const [price, setPrice] = useState("");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [nextRenewalDate, setNextRenewalDate] = useState("");
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [errors, setErrors] = useState<AddSubscriptionFieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (isSubmitting) {
      return;
    }

    const trimmedName = name.trim();
    const parsedPrice = parsePrice(price);
    const parsedDate = parseDate(nextRenewalDate);
    const nextErrors: AddSubscriptionFieldErrors = {};

    if (!trimmedName) {
      nextErrors.name = "Informe o nome do serviço.";
    } else if (trimmedName.length > 80) {
      nextErrors.name = "O nome deve ter no máximo 80 caracteres.";
    }

    if (parsedPrice === null) {
      nextErrors.price = "Informe um valor válido.";
    }

    if (!parsedDate) {
      nextErrors.nextRenewalDate = "Selecione uma data válida.";
    }

    setErrors(nextErrors);
    setSubmitError(null);

    if (Object.keys(nextErrors).length > 0 || parsedPrice === null || !parsedDate || !user) {
      if (!user) {
        setSubmitError("Não foi possível salvar a assinatura. Tente novamente.");
      }

      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("subscriptions").insert({
        user_id: user.id,
        name: trimmedName,
        price: parsedPrice,
        category,
        service_color: getServiceColor(category),
        next_renewal_date: parsedDate,
        billing_cycle: billingCycle,
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

          <View style={styles.form}>
        <Input
          autoCapitalize="words"
          error={errors.name}
          label="Nome do serviço"
          maxLength={80}
          onChangeText={setName}
          placeholder="Ex: Netflix"
          value={name}
        />

        <FormField label="Categoria">
          <View style={styles.categoryList}>
            {subscriptionCategories.map((option) => {
              const isSelected = option.value === category;

              return (
                <Pressable
                  key={option.value}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  disabled={isSubmitting}
                  onPress={() => setCategory(option.value)}
                  style={[styles.categoryChip, isSelected && styles.categoryChipSelected]}
                >
                  <AppText
                    variant="Label"
                    style={[styles.selectorText, isSelected && styles.selectorTextSelected]}
                  >
                    {option.label}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </FormField>

        <Input
          error={errors.price}
          keyboardType="decimal-pad"
          label="Valor"
          leftElement={
            <AppText variant="Body" style={styles.currencyPrefix}>
              R$
            </AppText>
          }
          onChangeText={setPrice}
          placeholder="0,00"
          value={price}
        />

        <FormField label="Ciclo de cobrança">
          <View style={styles.billingCycleList}>
            {billingCycles.map((option) => {
              const isSelected = option.value === billingCycle;

              return (
                <Pressable
                  key={option.value}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  disabled={isSubmitting}
                  onPress={() => setBillingCycle(option.value)}
                  style={[styles.billingCycleOption, isSelected && styles.billingCycleOptionSelected]}
                >
                  <AppText
                    variant="Label"
                    style={[styles.billingCycleText, isSelected && styles.billingCycleTextSelected]}
                  >
                    {option.label}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </FormField>

        <Input
          error={errors.nextRenewalDate}
          keyboardType="numeric"
          label="Próxima renovação"
          maxLength={10}
          onChangeText={(value) => setNextRenewalDate(formatDateInput(value))}
          placeholder="DD/MM/AAAA"
          value={nextRenewalDate}
        />

        <View style={styles.reminder}>
          <AppText variant="Body" style={styles.reminderTitle}>
            Lembrete de renovação
          </AppText>
          {/* O lembrete é somente visual nesta etapa e não é salvo no Supabase. */}
          <Switch
            accessibilityLabel="Ativar lembrete de renovação"
            onValueChange={setReminderEnabled}
            thumbColor={colors.surface}
            trackColor={{ false: colors.toggleOff, true: colors.primary }}
            value={reminderEnabled}
          />
        </View>

        <View style={styles.actions}>
          {submitError ? (
            <AppText accessibilityRole="alert" variant="Small/Helper" style={styles.submitError}>
              {submitError}
            </AppText>
          ) : null}
          <Button loading={isSubmitting} onPress={handleSubmit} style={styles.saveButton} variant="primary">
            Salvar
          </Button>
        </View>
          </View>
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
  form: {
    gap: addSubscription.form.gap,
    paddingHorizontal: addSubscription.form.paddingHorizontal,
    paddingVertical: addSubscription.form.paddingVertical,
  },
  categoryList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: addSubscription.selector.gap,
  },
  categoryChip: {
    backgroundColor: addSubscription.selector.chip.backgroundColor,
    borderColor: addSubscription.selector.chip.borderColor,
    borderRadius: addSubscription.selector.chip.borderRadius,
    borderWidth: addSubscription.selector.chip.borderWidth,
    paddingHorizontal: addSubscription.selector.chip.paddingHorizontal,
    paddingVertical: addSubscription.selector.chip.paddingVertical,
  },
  categoryChipSelected: {
    backgroundColor: addSubscription.selector.selectedChip.backgroundColor,
    borderColor: addSubscription.selector.selectedChip.borderColor,
  },
  selectorText: {
    color: addSubscription.selector.text.color,
  },
  selectorTextSelected: {
    color: addSubscription.selector.selectedText.color,
  },
  currencyPrefix: {
    color: colors.textSecondary,
    marginLeft: spacing[3],
  },
  billingCycleList: {
    backgroundColor: addSubscription.billingCycle.container.backgroundColor,
    borderColor: addSubscription.billingCycle.container.borderColor,
    borderRadius: addSubscription.billingCycle.container.borderRadius,
    borderWidth: addSubscription.billingCycle.container.borderWidth,
    flexDirection: "row",
    gap: addSubscription.billingCycle.container.gap,
    padding: addSubscription.billingCycle.container.padding,
  },
  billingCycleOption: {
    alignItems: "center",
    borderRadius: addSubscription.billingCycle.option.borderRadius,
    flex: 1,
    paddingVertical: addSubscription.billingCycle.option.paddingVertical,
  },
  billingCycleOptionSelected: {
    backgroundColor: addSubscription.billingCycle.selectedOption.backgroundColor,
  },
  billingCycleText: {
    color: addSubscription.billingCycle.text.color,
  },
  billingCycleTextSelected: {
    color: addSubscription.billingCycle.selectedText.color,
  },
  reminder: {
    alignItems: "center",
    backgroundColor: addSubscription.reminder.backgroundColor,
    borderColor: addSubscription.reminder.borderColor,
    borderRadius: addSubscription.reminder.borderRadius,
    borderWidth: addSubscription.reminder.borderWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: addSubscription.reminder.padding,
  },
  reminderTitle: {
    color: addSubscription.reminder.title.color,
  },
  actions: {
    alignItems: "center",
    gap: spacing[2],
  },
  submitError: {
    color: colors.error,
    textAlign: "center",
  },
  saveButton: {
    width: "100%",
  },
});
