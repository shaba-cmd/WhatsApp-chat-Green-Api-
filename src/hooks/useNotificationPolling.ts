import { useEffect, useRef } from "react";
import type { Credentials, NotificationBody } from "../types";
import { deleteNotification, receiveNotification } from "../api/greenApi";
import axios from "axios";

const RETRY_DELAY_MS = 3000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useNotificationPolling(
  creds: Credentials | null,
  onNotification: (body: NotificationBody) => void,
): void {
  const handlerRef = useRef(onNotification);
  useEffect(() => {
    handlerRef.current = onNotification;
  }, [onNotification]);

  useEffect(() => {
    if (!creds) return;

    let active = true;

    const poll = async () => {
      while (active) {
        try {
          const notification = await receiveNotification(creds);
          if (!active) break;
          if (!notification) continue;

          try {
            handlerRef.current(notification.body);
          } finally {
            await deleteNotification(creds, notification.receiptId);
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 408)
            continue;

          console.error("Ошибка получения уведомлений:", error);
          await sleep(RETRY_DELAY_MS);
        }
      }
    };

    void poll();

    return () => {
      active = false;
    };
  }, [creds]);
}
