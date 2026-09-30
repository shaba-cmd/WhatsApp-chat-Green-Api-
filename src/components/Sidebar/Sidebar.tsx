import type { Chat, Message } from '../../types';
import { formatTime } from '../../utils/time';
import { LogoutIcon } from '../../icons';
import { Avatar } from '../Avatar/Avatar';
import { NewChatForm } from '../NewChatForm/NewChatForm';
import styles from './Sidebar.module.css';

interface Props {
  chats: Chat[];
  activeChatId: string | null;
  getLastMessage: (chatId: string) => Message | undefined;
  onSelectChat: (chatId: string) => void;
  onCreateChat: (chatId: string) => void;
  onLogout: () => void;
}

export function Sidebar({ chats, activeChatId, getLastMessage, onSelectChat, onCreateChat, onLogout }: Props) {
  return (
    <aside className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.title}>WhatsApp</h1>
        <button type="button" className={styles.iconButton} onClick={onLogout} title="Выйти" aria-label="Выйти">
          <LogoutIcon />
        </button>
      </header>

      <NewChatForm onCreate={onCreateChat} />

      {chats.length === 0 ? (
        <p className={styles.empty}>Введите номер телефона выше, чтобы начать переписку.</p>
      ) : (
        <ul className={styles.list}>
          {chats.map((chat) => {
            const last = getLastMessage(chat.chatId);
            const isActive = chat.chatId === activeChatId;
            return (
              <li key={chat.chatId}>
                <button
                  type="button"
                  className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
                  onClick={() => onSelectChat(chat.chatId)}
                >
                  <Avatar size={49} />
                  <span className={styles.itemBody}>
                    <span className={styles.itemTop}>
                      <span className={styles.name}>+{chat.phone}</span>
                      {last && <span className={styles.time}>{formatTime(last.timestamp)}</span>}
                    </span>
                    <span className={styles.preview}>
                      {last ? `${last.direction === 'outgoing' ? 'Вы: ' : ''}${last.text}` : 'Нет сообщений'}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}
