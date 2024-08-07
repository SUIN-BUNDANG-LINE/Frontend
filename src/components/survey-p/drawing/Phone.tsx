import { forwardRef, type ForwardedRef, type Dispatch, type SetStateAction } from 'react';
import useModal from '@/hooks/useModal';
import Modal from '@/components/ui/modal/Modal';
import styles from './Phone.module.css';

interface Props {
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
}

const Phone = forwardRef(function Phone({ phone, setPhone }: Props, ref: ForwardedRef<HTMLInputElement>) {
  const { isOpen, openModal, closeModal } = useModal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value.replace(/\D/g, '').slice(0, 8));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} title="이용 약관">
        <h2>개인정보 수집 및 이용 동의서</h2>
        <p>
          <strong>[설문조사 리워드 지급을 위한 개인정보 수집 및 이용 동의서]</strong>
        </p>

        <h3>1. 개인정보 수집 항목</h3>
        <p>회사는 설문조사 리워드 지급을 위해 아래와 같은 개인정보를 수집합니다.</p>
        <ul>
          <li>필수 항목: 전화번호</li>
        </ul>

        <h3>2. 개인정보의 수집 및 이용 목적</h3>
        <p>회사는 수집한 개인정보를 다음의 목적을 위해 이용합니다.</p>
        <ul>
          <li>설문조사 참여자에게 리워드를 지급하기 위한 목적</li>
        </ul>

        <h3>3. 개인정보의 보유 및 이용 기간</h3>
        <p>회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</p>
        <ul>
          <li>보유 기간: 리워드 지급 완료 시점까지</li>
        </ul>

        <h3>4. 개인정보의 제3자 제공</h3>
        <p>회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.</p>
        <ul>
          <li>이용자가 사전에 동의한 경우</li>
          <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
        </ul>

        <h3>5. 개인정보의 파기 절차 및 방법</h3>
        <p>
          회사는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기 절차 및
          방법은 다음과 같습니다.
        </p>
        <ul>
          <li>파기 절차: 목적 달성 후 내부 방침 및 기타 관련 법령에 따라 일정 기간 저장된 후 파기됩니다.</li>
          <li>
            파기 방법: 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.
          </li>
        </ul>

        <h3>6. 이용자의 권리</h3>
        <p>
          이용자는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 다만, 동의를 거부할 경우 리워드 지급이
          불가능할 수 있습니다.
        </p>

        <h3>7. 개인정보 보호 책임자 및 담당자 연락처</h3>
        <p>
          회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만 처리 및 피해 구제를
          위하여 아래와 같이 개인정보 보호 책임자를 지정하고 있습니다.
        </p>
        <ul>
          <li>개인정보 보호 책임자: [이름]</li>
          <li>연락처: [전화번호], [이메일]</li>
        </ul>

        <p>본 동의서는 [년 월 일]부터 시행됩니다.</p>
      </Modal>
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
        <button type="button" className={styles.fullTos} onClick={openModal}>
          약관 전문 보기
        </button>
      </div>
    </>
  );
});

export default Phone;
