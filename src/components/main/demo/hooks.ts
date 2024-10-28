import { ImportedSurvey } from '@/components/workbench/types';
import { kyWrapper } from '@/services/ky-wrapper';
import { makeUrl } from '@/services/utils';
import { useMutation } from '@tanstack/react-query';

// const DUMMY_RESPONSE: ImportedSurvey = {
//   title: 'LLM 및 딥러닝 기술에 대한 조사',
//   description:
//     '안녕하세요! 본 설문은 LLM(대형 언어 모델)과 딥러닝 기술에 대한 여러분의 의견을 수집하기 위해 마련되었습니다. 여러분의 소중한 의견은 저희 팀의 연구에 큰 도움이 됩니다. 감사합니다!',
//   thumbnail: null,
//   publishedAt: null,
//   rewardSetting: {
//     type: 'NO_REWARD',
//     rewards: [],
//     targetParticipantCount: null,
//     finishedAt: null,
//   },
//   status: 'NOT_STARTED',
//   finishMessage: '설문에 참여해 주셔서 감사합니다! 여러분의 의견은 저희 연구에 큰 도움이 될 것입니다.',
//   isVisible: true,
//   isResultOpen: false,
//   sections: [
//     {
//       sectionId: 'bb235d35-1dc8-4e71-a38b-ac1437d62008',
//       title: 'LLM 및 딥러닝 이해',
//       description: '이 섹션에서는 LLM과 딥러닝에 대한 여러분의 이해도를 평가합니다.',
//       questions: [
//         {
//           questionId: 'd89eb286-d311-4627-af76-d3ea060334a0',
//           type: 'SINGLE_CHOICE',
//           title: 'LLM의 주요 특징은 무엇이라고 생각하십니까?',
//           description: 'LLM의 특징 중 가장 중요하다고 생각되는 것을 선택해 주세요.',
//           isRequired: true,
//           isAllowOther: true,
//           choices: ['대량의 데이터 학습', '자연어 생성 능력', '다양한 도메인 적용 가능성'],
//         },
//         {
//           questionId: 'fe437540-6001-479b-a941-25adc2476f8d',
//           type: 'MULTIPLE_CHOICE',
//           title: '딥러닝 기술의 장점은 무엇이라고 생각하십니까? (복수 선택 가능)',
//           description: '아래의 옵션 중에서 해당하는 모든 장점을 선택해 주세요.',
//           isRequired: true,
//           isAllowOther: true,
//           choices: ['비정형 데이터 처리 능력', '패턴 인식 성능', '전이 학습 가능성'],
//         },
//       ],
//       routeDetails: {
//         type: 'NUMERICAL_ORDER',
//         nextSectionId: null,
//         keyQuestionId: null,
//         sectionRouteConfigs: null,
//       },
//     },
//     {
//       sectionId: '37b6b30a-52ca-4145-ba00-4489d51af3ac',
//       title: 'LLM의 활용 및 미래',
//       description: '이 섹션에서는 LLM의 활용 가능성과 미래에 대한 여러분의 의견을 묻습니다.',
//       questions: [
//         {
//           questionId: 'dfa9cfa7-9bbc-4483-aeac-a68f5ab1d8c6',
//           type: 'SINGLE_CHOICE',
//           title: 'LLM의 가장 유망한 활용 분야는 무엇이라고 생각하십니까?',
//           description: 'LLM이 가장 효과적으로 활용될 수 있는 분야를 선택해 주세요.',
//           isRequired: true,
//           isAllowOther: true,
//           choices: ['자연어 처리', '기계 번역', '질문 응답 시스템'],
//         },
//         {
//           questionId: 'fcabf174-df17-4c84-9ea9-1c68bbe35e3f',
//           type: 'TEXT_RESPONSE',
//           title: 'LLM의 미래에 대해 어떻게 생각하십니까?',
//           description: 'LLM의 발전 방향이나 미래에 대한 개인적인 의견을 자유롭게 작성해 주세요.',
//           isRequired: false,
//           isAllowOther: false,
//           choices: null,
//         },
//       ],
//       routeDetails: {
//         type: 'NUMERICAL_ORDER',
//         nextSectionId: null,
//         keyQuestionId: null,
//         sectionRouteConfigs: null,
//       },
//     },
//   ],
// };

type Args = {
  onSuccess: (data: ImportedSurvey) => void;
  onError: (error: Error) => void;
  visitorId: string | undefined;
};

type Form = {
  target: string;
  groupName: string;
  userPrompt: string;
  fileUrl: string | null;
};

export const useGenerateSurvey = ({ onSuccess, onError, visitorId }: Args) => {
  return useMutation({
    mutationFn: ({ form, signal }: { form: Form; signal: AbortSignal }) => {
      // return new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve(DUMMY_RESPONSE);
      //   }, 3000); // 3-second delay
      // });
      return kyWrapper.post<ImportedSurvey>(makeUrl(['ai', 'generate', 'demo', 'survey', visitorId || 'anonymous']), {
        json: form,
        timeout: 60000,
        signal,
      });
    },
    onSuccess,
    onError,
  });
};
