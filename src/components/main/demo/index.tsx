import React from 'react';
import styles from './index.module.css';
import Form from './form';

export default function Demo() {
  // const [survey, setSurvey] = React.useState();

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>🤔 믿기지 않는다면 지금 바로 시험해보세요.</div>
      <Form />
    </div>
  );
}
