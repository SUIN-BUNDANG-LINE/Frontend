import { v4 } from 'uuid';
import type { Field } from '../../types/store';
import type { Response, Section, Question, QuestionData } from '../types/chat';
import type { CSurvey, CSection, CField } from '../types/preview';

export const convert = (response: Response): CSurvey => {
  const qdataToField = (data: QuestionData, sectionId: string, fieldId: string): Field => ({
    type: ({ TEXT_RESPONSE: 'text', SINGLE_CHOICE: 'radio', MULTIPLE_CHOICE: 'checkbox' } as const)[data.type],
    title: data.title,
    description: data.description,
    required: data.isRequired,
    other: data.isAllowOther,
    options: data.choices ? data.choices.map((choice) => ({ id: v4(), content: choice })) : [],
    sectionId,
    fieldId,
  });

  const questionsMapper = (question: Question, sectionId: string): CField => ({
    fieldId: question.questionId,
    changeType: question.changeType,
    old: question.originalData ? qdataToField(question.originalData, sectionId, question.questionId) : null,
    new: question.modifiedData ? qdataToField(question.modifiedData, sectionId, question.questionId) : null,
  });

  const sectionsMapper = (section: Section): CSection => {
    const { sectionId, changeType, originalData, modifiedData } = section.sectionBasicInfo;

    const oldData = originalData ? { ...originalData, sectionId } : null;
    const newData = modifiedData ? { ...modifiedData, sectionId } : null;

    const fields = section.questions.map((question) => questionsMapper(question, sectionId));

    return {
      sectionId,
      changeType,
      old: oldData,
      new: newData,
      fields,
    };
  };

  return {
    surveyId: response.surveyBasicInfo.surveyId,
    changeType: response.surveyBasicInfo.changeType,
    old: response.surveyBasicInfo.originalData,
    new: response.surveyBasicInfo.modifiedData,
    sections: response.sections.map(sectionsMapper),
  };
};
