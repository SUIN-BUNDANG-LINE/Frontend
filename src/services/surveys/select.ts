import type { Survey, Section, Question, Router } from '@/components/survey-p/types';
import type { SurveysProgressResponse, Question as FetchedQuestion } from './types';

const toSurvey = ({
  title: surveyTitle,
  finishMessage: surveyFinishMessage,
  sections,
}: SurveysProgressResponse): Survey => {
  const newSections = [] as Section[];
  const newQuestions = [] as Question[];

  const getRouter = (index: number): Router => {
    const { type, keyQuestionId, sectionRouteConfigs, nextSectionId } = sections[index].routeDetails;

    if (type === 'SET_BY_CHOICE') {
      return {
        type: 'BRANCH',
        nextSection: {
          keyQid: keyQuestionId!,
          routingTable: sectionRouteConfigs!.map((config) => ({
            content: config.content,
            nextSid: config.nextSectionId,
          })),
        },
      };
    }

    if (type === 'SET_BY_USER') {
      return {
        type: 'FIXED',
        nextSection: nextSectionId,
      };
    }

    return {
      type: 'FIXED',
      nextSection: index + 1 < sections.length ? sections[index + 1].sectionId : null,
    };
  };

  const questionMapper = (question: FetchedQuestion): Question => {
    const { questionId, type, ...rest } = question;

    return {
      ...rest,
      id: questionId,
      type: ((t: string) => {
        if (t === 'SINGLE_CHOICE') return 'RADIO';
        if (t === 'MULTIPLE_CHOICE') return 'CHECKBOX';
        return 'TEXT';
      })(type),
    };
  };

  for (let i = 0; i < sections.length; i += 1) {
    const { sectionId, title, description, questions } = sections[i];
    const mappedQuestions = questions.map((question) => questionMapper(question));

    newSections.push({
      id: sectionId,
      title,
      description,
      router: getRouter(i),
      questions: mappedQuestions,
    } as Section);

    newQuestions.push(...mappedQuestions);
  }

  return {
    title: surveyTitle,
    finishMessage: surveyFinishMessage,
    questions: newQuestions,
    sections: newSections,
  };
};

export { toSurvey };
