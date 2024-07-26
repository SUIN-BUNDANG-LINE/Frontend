import { makeUrl } from '../utils';
import type {
  SurveysListResponse,
  SurveysListParams,
  SurveysDetailsResponse,
  SurveysDetailsParams,
  SurveysProgressResponse,
} from './types';

const fetchSurveysList = async ({ size = 8, page, sortType = 'RECENT', isAsc = false }: SurveysListParams) => {
  const response = await fetch(
    makeUrl(['surveys', 'list'], {
      size: `${size}`,
      page: `${page}`,
      sortType,
      isAsc: isAsc ? 'true' : 'false',
    })
  );
  const data = (await response.json()) as SurveysListResponse;
  return data;
};

const fetchSurveysDetails = async ({ surveyId }: SurveysDetailsParams) => {
  const response = await fetch(makeUrl(['surveys', 'info', surveyId]));
  const data = (await response.json()) as SurveysDetailsResponse;
  return data;
};

const fetchSurveysProgress = async ({ surveyId }: SurveysDetailsParams) => {
  const response = await fetch(makeUrl(['surveys', 'progress', surveyId]));
  const data = (await response.json()) as SurveysProgressResponse;
  return data;
};

export { fetchSurveysList, fetchSurveysDetails, fetchSurveysProgress };
