import type { NotificationBody } from '../types';

export function extractIncomingText(body: NotificationBody): string | null {
  if (body.typeWebhook !== 'incomingMessageReceived' || !body.messageData) return null;

  const { typeMessage, textMessageData, extendedTextMessageData } = body.messageData;
  if (typeMessage === 'textMessage') return textMessageData?.textMessage ?? null;
  if (typeMessage === 'extendedTextMessage') return extendedTextMessageData?.text ?? null;
  return null;
}
