interface Response {
  selected: (string | null)[];
  content: string;
}

interface Responses {
  [qid: string]: Response;
}

interface ResponseDispatcher {
  setContent: (content: string) => void;
  setOption: (option: string | null, exclusive?: boolean) => void;
  clearOption: (option: string | null) => void;
  toggleOption: (option: string | null, exclusive?: boolean) => void;
}

interface MoveNext {
  ok: boolean;
  reason?: {
    code: 'FATAL' | 'SUBMIT' | 'INCOMPLETE';
    payload?: string;
  };
}

interface InteractionsResult {
  sectionResponses: {
    sectionId: string;
    questionResponses: {
      questionId: string;
      responses: { content: string; isOther: boolean }[];
    }[];
  }[];
}

interface NextSection {
  keyQid: string;
  routingTable: {
    content: string;
    nextSid: null | string;
  }[];
}

interface Router {
  type: 'FIXED' | 'BRANCH';
  nextSection: null | string | NextSection;
}

type QuestionType = 'TEXT' | 'RADIO' | 'CHECKBOX';

interface Question {
  id: string;
  title: string;
  description: string;
  isRequired: boolean;
  isAllowOther: boolean;
  type: QuestionType;
  choices: null | string[];
}

interface Section {
  id: string;
  title: string;
  description: string;
  router: Router;
  questions: Question[];
}

interface Survey {
  title: string;
  finishMessage: string;
  sections: Section[];
  questions: Question[];
}

export type {
  // survey
  Survey,
  Section,
  Question,
  Router,
  NextSection,
  QuestionType,
  // interactions
  Response,
  Responses,
  ResponseDispatcher,
  MoveNext,
  InteractionsResult,
};
