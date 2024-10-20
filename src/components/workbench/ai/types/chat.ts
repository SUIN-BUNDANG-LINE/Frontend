import { ChangeType } from './preview';

// App

export type Actions = {
  setPrompt: (arg: string) => void;
  setTarget: (arg: string | null) => void;
  setBase: (arg: boolean) => void;
};

// Request

export type Request = {
  isEditGeneratedResult: boolean;
  userPrompt: string;
  modificationTargetId: string;
  surveyId: string;
};

// Response

export type Response = {
  surveyBasicInfo: {
    surveyId: string;
    changeType: ChangeType;
    originalData: null | SurveyData;
    modifiedData: null | SurveyData;
  };
  sections: Section[];
};

export type Section = {
  sectionBasicInfo: {
    sectionId: string;
    changeType: ChangeType;
    originalData: null | SectionData;
    modifiedData: null | SectionData;
  };
  questions: Question[];
};

export type Question = {
  questionId: string;
  changeType: ChangeType;
  originalData: null | QuestionData;
  modifiedData: null | QuestionData;
};

export type SurveyData = {
  title: string;
  description: string;
  finishMessage: string;
};

export type SectionData = {
  title: string;
  description: string;
};

export type QuestionData = {
  type: 'TEXT_RESPONSE' | 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  title: string;
  description: string;
  isRequired: boolean;
  choices: string[] | null;
  isAllowOther: boolean;
};
