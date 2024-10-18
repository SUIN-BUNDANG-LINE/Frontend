/* eslint-disable react/destructuring-assignment */
import styles from './field.module.css';
import { ChangeType, Field as F } from '../types/preview';
import TextResponse from './text-response';
import RadioResponse from './radio-response';
import CheckboxResponse from './checkbox-response';
import { Actions } from '../types/chat';

type Props = {
  index: string;
  oldField: F | null;
  newField?: F | null;
  changeType?: ChangeType;
  actions?: Actions;
};

export default function Field(props: Props) {
  const { index, oldField, newField, actions } = props;
  const changeType = props.changeType || 'UNCHANGED';

  function getPlaceholder() {
    return <div className={styles.field} />;
  }

  function getContent(field: F, isNew: boolean) {
    const { title, description, required, fieldId } = field;

    return (
      <button
        type="button"
        className={styles.field}
        onClick={() => {
          actions!.setBase(isNew);
          actions!.setTarget(fieldId);
        }}>
        <div className={styles.heads}>
          <div className={styles.title}>
            {required && <span className={styles.required}>필수</span>} {title || '제목 없는 질문'}
          </div>
          <div className={styles.description}>{description}</div>
        </div>
        <div className={styles.body}>
          {field.type === 'text' && <TextResponse />}
          {field.type === 'radio' && <RadioResponse options={field.options} other={field.other} />}
          {field.type === 'checkbox' && <CheckboxResponse options={field.options} other={field.other} />}
        </div>
      </button>
    );
  }

  const gridTemplateColumns = `repeat(${typeof newField !== 'undefined' ? 2 : 1}, 1fr)`;

  return (
    <div className={`${styles.container} ${styles[changeType]}`}>
      <div className={styles.heading}>
        <span>질문 {index && index}</span>
      </div>
      <div className={styles.content} style={{ gridTemplateColumns }}>
        {oldField ? getContent(oldField, false) : getPlaceholder()}
        {typeof newField !== 'undefined' && (newField ? getContent(newField, true) : getPlaceholder())}
      </div>
    </div>
  );
}
