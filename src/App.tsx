import { useState } from 'react';
import type { Credentials } from './types';
import { LoginScreen } from './components/LoginScreen/LoginScreen';
import { ChatScreen } from './components/ChatScreen/ChatScreen';
import { clearCredentials, loadCredentials, saveCredentials } from './utils/storage';

export default function App() {
  const [creds, setCreds] = useState<Credentials | null>(loadCredentials);

  const handleLogin = (next: Credentials) => {
    saveCredentials(next);
    setCreds(next);
  };

  const handleLogout = () => {
    clearCredentials();
    setCreds(null);
  };

  return creds ? (
    <ChatScreen creds={creds} onLogout={handleLogout} />
  ) : (
    <LoginScreen onLogin={handleLogin} />
  );
}
