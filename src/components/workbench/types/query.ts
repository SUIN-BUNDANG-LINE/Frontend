type Survey = {
  title: string;
  description: string;
  thumbnail: string | null;
  publishedAt: string | null;
  finishedAt: string;
  status: Status;
  finishMessage: string;
  targetParticipantCount: number | null;
  isVisible: boolean;
  rewards: Reward[];
  sections: Section[];
};

type Status = 'NOT_STARTED' | 'IN_PROGRESS' | 'IN_MODIFICATION' | 'CLOSED';

type Reward = { name: string; category: string; count: number };

type Section = {
  sectionId: string;
  title: string;
  description: string;
  routeDetails: RouteDetails;
  questions: Question[];
};

type RouteDetails = RouteByNumerical | RouteByChoice | RouteByUser;

type RouteByNumerical = {
  type: 'NUMERICAL_ORDER';
  nextSectionId: null;
  keyQuestionId: null;
  sectionRouteConfigs: null;
};

type RouteByUser = {
  type: 'SET_BY_USER';
  nextSectionId: string | null;
  keyQuestionId: null;
  sectionRouteConfigs: null;
};

type RouteByChoice = {
  type: 'SET_BY_CHOICE';
  nextSectionId: null;
  keyQuestionId: string;
  sectionRouteConfigs: {
    content: string | null;
    nextSectionId: string | null;
  }[];
};

type Question = {
  questionId: string;
  title: string;
  description: string;
  isRequired: boolean;
  type: QuestionType;
  choices: string[] | null;
  isAllowOther: boolean;
};

type QuestionType = 'TEXT_RESPONSE' | 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';

export type { Survey };
