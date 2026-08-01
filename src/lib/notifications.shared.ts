import AsyncStorage from "@react-native-async-storage/async-storage";

const notificationIdsStorageKey = "@subtrack:notification-ids";

type NotificationIds = Record<string, string>;

export type SubscriptionReminderInput = {
  subscriptionId: string;
  name: string;
  price: number;
  nextRenewalDate: string;
};

export type ReminderScheduleResult =
  | { status: "scheduled"; notificationId: string }
  | { status: "permission-denied" }
  | { status: "past" }
  | { status: "unsupported" }
  | { status: "error" };

export function getReminderWarningMessage(
  result: Exclude<ReminderScheduleResult, { status: "scheduled" }>,
  verb: "salva" | "atualizada",
): string {
  if (result.status === "unsupported") {
    return "Lembretes estão disponíveis apenas no aplicativo móvel.";
  }

  if (result.status === "permission-denied") {
    return `A assinatura foi ${verb}, mas não foi possível ativar o lembrete.`;
  }

  if (result.status === "past") {
    return `A assinatura foi ${verb}, mas a data do lembrete já passou.`;
  }

  return `A assinatura foi ${verb}, mas não foi possível agendar o lembrete.`;
}

export async function getNotificationId(subscriptionId: string): Promise<string | null> {
  const notificationIds = await getNotificationIds();

  return notificationIds[subscriptionId] ?? null;
}

export async function saveNotificationId(
  subscriptionId: string,
  notificationId: string,
): Promise<void> {
  const notificationIds = await getNotificationIds();

  notificationIds[subscriptionId] = notificationId;
  await AsyncStorage.setItem(notificationIdsStorageKey, JSON.stringify(notificationIds));
}

export async function removeNotificationId(subscriptionId: string): Promise<void> {
  const notificationIds = await getNotificationIds();

  if (!(subscriptionId in notificationIds)) {
    return;
  }

  delete notificationIds[subscriptionId];
  await AsyncStorage.setItem(notificationIdsStorageKey, JSON.stringify(notificationIds));
}

async function getNotificationIds(): Promise<NotificationIds> {
  try {
    const storedValue = await AsyncStorage.getItem(notificationIdsStorageKey);

    if (!storedValue) {
      return {};
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    return isNotificationIds(parsedValue) ? parsedValue : {};
  } catch {
    return {};
  }
}

function isNotificationIds(value: unknown): value is NotificationIds {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every((notificationId) => typeof notificationId === "string");
}
