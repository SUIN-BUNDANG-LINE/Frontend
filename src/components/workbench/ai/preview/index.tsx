import type { CSurvey, Field as F, Section as S } from '../types/preview';
import Section from './section';
import styles from './index.module.css';
import Field from './field';
import type { Actions } from '../types/chat';

type Props =
  | {
      survey: CSurvey;
      actions: Actions;
      sections?: undefined;
      fields?: undefined;
    }
  | {
      survey?: undefined;
      actions?: Actions;
      sections: S[];
      fields: F[];
    };

export default function Preview({ sections, actions, fields, survey }: Props) {
  if (survey) {
    return (
      <div className={styles.container}>
        {survey.sections.map((section, si) => (
          <>
            <Section
              index={`${si + 1}`}
              key={section.sectionId}
              oldSection={section.old}
              newSection={section.new}
              changeType={section.changeType}
              actions={actions}
            />
            {section.fields.map((field, fi) => (
              <Field
                index={`${si + 1}-${fi + 1}`}
                key={field.fieldId}
                oldField={field.old}
                newField={field.new}
                changeType={field.changeType}
                actions={actions}
              />
            ))}
          </>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {sections.map(({ sectionId, title, description }, si) => (
        <>
          <Section index={`${si + 1}`} key={sectionId} oldSection={{ sectionId, title, description }} />
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
