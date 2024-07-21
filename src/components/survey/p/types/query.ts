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

interface Survey {
  title: string;
  finishMessage: string;
  sections: Section[];
}

export type { Survey, Question };
