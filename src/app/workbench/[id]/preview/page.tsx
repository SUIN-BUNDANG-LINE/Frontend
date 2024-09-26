'use client';

import { usePreview } from '@/components/preview/hooks/usePreview';
import PreviewDetails from '@/components/preview/ui/Details';
import Navigator from '@/components/preview/ui/Participate/Navigator';
import Section from '@/components/preview/ui/Participate/Section';
import Placeholder from '@/components/preview/ui/Placeholder';
import Field from '@/components/preview/ui/Participate/Field';
import { validateResponse } from '@/components/preview/funcs';
import ReadyToSubmit from '@/components/preview/ui/Ready';

export default function Page({ params }: { params: { id: string } }) {
  const { payload, query } = usePreview(params.id);

  if (!payload) return <Placeholder isLoading={query.isLoading} isError={query.isError} />;

  const { title, description, thumbnail, status, rewardConfig /* , finishMessage */ } = payload.survey;
  const { progress, state, actions, responses, dispatch } = payload.core;

  if (state === 'surveyDetails') {
    return (
      <PreviewDetails
        title={title}
        description={description}
        thumbnail={thumbnail}
        status={status}
        rewardConfig={rewardConfig}
        onStart={actions.push}
      />
    );
  }

  if (state === 'participate') {
    const section = actions.top();
    if (!section) return <div />;

    const fieldData = progress.page.map((field) => {
      const filteredResponses = responses.filter((i) => i.fieldId === field.fieldId);

      const valid =
        field.type === 'text' || field.type === 'radio'
          ? validateResponse({ field, response: filteredResponses[0] })
          : validateResponse({ field, responses: filteredResponses });

      return {
        key: field.fieldId,
        field,
        filteredResponses,
        valid,
      };
    });

    const push = () => {
      const invalidField = fieldData.find((i) => !i.valid);
      if (invalidField) {
        document.getElementById(invalidField.key)?.scrollIntoView();
        return;
      }
      actions.push();
    };

    return (
      <>
        <Section title={section.title} description={section.description}>
          {fieldData.map(({ key, field, filteredResponses, valid }) => (
            <Field key={key} field={field} responses={filteredResponses} valid={valid} dispatch={dispatch} />
          ))}
        </Section>
        <Navigator stack={progress.stack} push={push} pop={actions.pop} />
      </>
    );
  }

  return <ReadyToSubmit />;
}
