interface SurveysListParams {
  size: number;
  page: number;
  sortType: 'RECENT';
  isAsc: boolean;
}

interface SurveysListResponse {
  pageCount: number;
  surveys: {
    surveyId: string;
    thumbnail: string;
    title: string;
    description: string;
    targetParticipants: number;
    rewardCount: number;
    finishedAt: string;
    rewards: {
      category: string;
      items: string[];
    }[];
  }[];
}

interface SurveysDetailsParams {
  surveyId: string;
}

interface SurveysDetailsResponse {
  title: string;
  description: string;
  status: string;
  finishedAt: string;
  thumbnail: string;
  currentParticipants: number;
  targetParticipants: number;
  rewards: { item: string; count: number }[];
}

// type QuestionResponse = {
//   content: string;
//   isEtc: boolean;
// };

// type SectionResponse = {
//   questionId: string;
//   questionResponses: QuestionResponse[];
// };

// type SurveyResponse = {
//   sectionId: string;
//   sectionResponses: SectionResponse[];
// };

// interface SurveysResponseParams {
//   surveyResponses: SurveyResponse[];
// }

type RDNumericalOrder = {
  type: 'NUMERICAL_ORDER';
  keyQuestionId: null;
  sectionRouteConfigs: null;
  nextSectionId: null;
};

type RDSetByChoice = {
  type: 'SET_BY_CHOICE';
  keyQuestionId: string;
  sectionRouteConfigs: { content: string; nextSectionId: string }[];
  nextSectionId: null;
};

type RDSetByUser = {
  type: 'SET_BY_USER';
  keyQuestionId: null;
  sectionRouteConfigs: null;
  nextSectionId: string;
};

type RouteDetails = RDNumericalOrder | RDSetByChoice | RDSetByUser;

interface Question {
  questionId: string;
  title: string;
  description: string;
  isRequired: boolean;
  type: 'TEXT_RESPONSE' | 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  choices: string[] | null;
  isAllowOther: boolean;
}

interface Section {
  sectionId: string;
  title: string;
  description: string;
  routeDetails: RouteDetails;
  questions: Question[];
}

interface SurveysProgressResponse {
  title: string;
  finishMessage: string;
  sections: Section[];
}

export type {
  SurveysListParams,
  SurveysListResponse,
  SurveysDetailsParams,
  SurveysDetailsResponse,
  SurveysProgressResponse,
  Question,
  Section,
};
