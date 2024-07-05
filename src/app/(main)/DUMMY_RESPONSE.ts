const response = {
  code: 'string', // 추후 구체화
  message: 'string', // 추후 구체화
  data: {
    pageCount: 10,
    surveys: [
      {
        surveyId: 1,
        thumbnail: 'https://loremflickr.com/300/300',
        title: '고객 만족도 조사',
        description: '제품과 서비스에 대한 여러분의 경험을 듣고 싶습니다.',
        targetParticipants: 150,
        rewardCount: 3,
        endDate: '2024-07-10 18:00',
        rewards: [
          {
            category: '커피',
            items: ['스타벅스 아메리카노', '스타벅스 라떼'],
          },
          {
            category: '상품권',
            items: ['아마존 기프트 카드 $10'],
          },
        ],
      },
      {
        surveyId: 2,
        thumbnail: 'https://loremflickr.com/300/301',
        title: '재택 근무 경험',
        description: '재택 근무 중 겪은 경험과 도전에 대해 공유해주세요.',
        targetParticipants: 200,
        rewardCount: 2,
        endDate: '2024-07-15 12:00',
        rewards: [
          {
            category: '커피',
            items: ['던킨 도너츠 커피', '코스타 커피 라떼'],
          },
        ],
      },
      {
        surveyId: 3,
        thumbnail: 'https://loremflickr.com/300/302',
        title: '신제품 피드백',
        description: '신제품을 출시할 예정입니다. 여러분의 피드백을 듣고 싶습니다.',
        targetParticipants: 100,
        rewardCount: 1,
        endDate: '2024-07-20 09:00',
        rewards: [
          {
            category: '상품권',
            items: ['월마트 기프트 카드 $15'],
          },
        ],
      },
      {
        surveyId: 4,
        thumbnail: 'https://loremflickr.com/300/303',
        title: '여행 선호도 조사',
        description: '여러분의 여행 선호도와 꿈의 여행지를 알려주세요.',
        targetParticipants: 250,
        rewardCount: 4,
        endDate: '2024-07-25 14:00',
        rewards: [
          {
            category: '마일리지',
            items: ['항공 마일리지 500점'],
          },
          {
            category: '상품권',
            items: ['베스트 바이 기프트 카드 $20'],
          },
        ],
      },
      {
        surveyId: 5,
        thumbnail: 'https://loremflickr.com/301/300',
        title: '운동과 건강 조사',
        description: '여러분의 운동 루틴과 건강 목표에 대해 알고 싶습니다.',
        targetParticipants: 180,
        rewardCount: 2,
        endDate: '2024-07-30 17:00',
        rewards: [
          {
            category: '스포츠',
            items: ['나이키 기프트 카드 $25'],
          },
        ],
      },
      {
        surveyId: 6,
        thumbnail: 'https://loremflickr.com/301/301',
        title: '선호하는 영화 장르',
        description: '여러분이 좋아하는 영화 장르와 최근에 즐긴 영화를 공유해주세요.',
        targetParticipants: 300,
        rewardCount: 3,
        endDate: '2024-08-01 20:00',
        rewards: [
          {
            category: '영화',
            items: ['넷플릭스 기프트 카드 $15'],
          },
        ],
      },
      {
        surveyId: 7,
        thumbnail: 'https://loremflickr.com/301/302',
        title: '소셜 미디어 사용 조사',
        description: '여러분의 소셜 미디어 사용 현황과 선호도를 알고 싶습니다.',
        targetParticipants: 220,
        rewardCount: 1,
        endDate: '2024-08-05 10:00',
        rewards: [
          {
            category: '상품권',
            items: ['아마존 기프트 카드 $20'],
          },
        ],
      },
      {
        surveyId: 8,
        thumbnail: 'https://loremflickr.com/301/303',
        title: '가젯 사용 및 선호도',
        description: '사용하는 가젯과 선호도에 대해 알려주세요.',
        targetParticipants: 270,
        rewardCount: 3,
        endDate: '2024-08-10 15:00',
        rewards: [
          {
            category: '전자제품',
            items: ['애플 스토어 기프트 카드 $30'],
          },
        ],
      },
    ],
  },
};

// eslint-disable-next-line import/prefer-default-export
export { response };
