import type { Credentials } from '../../types';
import styles from './LoginScreen.module.css';

interface Props {
  onLogin: (creds: Credentials) => void;
}

export function LoginScreen({ onLogin }: Props) {
  void onLogin;
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <h1>Вход в GREEN-API</h1>
        {/* TODO: форма */}
      </div>
    </div>
  );
}
