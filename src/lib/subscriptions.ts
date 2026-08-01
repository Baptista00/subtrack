import { supabase } from "./supabase";
import type {
  BillingCycle,
  SubscriptionCategory,
  SubscriptionNameSummary,
  SubscriptionSummary,
} from "../types/subscription";

export const subscriptionSummarySelect =
  "id, name, price, category, service_color, next_renewal_date, billing_cycle";
const subscriptionNameSelect = "id, name";

const subscriptionCategories: readonly SubscriptionCategory[] = [
  "streaming",
  "musica",
  "produtividade",
  "saude",
  "educacao",
  "outros",
];

const billingCycles: readonly BillingCycle[] = ["monthly", "yearly"];

const categoryLabels: Record<SubscriptionCategory, string> = {
  streaming: "Streaming",
  musica: "Música",
  produtividade: "Produtividade",
  saude: "Saúde",
  educacao: "Educação",
  outros: "Outros",
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

type CalendarDate = {
  year: number;
  month: number;
  day: number;
};

export function normalizeSubscriptions(value: unknown): SubscriptionSummary[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const subscriptions: SubscriptionSummary[] = [];

  for (const item of value) {
    const subscription = normalizeSubscription(item);

    if (subscription) {
      subscriptions.push(subscription);
    }
  }

  return subscriptions;
}

export async function fetchUserSubscriptions(
  userId: string,
): Promise<SubscriptionSummary[]> {
  const { data, error } = await supabase
    .from("subscriptions")
    .select(subscriptionSummarySelect)
    .eq("user_id", userId)
    .order("next_renewal_date", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !Array.isArray(data)) {
    throw new Error("Não foi possível carregar as assinaturas.");
  }

  const subscriptions = normalizeSubscriptions(data);

  if (subscriptions.length !== data.length) {
    throw new Error("Não foi possível carregar as assinaturas.");
  }

  return subscriptions;
}

export async function fetchUserSubscriptionNames(
  userId: string,
): Promise<SubscriptionNameSummary[]> {
  const { data, error } = await supabase
    .from("subscriptions")
    .select(subscriptionNameSelect)
    .eq("user_id", userId);

  if (error || !Array.isArray(data)) {
    throw new Error("Não foi possível carregar as assinaturas.");
  }

  const subscriptions: SubscriptionNameSummary[] = [];

  for (const item of data) {
    if (!isRecord(item) || !isString(item.id) || !isString(item.name)) {
      throw new Error("Não foi possível carregar as assinaturas.");
    }

    subscriptions.push({ id: item.id, name: item.name });
  }

  return subscriptions;
}

export function getCategoryLabel(category: SubscriptionCategory): string {
  return categoryLabels[category];
}

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

export function formatDatabaseDate(dateValue: string): string {
  const date = parseCalendarDate(dateValue);

  if (!date) {
    return "Data indisponível";
  }

  return `${padDatePart(date.day)}/${padDatePart(date.month)}/${date.year}`;
}

export function getServiceInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return "?";
  }

  return words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export function calculateMonthlyTotal(subscriptions: SubscriptionSummary[]): number {
  return subscriptions.reduce(
    (total, subscription) =>
      total +
      (subscription.billing_cycle === "yearly" ? subscription.price / 12 : subscription.price),
    0,
  );
}

export function countUpcomingRenewals(
  subscriptions: SubscriptionSummary[],
  now: Date = new Date(),
): number {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + 30);

  return subscriptions.reduce((count, subscription) => {
    const renewalDate = parseCalendarDate(subscription.next_renewal_date);

    if (!renewalDate) {
      return count;
    }

    const calendarRenewalDate = new Date(
      renewalDate.year,
      renewalDate.month - 1,
      renewalDate.day,
    );

    return calendarRenewalDate >= today && calendarRenewalDate <= endDate
      ? count + 1
      : count;
  }, 0);
}

function normalizeSubscription(value: unknown): SubscriptionSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const price = normalizePrice(value.price);

  if (
    !isString(value.id) ||
    !isString(value.name) ||
    price === null ||
    !isSubscriptionCategory(value.category) ||
    !isString(value.service_color) ||
    !isString(value.next_renewal_date) ||
    !isBillingCycle(value.billing_cycle)
  ) {
    return null;
  }

  return {
    id: value.id,
    name: value.name,
    price,
    category: value.category,
    service_color: value.service_color,
    next_renewal_date: value.next_renewal_date,
    billing_cycle: value.billing_cycle,
  };
}

function normalizePrice(value: unknown): number | null {
  if (typeof value !== "number" && typeof value !== "string") {
    return null;
  }

  const normalizedValue = typeof value === "string" ? value.trim() : value;

  if (normalizedValue === "") {
    return null;
  }

  const price = Number(normalizedValue);

  return Number.isFinite(price) && price >= 0 ? price : null;
}

function parseCalendarDate(value: string): CalendarDate | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    year < 1 ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return { year, month, day };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isSubscriptionCategory(value: unknown): value is SubscriptionCategory {
  return typeof value === "string" && subscriptionCategories.includes(value as SubscriptionCategory);
}

function isBillingCycle(value: unknown): value is BillingCycle {
  return typeof value === "string" && billingCycles.includes(value as BillingCycle);
}

function padDatePart(value: number): string {
  return String(value).padStart(2, "0");
}
