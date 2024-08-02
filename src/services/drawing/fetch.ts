import KyWrapper from '../ky-wrapper';
import { makeUrl } from '../utils';
import type { DrawingInfoResponse, DrawingDrawParams, DrawingDrawResponse } from './types';

const kyWrapper = new KyWrapper();

const fetchDrawingInfo = async (surveyId: string) => {
  return kyWrapper.get<DrawingInfoResponse>(makeUrl(['drawing-board', 'info', surveyId]));
};

const fetchDrawingDraw = async (params: DrawingDrawParams) => {
  console.log(params);
  return kyWrapper.post<DrawingDrawResponse>(makeUrl(['drawing-board', 'draw']), { json: params });
};

export { fetchDrawingInfo, fetchDrawingDraw };
