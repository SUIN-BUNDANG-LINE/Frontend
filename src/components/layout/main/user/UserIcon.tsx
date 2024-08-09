/* eslint-disable no-bitwise */

import { User as UserType } from '@/providers/auth/types';
import styles from './User.module.css';

interface UserIconProps {
  user: UserType;
}

export default function UserIcon({ user }: UserIconProps) {
  const { id, nickname: name } = user;

  const backgroundColor = (() => {
    function hashString(str: string) {
      let hash = 0;
      for (let i = 0; i < str.length; i += 1) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash &= hash;
      }
      return hash;
    }

    function toHex(c: number) {
      const hex = c.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    }

    const hash = hashString(id);

    const r = (hash & 0x7f) + 128;
    const g = ((hash >> 7) & 0x7f) + 128;
    const b = 255;

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  })();

  return (
    <button type="button" className={styles.icon}>
      <div className={styles.iconPulse} style={{ backgroundColor }} />
      <div className={styles.iconCircle} style={{ backgroundColor }}>
        {name.slice(0, 1)}
      </div>
    </button>
  );
}
