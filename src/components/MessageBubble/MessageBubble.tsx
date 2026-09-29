import type { Message } from '../../types';
import { formatTime } from '../../utils/time';
import styles from './MessageBubble.module.css';

interface Props {
  message: Message;
  isFirstInGroup: boolean;
}

export function MessageBubble({ message, isFirstInGroup }: Props) {
  const isOut = message.direction === 'outgoing';
  const classes = [
    styles.bubble,
    isOut ? styles.out : styles.in,
    isFirstInGroup ? styles.tail : '',
  ].join(' ');

  return (
    <div className={`${styles.row} ${isOut ? styles.rowOut : styles.rowIn} ${isFirstInGroup ? styles.groupStart : ''}`}>
      <div className={classes}>
        <span className={styles.text}>{message.text}</span>
        <span className={styles.time}>{formatTime(message.timestamp)}</span>
      </div>
    </div>
  );
}
