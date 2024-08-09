import { kyWrapper } from '../ky-wrapper';
import { makeUrl } from '../utils';
import type {
  SurveysListResponse,
  SurveysListParams,
  SurveysDetailsResponse,
  SurveysResponseParams,
  SurveysResponseResponse,
  SurveysProgressResponse,
} from './types';

const fetchSurveysList = async ({ size = 8, page, sortType = 'RECENT', isAsc = false }: SurveysListParams) => {
  const URL = makeUrl(['surveys', 'list'], { size, page, sortType, isAsc });
  return kyWrapper.get<SurveysListResponse>(URL);
};

const fetchSurveysDetails = async ({ surveyId }: { surveyId: string }) => {
  return kyWrapper.get<SurveysDetailsResponse>(makeUrl(['surveys', 'info', surveyId]));
};

const fetchSurveysProgress = async ({ surveyId }: { surveyId: string }) => {
  return kyWrapper.get<SurveysProgressResponse>(makeUrl(['surveys', 'progress', surveyId]));
};

const fetchSurveysResponse = async ({ surveyId, responseBody }: SurveysResponseParams) => {
  return kyWrapper.post<SurveysResponseResponse>(makeUrl(['surveys', 'response', surveyId]), { json: responseBody });
};

export { fetchSurveysList, fetchSurveysDetails, fetchSurveysProgress, fetchSurveysResponse };
