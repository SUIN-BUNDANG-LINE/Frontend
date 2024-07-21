export const DUMMY_SURVEY = {
  title: '설문 제목',
  finishMessage: '설문 종료 메시지',
  sections: [
    {
      sectionId: 'section-01',
      title: '응답 방식 테스트',
      description: '3가지 응답 방식',
      routeDetails: {
        type: 'NUMERICAL_ORDER', // 섹션 이동 방식(기본 순서대로, 선택지 따라, 사용자 지정)
        keyQuestionId: null,
        sectionRouteConfigs: null,
        nextSectionId: null,
      },
      questions: [
        {
          questionId: 'question-01',
          title: '텍스트 응답',
          description: '텍스트 응답입니다.',
          isRequired: false,
          type: 'TEXT_RESPONSE',
          choices: null,
          isAllowOther: false,
        },
        {
          questionId: 'question-02',
          title: '단일 선택 응답',
          description: '단일 선택 응답입니다.',
          isRequired: false,
          type: 'SINGLE_CHOICE',
          choices: ['A', 'B', 'C'],
          isAllowOther: false,
        },
        {
          questionId: 'question-03',
          title: '복수 선택 응답',
          description: '복수 선택 응답입니다.',
          isRequired: false,
          type: 'MULTIPLE_CHOICE',
          choices: ['가', '나', '다'],
          isAllowOther: false,
        },
      ],
    },
    {
      sectionId: 'section-02',
      title: '선택 사항 테스트',
      description: '',
      routeDetails: {
        type: 'NUMERICAL_ORDER', // 섹션 이동 방식(기본 순서대로, 선택지 따라, 사용자 지정)
        keyQuestionId: null,
        sectionRouteConfigs: null,
        nextSectionId: null,
      },
      questions: [
        {
          questionId: 'question-04',
          title: '이 문항에는 description이 없습니다.',
          description: '',
          isRequired: false,
          type: 'TEXT_RESPONSE',
          choices: null,
          isAllowOther: false,
        },
        {
          questionId: 'question-05',
          title: '기타 선택지가 있는 단일 선택 응답',
          description: '기타 선택지가 있는 단일 선택 응답입니다.',
          isRequired: false,
          type: 'SINGLE_CHOICE',
          choices: ['A', 'B', 'C'],
          isAllowOther: true,
        },
        {
          questionId: 'question-06',
          title: '기타 선택지가 있는 복수 선택 응답',
          description: '기타 선택지가 있는 복수 선택 응답입니다.',
          isRequired: false,
          type: 'MULTIPLE_CHOICE',
          choices: ['가', '나', '다'],
          isAllowOther: true,
        },
      ],
    },
    {
      sectionId: 'section-03',
      title: '필수 응답 테스트',
      description: '필수 질문에 모두 응답해야 다음으로 이동할 수 있습니다.',
      routeDetails: {
        type: 'NUMERICAL_ORDER', // 섹션 이동 방식(기본 순서대로, 선택지 따라, 사용자 지정)
        keyQuestionId: null,
        sectionRouteConfigs: null,
        nextSectionId: null,
      },
      questions: [
        {
          questionId: 'question-07',
          title: '동의해주세요.',
          description: '',
          isRequired: true,
          type: 'SINGLE_CHOICE',
          choices: ['동의합니다.'],
          isAllowOther: false,
        },
        {
          questionId: 'question-08',
          title: '이 질문에는 답하지 않아도 됩니다.',
          description: '기타 선택지가 있는 단일 선택 응답입니다.',
          isRequired: false,
          type: 'TEXT_RESPONSE',
          choices: null,
          isAllowOther: false,
        },
        {
          questionId: 'question-09',
          title: '하나 이상 선택하세요.',
          description: '기타를 선택하고 아무것도 입력하지 않으면 인정하지 않습니다.',
          isRequired: true,
          type: 'MULTIPLE_CHOICE',
          choices: ['1', '2', '3'],
          isAllowOther: true,
        },
      ],
    },
    {
      sectionId: 'section-04',
      title: '분기 테스트',
      description: '분기 테스트',
      routeDetails: {
        type: 'SET_BY_CHOICE', // 섹션 이동 방식(기본 순서대로, 선택지 따라, 사용자 지정)
        keyQuestionId: 'question-10',
        sectionRouteConfigs: [
          { content: 'A', nextSectionId: 'section-05' },
          { content: 'B', nextSectionId: 'section-06' },
          { content: null, nextSectionId: 'section-07' },
        ],
        nextSectionId: null,
      },
      questions: [
        {
          questionId: 'question-10',
          title: '테스트',
          description: '',
          isRequired: true,
          type: 'SINGLE_CHOICE',
          choices: ['A', 'B'],
          isAllowOther: true,
        },
      ],
    },
    {
      sectionId: 'section-05',
      title: 'A를 선택하셨습니다.',
      description: '다음 섹션은 set_by_user to section-08 입니다.',
      routeDetails: {
        type: 'SET_BY_USER', // 섹션 이동 방식(기본 순서대로, 선택지 따라, 사용자 지정)
        keyQuestionId: null,
        sectionRouteConfigs: null,
        nextSectionId: 'section-08',
      },
      questions: [
        {
          questionId: 'question-11',
          title: '테스트',
          description: '',
          isRequired: false,
          type: 'SINGLE_CHOICE',
          choices: ['가'],
          isAllowOther: false,
        },
      ],
    },
    {
      sectionId: 'section-06',
      title: 'B를 선택하셨습니다.',
      description: '다음 섹션은 set_by_user to section-08 입니다.',
      routeDetails: {
        type: 'SET_BY_USER', // 섹션 이동 방식(기본 순서대로, 선택지 따라, 사용자 지정)
        keyQuestionId: null,
        sectionRouteConfigs: null,
        nextSectionId: 'section-08',
      },
      questions: [
        {
          questionId: 'question-12',
          title: '테스트',
          description: '',
          isRequired: false,
          type: 'SINGLE_CHOICE',
          choices: ['가'],
          isAllowOther: false,
        },
      ],
    },
    {
      sectionId: 'section-07',
      title: '기타를 선택하셨습니다.',
      description: '다음 섹션은 set_by_user to section-08 입니다.',
      routeDetails: {
        type: 'SET_BY_USER', // 섹션 이동 방식(기본 순서대로, 선택지 따라, 사용자 지정)
        keyQuestionId: null,
        sectionRouteConfigs: null,
        nextSectionId: 'section-08',
      },
      questions: [
        {
          questionId: 'question-13',
          title: '테스트',
          description: '',
          isRequired: false,
          type: 'SINGLE_CHOICE',
          choices: ['가'],
          isAllowOther: false,
        },
      ],
    },
    {
      sectionId: 'section-08',
      title: '마지막 섹션',
      description: '다음을 누르면 제출하게 됩니다.',
      routeDetails: {
        type: 'NUMERICAL_ORDER', // 섹션 이동 방식(기본 순서대로, 선택지 따라, 사용자 지정)
        keyQuestionId: null,
        sectionRouteConfigs: null,
        nextSectionId: null,
      },
      questions: [
        {
          questionId: 'question-14',
          title: '테스트',
          description: '',
          isRequired: false,
          type: 'SINGLE_CHOICE',
          choices: ['가'],
          isAllowOther: false,
        },
      ],
    },
  ],
};
