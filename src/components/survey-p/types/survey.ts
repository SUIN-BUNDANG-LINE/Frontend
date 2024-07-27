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

export type { Survey, Section, Question, Router, NextSection, QuestionType };
