import ky, { type Options, type KyInstance } from 'ky';
import { makeUrl } from '../utils';
import type {
  SurveysListResponse,
  SurveysListParams,
  SurveysDetailsResponse,
  SurveysResponseParams,
  SurveysResponseResponse,
  SurveysProgressResponse,
} from './types';

class KyWrapper {
  kyInstance: KyInstance;

  constructor() {
    this.kyInstance = ky.create({
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json;charset=UTF-8',
      },
    });
  }

  get<T>(URL: string, options?: Options) {
    return this.kyInstance.get(URL, options).json<T>();
  }

  post<T>(URL: string, options?: Options) {
    return this.kyInstance.post(URL, options).json<T>();
  }
}

const kyWrapper = new KyWrapper();

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
