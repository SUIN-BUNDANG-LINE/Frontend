import { isValidResponse } from '../../funcs';
import type { Response } from '../../types/interaction';
import type { Question as QuestionType } from '../../types/survey';
import CheckboxResponse from '../response/Checkbox';
import RadioResponse from '../response/Radio';
import TextResponse from '../response/Text';
import styles from './Question.module.css';

interface Props extends QuestionType {
  response: Response | null;
  dispatcher: {
    setContent: (content: string) => void;
    setOption: (option: string | null, exclusive?: boolean) => void;
    clearOption: (option: string | null) => void;
    toggleOption: (option: string | null, exclusive?: boolean) => void;
  };
}

export default function Question({
  id,
  title,
  description,
  isRequired,
  isAllowOther,
  type,
  choices,
  response,
  dispatcher,
}: Props) {
  const complete = isValidResponse(type, response);

  return (
    <div className={styles.question} id={id}>
      <legend className={styles.legend}>
        <div className={styles.head}>
          {isRequired && <span className={`${styles.required} ${complete && styles.complete}`}>* 필수</span>}
          <span className={styles.title}>{title}</span>
        </div>
        {description && description.trim().length !== 0 && <div className={styles.description}>{description}</div>}
      </legend>
      {type === 'TEXT' && <TextResponse content={response?.content || ''} dispatcher={dispatcher.setContent} />}
      {type === 'RADIO' && (
        <RadioResponse
          choices={choices || []}
          content={response?.content || ''}
          selected={response?.selected || []}
          dispatcher={dispatcher}
          allowOthers={isAllowOther}
        />
      )}
      {type === 'CHECKBOX' && (
        <CheckboxResponse
          choices={choices || []}
          content={response?.content || ''}
          selected={response?.selected || []}
          dispatcher={dispatcher}
          allowOthers={isAllowOther}
        />
      )}
    </div>
  );
}
