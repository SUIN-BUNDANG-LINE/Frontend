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
  if (history.length === 0 || history.some((i) => !sections.find((s) => s.id === i))) {
    return [sections[0]];
  }
  return history.map((i) => sections.find((s) => s.id === i)!);
};

export const useForm = ({ surveySections, surveyQuestions, initialHistory, initialResponses }: Params) => {
  const [responses, setResponses] = useState<Responses>(initialResponses);
  const [sections, setSections] = useState<Section[]>(historyMapper(surveySections || [], initialHistory));

  useEffect(() => {
    if (surveySections) setSections([surveySections[0]]);
  }, [surveySections]);

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

  const logger = () => {
    console.log(sections);
  };

  // does modify sections stack

  const navigator = useMemo(() => {
    const isFirst = () => sectionsManager.size() <= 1;
    const moveBack = () => sectionsManager.pop();
    const moveNext = (): MoveNext => {
      if (!surveyQuestions) return { ok: false, reason: { code: 'FATAL', payload: 'no-survey-questions' } };

      const { router, questions } = sectionsManager.top();
      const { type, nextSection } = router;

      const incomplete = questions.find((i) => i.isRequired && !isValidResponse(i.type, getResponse(i.id)))?.id;
      if (incomplete) return { ok: false, reason: { code: 'INCOMPLETE', payload: incomplete } };

      if (type === 'FIXED') {
        if (nextSection === null) return { ok: false, reason: { code: 'SUBMIT' } };

        const newSection = surveySections!.find((i) => i.id === (nextSection as string));
        if (!newSection) return { ok: false, reason: { code: 'FATAL', payload: 'fixed-new-section-not-found' } };

        sectionsManager.push(newSection);
        return { ok: true };
      }

      const { keyQid, routingTable } = nextSection as NextSection;
      const keyQ = getQuestion(keyQid);
      const keyR = getResponse(keyQid, false);
      if (!keyQ || !keyR || keyR.selected.length === 0) {
        return { ok: false, reason: { code: 'FATAL', payload: `keyq keyr keysel ${keyQ} ${keyR} ${keyR?.selected}` } };
      }

      const route = routingTable.find((i) => i.content === keyR.selected[0])?.nextSid;
      if (!route) return { ok: false, reason: { code: 'FATAL', payload: 'route-not-found' } };
      const routeT = surveySections?.find((i) => i.id === route);
      if (!routeT) return { ok: false, reason: { code: 'FATAL', payload: 'routet-not-found' } };

      sectionsManager.push(routeT);
      return { ok: true };
    };
    return { isFirst, moveBack, moveNext };
  }, [getQuestion, getResponse, sectionsManager, surveyQuestions, surveySections]);

  //

  const writeInteractionsResult = (): InteractionsResult => {
    const rewriteResponse = (question: Question, response: Response) => {
      const res = [];
      if (question.type === 'TEXT') {
        if (response.content.trim().length > 0) res.push({ content: response.content.trim(), isOther: false });
      } else {
        response.selected.forEach((i) => {
          if (i === null) {
            if (response.content.trim().length > 0) res.push({ content: response.content.trim(), isOther: true });
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

    return { sectionResponses: res.filter((i) => i.questionResponses.length > 0) };
  };

  return {
    section: sectionsManager.top(),
    getResponse,
    getResponseDispatcher,
    navigator,
    logger,
    writeInteractionsResult,
  };
};
