import React from 'react';
import 'moment/locale/ko';
import RewardSection from '@/components/workbench/basics/reward-section';
import MainSection from '@/components/workbench/basics/main-section';
import MiscSection from '@/components/workbench/basics/misc-section';
import styles from './tab0.module.css';

function Tab0() {
  return (
    <div className={styles.container}>
      <MainSection />
      <RewardSection />
      <hr />
      <MiscSection />
    </div>
  );
}

export default Tab0;
