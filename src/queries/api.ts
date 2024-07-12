import { SurveysDetailsParams, SurveysDetailsResponse, SurveysListParams, SurveysListResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const writeUrl = (api: string[], params: { [key: string]: string }) => {
  const baseUrl = [API_URL, ...api].join('/');
  const url = new URL(baseUrl);
  Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
  return url.toString();
};

const fetchSurveysList = async ({ size = 8, page, sortType = 'RECENT', isAsc = false }: SurveysListParams) => {
  const response = await fetch(
    writeUrl(['surveys', 'list'], {
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
  const response = await fetch(writeUrl(['surveys', 'info', surveyId], {}));
  const data = (await response.json()) as SurveysDetailsResponse;
  return data;
};

export { fetchSurveysList, fetchSurveysDetails };
