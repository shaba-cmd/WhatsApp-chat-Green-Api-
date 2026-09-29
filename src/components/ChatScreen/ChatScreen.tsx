import { useCallback, useState } from 'react';
import type { Chat, Credentials, Message, NotificationBody } from '../../types';
import { sendMessage } from '../../api/greenApi';
import { useNotificationPolling } from '../../hooks/useNotificationPolling';
import { extractIncomingText } from '../../utils/notification';
import { chatIdToPhone } from '../../utils/phone';
import { Sidebar } from '../Sidebar/Sidebar';
import { ChatWindow } from '../ChatWindow/ChatWindow';
import styles from './ChatScreen.module.css';

interface Props {
  creds: Credentials;
  onLogout: () => void;
}

export function ChatScreen({ creds, onLogout }: Props) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ensureChat = useCallback((chatId: string) => {
    setChats((prev) =>
      prev.some((c) => c.chatId === chatId)
        ? prev
        : [...prev, { chatId, phone: chatIdToPhone(chatId) }],
    );
  }, []);

  const handleCreateChat = (chatId: string) => {
    ensureChat(chatId);
    setActiveChatId(chatId);
  };

  const handleSend = async (text: string) => {
    if (!activeChatId) return;
    setError(null);
    try {
      const { idMessage } = await sendMessage(creds, activeChatId, text);
      setMessages((prev) => [
        ...prev,
        {
          id: idMessage,
          chatId: activeChatId,
          text,
          direction: 'outgoing',
          timestamp: Math.floor(Date.now() / 1000),
        },
      ]);
    } catch {
      setError('Не удалось отправить сообщение. Проверьте подключение и данные инстанса.');
    }
  };

  const handleNotification = useCallback(
    (body: NotificationBody) => {
      const text = extractIncomingText(body);
      const chatId = body.senderData?.chatId;
      if (!text || !chatId || !chatId.endsWith('@c.us')) return;

      ensureChat(chatId);
      setMessages((prev) =>
        prev.some((m) => m.id === body.idMessage)
          ? prev
          : [
              ...prev,
              {
                id: body.idMessage ?? crypto.randomUUID(),
                chatId,
                text,
                direction: 'incoming',
                timestamp: body.timestamp,
              },
            ],
      );
    },
    [ensureChat],
  );

  useNotificationPolling(creds, handleNotification);

  const activeChat = chats.find((c) => c.chatId === activeChatId) ?? null;
  const activeMessages = messages.filter((m) => m.chatId === activeChatId);

  const lastMessageByChat = (chatId: string) =>
    messages.filter((m) => m.chatId === chatId).at(-1);

  return (
    <div className={styles.root}>
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        getLastMessage={lastMessageByChat}
        onSelectChat={setActiveChatId}
        onCreateChat={handleCreateChat}
        onLogout={onLogout}
      />
      <ChatWindow chat={activeChat} messages={activeMessages} error={error} onSend={handleSend} />
    </div>
  );
}
