/* eslint-disable no-console, no-alert */

'use client';

// hooks
import { useForm } from '@/components/survey-p/hooks/useForm';

// funcs
import { loadInteractions } from '@/components/survey-p/funcs/session-storage';
import SectionBlock from '@/components/survey-p/SectionBlock';
import Question from '@/components/survey-p/ui/question/Question';
import { useRouter } from 'next/navigation';
import Navigator from '@/components/survey-p/ui/navigator/Navigator';
import { useSurveysProgress, useSurveysResponse } from '@/services/surveys';

// component
export default function Page({ params }: { params: { surveyId: string } }) {
  const nextRouter = useRouter();
  const { surveyId } = params;

  const { data: survey } = useSurveysProgress(surveyId);
  const mutation = useSurveysResponse(surveyId);
  const { history: initialHistory, responses: initialResponses } = loadInteractions(surveyId);

  const { section, getResponse, getResponseDispatcher, navigator } = useForm({
    surveySections: survey?.sections,
    surveyQuestions: survey?.questions,
    initialHistory,
    initialResponses,
  });

  const moveNext = () => {
    const { ok, reason } = navigator.moveNext();

    if (ok) {
      return;
    }

    if (!reason) {
      console.error('no not-ok reason provided?');
      return;
    }

    const { code, payload } = reason;

    if (code === 'INCOMPLETE') {
      const x = document.getElementById(payload as string);
      x?.scrollIntoView();
    }

    if (code === 'SUBMIT') {
      mutation.mutate(payload as object);
    }
  };

  if (!survey || !section) return <div>Hello form!</div>;

  return (
    <>
      <SectionBlock title={section.title} description={section.description}>
        {section.questions.map((question) => {
          const { id, title, description, isRequired, isAllowOther, type, choices } = question;
          return (
            <Question
              key={id}
              id={id}
              title={title}
              description={description}
              isRequired={isRequired}
              isAllowOther={isAllowOther}
              type={type}
              choices={choices}
              response={getResponse(id, false)}
              dispatcher={getResponseDispatcher(id)}
            />
          );
        })}
      </SectionBlock>
      <Navigator
        exit={() => nextRouter.push(`/s/${surveyId}`)}
        isFirst={navigator.isFirst()}
        moveBack={navigator.moveBack}
        moveNext={moveNext}
      />
      {mutation.isPending && <p>제출 중입니다...</p>}
      {mutation.isSuccess && <p>제출 완료. {mutation.data.participantId}</p>}
      {mutation.isError && <p>제출에 문제가 발생했습니다. {mutation.failureReason?.name}</p>}
    </>
  );
}
