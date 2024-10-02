import React, { useEffect, useState } from 'react';
import { FaEdit, FaRegCopy, FaRegStopCircle } from 'react-icons/fa';
import useModal from '@/hooks/useModal';
import Modal from '@/components/ui/modal/Modal';
import { fetchSurveyEdit, fetchSurveyFinish } from '@/services/management/fetch';
import { showToast } from '@/utils/toast';
import Button from '@/components/ui/button/Button';
import { writeClipboard } from '@/utils/misc';
import Loading from '@/components/ui/loading/Loading';
import styles from './tab3.module.css';

interface Tab3Props {
  surveyId: string;
  initialIsFinished: undefined | boolean;
}

function Tab3({ surveyId, initialIsFinished }: Tab3Props) {
  const { isOpen: isEditModalOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();
  const { isOpen: isFinishModalOpen, openModal: openFinishModal, closeModal: closeFinishModal } = useModal();
  const [isFinished, setIsFinished] = useState<boolean>();

  useEffect(() => {
    setIsFinished(initialIsFinished);
  }, [initialIsFinished]);

  const handleEditSurvey = async () => {
    closeEditModal();
    try {
      await fetchSurveyEdit({ surveyId });
      window.location.href = `/workbench/${surveyId}`;
    } catch (error) {
      showToast('error', '설문을 수정 상태로 변경하지 못했습니다.');
    }
  };

  const handleFinishSurvey = async () => {
    closeFinishModal();
    try {
      await fetchSurveyFinish({ surveyId });
      showToast('success', '설문을 성공적으로 종료했습니다.');
      setIsFinished(true);
    } catch (error) {
      showToast('error', '설문을 종료하지 못했습니다.');
    }
  };

  const handleCopyLink = () => {
    const surveyLink = `${window.location.origin}/s/${surveyId}`;
    writeClipboard(surveyLink);
    showToast('success', '설문 참여 링크가 클립보드에 복사되었습니다.');
  };

  if (initialIsFinished === undefined)
    return (
      <div className={styles.loading}>
        <Loading message="설문 정보를 불러오는 중..." />
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={openEditModal}
          className={`${styles.button} ${styles.editButton}`}
          disabled={isFinished}
          aria-disabled={isFinished}>
          <FaEdit className={styles.icon} />
          설문 수정
        </button>
        <button
          type="button"
          onClick={openFinishModal}
          className={`${styles.button} ${styles.finishButton}`}
          disabled={isFinished}
          aria-disabled={isFinished}>
          <FaRegStopCircle className={styles.icon} />
          설문 종료
        </button>
        <button type="button" onClick={handleCopyLink} className={`${styles.button} ${styles.shareButton}`}>
          <FaRegCopy className={styles.icon} />
          설문 공유
        </button>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="설문 수정 확인">
        <p>설문을 수정하는 동안에는 응답을 받을 수 없습니다. 설문을 수정하시겠습니까?</p>
        <div className={styles.modalActions}>
          <Button variant="primary" onClick={handleEditSurvey}>
            수정하기
          </Button>
          <Button variant="secondary" onClick={closeEditModal}>
            취소
          </Button>
        </div>
      </Modal>

      <Modal isOpen={isFinishModalOpen} onClose={closeFinishModal} title="설문 종료 확인">
        <p>설문을 종료하면 더 이상 응답을 받을 수 없습니다. 설문을 종료하시겠습니까?</p>
        <div className={styles.modalActions}>
          <Button variant="primary" onClick={handleFinishSurvey}>
            종료하기
          </Button>
          <Button variant="secondary" onClick={closeEditModal}>
            취소
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Tab3;
