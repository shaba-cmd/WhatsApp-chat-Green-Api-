import { useState } from 'react';
import type { FormEvent } from 'react';
import { isValidPhone, phoneToChatId } from '../../utils/phone';

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
    <form onSubmit={handleSubmit}>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Номер телефона"
        inputMode="tel"
      />
      <button type="submit" disabled={!phone.trim()}>Новый чат</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
