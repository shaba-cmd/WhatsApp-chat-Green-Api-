import styles from './ChatWindow.module.css';

export function ChatWindow() {
  return (
    <section className={styles.root}>
      <div className={styles.empty}>Выберите чат или создайте новый</div>
    </section>
  );
}
