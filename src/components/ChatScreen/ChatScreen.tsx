import type { Credentials } from '../../types';
import { Sidebar } from '../Sidebar/Sidebar';
import { ChatWindow } from '../ChatWindow/ChatWindow';
import styles from './ChatScreen.module.css';

interface Props {
  creds: Credentials;
  onLogout: () => void;
}

/**
 * Главный экран: хранит состояние чатов и сообщений.
 * TODO:
 *  - const [chats, setChats] = useState<Chat[]>([])
 *  - const [messages, setMessages] = useState<Message[]>([])
 *  - const [activeChatId, setActiveChatId] = useState<string | null>(null)
 *  - handleSend(text): sendMessage() -> добавить исходящее в messages
 *  - useNotificationPolling(creds, handleNotification) — обернуть в useCallback!
 *  - handleNotification: extractIncomingText() -> добавить входящее
 */
export function ChatScreen({ creds, onLogout }: Props) {
  void creds;
  return (
    <div className={styles.root}>
      <Sidebar onLogout={onLogout} />
      <ChatWindow />
    </div>
  );
}
