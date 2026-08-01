import { Platform } from "react-native";
import { AndroidImportance } from "expo-notifications/build/NotificationChannelManager.types";
import { getPermissionsAsync, requestPermissionsAsync } from "expo-notifications/build/NotificationPermissions";
import { setNotificationHandler } from "expo-notifications/build/NotificationsHandler";
import { SchedulableTriggerInputTypes } from "expo-notifications/build/Notifications.types";
import cancelScheduledNotificationAsync from "expo-notifications/build/cancelScheduledNotificationAsync";
import scheduleNotificationAsync from "expo-notifications/build/scheduleNotificationAsync";
import setNotificationChannelAsync from "expo-notifications/build/setNotificationChannelAsync";

import { colors } from "../theme";
import { formatCurrency } from "./subscriptions";
import {
  getNotificationId,
  removeNotificationId,
  saveNotificationId,
} from "./notifications.shared";
import type { ReminderScheduleResult, SubscriptionReminderInput } from "./notifications.shared";

const subscriptionRemindersChannelId = "subscription-reminders";

export {
  getNotificationId,
  getReminderWarningMessage,
  removeNotificationId,
  saveNotificationId,
} from "./notifications.shared";
export type { ReminderScheduleResult, SubscriptionReminderInput } from "./notifications.shared";

setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function ensureNotificationPermissionAsync(): Promise<boolean> {
  const permissions = await getPermissionsAsync();

  if (permissions.granted) {
    return true;
  }

  const requestedPermissions = await requestPermissionsAsync();

  return requestedPermissions.granted;
}

export async function cancelSubscriptionReminder(subscriptionId: string): Promise<void> {
  const notificationId = await getNotificationId(subscriptionId);

  if (!notificationId) {
    return;
  }

  let cancellationError: unknown = null;

  try {
    await cancelScheduledNotificationAsync(notificationId);
  } catch (error) {
    cancellationError = error;
  }

  try {
    await removeNotificationId(subscriptionId);
  } catch (storageError) {
    if (cancellationError === null) {
      throw storageError;
    }
  }

  if (cancellationError !== null) {
    throw cancellationError;
  }
}

export async function scheduleSubscriptionReminder(
  input: SubscriptionReminderInput,
): Promise<ReminderScheduleResult> {
  try {
    await ensureAndroidNotificationChannelAsync();

    const hasPermission = await ensureNotificationPermissionAsync();

    if (!hasPermission) {
      return { status: "permission-denied" };
    }

    const reminderDate = getReminderDate(input.nextRenewalDate);

    if (!reminderDate) {
      return { status: "error" };
    }

    if (reminderDate.getTime() <= Date.now()) {
      return { status: "past" };
    }

    const notificationId = await scheduleNotificationAsync({
      content: {
        title: "Renovação próxima",
        body: `${input.name} renova amanhã por ${formatCurrency(input.price)}.`,
        color: colors.primary,
        data: {
          subscriptionId: input.subscriptionId,
          type: "subscription-renewal",
        },
      },
      trigger: {
        type: SchedulableTriggerInputTypes.DATE,
        date: reminderDate,
        ...(Platform.OS === "android"
          ? { channelId: subscriptionRemindersChannelId }
          : {}),
      },
    });

    try {
      await saveNotificationId(input.subscriptionId, notificationId);
    } catch {
      await cancelScheduledNotificationSilently(notificationId);

      return { status: "error" };
    }

    return { status: "scheduled", notificationId };
  } catch {
    return { status: "error" };
  }
}

async function ensureAndroidNotificationChannelAsync(): Promise<void> {
  if (Platform.OS !== "android") {
    return;
  }

  await setNotificationChannelAsync(subscriptionRemindersChannelId, {
    name: "Lembretes de assinaturas",
    importance: AndroidImportance.DEFAULT,
    lightColor: colors.primary,
  });
}

function getReminderDate(nextRenewalDate: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(nextRenewalDate);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const renewalDate = new Date(year, month - 1, day, 9, 0, 0, 0);

  if (
    renewalDate.getFullYear() !== year ||
    renewalDate.getMonth() !== month - 1 ||
    renewalDate.getDate() !== day
  ) {
    return null;
  }

  renewalDate.setDate(renewalDate.getDate() - 1);

  return renewalDate;
}

async function cancelScheduledNotificationSilently(notificationId: string): Promise<void> {
  try {
    await cancelScheduledNotificationAsync(notificationId);
  } catch {
    // A notificação recém-criada não deve interromper o fluxo caso não possa ser removida.
  }
}
