import type { Chat, Message } from '../../types';
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
        <button type="button" onClick={onLogout}>Выйти</button>
      </header>

      <NewChatForm onCreate={onCreateChat} />

      <ul className={styles.list}>
        {chats.map((chat) => (
          <li key={chat.chatId}>
            <button
              type="button"
              className={chat.chatId === activeChatId ? styles.itemActive : styles.item}
              onClick={() => onSelectChat(chat.chatId)}
            >
              <span>+{chat.phone}</span>
              <span className={styles.preview}>{getLastMessage(chat.chatId)?.text ?? ''}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
