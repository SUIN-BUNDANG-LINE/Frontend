type QuestionResponse = {
  content: string;
  isEtc: boolean;
};

type SectionResponse = {
  questionId: string;
  questionResponses: QuestionResponse[];
};

type SurveyResponse = {
  sectionId: string;
  sectionResponses: SectionResponse[];
};

interface SurveysResponseParams {
  surveyResponses: SurveyResponse[];
}

export type { QuestionResponse, SectionResponse, SurveyResponse, SurveysResponseParams };
