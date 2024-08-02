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
    payload?: string | object;
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

export type { Response, Responses, ResponseDispatcher, MoveNext, InteractionsResult };
