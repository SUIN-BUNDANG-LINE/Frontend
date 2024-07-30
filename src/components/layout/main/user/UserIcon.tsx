/* eslint-disable no-bitwise */

import { User as UserType } from '@/providers/auth/types';

interface UserIconProps {
  user: UserType;
  onClick: () => void;
}

export default function UserIcon({ user, onClick }: UserIconProps) {
  const { id, nickname: name } = user;

  function genColor() {
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

    const color = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    return color;
  }

  const style = {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: genColor(),
    cursor: 'pointer',
  };

  return (
    <button type="button" style={style} onClick={onClick}>
      {name.slice(0, 1)}
    </button>
  );
}
