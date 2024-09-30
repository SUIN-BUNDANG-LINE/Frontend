import { useRouter } from 'next/navigation';
import type { SurveysDetailsResponse } from '@/services/surveys/types';
import { statusReader } from '@/utils/enumReader';
import Heads from './Heads';
import Body from './Body';

interface Props {
  data: SurveysDetailsResponse;
  surveyId: string;
}

export default function DetailsViewer({ data, surveyId }: Props) {
  const router = useRouter();

  const { title, description, status, type, finishedAt, currentParticipants, targetParticipants, rewards, thumbnail } =
    data;

  return (
    <>
      <Heads title={title} description={description} thumbnail={thumbnail} />
      <Body
        status={statusReader(status)}
        type={type}
        targetParticipantCount={targetParticipants}
        currentParticipantCount={currentParticipants}
        finishedAt={finishedAt}
        rewards={rewards}
        onStart={() => router.push(`/s/${surveyId}/p`)}
      />
    </>
  );
}
