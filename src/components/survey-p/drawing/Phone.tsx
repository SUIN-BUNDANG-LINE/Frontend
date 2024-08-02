import type { Dispatch, SetStateAction } from 'react';
import styles from './Phone.module.css';

interface Props {
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
}

export default function Phone({ phone, setPhone }: Props) {
  const sanitize = (p: string) => {
    const t = p.replace(/\D/g, '');
    return t.slice(0, 11);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="phone" className={styles.phone}>
        <span className={styles.label}>전화번호</span>
        <input
          required
          type="tel"
          id="phone"
          pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
          className={styles.input}
          value={phone}
          onChange={(e) => setPhone(sanitize(e.target.value))}
          placeholder="010 1234 5678"
        />
        <span />
        <span className={styles.tip}>* 숫자만 입력해주세요.</span>
      </label>
      <ul className={styles.tos}>
        <li>
          <b>수집 항목 :</b> 전화번호
        </li>
        <li>
          <b>수집 목적 :</b> 리워드 지급
        </li>
        <li>
          <b>보유 기간 :</b> 설문조사 마감 및 리워드 지급 완료 시
        </li>
      </ul>
    </div>
  );
}
