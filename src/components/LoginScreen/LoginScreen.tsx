import { useState } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import type { Credentials } from '../../types';
import { DEFAULT_API_URL, getStateInstance } from '../../api/greenApi';
import styles from './LoginScreen.module.css';

interface Props {
  onLogin: (creds: Credentials) => void;
}

const STATE_MESSAGES: Record<string, string> = {
  notAuthorized: 'Инстанс не привязан к WhatsApp. Отсканируйте QR-код в личном кабинете.',
  blocked: 'Аккаунт WhatsApp заблокирован.',
  starting: 'Инстанс запускается. Попробуйте через минуту.',
  yellowCard: 'Отправка сообщений временно ограничена WhatsApp.',
};

export function LoginScreen({ onLogin }: Props) {
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL);
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = apiUrl.trim() && idInstance.trim() && apiTokenInstance.trim() && !loading;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const creds: Credentials = {
      apiUrl: apiUrl.trim(),
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
    };

    setLoading(true);
    setError(null);
    try {
      const state = await getStateInstance(creds);
      if (state === 'authorized') {
        onLogin(creds);
        return;
      }
      setError(STATE_MESSAGES[state] ?? `Инстанс недоступен (состояние: ${state}).`);
    } catch (err) {
      const status = axios.isAxiosError(err) ? err.response?.status : undefined;
      setError(
        status === 401 || status === 403 || status === 404
          ? 'Неверный idInstance, apiTokenInstance или apiUrl. Сверьте их с личным кабинетом.'
          : 'Не удалось связаться с GREEN-API. Проверьте apiUrl и подключение к интернету.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.root}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h1 className={styles.logo}>WhatsApp</h1>
        <h2 className={styles.title}>Вход</h2>
        <p className={styles.hint}>
          Данные инстанса есть в{' '}
          <a href="https://console.green-api.com" target="_blank" rel="noreferrer">
            личном кабинете GREEN-API
          </a>
          .
        </p>

        <label className={styles.field}>
          <span>idInstance</span>
          <input
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
            inputMode="numeric"
            autoComplete="off"
            autoFocus
          />
        </label>

        <label className={styles.field}>
          <span>apiTokenInstance</span>
          <input
            type="password"
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
            autoComplete="off"
          />
        </label>

        <label className={styles.field}>
          <span>apiUrl</span>
          <input value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} autoComplete="off" />
        </label>

        {error && (
          <p role="alert" className={styles.error}>
            {error}
          </p>
        )}

        <button type="submit" className={styles.submit} disabled={!canSubmit}>
          {loading ? 'Проверяем…' : 'Войти'}
        </button>
      </form>
    </div>
  );
}
