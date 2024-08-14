'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { useForm } from '@/components/survey-p/hooks/useForm';
import { useSurveysProgress, useSurveysResponse } from '@/services/surveys';
import {
  clearInteractions,
  getSurveyState,
  loadInteractions,
  setSurveyState,
  storeInteractions,
} from '@/components/survey-p/funcs/storage';

import Navigator from '@/components/survey-p/ui/navigator/Navigator';
import Section from '@/components/survey-p/Section';
import Farewell from '@/components/survey-p/farewell/Farewell';
import Loading from '@/components/ui/loading/Loading';
import type { ErrorCause } from '@/services/ky-wrapper';
import Error from '@/components/ui/error/Error';
import { showToast } from '@/utils/toast';

export default function Page({ params }: { params: { surveyId: string } }) {
  const { surveyId } = params;
  const nextRouter = useRouter();

  const { data: survey, isLoading, isError, refetch } = useSurveysProgress(surveyId);
  const mutation = useSurveysResponse(surveyId);
  const [surveyState] = useState(getSurveyState(surveyId));
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const {
    isLoading: visitorLoading,
    error: visitorError,
    data: visitorData,
  } = useVisitorData({ extendedResult: true }, { immediate: true });

  useEffect(() => {
    if (!survey) return;
    storeInteractions(surveyId, responses, sections ? sections.map((i) => i.id) : []);
  }, [survey, responses, sections, surveyId]);

  // phase 1 : loading a survey

  if (surveyState === '$') {
    return (
      <Error
        message="이미 참여한 설문조사입니다."
        buttons={[{ text: '나가기', fn: () => nextRouter.push(`/s/${surveyId}`) }]}
      />
    );
  }

  if (surveyState) {
    nextRouter.push(`/s/${surveyId}/draw?pid=${surveyState}`);
    return <Loading message="내용을 불러오는 중..." />;
  }

  if (isError || visitorError) {
    return (
      <Error
        message="내용을 불러오지 못했습니다."
        buttons={[
          { text: '뒤로', fn: () => nextRouter.push(`/s/${surveyId}`) },
          { text: '재시도', fn: refetch },
        ]}
      />
    );
  }

  if (isLoading || visitorLoading || !survey || !section) {
    return <Loading message="내용을 불러오는 중..." />;
  }

  // phase 2 : user interacts with a survey

  if (!userResponse) {
    const backText = navigator.isFirst() ? '처음으로' : '이전';
    const backAction = navigator.isFirst() ? () => nextRouter.push(`/s/${surveyId}`) : navigator.moveBack;

    const nextAction = () => {
      const { ok, reason } = navigator.moveNext();
      if (ok || !reason) {
        // if (!ok) console.error('no failure reason provided');
        return;
      }

      const { code, payload } = reason;
      switch (code) {
        case 'INCOMPLETE':
          document.getElementById(payload as string)?.scrollIntoView();
          document.getElementById(payload as string)?.dispatchEvent(new CustomEvent('blink'));
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

  if (userResponse) {
    const onSubmit = () => {
      if (!userResponse) return;

      const visitorId = visitorData?.visitorId || undefined;
      setIsSubmitting(true);

      mutation.mutate(
        { ...userResponse, visitorId },
        {
          onSuccess: (data) => {
            clearInteractions(surveyId);
            setSurveyState(surveyId, data.participantId);
            nextRouter.push(`/s/${surveyId}/draw?pid=${data.participantId}`);
          },
          onError: (error) => {
            showToast('error', (error.cause as ErrorCause).message);
            setIsSubmitting(false);
          },
        }
      );
    };

    return (
      <>
        <Farewell message={survey.finishMessage} />
        <Navigator
          backText="응답 수정"
          backAction={() => setUserResponse(null)}
          nextText={isSubmitting ? '제출 중...' : '제출'}
          nextAction={onSubmit}
          disablePrev={isSubmitting}
          disableNext={isSubmitting}
          centered
        />
        {isSubmitting}
      </>
    );
  }
}
