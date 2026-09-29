import axios from 'axios';
import type {
  Credentials,
  ReceiveNotificationResponse,
  SendMessageResponse,
} from '../types';

const API_URL = 'https://7107.api.greenapi.com';

const http = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

const path = ({ idInstance, apiTokenInstance }: Credentials, method: string) =>
  `/waInstance${idInstance}/${method}/${apiTokenInstance}`;

export async function getStateInstance(creds: Credentials): Promise<string> {
  const { data } = await http.get<{ stateInstance: string }>(path(creds, 'getStateInstance'));
  return data.stateInstance;
}

export async function sendMessage(
  creds: Credentials,
  chatId: string,
  message: string,
): Promise<SendMessageResponse> {
  const { data } = await http.post<SendMessageResponse>(path(creds, 'sendMessage'), {
    chatId,
    message,
  });
  return data;
}

export async function receiveNotification(
  creds: Credentials,
  receiveTimeout = 5,
): Promise<ReceiveNotificationResponse | null> {
  const { data } = await http.get<ReceiveNotificationResponse | null>(
    path(creds, 'receiveNotification'),
    { params: { receiveTimeout } },
  );
  return data;
}

export async function deleteNotification(creds: Credentials, receiptId: number): Promise<void> {
  await http.delete(`${path(creds, 'deleteNotification')}/${receiptId}`);
}
