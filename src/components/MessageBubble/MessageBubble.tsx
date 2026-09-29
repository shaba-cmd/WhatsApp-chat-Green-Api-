import type { Message } from '../../types';

export function MessageBubble({ message }: { message: Message }) {
  return <div>{message.text}</div>;
}
