import Wrapper from '@/components/layout/Wrapper';
import SurveyListItem from '../item/Item';
import type { Survey } from '../types';
import styles from './List.module.css';

export default function List({ surveys }: { surveys: Survey[] }) {
  return (
    <Wrapper>
      <div className={styles.list}>
        {surveys.map((survey) => (
          <SurveyListItem survey={survey} key={survey.surveyId} />
        ))}
      </div>
    </Wrapper>
  );
}
