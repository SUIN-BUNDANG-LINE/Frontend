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
  if (typeof window === 'undefined') return;
  const t = JSON.stringify({ responses, history });
  sessionStorage.setItem(`survey.${surveyId}`, t);
};

const loadInteractions = (surveyId: string): Interactions => {
  if (typeof window === 'undefined') return getDefaultInteractions();
  const t = sessionStorage.getItem(`survey.${surveyId}`);
  if (!t) return getDefaultInteractions();
  const res = JSON.parse(t);
  if (!res.responses || !res.history) return getDefaultInteractions();
  return res;
};

const clearInteractions = (surveyId: string) => {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(`survey.${surveyId}`);
};

const setSurveyState = (surveyId: string, state: '$' | string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`survey.${surveyId}`, state);
};

const getSurveyState = (surveyId: string) => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(`survey.${surveyId}`);
};

export { storeInteractions, loadInteractions, clearInteractions, setSurveyState, getSurveyState };
