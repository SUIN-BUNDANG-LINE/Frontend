'use client';

import { Header, Footer } from '@/components/layout/main';
import { SurveyFinder } from '@/components/main';
import styles from './page.module.css';

export default function Page() {
  return (
    <div className={styles.layout}>
      <Header />
      <SurveyFinder />
      <Footer />
    </div>
  );
}
