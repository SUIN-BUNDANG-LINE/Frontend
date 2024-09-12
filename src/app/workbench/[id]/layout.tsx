import React from 'react';
import styles from './layout.module.css';

export default function WorkbenchLayout({ children }: React.PropsWithChildren) {
  return <div className={styles.app}>{children}</div>;
}
