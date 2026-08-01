import { removeNotificationId } from "./notifications.shared";
import type { ReminderScheduleResult, SubscriptionReminderInput } from "./notifications.shared";

export {
  getNotificationId,
  getReminderWarningMessage,
  removeNotificationId,
  saveNotificationId,
} from "./notifications.shared";
export type { ReminderScheduleResult, SubscriptionReminderInput } from "./notifications.shared";

export async function ensureNotificationPermissionAsync(): Promise<boolean> {
  return false;
}

export async function cancelSubscriptionReminder(subscriptionId: string): Promise<void> {
  await removeNotificationId(subscriptionId);
}

export async function scheduleSubscriptionReminder(
  _input: SubscriptionReminderInput,
): Promise<ReminderScheduleResult> {
  return { status: "unsupported" };
}
