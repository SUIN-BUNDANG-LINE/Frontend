// goal : write function to conver from @Response to @CSurvey

import type { Response } from '../types/chat';
import type { CSurvey } from '../types/preview';

export const convert = (response: Response): CSurvey => {
  console.log(response);

  return {
    surveyId: '',
    changeType: 'UNCHANGED',
    old: { title: '', description: '', finishMessage: '' },
    new: { title: '', description: '', finishMessage: '' },
    sections: [],
  };
};
