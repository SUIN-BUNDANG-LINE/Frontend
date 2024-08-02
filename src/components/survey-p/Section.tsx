import Wrapper from '@/components/layout/Wrapper';
import { FaFileAlt } from 'react-icons/fa';
import type { Question as QuestionType, Response, ResponseDispatcher } from './types';
import Question from './ui/question/Question';
import styles from './Section.module.css';

interface Props {
  title: string;
  description?: string;
  questions: QuestionType[];
  getResponse: (qid: string, withDefault?: boolean) => Response | null;
  getResponseDispatcher: (qid: string) => ResponseDispatcher;
}

export default function SectionBlock({ title, description, questions, getResponse, getResponseDispatcher }: Props) {
  return (
    <Wrapper>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.icon}>
            <FaFileAlt />
          </div>
          <div className={styles.title_and_description}>
            <div className={styles.title}>{title}</div>
            {description && description.trim().length !== 0 && <div className={styles.description}>{description}</div>}
          </div>
        </div>
        {questions.map(({ id, title: qtitle, description: qdesc, isRequired, isAllowOther, type, choices }) => (
          <Question
            key={id}
            id={id}
            title={qtitle}
            description={qdesc}
            isRequired={isRequired}
            isAllowOther={isAllowOther}
            type={type}
            choices={choices}
            response={getResponse(id, false)}
            dispatcher={getResponseDispatcher(id)}
          />
        ))}
      </div>
    </Wrapper>
  );
}
