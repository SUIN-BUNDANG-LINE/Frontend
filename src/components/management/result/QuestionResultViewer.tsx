import { useRef } from 'react';
import { QuestionResult } from '@/services/result/types';
import { FaUsers } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import { showToast } from '@/utils/toast';
import { writeClipboard } from '@/utils/misc';
import styles from './QuestionResultViewer.module.css';
import PieChartComponent from './PieChartComponent';
import TextResponseList from './TextResponseList';
import Svg from '../misc/Svg';

export default function QuestionResultViewer({ questionResult }: { questionResult: QuestionResult }) {
  const { title, responses, participantCount, type } = questionResult;
  const componentRef = useRef<HTMLDivElement>(null);

  const fields = [
    {
      path: 'M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z',
      id: 'tool-radio',
    },
    {
      path: 'm424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z',
      id: 'tool-checkbox',
    },
    {
      path: 'M280-160v-520H80v-120h520v120H400v520H280Zm360 0v-320H520v-120h360v120H760v320H640Z',
      id: 'tool-text',
    },
  ];

  const questionTypeMap: { [key: string]: { label: string; icon: JSX.Element } } = {
    SINGLE_CHOICE: { label: '단일 선택', icon: <Svg path={fields[0].path} size="15px" /> },
    MULTIPLE_CHOICE: { label: '다중 선택', icon: <Svg path={fields[1].path} size="15px" /> },
    TEXT_RESPONSE: { label: '주관식', icon: <Svg path={fields[2].path} size="15px" /> },
  };

  const handleCopyToClipboard = async () => {
    if (type === 'TEXT_RESPONSE') {
      if (responses) writeClipboard(responses.map((i) => i.content).join('\n'));
      showToast('success', '텍스트가 클립보드에 복사되었습니다.');
      return;
    }

    if (componentRef.current) {
      const copyButton = componentRef.current.querySelector(`.${styles.copyButton}`) as HTMLButtonElement;
      if (copyButton) {
        copyButton.style.display = 'none';
      }

      const canvas = await html2canvas(componentRef.current, {
        width: 800,
        height: 425,
        windowWidth: 800,
        windowHeight: 425,
        scale: 2,
      });

      if (copyButton) {
        copyButton.style.display = 'block';
      }

      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({
                [blob.type]: blob,
              }),
            ]);
            showToast('success', '이미지가 클립보드에 복사되었습니다.');
          } catch (err) {
            showToast('error', '클립보드 복사 중 오류가 발생했습니다.');
          }
        }
      });
    }
  };

  return (
    <div className={styles.questionContainer} ref={componentRef}>
      <div className={styles.copyButton}>
        <button type="button" className={styles.submit} onClick={handleCopyToClipboard}>
          <div className={styles.submitInner}>복사</div>
        </button>
      </div>
      <h2 className={styles.questionTitle}>{title}</h2>
      <div className={styles.questionInfo}>
        <div className={styles.questionType}>
          {/* 타입 아이콘 */}
          <span className={styles.icon}>{questionTypeMap[type].icon}</span>
          <span className={styles.typeSpan}>{questionTypeMap[type].label}</span>
        </div>
        <div className={styles.participantCount}>
          {/* 응답자 수 아이콘 */}
          <span className={styles.icon}>
            <FaUsers />
          </span>
          <span className={styles.typeSpan}>{participantCount}명</span>
        </div>
      </div>
      {type === 'TEXT_RESPONSE' ? (
        <TextResponseList responses={responses} />
      ) : (
        <PieChartComponent responses={responses} />
      )}
    </div>
  );
}
