import type { Field as F, Section as S } from '../types/preview';
import Section from './section';
import styles from './index.module.css';
import Field from './field';

type Props = {
  sections: S[];
  fields: F[];
};

export default function Preview({ sections, fields }: Props) {
  return (
    <div className={styles.container}>
      {sections.map(({ sectionId, title, description }, si) => (
        <>
          <Section index={`${si + 1}`} key={sectionId + Math.random()} newSection={{ sectionId, title, description }} />
          {fields
            .filter((field) => field.sectionId === sectionId)
            .map((field, fi) => (
              <Field index={`${si + 1}-${fi + 1}`} key={field.fieldId + Math.random()} oldField={field} />
            ))}
        </>
      ))}
    </div>
  );
}
