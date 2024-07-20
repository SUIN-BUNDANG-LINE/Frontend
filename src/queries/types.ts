import type { QuestionResponse, SectionResponse, SurveyResponse, SurveysResponseParams } from './surveys/response';

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

export type {
  SurveysListParams,
  SurveysListResponse,
  SurveysDetailsParams,
  SurveysDetailsResponse,
  QuestionResponse,
  SectionResponse,
  SurveyResponse,
  SurveysResponseParams,
};
