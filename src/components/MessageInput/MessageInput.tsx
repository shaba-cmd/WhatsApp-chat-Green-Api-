import { useState } from 'react';
import type { FormEvent } from 'react';
import { SendIcon } from '../../icons';
import styles from './MessageInput.module.css';

interface Props {
  onSend: (text: string) => void;
}

export function MessageInput({ onSend }: Props) {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите сообщение"
        aria-label="Сообщение"
        autoFocus
      />
      <button type="submit" className={styles.send} disabled={!text.trim()} aria-label="Отправить">
        <SendIcon />
      </button>
    </form>
  );
}
