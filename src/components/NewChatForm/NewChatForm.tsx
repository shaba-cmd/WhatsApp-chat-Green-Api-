import { useState } from 'react';
import type { FormEvent } from 'react';
import { isValidPhone, phoneToChatId } from '../../utils/phone';
import styles from './NewChatForm.module.css';

interface Props {
  onCreate: (chatId: string) => void;
}

export function NewChatForm({ onCreate }: Props) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValidPhone(phone)) {
      setError('Введите номер в международном формате, например 79991234567');
      return;
    }
    onCreate(phoneToChatId(phone));
    setPhone('');
    setError(null);
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <input
          className={styles.input}
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setError(null);
          }}
          placeholder="Номер телефона нового чата"
          inputMode="tel"
          aria-label="Номер телефона"
        />
        <button type="submit" className={styles.button} disabled={!phone.trim()}>
          Создать
        </button>
      </div>
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
    </form>
  );
}
