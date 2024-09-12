import { v4 as uuid } from 'uuid';
import type { Survey, Store, Section, Field } from '../types';
import { Other, Submit } from '../misc/Route';

const legacyMode = (arg: number | null) => {
  // null or 0
  if (!arg) return { legacyMode: false, targetParticipantCount: 0 };
  return { legacyMode: true, targetParticipantCount: arg };
};

const getFields = (sections: Survey['sections']): Field[] => {
  const fields: Field[] = sections.flatMap(({ sectionId, questions }) =>
    questions.map(({ type, title, description, isAllowOther: other, isRequired: required, choices }) => {
      const fieldId = uuid();
      const fieldType = (
        {
          TEXT_RESPONSE: 'text',
          SINGLE_CHOICE: 'radio',
          MULTIPLE_CHOICE: 'checkbox',
        } as const
      )[type];

      return {
        sectionId,
        type: fieldType,
        fieldId,
        title,
        description,
        other,
        required,
        options: choices ? choices.map((choice) => ({ id: uuid(), content: choice })) : [],
      };
    })
  );

  return fields;
};

const getSections = (sections: Survey['sections'], fields: Field[]): Section[] => {
  const findOptionId = (fieldId: string, content: string) => {
    const field = fields.find((i) => i.fieldId === fieldId);
    if (!field || field.type !== 'radio') throw new Error();

    const option = field.options.find((i) => i.content === content);
    if (!option) throw new Error();

    return option.id;
  };

  return sections.map(({ questions, routeDetails: route, ...rest }) => {
    switch (route.type) {
      case 'SET_BY_USER':
        return { ...rest, routeStrategy: { type: 'manual', detail: route.nextSectionId || Submit } };
      case 'SET_BY_CHOICE':
        return {
          ...rest,
          routeStrategy: {
            type: 'conditional',
            detail: {
              key: route.keyQuestionId,
              router: route.sectionRouteConfigs.map((i) => ({
                id: i.content ? findOptionId(route.keyQuestionId, i.content) : Other,
                content: i.content || '기타 응답',
                next: i.nextSectionId || Submit,
              })),
            },
          },
        };
      case 'NUMERICAL_ORDER':
      default:
        return { ...rest, routeStrategy: { type: 'sequential', detail: null } };
    }
  });
};

const cin = (survey: Survey): Store => {
  const { title, description, thumbnail, finishMessage, status, rewards, isVisible, finishedAt, publishedAt } = survey;

  // ORDER MATTERS HERE
  const fields = getFields(survey.sections);
  const sections = getSections(survey.sections, fields);

  return {
    ...legacyMode(survey.targetParticipantCount),
    fields,
    sections,
    activeField: null,
    title,
    description,
    thumbnail,
    finishMessage,
    status,
    rewards,
    isVisible,
    finishedAt,
    publishedAt,
  };
};

export { cin };
