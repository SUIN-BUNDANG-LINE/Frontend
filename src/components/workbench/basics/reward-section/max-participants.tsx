import useModal from '@/hooks/useModal';
import Modal from '@/components/ui/modal/Modal';
import React from 'react';
import Button from '@/components/ui/button/Button';
import { useSurveyStore } from '../../store';
import styles from './max-participants.module.css';

type ModalProps = {
  init: number | null;
  apply: (val: string) => void;
};

function ModalContent({ init, apply }: ModalProps) {
  const [value, setValue] = React.useState(init ? `${init}` : '');

  const recommended = [5, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500];

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.replace(/\D/g, ''));
  };

  const valid = (() => {
    const parsed = Number.parseInt(value, 10);
    return parsed >= 1 && parsed <= 500;
  })();

  return (
    <div>
      <div className={styles.description}>참여 인원은 1명 이상 500명 이하로 설정해주세요.</div>
      <input
        type="text"
        pattern="[0-9]"
        className={styles.input}
        value={value}
        onChange={changeHandler}
        placeholder="최대 참여 인원수를 입력해주세요."
      />

      <div className={styles.recommendedGroup}>
        {recommended.map((i) => (
          <Button
            variant="secondary"
            key={`recommended-${i}`}
            onClick={() => setValue(`${i}`)}
            className={styles.recommended}
            width={48}
            height={32}>
            {i}
          </Button>
        ))}
      </div>

      <div className={styles.submit}>
        <Button variant="primary" onClick={() => apply(value)} disabled={!valid}>
          적용하고 닫기
        </Button>
      </div>
    </div>
  );
}

type Props = {
  readonly: boolean;
};

export default function MaxParticipants({ readonly }: Props) {
  const { value, setter } = useSurveyStore((state) => ({
    value: state.rewardConfig.targetParticipantCount,
    setter: state.rewardSetter,
  }));

  const { isOpen, closeModal, openModal } = useModal();

  const modalApply = (val: string) => {
    const parsed = Number.parseInt(val, 10);

    setter({ updates: { targetParticipantCount: parsed } });
    closeModal();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} title="최대 참여 인원">
        <ModalContent init={value} apply={modalApply} />
      </Modal>
      <div className={styles.group}>
        <label className={styles.label} htmlFor="reward-target-participant-count">
          <span>최대 참여 인원</span>
          <button type="button" onClick={openModal} disabled={readonly} className={styles.displayBtn}>
            {value ? `${value}명` : '클릭해서 설정하기'}
          </button>
        </label>
      </div>
    </>
  );
}
