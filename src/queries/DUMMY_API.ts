/* eslint-disable @typescript-eslint/no-unused-vars */

const DUMMY_SURVEYS = [
  {
    surveyId: 1,
    thumbnail: 'https://loremflickr.com/200/200',
    title: '고객 만족도 조사',
    description: '제품과 서비스에 대한 여러분의 경험을 듣고 싶습니다.',
    targetParticipants: 150,
    currentParticipants: 75,
    rewardCount: 3,
    endDate: '2024-07-10 18:00',
    rewards: [
      {
        category: '커피',
        items: ['스타벅스 아메리카노', '스타벅스 라떼'],
        count: [1, 2],
      },
      {
        category: '상품권',
        items: ['아마존 기프트 카드 $10'],
        count: [3],
      },
    ],
    firstSectionId: 101,
    status: 'IN_PROGRESS',
  },
  {
    surveyId: 2,
    thumbnail: 'https://loremflickr.com/200/201',
    title: '재택 근무 경험',
    description: '재택 근무 중 겪은 경험과 도전에 대해 공유해주세요.',
    targetParticipants: 200,
    currentParticipants: 120,
    rewardCount: 2,
    endDate: '2024-07-15 12:00',
    rewards: [
      {
        category: '커피',
        items: ['던킨 도너츠 커피', '코스타 커피 라떼'],
        count: [1, 1],
      },
    ],
    firstSectionId: 102,
    status: 'IN_PROGRESS',
  },
  {
    surveyId: 3,
    thumbnail: 'https://loremflickr.com/200/202',
    title: '신제품 피드백',
    description: '신제품을 출시할 예정입니다. 여러분의 피드백을 듣고 싶습니다.',
    targetParticipants: 100,
    currentParticipants: 45,
    rewardCount: 1,
    endDate: '2024-07-20 09:00',
    rewards: [
      {
        category: '상품권',
        items: ['월마트 기프트 카드 $15'],
        count: [1],
      },
    ],
    firstSectionId: 103,
    status: 'IN_PROGRESS',
  },
  {
    surveyId: 4,
    thumbnail: 'https://loremflickr.com/200/203',
    title: '여행 선호도 조사',
    description: '여러분의 여행 선호도와 꿈의 여행지를 알려주세요.',
    targetParticipants: 250,
    currentParticipants: 180,
    rewardCount: 4,
    endDate: '2024-07-25 14:00',
    rewards: [
      {
        category: '마일리지',
        items: ['항공 마일리지 500점'],
        count: [1],
      },
      {
        category: '상품권',
        items: ['베스트 바이 기프트 카드 $20'],
        count: [3],
      },
    ],
    firstSectionId: 104,
    status: 'IN_PROGRESS',
  },
  {
    surveyId: 5,
    thumbnail: 'https://loremflickr.com/201/200',
    title: '운동과 건강 조사',
    description: '여러분의 운동 루틴과 건강 목표에 대해 알고 싶습니다.',
    targetParticipants: 180,
    currentParticipants: 90,
    rewardCount: 2,
    endDate: '2024-07-30 17:00',
    rewards: [
      {
        category: '스포츠',
        items: ['나이키 기프트 카드 $25'],
        count: [2],
      },
    ],
    firstSectionId: 105,
    status: 'IN_PROGRESS',
  },
  {
    surveyId: 6,
    thumbnail: 'https://loremflickr.com/201/201',
    title: '선호하는 영화 장르',
    description: '여러분이 좋아하는 영화 장르와 최근에 즐긴 영화를 공유해주세요.',
    targetParticipants: 300,
    currentParticipants: 220,
    rewardCount: 3,
    endDate: '2024-08-01 20:00',
    rewards: [
      {
        category: '영화',
        items: ['넷플릭스 기프트 카드 $15'],
        count: [3],
      },
    ],
    firstSectionId: 106,
    status: 'IN_PROGRESS',
  },
  {
    surveyId: 7,
    thumbnail: 'https://loremflickr.com/201/202',
    title: '소셜 미디어 사용 조사',
    description: '여러분의 소셜 미디어 사용 현황과 선호도를 알고 싶습니다.',
    targetParticipants: 220,
    currentParticipants: 150,
    rewardCount: 1,
    endDate: '2024-08-05 10:00',
    rewards: [
      {
        category: '상품권',
        items: ['아마존 기프트 카드 $20'],
        count: [1],
      },
    ],
    firstSectionId: 107,
    status: 'IN_PROGRESS',
  },
  {
    surveyId: 8,
    thumbnail: 'https://loremflickr.com/201/203',
    title: '가젯 사용 및 선호도',
    description: '사용하는 가젯과 선호도에 대해 알려주세요.',
    targetParticipants: 270,
    currentParticipants: 100,
    rewardCount: 3,
    endDate: '2024-08-10 15:00',
    rewards: [
      {
        category: '전자제품',
        items: ['애플 스토어 기프트 카드 $30'],
        count: [3],
      },
    ],
    firstSectionId: 108,
    status: 'IN_PROGRESS',
  },
  {
    surveyId: 9,
    thumbnail: 'https://loremflickr.com/202/200',
    title: '식습관 조사',
    description: '여러분의 식습관과 좋아하는 음식을 공유해주세요.',
    targetParticipants: 120,
    currentParticipants: 60,
    rewardCount: 2,
    endDate: '2024-08-15 12:00',
    rewards: [
      {
        category: '음식',
        items: ['피자 기프트 카드 $20'],
        count: [2],
      },
    ],
    firstSectionId: 109,
    status: 'IN_PROGRESS',
  },
  {
    surveyId: 10,
    thumbnail: 'https://loremflickr.com/202/201',
    title: '취미와 여가 활동 조사',
    description: '여러분의 취미와 여가 활동에 대해 알려주세요.',
    targetParticipants: 180,
    currentParticipants: 110,
    rewardCount: 3,
    endDate: '2024-08-20 14:00',
    rewards: [
      {
        category: '여가',
        items: ['레저 기프트 카드 $25'],
        count: [3],
      },
    ],
    firstSectionId: 110,
    status: 'IN_PROGRESS',
  },
  {
    surveyId: 11,
    thumbnail: 'https://loremflickr.com/202/202',
    title: '교육 및 학습 경험 조사',
    description: '여러분의 교육 및 학습 경험에 대해 공유해주세요.',
    targetParticipants: 200,
    currentParticipants: 140,
    rewardCount: 2,
    endDate: '2024-08-25 16:00',
    rewards: [
      {
        category: '교육',
        items: ['서점 기프트 카드 $20'],
        count: [2],
      },
    ],
    firstSectionId: 111,
    status: 'IN_PROGRESS',
  },
  {
    surveyId: 12,
    thumbnail: 'https://loremflickr.com/202/203',
    title: '스마트폰 사용 패턴 조사',
    description: '여러분의 스마트폰 사용 패턴과 선호 앱을 공유해주세요.',
    targetParticipants: 250,
    currentParticipants: 180,
    rewardCount: 3,
    endDate: '2024-08-30 18:00',
    rewards: [
      {
        category: '전자제품',
        items: ['구글 플레이 기프트 카드 $15'],
        count: [3],
      },
    ],
    firstSectionId: 112,
    status: 'IN_PROGRESS',
  },
  {
    surveyId: 13,
    thumbnail: 'https://loremflickr.com/203/200',
    title: '여행 경험 조사',
    description: '최근 여행 경험과 추천 여행지를 공유해주세요.',
    targetParticipants: 150,
    currentParticipants: 90,
    rewardCount: 2,
    endDate: '2024-09-01 10:00',
    rewards: [
      {
        category: '여행',
        items: ['호텔 기프트 카드 $30'],
        count: [2],
      },
    ],
    firstSectionId: 113,
    status: 'IN_PROGRESS',
  },
  {
    surveyId: 14,
    thumbnail: 'https://loremflickr.com/203/201',
    title: '음악 선호도 조사',
    description: '좋아하는 음악 장르와 아티스트를 공유해주세요.',
    targetParticipants: 200,
    currentParticipants: 130,
    rewardCount: 3,
    endDate: '2024-09-05 15:00',
    rewards: [
      {
        category: '음악',
        items: ['음악 스트리밍 서비스 기프트 카드 $15'],
        count: [3],
      },
    ],
    firstSectionId: 114,
    status: 'IN_PROGRESS',
  },
  {
    surveyId: 15,
    thumbnail: 'https://loremflickr.com/203/202',
    title: '독서 습관 조사',
    description: '여러분의 독서 습관과 추천 도서를 공유해주세요.',
    targetParticipants: 170,
    currentParticipants: 100,
    rewardCount: 2,
    endDate: '2024-09-10 12:00',
    rewards: [
      {
        category: '도서',
        items: ['서점 기프트 카드 $20'],
        count: [2],
      },
    ],
    firstSectionId: 115,
    status: 'IN_PROGRESS',
  },
  {
    surveyId: 16,
    thumbnail: 'https://loremflickr.com/203/203',
    title: '패션 스타일 조사',
    description: '여러분의 패션 스타일과 선호 브랜드를 공유해주세요.',
    targetParticipants: 220,
    currentParticipants: 170,
    rewardCount: 3,
    endDate: '2024-09-15 14:00',
    rewards: [
      {
        category: '패션',
        items: ['의류 기프트 카드 $25'],
        count: [3],
      },
    ],
    firstSectionId: 116,
    status: 'IN_PROGRESS',
  },
  {
    surveyId: 17,
    thumbnail: 'https://loremflickr.com/204/201',
    title: '전자 기기 사용 조사',
    description: '여러분이 자주 사용하는 전자 기기와 그 이유를 공유해주세요.',
    targetParticipants: 210,
    currentParticipants: 150,
    rewardCount: 2,
    endDate: '2024-09-20 16:00',
    rewards: [
      {
        category: '전자제품',
        items: ['전자 기기 기프트 카드 $20'],
        count: [2],
      },
    ],
    firstSectionId: 117,
    status: 'IN_PROGRESS',
  },
  {
    surveyId: 18,
    thumbnail: 'https://loremflickr.com/204/202',
    title: '온라인 쇼핑 습관 조사',
    description: '여러분의 온라인 쇼핑 습관과 선호 쇼핑몰을 공유해주세요.',
    targetParticipants: 230,
    currentParticipants: 180,
    rewardCount: 3,
    endDate: '2024-09-25 18:00',
    rewards: [
      {
        category: '쇼핑',
        items: ['온라인 쇼핑몰 기프트 카드 $25'],
        count: [3],
      },
    ],
    firstSectionId: 118,
    status: 'IN_PROGRESS',
  },
  {
    surveyId: 19,
    thumbnail: 'https://loremflickr.com/204/203',
    title: '게임 선호도 조사',
    description: '좋아하는 게임 장르와 게임을 공유해주세요.',
    targetParticipants: 240,
    currentParticipants: 190,
    rewardCount: 3,
    endDate: '2024-09-30 20:00',
    rewards: [
      {
        category: '게임',
        items: ['게임 기프트 카드 $20'],
        count: [3],
      },
    ],
    firstSectionId: 119,
    status: 'IN_PROGRESS',
  },
  {
    surveyId: 20,
    thumbnail: 'https://loremflickr.com/205/200',
    title: '음식 배달 경험 조사',
    description: '음식 배달 서비스에 대한 여러분의 경험을 공유해주세요.',
    targetParticipants: 260,
    currentParticipants: 200,
    rewardCount: 3,
    endDate: '2024-10-05 10:00',
    rewards: [
      {
        category: '음식',
        items: ['음식 배달 서비스 기프트 카드 $20'],
        count: [3],
      },
    ],
    firstSectionId: 120,
    status: 'IN_PROGRESS',
  },
  {
    surveyId: 21,
    thumbnail: 'https://loremflickr.com/205/202',
    title: '환경 보호 인식 조사',
    description: '환경 보호에 대한 여러분의 인식과 노력을 공유해주세요.',
    targetParticipants: 200,
    currentParticipants: 100,
    rewardCount: 2,
    endDate: '2024-10-10 14:00',
    rewards: [
      {
        category: '환경',
        items: ['에코백', '재사용 가능한 물병'],
        count: [1, 1],
      },
    ],
    firstSectionId: 121,
    status: 'IN_PROGRESS',
  },
];

interface GetSurveyList {
  code: string;
  message: string;
  data: {
    pageCount: number;
    surveys: {
      surveyId: number;
      thumbnail: string;
      title: string;
      description: string;
      targetParticipants: number;
      rewardCount: number;
      endDate: string;
      rewards: {
        category: string;
        items: string[];
      }[];
    }[];
  };
}

interface GetSurveyDetails {
  code: string;
  message: string;
  data: {
    pageCount: number;
    surveys: {
      surveyId: number;
      thumbnail: string;
      title: string;
      description: string;
      targetParticipants: number;
      rewardCount: number;
      endDate: string;
      rewards: {
        items: string;
        count: number;
      }[];
    }[];
  };
}

async function getSurveyList(sort: string, page: number, size: number = 8) {
  const a = async (): Promise<GetSurveyList> =>
    new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            code: 'string', // 추후 구체화
            message: 'string', // 추후 구체화
            data: {
              pageCount: Math.ceil(DUMMY_SURVEYS.length / size),
              surveys: DUMMY_SURVEYS.slice((page - 1) * size, Math.min(DUMMY_SURVEYS.length, page * size)).map(
                ({ firstSectionId, rewards, ...others }) => ({
                  ...others,
                  rewards: rewards.map(({ category, items }) => ({
                    category,
                    items,
                  })),
                })
              ),
            },
          }),
        0
      );
    });

  const t = await a();
  return t;
}

function getSurveyDetails(surveyId: string) {
  const { rewards, ...others } = DUMMY_SURVEYS.find(({ surveyId: sid }) => `${sid}` === surveyId)!;

  const data = {
    ...others,
    rewards: [] as { item: string; count: number }[],
  };

  for (let i = 0; i < rewards.length; i += 1) {
    for (let j = 0; j < rewards[i].items.length; j += 1) {
      data.rewards.push({ item: rewards[i].items[j], count: rewards[i].count[j] });
    }
  }

  return {
    code: 'string', // 추후 구체화
    message: 'string', // 추후 구체화
    data,
  };
}

export { getSurveyDetails, getSurveyList };
