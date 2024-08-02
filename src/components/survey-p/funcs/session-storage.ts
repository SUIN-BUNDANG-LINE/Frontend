import type { Responses } from '../types/interaction';

interface Interactions {
  responses: Responses;
  history: string[];
}

const getDefaultInteractions = (): Interactions => ({
  responses: {},
  history: [],
});

const storeInteractions = (surveyId: string, responses: Responses, history: string[]) => {
  const t = JSON.stringify({ responses, history });
  sessionStorage.setItem(`survey.${surveyId}`, t);
};

const loadInteractions = (surveyId: string): Interactions => {
  const t = sessionStorage.getItem(`survey.${surveyId}`);
  if (!t) return getDefaultInteractions();
  return JSON.parse(t);
};

export { storeInteractions, loadInteractions };
