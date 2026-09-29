import { PersonIcon } from '../../icons';
import styles from './Avatar.module.css';

export function Avatar({ size = 40 }: { size?: number }) {
  return (
    <span className={styles.root} style={{ width: size, height: size }}>
      <PersonIcon />
    </span>
  );
}
