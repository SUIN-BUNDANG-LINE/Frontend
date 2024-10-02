import { useCallback, useEffect, useMemo, useState } from 'react';
import { isValidResponse } from '../funcs';
import type { InteractionsResult, MoveNext, Response, ResponseDispatcher, Responses } from '../types/interaction';
import type { Section, Question, NextSection } from '../types/survey';

interface Params {
  surveySections?: Section[];
  surveyQuestions?: Question[];
  initialHistory: string[];
  initialResponses: Responses;
}

const historyMapper = (sections: Section[], history: string[]) => {
  if (!sections) return [];

  if (history.length === 0 || history.some((i) => !sections.find((s) => s.id === i))) {
    return [sections[0]];
  }

  return history.map((i) => sections.find((s) => s.id === i)!);
};

export const useForm = ({ surveySections, surveyQuestions, initialHistory, initialResponses }: Params) => {
  const [responses, setResponses] = useState<Responses>(initialResponses);
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    if (!surveySections) return;
    setSections(surveySections ? historyMapper(surveySections, initialHistory) : [surveySections[0]]);
  }, [initialHistory, surveySections]);

  const getQuestion = useCallback(
    (qid: string): Question | null => surveyQuestions?.find((i) => i.id === qid) || null,
    [surveyQuestions]
  );

  // response getter & setter

  const getResponse = useCallback(
    (qid: string, withDefault: boolean = true): Response | null => {
      if (Object.hasOwn(responses, qid)) return responses[qid];
      return withDefault ? { selected: [], content: '' } : null;
    },
    [responses]
  );

  const setResponse = useCallback((qid: string, response: Response) => {
    setResponses((pre) => ({
      ...pre,
      [qid]: response,
    }));
  }, []);

  // high-level response setter

  const getResponseDispatcher = useCallback(
    (qid: string): ResponseDispatcher => {
      const cur = () => getResponse(qid)!;

      const setContent = (content: string) => {
        setResponse(qid, { ...cur(), content });
      };

      const setOption = (option: string | null, exclusive: boolean = false) => {
        let { selected: sel } = cur();
        sel = exclusive ? [option] : sel.concat(sel.includes(option) ? [] : [option]);
        setResponse(qid, { ...cur(), selected: sel });
      };

      const clearOption = (option: string | null) => {
        const { content, selected } = cur();
        setResponse(qid, { content, selected: selected.filter((i) => i !== option) });
      };

      const toggleOption = (option: string | null, exclusive: boolean = false) => {
        if (cur().selected.includes(option)) clearOption(option);
        else setOption(option, exclusive);
      };

      return { setContent, setOption, clearOption, toggleOption };
    },
    [getResponse, setResponse]
  );

  // nav management

  const sectionsManager = useMemo(() => {
    const size = () => sections.length;
    const empty = () => size() === 0;
    const top = () => sections[size() - 1];
    const push = (a: Section) => setSections((p) => [...p].concat([a]));
    const pop = () => setSections((p) => [...p].slice(0, -1));
    return { size, empty, top, push, pop };
  }, [sections]);

  // result

  const writeInteractionsResult = useCallback((): InteractionsResult => {
    const rewriteResponse = (question: Question, response: Response) => {
      const res = [];

      if (question.type === 'TEXT') {
        if (response.content.trim().length > 0) {
          res.push({ content: response.content.trim().slice(0, 1000), isOther: false });
        }
      } else {
        response.selected.forEach((i) => {
          if (i === null) {
            if (response.content.trim().length > 0) {
              res.push({ content: response.content.trim().slice(0, 1000), isOther: true });
            }
          } else {
            res.push({ content: i, isOther: false });
          }
        });
      }
      return res;
    };

    const res = sections.map((section) => ({
      sectionId: section.id,
      questionResponses: section.questions
        .filter((q) => getResponse(q.id) !== null)
        .map((question) => ({
          questionId: question.id,
          responses: rewriteResponse(question, getResponse(question.id)!),
        }))
        .filter((i) => i.responses.length > 0),
    }));

    return { sectionResponses: res };
  }, [getResponse, sections]);

  // does modify sections stack

  const navigator = useMemo(() => {
    const isFirst = () => sectionsManager.size() <= 1;
    const moveBack = () => sectionsManager.pop();
    const moveNext = (): MoveNext => {
      if (!surveyQuestions) return { ok: false, reason: { code: 'FATAL', payload: 'survey-questions not found' } };

      const { router, questions } = sectionsManager.top();

      const incompleteQuestion = questions.find((i) => i.isRequired && !isValidResponse(i.type, getResponse(i.id)));
      if (incompleteQuestion) return { ok: false, reason: { code: 'INCOMPLETE', payload: incompleteQuestion.id } };

      if (router.type === 'FIXED') {
        if (router.nextSection === null) {
          return { ok: false, reason: { code: 'SUBMIT', payload: writeInteractionsResult() } };
        }

        const newSection = surveySections!.find((i) => i.id === (router.nextSection as string));
        if (!newSection) return { ok: false, reason: { code: 'FATAL', payload: 'fixed-new-section not found' } };

        sectionsManager.push(newSection);
        return { ok: true };
      }

      if (router.type === 'BRANCH') {
        const { keyQid, routingTable } = router.nextSection as NextSection;
        const keyQuestion = getQuestion(keyQid);
        const keyResponse = getResponse(keyQid, false);

        if (!keyQuestion) return { ok: false, reason: { code: 'FATAL', payload: 'key-question not found' } };
        if (!keyResponse) return { ok: false, reason: { code: 'FATAL', payload: 'key-response not found' } };
        if (!isValidResponse(keyQuestion.type, keyResponse)) {
          return { ok: false, reason: { code: 'FATAL', payload: 'key-response incomplete' } };
        }

        const route = routingTable.find((i) => i.content === keyResponse.selected[0]);
        if (!route) return { ok: false, reason: { code: 'FATAL', payload: 'route not found' } };

        if (route.nextSid === null) {
          return { ok: false, reason: { code: 'SUBMIT', payload: writeInteractionsResult() } };
        }

        const newSection = surveySections!.find((i) => i.id === route.nextSid);
        if (newSection === undefined) {
          return { ok: false, reason: { code: 'FATAL', payload: 'new-section not found' } };
        }

        sectionsManager.push(newSection);
        return { ok: true };
      }

      return { ok: false, reason: { code: 'FATAL', payload: 'invalid router type' } };
    };
    return { isFirst, moveBack, moveNext };
  }, [getQuestion, getResponse, sectionsManager, surveyQuestions, surveySections, writeInteractionsResult]);

  return {
    section: sectionsManager.top(),
    getResponse,
    getResponseDispatcher,
    navigator,
    writeInteractionsResult,
    responses,
    sections,
  };
};
