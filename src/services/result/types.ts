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

export type { Results };
