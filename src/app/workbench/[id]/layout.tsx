import Header from '@/components/workbench/Header';
import styles from './layout.module.css';

export default function WorkbenchLayout({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.app}>
      <Header />
      {children}
    </div>
  );
}
