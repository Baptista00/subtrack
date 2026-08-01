import { useState } from "react";
import { Pressable, StyleSheet, Switch, View } from "react-native";

import { formatDateInput, type SubscriptionFormFieldErrors } from "../lib/subscription-form";
import {
  addSubscription,
  billingCycles,
  colors,
  spacing,
  subscriptionCategories,
  type BillingCycle,
  type SubscriptionCategory,
} from "../theme";
import { AppText } from "./AppText";
import { Button } from "./Button";
import { FormField } from "./FormField";
import { Input } from "./Input";

export type SubscriptionFormProps = {
  name: string;
  category: SubscriptionCategory;
  price: string;
  billingCycle: BillingCycle;
  nextRenewalDate: string;
  errors: SubscriptionFormFieldErrors;
  submitError: string | null;
  isSubmitting: boolean;
  submitLabel: string;
  onNameChange: (value: string) => void;
  onCategoryChange: (value: SubscriptionCategory) => void;
  onPriceChange: (value: string) => void;
  onBillingCycleChange: (value: BillingCycle) => void;
  onNextRenewalDateChange: (value: string) => void;
  onSubmit: () => void;
};

export function SubscriptionForm({
  billingCycle,
  category,
  errors,
  isSubmitting,
  name,
  nextRenewalDate,
  onBillingCycleChange,
  onCategoryChange,
  onNameChange,
  onNextRenewalDateChange,
  onPriceChange,
  onSubmit,
  price,
  submitError,
  submitLabel,
}: SubscriptionFormProps) {
  const [reminderEnabled, setReminderEnabled] = useState(false);

  return (
    <View style={styles.form}>
      <Input
        autoCapitalize="words"
        error={errors.name}
        label="Nome do serviço"
        maxLength={80}
        onChangeText={onNameChange}
        placeholder="Ex: Netflix"
        value={name}
      />

      <FormField error={errors.category} label="Categoria">
        <View style={styles.categoryList}>
          {subscriptionCategories.map((option) => {
            const isSelected = option.value === category;

            return (
              <Pressable
                key={option.value}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                disabled={isSubmitting}
                onPress={() => onCategoryChange(option.value)}
                style={[
                  styles.categoryChip,
                  isSelected && styles.categoryChipSelected,
                ]}
              >
                <AppText
                  variant="Label"
                  style={[
                    styles.selectorText,
                    isSelected && styles.selectorTextSelected,
                  ]}
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
        onChangeText={onPriceChange}
        placeholder="0,00"
        value={price}
      />

      <FormField error={errors.billingCycle} label="Ciclo de cobrança">
        <View style={styles.billingCycleList}>
          {billingCycles.map((option) => {
            const isSelected = option.value === billingCycle;

            return (
              <Pressable
                key={option.value}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                disabled={isSubmitting}
                onPress={() => onBillingCycleChange(option.value)}
                style={[
                  styles.billingCycleOption,
                  isSelected && styles.billingCycleOptionSelected,
                ]}
              >
                <AppText
                  variant="Label"
                  style={[
                    styles.billingCycleText,
                    isSelected && styles.billingCycleTextSelected,
                  ]}
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
        onChangeText={(value) => onNextRenewalDateChange(formatDateInput(value))}
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
          <AppText
            accessibilityRole="alert"
            variant="Small/Helper"
            style={styles.submitError}
          >
            {submitError}
          </AppText>
        ) : null}
        <Button
          loading={isSubmitting}
          onPress={onSubmit}
          style={styles.saveButton}
          variant="primary"
        >
          {submitLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
