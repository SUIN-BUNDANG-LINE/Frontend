import React from 'react';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { ImportedSurvey } from '@/components/workbench/types';
import Form from './form';
import styles from './index.module.css';
import { Request } from './types';

const DEFAULT_REQUEST = { file: { name: '', url: '' }, prompt: '' };

export default function Demo() {
  const [phase, setPhase] = React.useState(0);
  const [request, setRequest] = React.useState<Request>(DEFAULT_REQUEST);
  const [survey, setSurvey] = React.useState<ImportedSurvey | null>(null);

  React.useEffect(() => {
    if (phase < 0) setPhase(0);
  }, [phase]);

  const visitorId = useVisitorData({ extendedResult: false }, { immediate: true }).data?.visitorId;
  const unmount = () => setPhase(-1);
  const load = (s: ImportedSurvey) => {
    setPhase(1);
    setSurvey(s);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>🤔 믿기지 않는다면 지금 바로 시험해보세요.</div>
      <div className={styles.content}>
        {phase === 0 && (
          <Form request={request} setRequest={setRequest} load={load} unmount={unmount} visitorId={visitorId} />
        )}
        {phase === 1 && <textarea value={JSON.stringify(survey || {}, null, 2)} readOnly />}
      </div>
    </div>
  );
}
