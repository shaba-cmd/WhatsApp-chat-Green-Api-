import type { Credentials } from '../../types';
import { Sidebar } from '../Sidebar/Sidebar';
import { ChatWindow } from '../ChatWindow/ChatWindow';
import styles from './ChatScreen.module.css';
import { useNotificationPolling } from '../../hooks/useNotificationPolling';

interface Props {
  creds: Credentials;
  onLogout: () => void;
}

export function ChatScreen({ creds, onLogout }: Props) {
  void creds;

  useNotificationPolling(creds, (body) => console.log(body));
  
  return (
    <div className={styles.root}>
      <Sidebar onLogout={onLogout} />
      <ChatWindow />
    </div>
  );
}
