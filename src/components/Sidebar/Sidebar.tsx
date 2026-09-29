import styles from './Sidebar.module.css';

interface Props {
  onLogout: () => void;
}

export function Sidebar({ onLogout }: Props) {
  return (
    <aside className={styles.root}>
      <header className={styles.header}>
        <button type="button" onClick={onLogout}>Выйти</button>
      </header>
      {/* TODO: <NewChatForm /> и список чатов */}
    </aside>
  );
}
