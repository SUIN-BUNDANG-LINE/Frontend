interface SurveyResponse {
  title: string;
  description: string;
  thumbnail: string | null;
  publishedAt: string | null;
  finishedAt: string;
  status: SurveyStatus;
  finishMessage: string;
  targetParticipantCount: number;
  rewards: Reward[];
  sections: Section[];
}

type SurveyStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'IN_MODIFICATION' | 'CLOSED';

interface Reward {
  name: string;
  category: string;
  count: number;
}

interface Section {
  sectionId: string;
  title: string;
  description: string;
  routeDetails: RouteDetails;
  questions: Question[];
}

interface RouteDetails {
  type: RouteType;
  keyQuestionId: string | null;
  sectionRouteConfigs: SectionRouteConfig[] | null;
  nextSectionId: string | null;
}

type RouteType = 'NUMERICAL_ORDER' | 'SET_BY_CHOICE' | 'SET_BY_USER';

interface SectionRouteConfig {
  content: string | null;
  nextSectionId: string | null;
}

interface Question {
  questionId: string;
  title: string;
  description: string;
  isRequired: boolean;
  type: QuestionType;
  choices: string[] | null;
  isAllowOther: boolean;
}

type QuestionType = 'TEXT_RESPONSE' | 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';

export type { SurveyResponse };
