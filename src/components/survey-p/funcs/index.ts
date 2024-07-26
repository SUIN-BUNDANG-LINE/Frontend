import type { Response } from '../types/interaction';
import type { QuestionType } from '../types/survey';

const isValidResponse = (type: QuestionType, response: Response | null) => {
  if (!response) return false;

  const { content, selected } = response;

  if (type === 'TEXT') return content.trim().length > 0;
  return selected.length - (selected.includes(null) && content.trim().length === 0 ? 1 : 0) > 0;
};

export { isValidResponse };
