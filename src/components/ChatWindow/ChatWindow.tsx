import { useEffect, useRef } from 'react';
import type { Chat, Message } from '../../types';
import { MessageBubble } from '../MessageBubble/MessageBubble';
import { MessageInput } from '../MessageInput/MessageInput';
import styles from './ChatWindow.module.css';

interface Props {
  chat: Chat | null;
  messages: Message[];
  error: string | null;
  onSend: (text: string) => void;
}

export function ChatWindow({ chat, messages, error, onSend }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, chat?.chatId]);

  if (!chat) {
    return (
      <section className={styles.root}>
        <div className={styles.empty}>Выберите чат или создайте новый</div>
      </section>
    );
  }

  return (
    <section className={styles.root}>
      <header className={styles.header}>+{chat.phone}</header>

      <div className={styles.feed}>
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        <div ref={bottomRef} />
      </div>

      {error && <p role="alert" className={styles.error}>{error}</p>}
      <MessageInput key={chat.chatId} onSend={onSend} />
    </section>
  );
}
