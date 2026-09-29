import { useEffect } from 'react';
import type { Credentials, NotificationBody } from '../types';

export function useNotificationPolling(
  creds: Credentials | null,
  onNotification: (body: NotificationBody) => void,
): void {
  useEffect(() => {
    if (!creds) return;
    // TODO: реализовать цикл
    void onNotification;
  }, [creds, onNotification]);
}
