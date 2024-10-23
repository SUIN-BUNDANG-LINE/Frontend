import type { CSurvey, Field as F, Section as S } from '../types/preview';
import Section from './section';
import styles from './index.module.css';
import Field from './field';
import type { Actions } from '../types/chat';
import SurveyInfo from './survey-info';

type Props =
  | {
      survey: CSurvey;
      actions: Actions;
      store?: undefined;
    }
  | {
      survey?: undefined;
      actions?: Actions;
      store: { sections: S[]; fields: F[]; title: string; description: string; finishMessage: string };
    };

export default function Preview({ store, actions, survey }: Props) {
  if (survey) {
    return (
      <div className={styles.container}>
        <SurveyInfo oldData={survey.old} newData={survey.new} changeType={survey.changeType} actions={actions} />
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

  const { sections, fields, title: sTitle, description: sDescription, finishMessage } = store;

  return (
    <div className={styles.container}>
      <SurveyInfo oldData={{ title: sTitle, description: sDescription, finishMessage }} actions={actions} />
      {sections.map(({ sectionId, title, description }, si) => (
        <>
          <Section
            index={`${si + 1}`}
            key={sectionId}
            oldSection={{ sectionId, title, description }}
            actions={actions}
          />
          {fields
            .filter((field) => field.sectionId === sectionId)
            .map((field, fi) => (
              <Field
                index={`${si + 1}-${fi + 1}`}
                key={field.fieldId + Math.random()}
                oldField={field}
                actions={actions}
              />
            ))}
        </>
      ))}
    </div>
  );
}
