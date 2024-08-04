import { forwardRef, type ForwardedRef, type Dispatch, type SetStateAction } from 'react';
import styles from './Phone.module.css';

interface Props {
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
}

const Phone = forwardRef(function Phone({ phone, setPhone }: Props, ref: ForwardedRef<HTMLInputElement>) {
  const formatPhone = (p: string) => {
    const a = p.replace(/\D/g, '');
    const b = [a.slice(0, 3), a.slice(3, 7), a.slice(7, 11)].filter((i) => !!i);
    return b.join('-').trim();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
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
          ref={ref}
          value={phone}
          onChange={handleChange}
          placeholder="010-1234-5678"
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
});

export default Phone;
