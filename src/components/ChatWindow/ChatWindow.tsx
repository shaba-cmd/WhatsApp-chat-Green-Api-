import { useEffect, useRef } from 'react';
import type { Chat, Message } from '../../types';
import { Avatar } from '../Avatar/Avatar';
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
      <section className={`${styles.root} ${styles.placeholder}`}>
        <div className={styles.placeholderBody}>
          <h2>Веб-чат WhatsApp</h2>
          <p>Выберите чат слева или создайте новый по номеру телефона.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.root}>
      <header className={styles.header}>
        <Avatar />
        <span className={styles.name}>+{chat.phone}</span>
      </header>

      <div className={styles.feed}>
        {messages.map((m, i) => (
          <MessageBubble
            key={m.id}
            message={m}
            isFirstInGroup={i === 0 || messages[i - 1].direction !== m.direction}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
      <MessageInput key={chat.chatId} onSend={onSend} />
    </section>
  );
}
