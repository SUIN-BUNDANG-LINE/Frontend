'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './Button.module.css';

interface Props {
  provider: string;
  href: string;
  name: string;
}

export default function Button({ provider, href, name }: Props) {
  const { push } = useRouter();

  const srcMap = {
    naver: ['#03c75a', '#fff'],
    kakao: ['#FEE500', '#000'],
    google: ['#FFF', '#000'],
  } as { [key: string]: string[] };

  const [backgroundColor, color] = srcMap[provider];

  return (
    <button type="button" className={styles.container} onClick={() => push(href)} style={{ backgroundColor }}>
      <div className={styles.symbol}>
        <Image src={`/assets/oauth-providers/${provider}.png`} height={20} width={20} alt={name} />
      </div>
      <div className={styles.label} style={{ color }}>
        {name}로 로그인
      </div>
    </button>
  );
}
