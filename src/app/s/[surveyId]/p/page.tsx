'use client';

// hooks
import { useForm } from '@/components/survey/p/hooks/useForm';
import { useSurveysProgressQuery } from '@/components/survey/p/queries';

// funcs
import { loadInteractions } from '@/components/survey/p/funcs/session-storage';
import SectionBlock from '@/components/survey/p/SectionBlock';
import Question from '@/components/survey/p/ui/question/Question';
import Button from '@/components/ui/button/Button';
import { useRouter } from 'next/navigation';

// component
export default function Page({ params }: { params: { surveyId: string } }) {
  const nextRouter = useRouter();
  const { surveyId } = params;

  const { data: survey } = useSurveysProgressQuery(surveyId);
  const { history: initialHistory, responses: initialResponses } = loadInteractions(surveyId);

  const { section, getResponse, getResponseDispatcher, navigator, writeInteractionsResult } = useForm({
    surveySections: survey?.sections,
    surveyQuestions: survey?.questions,
    initialHistory,
    initialResponses,
  });

  const moveNext = () => {
    const { ok, reason } = navigator.moveNext();
    if (ok || !reason) return;

    const { code, payload } = reason;

    if (code === 'INCOMPLETE') {
      const x = document.getElementById(payload!);
      x?.scrollIntoView();
    }

    if (code === 'SUBMIT') {
      alert(`submit!`);
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
      <Button
        variant="primary"
        onClick={() => {
          const x = document.getElementById('question-01');
          x!.scrollIntoView();
        }}>
        scroll test
      </Button>
      <Button variant="primary" onClick={() => console.log(writeInteractionsResult())}>
        logger
      </Button>
      {navigator.isFirst() && (
        <Button variant="primary" onClick={() => nextRouter.push(`/s/${surveyId}`)}>
          처음으로
        </Button>
      )}
      {!navigator.isFirst() && (
        <Button variant="primary" onClick={navigator.moveBack}>
          이전
        </Button>
      )}
      <Button variant="primary" onClick={moveNext}>
        다음
      </Button>
    </>
  );
}
