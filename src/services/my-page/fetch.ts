import { kyWrapper } from '../ky-wrapper';
import { makeUrl } from '../utils';
import type { MySurveys, StatusForFilter, SortType } from './types';

function statusToString(status: StatusForFilter): string {
  return status !== null ? status : '';
}

function sortTypeToString(sortType: SortType): string {
  return sortType;
}

function toQueryStringObject(
  status: StatusForFilter,
  sortType: SortType
): { [key: string]: string | number | boolean } {
  return {
    ...(status !== null && { status: statusToString(status) }),
    ...(sortType !== null && { sortType: sortTypeToString(sortType) }),
  };
}

const getMySurveys = async (status: StatusForFilter, sortType: SortType) => {
  const URL = makeUrl(['surveys', 'my-page'], toQueryStringObject(status, sortType));
  return kyWrapper.get<MySurveys>(URL);
};

export { getMySurveys };
