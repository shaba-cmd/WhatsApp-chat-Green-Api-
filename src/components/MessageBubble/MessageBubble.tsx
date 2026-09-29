import type { Message } from '../../types';

const formatTime = (ts: number) =>
  new Date(ts * 1000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

export function MessageBubble({ message }: { message: Message }) {
  const isOut = message.direction === 'outgoing';
  return (
    <div style={{ alignSelf: isOut ? 'flex-end' : 'flex-start' }}>
      <span>{message.text}</span> <small>{formatTime(message.timestamp)}</small>
    </div>
  );
}
