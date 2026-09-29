import { useState } from 'react';
import type { FormEvent } from 'react';

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
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите сообщение"
        autoFocus
      />
      <button type="submit" disabled={!text.trim()}>Отправить</button>
    </form>
  );
}
