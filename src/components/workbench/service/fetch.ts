import { kyWrapper } from '@/services/ky-wrapper';
import { makeUrl } from '@/services/utils';
import { ImportedSurvey, OutgoingSurvey } from '../types';

const fetchCreate = async () => {
  return kyWrapper.post<{ surveyId: string }>(makeUrl(['surveys', 'workbench', 'create']));
};

const fetchSurveyPut = async ({ surveyId, survey }: { surveyId: string; survey: OutgoingSurvey }) => {
  return kyWrapper.put(makeUrl(['surveys', 'workbench', surveyId]), { json: survey });
};

const fetchSurveyGet = async ({ surveyId }: { surveyId: string }) => {
  return kyWrapper.get<ImportedSurvey>(makeUrl(['surveys', 'workbench', surveyId]));
};

const fetchSurveyStart = async ({ surveyId }: { surveyId: string }) => {
  return kyWrapper.patch(makeUrl(['surveys', 'workbench', 'start', surveyId]));
};

const DUMMY: ImportedSurvey = {
  title: '테스트 설문',
  description: '테스트 설문입니다.',
  thumbnail: 'https://files.sulmoon.io/20241005_055448219_alex-slim-arms-planetminecraft-com-1593751981.png',
  publishedAt: '2024-10-05T11:07:00.000+00:00',
  rewardSetting: {
    type: 'IMMEDIATE_DRAW',
    rewards: [
      { name: '리워드 이름', category: '카테고리', count: 499 },
      {
        name: 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
        category:
          '카테고리 길이 최대 카테고리 길이 최대 카테고리 길이 최대 카테고리 길이 최대 카테고리 길이 최대 카테고리 길이 최대 카테고리 길이 최대 카테고리 길이 최대 카테고리 길이 최대 카',
        count: 1,
      },
    ],
    targetParticipantCount: 500,
    finishedAt: '2024-10-11T15:00:00.000+00:00',
  },
  status: 'IN_MODIFICATION',
  finishMessage: '테스트 설문입니다.',
  isVisible: false,
  sections: [
    {
      sectionId: '97c0320b-60ee-4d70-aeff-b20f335bf1d6',
      title:
        '제목 없는11111231231231231231231231231231231231231231231231231231231231231231231231231231231231231231 섹션',
      description:
        '111112312312312312312312312312312312312312312312312312312312312312312312312312312312312312311112111*111112312312312312312312312312312312312312312312312312312312312312312312312312312312312312311112111*111112312312312312312312312312312312312312312312312312312312312312312312312312312312312312311112111*111112312312312312312312312312312312312312312312312312312312312312312312312312312312312312311112111*',
      questions: [
        {
          questionId: '6e8a068d-0672-457f-b88a-71029256f6c3',
          type: 'SINGLE_CHOICE',
          title: '111112312312312312312312312312312312312312312312312312312312312312312312312312312312312312311112111*',
          description:
            '111112312312312312312312312312312312312312312312312312312312312312312312312312312312312312311112111*\n111112312312312312312312312312312312312312312312312312312312312312312312312312312312312312311112111*111112312312312312312312312312312312312312312312312312312312312312312312312312312312312312311112111*111112312312312312312312312312312312312312312312312312312312312312312312312312312312312312311112111*111112312312312312312312312312312312312312312312312312312312312312312312312312312312312312311112111*111112312312312312312312312312312312312312312312312312312312312312111112312312312312312312312312312312312312312312312312312312312312312312312312312312312312311112111*\n111112312312312312312312312312312312312312312312312312312312312312312312312312312312312312311112111*111112312312312312312312312312312312312312312312312312312312312312312312312312312312312312311112111*111112312312312312312312312312312312312312312312312312312312312312312312312312312312312312311112111*11111231231231231231231231231231',
          isRequired: false,
          isAllowOther: true,
          choices: [
            '111112312312312312312312312312312312312312312312312312312312312312312312312312312312312312311112111*',
          ],
        },
      ],
      routeDetails: { type: 'NUMERICAL_ORDER', nextSectionId: null, keyQuestionId: null, sectionRouteConfigs: null },
    },
  ],
};

const fetchGenerateSurvey = async ({
  method,
  formData,
}: {
  method: 'text-document' | 'file-url';
  formData: { job: string; groupName: string; userPrompt: string; textDocument?: string; fileUrl?: string };
}) => {
  return new Promise<ImportedSurvey>((resolve) => {
    setTimeout(() => {
      console.log(method, formData);
      resolve(DUMMY);
    }, 3000);
  });
  // return kyWrapper.post<ImportedSurvey>(makeUrl(['ai', 'generate', 'survey', method]), { json: formData });
};

export { fetchCreate, fetchGenerateSurvey, fetchSurveyGet, fetchSurveyPut, fetchSurveyStart };
