import { subscriptionCategories } from "../theme";
import type { BillingCycle, SubscriptionCategory } from "../types/subscription";

export type SubscriptionFormFieldErrors = {
  name?: string;
  category?: string;
  price?: string;
  billingCycle?: string;
  nextRenewalDate?: string;
};

export type SubscriptionFormValues = {
  name: string;
  category: SubscriptionCategory;
  price: string;
  billingCycle: BillingCycle;
  nextRenewalDate: string;
};

export type ValidSubscriptionFormValues = {
  name: string;
  category: SubscriptionCategory;
  price: number;
  billingCycle: BillingCycle;
  nextRenewalDate: string;
};

type ValidationResult = {
  errors: SubscriptionFormFieldErrors;
  values: ValidSubscriptionFormValues | null;
};

export function formatPriceInput(value: number): string {
  if (!Number.isFinite(value) || value < 0) {
    return "";
  }

  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
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

export function normalizeSubscriptionName(name: string): string {
  const normalizedName = name.trim().replace(/\s+/g, " ").toLowerCase();

  return typeof normalizedName.normalize === "function"
    ? normalizedName.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    : normalizedName;
}

export function getServiceColor(category: SubscriptionCategory): string {
  return (
    subscriptionCategories.find((option) => option.value === category)
      ?.serviceColor ?? "#6B7280"
  );
}

export function validateSubscriptionForm(
  formValues: SubscriptionFormValues,
): ValidationResult {
  const name = formValues.name.trim();
  const price = parsePrice(formValues.price);
  const nextRenewalDate = parseDate(formValues.nextRenewalDate);
  const errors: SubscriptionFormFieldErrors = {};

  if (!name) {
    errors.name = "Informe o nome do serviço.";
  } else if (name.length > 80) {
    errors.name = "O nome deve ter no máximo 80 caracteres.";
  }

  if (!isSubscriptionCategory(formValues.category)) {
    errors.category = "Selecione uma categoria.";
  }

  if (price === null) {
    errors.price = "Informe um valor válido.";
  }

  if (!isBillingCycle(formValues.billingCycle)) {
    errors.billingCycle = "Selecione um ciclo de cobrança.";
  }

  if (!nextRenewalDate) {
    errors.nextRenewalDate = "Selecione uma data válida.";
  }

  if (
    Object.keys(errors).length > 0 ||
    price === null ||
    !nextRenewalDate
  ) {
    return { errors, values: null };
  }

  return {
    errors,
    values: {
      name,
      category: formValues.category,
      price,
      billingCycle: formValues.billingCycle,
      nextRenewalDate,
    },
  };
}

function parsePrice(priceInput: string): number | null {
  const trimmedPrice = priceInput.trim();

  if (
    !/^\d{1,3}(\.\d{3})*(,\d{1,2})?$/.test(trimmedPrice) &&
    !/^\d+(,\d{1,2})?$/.test(trimmedPrice)
  ) {
    return null;
  }

  const parsedPrice = Number(trimmedPrice.replace(/\./g, "").replace(",", "."));

  return Number.isFinite(parsedPrice) && parsedPrice >= 0 ? parsedPrice : null;
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

function isSubscriptionCategory(value: string): value is SubscriptionCategory {
  return subscriptionCategories.some((option) => option.value === value);
}

function isBillingCycle(value: string): value is BillingCycle {
  return value === "monthly" || value === "yearly";
}
