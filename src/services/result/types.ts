interface SurveyResult {
  sectionResults: SectionResult[];
}

interface SectionResult {
  sectionId: string;
  title: string;
  questionResults: QuestionResult[];
}

interface QuestionResult {
  questionId: string;
  title: string;
  type: QuestionType;
  participantCount: number;
  responses: Response[];
}

interface Response {
  content: string;
  count: number;
}

interface SurveysResultParams {
  surveyId: string;
  resultFilter: ResultFilter;
}

interface ResultFilter {
  questionFilters: QuestionFilter[];
}

interface QuestionFilter {
  questionId: string;
  contents: string[];
  isPositive: boolean;
}

type QuestionType = 'TEXT_RESPONSE' | 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';

export type {
  SurveyResult,
  SurveysResultParams,
  ResultFilter,
  SectionResult,
  QuestionResult,
  Response,
  QuestionFilter,
};
