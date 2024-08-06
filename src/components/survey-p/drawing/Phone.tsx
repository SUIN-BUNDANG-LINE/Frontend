import { forwardRef, type ForwardedRef, type Dispatch, type SetStateAction } from 'react';
import styles from './Phone.module.css';

interface Props {
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
}

const Phone = forwardRef(function Phone({ phone, setPhone }: Props, ref: ForwardedRef<HTMLInputElement>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value.replace(/\D/g, '').slice(0, 8));
  };

  return (
    <div className={styles.container}>
      <label htmlFor="phone" className={styles.phoneLabel}>
        <span className={styles.label}>전화번호</span>
        <div className={styles.phone}>
          <button type="button" className={styles.phonePrefix}>
            010
          </button>
          <input
            required
            className={styles.phoneSuffix}
            type="text"
            pattern="[0-9]{8}"
            value={phone}
            onChange={handleChange}
            id="phone"
            ref={ref}
            placeholder="1234 5678"
          />
        </div>
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
