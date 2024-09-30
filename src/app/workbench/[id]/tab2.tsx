'use client';

import Button from '@/components/ui/button/Button';
import Rewards from '@/components/workbench/ready/rewards';
import Toc from '@/components/workbench/ready/toc';
import { useStartSurvey } from '@/components/workbench/service';
import { useSurveyStore } from '@/components/workbench/store';
import React from 'react';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/toast';
import styles from './tab2.module.css';

type Props = {
  surveyId: string;
};

function Tab2({ surveyId }: Props) {
  const router = useRouter();
  const { mutate, isPending } = useStartSurvey(
    surveyId,
    () => {
      showToast('success', '설문지가 공개되었습니다!');
      router.push(`/s/${surveyId}`);
    },
    () => alert('실패')
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

  return (
    <>
      <Toc toc={toc} />
      <Rewards config={rewardConfig} />
      <div className={styles.start}>
        <div className={styles.title}>
          <strong>공개하기</strong>
        </div>
        <div className={styles.description}>아래 버튼을 누르면 누구나 설문조사에 참여할 수 있게 됩니다.</div>
        <Button
          variant="primary"
          disabled={isPending || (status !== 'NOT_STARTED' && status !== 'IN_MODIFICATION')}
          onClick={() => mutate()}
          width="100%"
          height="42px">
          공개하기
        </Button>
      </div>
    </>
  );
}

export default Tab2;
