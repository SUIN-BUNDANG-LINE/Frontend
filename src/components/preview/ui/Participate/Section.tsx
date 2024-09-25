import { FaFileAlt } from 'react-icons/fa';
import { type Field } from '@/components/workbench/types';
import React from 'react';
import styles from './Section.module.css';
import FieldComponent from './Field';
import { Response } from '../../types/core';
import { Dispatch } from '../../types/participate';

type Props = {
  title: string;
  description: string;
  page: Field[];
  responses: Response[];
  dispatch: Dispatch;
};

export default function Section({ title, description, page, responses, dispatch }: Props) {
  return (
    <div className={styles.section}>
      <div className={styles.heads}>
        <div className={styles.top}>
          <FaFileAlt size="24px" />
          <div className={styles.title}>{title || '제목 없는 섹션'}</div>
        </div>
        {description.length !== 0 && <div className={styles.bottom}>{description}</div>}
      </div>
      <div className={styles.body}>
        {page.map((field) => (
          <FieldComponent key={field.fieldId} field={field} responses={responses} dispatch={dispatch} />
        ))}
      </div>
    </div>
  );
}
