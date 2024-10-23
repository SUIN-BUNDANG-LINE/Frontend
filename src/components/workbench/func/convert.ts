import { v4 as uuid } from 'uuid';
import moment from 'moment';
import type {
  ImportedSurvey,
  OutgoingSurvey,
  Store,
  Section,
  Field,
  RouteDetails,
  Question,
  RewardConfig,
} from '../types';
import { Other, Submit } from '../misc/Route';

const cin = (survey: ImportedSurvey): Store => {
  const getFields = (sections: ImportedSurvey['sections']): Field[] => {
    const fields: Field[] = sections.flatMap(({ sectionId, questions }) =>
      questions.map(({ questionId, type, title, description, isAllowOther: other, isRequired: required, choices }) => {
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
          fieldId: questionId,
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

  const getSections = (sections: ImportedSurvey['sections'], fields: Field[]): Section[] => {
    const findOptionId = (fieldId: string, content: string) => {
      const field = fields.find((i) => i.fieldId === fieldId);
      if (!field || field.type !== 'radio') throw new Error(`${fieldId} ${content}`);

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

  const { sections: surveySections, rewardSetting: rewardConfig, ...surveyData } = survey;

  // ORDER MATTERS
  const fields = getFields(surveySections);
  const sections = getSections(surveySections, fields);

  return {
    fields,
    sections,
    rewardConfig,
    ...surveyData, // Spread the remaining fields from surveyData
  };
};

const cout = (store: Store): OutgoingSurvey => {
  const getSections = (sections: Section[], fields: Field[]): OutgoingSurvey['sections'] => {
    return sections.map((i) => {
      const routeDetails = ((): RouteDetails => {
        switch (i.routeStrategy.type) {
          case 'sequential':
            return { type: 'NUMERICAL_ORDER', nextSectionId: null, keyQuestionId: null, sectionRouteConfigs: null };
          case 'manual':
            return {
              type: 'SET_BY_USER',
              nextSectionId: i.routeStrategy.detail === Submit ? null : i.routeStrategy.detail,
              keyQuestionId: null,
              sectionRouteConfigs: null,
            };
          case 'conditional': {
            const { detail } = i.routeStrategy;
            const { key, router } = detail;
            const kf = fields.find((k) => k.fieldId === key);

            return {
              type: 'SET_BY_CHOICE',
              nextSectionId: null,
              keyQuestionId: key,
              sectionRouteConfigs: router.map((j) => {
                return {
                  content: j.id === Other ? null : kf!.options.find((k) => k.id === j.id)!.content,
                  nextSectionId: j.next === Submit ? null : j.next,
                };
              }),
            };
          }
          default:
            throw new Error('알 수 없는 라우팅 방법입니다.');
        }
      })();
      const questions = ((): Question[] => {
        return fields
          .filter((j) => j.sectionId === i.sectionId)
          .map((j) => ({
            questionId: j.fieldId,
            title: j.title,
            description: j.description,
            isRequired: j.required,
            type: ({ radio: 'SINGLE_CHOICE', checkbox: 'MULTIPLE_CHOICE', text: 'TEXT_RESPONSE' } as const)[j.type],
            choices: j.type === 'text' ? null : j.options.map((k) => k.content),
            isAllowOther: j.type === 'text' ? false : j.other,
          }));
      })();

      return {
        sectionId: i.sectionId,
        title: i.title,
        description: i.description,
        routeDetails,
        questions,
      };
    });
  };

  const normalizeReward = (rewardConfig: RewardConfig): RewardConfig => {
    const { type, rewards, targetParticipantCount, finishedAt } = rewardConfig;

    switch (type) {
      case 'IMMEDIATE_DRAW':
        return { type, rewards, finishedAt: moment(finishedAt).toISOString(), targetParticipantCount };
      case 'SELF_MANAGEMENT':
        return { type, rewards, finishedAt: moment(finishedAt).toISOString(), targetParticipantCount: null };
      case 'NO_REWARD':
      default:
        return { type: 'NO_REWARD', rewards: [], targetParticipantCount: null, finishedAt: null };
    }
  };

  const { title, description, thumbnail, finishMessage, isVisible, isResultOpen, rewardConfig, sections, fields } =
    store;

  return {
    title,
    description,
    thumbnail,
    finishMessage,
    isVisible,
    isResultOpen,
    rewardSetting: normalizeReward(rewardConfig),
    sections: getSections(sections, fields),
  };
};

export { cin, cout };
