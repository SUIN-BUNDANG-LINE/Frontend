'use client';

import Button from '@/components/ui/button/Button';
import Rewards from '@/components/workbench/ready/rewards';
import Toc from '@/components/workbench/ready/toc';
import { useStartSurvey } from '@/components/workbench/service';
import { useSurveyStore } from '@/components/workbench/store';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/toast';
import useModal from '@/hooks/useModal';
import Modal from '@/components/ui/modal/Modal';
import StartSurveyFailedModal from '@/components/workbench/ready/modal';
import { extractStore, validate } from '@/components/workbench/func';
import { ErrorCause } from '@/services/ky-wrapper';
import { FaExternalLinkAlt } from 'react-icons/fa';
import styles from './tab2.module.css';

type Props = {
  surveyId: string;
};

function Tab2({ surveyId }: Props) {
  const router = useRouter();
  const store = useSurveyStore(extractStore);
  const [modalTitle, setModalTitle] = useState('');
  const [rejectMessage, setRejectMessage] = useState<string>('');
  const { isOpen, closeModal, openModal } = useModal();
  const { mutate, isPending } = useStartSurvey(
    surveyId,
    () => {
      showToast('success', '설문지가 공개되었습니다!');
      router.push('/mypage');
    },
    (error: Error) => {
      setModalTitle('공개 실패');
      setRejectMessage((error.cause as ErrorCause).message || '');
      openModal();
    }
  );
  const { sections, fields, rewardConfig, status } = useSurveyStore((state) => ({
    sections: state.sections,
    fields: state.fields,
    rewardConfig: state.rewardConfig,
    status: state.status,
  }));

  const toc = React.useMemo(
    () =>
      sections.map((s) => ({
        section: s,
        fields: fields.filter((i) => i.sectionId === s.sectionId),
      })),
    [sections, fields]
  );

  const errors = React.useMemo(() => {
    const { valid, reason } = validate(store);
    if (!valid) return reason;
    return [];
  }, [store]);

  return (
    <div className={styles.container}>
      <Modal isOpen={isOpen} onClose={closeModal} title={modalTitle}>
        <StartSurveyFailedModal errors={errors} rejectMessage={rejectMessage} onClose={closeModal} />
      </Modal>
      <Toc toc={toc} />
      <Rewards config={rewardConfig} />
      <div className={styles.start}>
        <div className={styles.title}>
          <strong>공개하기</strong>
        </div>
        {errors.length !== 0 && (
          <>
            <div className={styles.description}>아직 설문을 공개할 수 없습니다.</div>
            <Button
              variant="secondary"
              disabled={isPending || (status !== 'NOT_STARTED' && status !== 'IN_MODIFICATION')}
              onClick={() => {
                setModalTitle('공개 불가 사유');
                setRejectMessage('');
                openModal();
              }}
              width="100%"
              height="42px">
              문제 확인하기
            </Button>
          </>
        )}
        {errors.length === 0 && (
          <>
            <div className={styles.description}>아래 버튼을 누르면 누구나 설문조사에 참여할 수 있게 됩니다.</div>
            <Button
              variant="primary"
              disabled={isPending || (status !== 'NOT_STARTED' && status !== 'IN_MODIFICATION')}
              onClick={() => mutate()}
              width="100%"
              height="42px">
              공개하기
            </Button>
          </>
        )}
        <div style={{ height: '12px' }} />
        <a target="_blank" href={`/workbench/${surveyId}/preview`} className={styles.preview} rel="noreferrer">
          <FaExternalLinkAlt />
          <div>미리보기</div>
        </a>
      </div>
    </div>
  );
}

export default Tab2;
