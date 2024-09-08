interface Results {
  results: Result[];
}

interface Result {
  questionId: string;
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

export type { Results, SurveysResultParams, ResultFilter, Result, Response, QuestionFilter };
