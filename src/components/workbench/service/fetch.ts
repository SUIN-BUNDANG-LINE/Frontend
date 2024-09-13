import { kyWrapper } from '@/services/ky-wrapper';
import { makeUrl } from '@/services/utils';
import { ImportedSurvey } from '../types';

// const DUMMY_SURVEY = {
//   title: '카페 이용에 관한 설문조사',
//   description: '우리 카페의 서비스와 품질을 개선하기 위해 여러분의 소중한 의견을 듣고자 합니다.',
//   thumbnail: null,
//   publishedAt: null,
//   status: 'NOT_STARTED',
//   finishMessage: '설문에 참여해 주셔서 감사합니다. 여러분의 의견은 저희에게 큰 도움이 됩니다!',
//   isVisible: true,
//   rewardSetting: {
//     type: 'SELF_MANAGEMENT',
//     rewards: [
//       { name: '스타벅스 아메리카노 T', category: '커피', count: 1 },
//       {
//         name: 'Lorem ipsum dolar sit amet, weiwefwefewfweofjiowejffewfwfefwefwefwefewfwefwefwijewjfoewjfiwejofw',
//         category: '커피',
//         count: 1,
//       },
//       { name: '스타벅스 아메리카노 T', category: '커피', count: 1 },
//       { name: '스타벅스 아메리카노 T', category: '커피', count: 1 },
//     ],
//     targetParticipantCount: null,
//     finishedAt: '2024-09-27T00:00',
//   },
//   sections: [
//     {
//       sectionId: 'section-uuid-1',
//       title: '카페 방문 경험',
//       description: '이전에 방문한 카페에 대한 경험을 묻습니다.',
//       routeDetails: {
//         type: 'SET_BY_CHOICE',
//         keyQuestionId: 'question-uuid-1-2',
//         sectionRouteConfigs: [
//           { content: '매우 좋았다', nextSectionId: null },
//           { content: '좋았다', nextSectionId: null },
//           { content: '보통이었다', nextSectionId: 'section-uuid-2' },
//           { content: '나빴다', nextSectionId: 'section-uuid-2' },
//           { content: '매우 나빴다', nextSectionId: 'section-uuid-2' },
//         ],
//         nextSectionId: null,
//       },
//       questions: [
//         {
//           questionId: 'question-uuid-1-1',
//           title: '최근 방문한 카페는 어디인가요?',
//           description: '최근에 방문한 카페의 이름을 적어주세요.',
//           isRequired: true,
//           type: 'TEXT_RESPONSE',
//           choices: null,
//           isAllowOther: false,
//         },
//         {
//           questionId: 'question-uuid-1-2',
//           title: '카페의 분위기는 어땠나요?',
//           description: '카페의 분위기를 평가해 주세요.',
//           isRequired: true,
//           type: 'SINGLE_CHOICE',
//           choices: ['매우 좋았다', '좋았다', '보통이었다', '나빴다', '매우 나빴다'],
//           isAllowOther: false,
//         },
//         {
//           questionId: 'question-uuid-1-3',
//           title: '카페의 서비스는 어땠나요?',
//           description: '카페에서의 서비스 수준을 평가해 주세요.',
//           isRequired: true,
//           type: 'MULTIPLE_CHOICE',
//           choices: ['친절했다', '빠르다', '친절하지 않았다', '느렸다'],
//           isAllowOther: true,
//         },
//       ],
//     },
//     {
//       sectionId: 'section-uuid-2',
//       title: '메뉴와 가격',
//       description: '카페의 메뉴와 가격에 대한 의견을 묻습니다.',
//       routeDetails: {
//         type: 'NUMERICAL_ORDER',
//         keyQuestionId: null,
//         sectionRouteConfigs: null,
//         nextSectionId: null,
//       },
//       questions: [
//         {
//           questionId: 'question-uuid-2-1',
//           title: '메뉴의 다양성은 어땠나요?',
//           description: '메뉴가 얼마나 다양했는지 평가해 주세요.',
//           isRequired: true,
//           type: 'SINGLE_CHOICE',
//           choices: ['매우 다양했다', '다양했다', '보통이었다', '다양하지 않았다', '매우 다양하지 않았다'],
//           isAllowOther: false,
//         },
//         {
//           questionId: 'question-uuid-2-2',
//           title: '가격은 적절했나요?',
//           description: '메뉴 가격에 대해 어떻게 생각하시는지 알려주세요.',
//           isRequired: true,
//           type: 'MULTIPLE_CHOICE',
//           choices: ['저렴하다', '적절하다', '약간 비싸다', '비싸다'],
//           isAllowOther: true,
//         },
//         {
//           questionId: 'question-uuid-2-3',
//           title: '다시 방문할 의향이 있나요?',
//           description: '이 카페를 다시 방문할 의향이 있는지 알려주세요.',
//           isRequired: true,
//           type: 'SINGLE_CHOICE',
//           choices: ['예', '아니오'],
//           isAllowOther: false,
//         },
//       ],
//     },
//   ],
// } as ImportedSurvey;

const fetchCreate = async () => {
  return kyWrapper.post<{ surveyId: string }>(makeUrl(['surveys', 'workbench', 'create']));
};

const fetchSurvey = async (surveyId: string) => {
  return kyWrapper.get<ImportedSurvey>(makeUrl(['surveys', 'workbench', surveyId]));
  // return { ...DUMMY_SURVEY, title: (DUMMY_SURVEY.title + surveyId[0]).slice(0, DUMMY_SURVEY.title.length) };
};

export { fetchCreate, fetchSurvey };
