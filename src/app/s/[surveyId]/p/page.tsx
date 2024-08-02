/* eslint-disable no-console, no-alert */

'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@/components/survey-p/hooks/useForm';
import { useSurveysProgress, useSurveysResponse } from '@/services/surveys';
import { loadInteractions, storeInteractions } from '@/components/survey-p/funcs/session-storage';

import Navigator from '@/components/survey-p/ui/navigator/Navigator';
import Section from '@/components/survey-p/Section';
import Farewell from '@/components/survey-p/farewell/Farewell';
import Drawing from '@/components/survey-p/drawing/Drawing';
import Loading from '@/components/ui/loading/Loading';

export default function Page({ params }: { params: { surveyId: string } }) {
  const { surveyId } = params;
  const nextRouter = useRouter();

  const { data: survey } = useSurveysProgress(surveyId);
  const mutation = useSurveysResponse(surveyId);

  const { history: initialHistory, responses: initialResponses } = useMemo(() => {
    return loadInteractions(surveyId);
  }, [surveyId]);

  const { section, getResponse, getResponseDispatcher, navigator, sections, responses } = useForm({
    surveySections: survey?.sections,
    surveyQuestions: survey?.questions,
    initialHistory,
    initialResponses,
  });

  const [userResponse, setUserResponse] = useState<object | null>(null);
  const [participantId, setParticipantId] = useState<string | null>(null);

  useEffect(() => {
    if (!survey) return;
    console.log(
      'sections :',
      sections.map((i) => i.id)
    );
    storeInteractions(surveyId, responses, sections ? sections.map((i) => i.id) : []);
  }, [survey, responses, sections, surveyId]);

  // phase 1 : loading a survey

  if (!survey || !section) {
    return <Loading message="폼을 불러오는 중..." />;
  }

  // phase 2 : user interacts with a survey

  if (!userResponse) {
    const backText = navigator.isFirst() ? '처음으로' : '이전';
    const backAction = navigator.isFirst() ? () => nextRouter.push(`/s/${surveyId}`) : navigator.moveBack;

    const nextAction = () => {
      const { ok, reason } = navigator.moveNext();
      if (ok || !reason) {
        if (!ok) console.error('no failure reason provided');
        return;
      }

      const { code, payload } = reason;
      switch (code) {
        case 'INCOMPLETE':
          document.getElementById(payload as string)?.scrollIntoView();
          break;
        case 'SUBMIT':
          setUserResponse(payload as object);
          break;
        default:
      }
    };

    return (
      <>
        <Section
          title={section.title}
          description={section.description}
          questions={section.questions}
          getResponse={getResponse}
          getResponseDispatcher={getResponseDispatcher}
        />
        <Navigator backText={backText} backAction={backAction} nextText="다음" nextAction={nextAction} />
      </>
    );
  }

  // phase 3 : ready to submit

  if (userResponse && !participantId) {
    const onSubmit = () => {
      if (!userResponse) return;
      mutation.mutate(userResponse, {
        onSuccess: (data) => {
          setParticipantId(data.participantId);
        },
        onError: (error) => {
          console.error(error);
          alert('에러가 발생했습니다. 다시 시도해주세요.');
        },
      });
    };

    return (
      <>
        <Farewell message={survey.finishMessage} />
        <Navigator
          backText="응답 수정"
          backAction={() => setUserResponse(null)}
          nextText="제출"
          nextAction={onSubmit}
          centered
        />
      </>
    );
  }

  // phase 4 : show drawing board

  if (participantId) {
    return <Drawing surveyId={surveyId} participantId={participantId} />;
  }
}
