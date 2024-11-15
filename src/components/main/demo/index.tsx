import React from 'react';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import type { ImportedSurvey, Store } from '@/components/workbench/types';
import { cin } from '@/components/workbench/func';
import Form from './form';
import styles from './index.module.css';
import { Request } from './types';
import Preview from './preview';
import Promotion from './promotion';

const DEFAULT_REQUEST = { file: { name: '', url: '' }, prompt: '' };

export default function Demo() {
  const [phase, setPhase] = React.useState(0);
  const [request, setRequest] = React.useState<Request>(DEFAULT_REQUEST);
  const [survey, setSurvey] = React.useState<Store | null>(null);

  React.useEffect(() => {
    if (phase < 0) setPhase(0);
  }, [phase]);

  const visitorId = useVisitorData({ extendedResult: false }, { immediate: true }).data?.visitorId;
  const unmount = () => {
    setPhase(-1);
    setSurvey(null);
  };
  const load = (s: ImportedSurvey) => {
    setSurvey(cin(s));
    setPhase(1);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>🤔 믿기지 않는다면 지금 바로 시험해보세요.</div>
      {phase === 0 && (
        <>
          <Form request={request} setRequest={setRequest} load={load} unmount={unmount} visitorId={visitorId} />
          <div style={{ width: '100%', maxWidth: '640px', padding: '8px 0', color: 'var(--gray)', fontSize: '14px' }}>
            * 주의 : 이 화면에서 생성한 설문지는 저장되지 않습니다.
          </div>
        </>
      )}
      {phase === 1 && survey && (
        <>
          <Preview survey={survey} unmount={unmount} />
          <Promotion />
        </>
      )}
    </div>
  );
}
