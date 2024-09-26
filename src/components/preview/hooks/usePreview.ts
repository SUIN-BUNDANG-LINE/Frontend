import React from 'react';
import { cin } from '@/components/workbench/func';
import { fetchSurveyGet } from '@/components/workbench/service/fetch';
import { useQuery } from '@tanstack/react-query';
import { Other } from '@/components/workbench/misc/Route';
import { Progress, Response, State } from '../types/core';
import { Dispatch } from '../types/participate';

const getQueryOptions = (surveyId: string) => ({
  queryKey: ['preview', surveyId],
  queryFn: () => fetchSurveyGet({ surveyId }),
  select: cin,
  staleTime: 0,
  gcTime: 0,
});

const usePreview = (surveyId: string) => {
  const { data: survey, isLoading, isError } = useQuery(getQueryOptions(surveyId));

  // hooks
  const [progress, setProgress] = React.useState<Progress>({ stack: [], page: [] });
  const [state, setState] = React.useState<State>('surveyDetails');
  const [responses, setResponses] = React.useState<Response[]>([]);

  // data is not ready.

  if (!survey) return { query: { isLoading, isError }, payload: undefined };

  // data is ready.

  const { title, description, thumbnail, status, rewardConfig, fields, sections, finishMessage } = survey;

  const getNextSection = () => {
    const { stack, page } = progress;

    const cur = stack.at(-1);
    if (!cur) return sections[0];

    const { routeStrategy: strat } = cur;

    switch (strat.type) {
      case 'sequential': {
        const index = sections.findIndex((i) => i.sectionId === cur.sectionId);
        return sections.at(index + 1);
      }
      case 'manual': {
        return sections.find((i) => i.sectionId === strat.detail);
      }
      case 'conditional': {
        const { key, router } = strat.detail;

        const keyq = page.find((i) => i.fieldId === key);
        if (!keyq || keyq.type !== 'radio') return undefined;

        const keyr = responses.find((i) => i.fieldId === key);
        if (!keyr) return undefined;

        const nextSectionId = (() => {
          if (keyr.other) return router.find((i) => i.id === Other)?.next;
          const selectedId = keyq.options.find((i) => i.content === keyr.content)?.id;
          return router.find((i) => i.id === selectedId)?.next;
        })();

        if (!nextSectionId) return undefined;
        return sections.find((i) => i.sectionId === nextSectionId);
      }
      default:
        return undefined;
    }
  };

  const actions = {
    push: () => {
      const next = getNextSection();
      if (next) {
        setProgress((pre) => ({
          stack: pre.stack.concat([next]),
          page: fields.filter((i) => i.sectionId === next.sectionId),
        }));
        setState('participate');
      } else {
        setState('readyToSubmit');
      }
    },
    pop: () => {
      if (state === 'readyToSubmit') {
        setState('participate');
        return;
      }
      if (progress.stack.length === 1) {
        setProgress({ stack: [], page: [] });
        setState('surveyDetails');
        return;
      }
      setProgress((pre) => {
        return {
          stack: pre.stack.slice(0, -1),
          page: fields.filter((i) => i.sectionId === pre.stack.at(-2)!.sectionId),
        };
      });
    },
    top: () => {
      return progress.stack.at(-1);
    },
    clear: () => {
      setProgress({ stack: [], page: [] });
      setResponses([]);
      setState('surveyDetails');
    },
  };

  const dispatch: Dispatch = {
    set: ({ fieldId, content, other }: { fieldId: string; content: string; other: boolean }) => {
      const field = fields.find((i) => i.fieldId === fieldId);
      if (!field) return;

      setResponses((pre) => {
        switch (field.type) {
          case 'text': {
            const index = responses.findIndex((i) => i.fieldId === fieldId);
            if (index === -1) return pre.concat([{ fieldId, content, other: false }]);
            return pre.map((item, i) => (i === index ? { fieldId, content, other: false } : item));
          }
          case 'radio': {
            const index = responses.findIndex((i) => i.fieldId === fieldId);
            if (index === -1) return pre.concat([{ fieldId, content, other }]);
            return pre.map((item, i) => (i === index ? { fieldId, content, other } : item));
          }
          case 'checkbox': {
            const index = responses.findIndex(
              (i) => i.fieldId === fieldId && (other ? i.other : i.content === content)
            );
            if (index === -1) return pre.concat([{ fieldId, content, other }]);
            return pre.map((item, i) => (i === index ? { fieldId, content, other } : item));
          }
          default:
            return pre;
        }
      });
    },
    clear: ({ fieldId, content, other }: { fieldId: string; content: string; other: boolean }) => {
      const field = fields.find((i) => i.fieldId === fieldId);
      if (!field) return;

      setResponses((pre) => {
        switch (field.type) {
          case 'text': {
            const index = responses.findIndex((i) => i.fieldId === fieldId);
            if (index === -1) return pre;
            return pre.map((item, i) => (i === index ? { fieldId, content: '', other: false } : item));
          }
          case 'radio': {
            const index = responses.findIndex((i) => i.fieldId === fieldId);
            return pre.filter((_item, i) => i !== index);
          }
          case 'checkbox': {
            const index = responses.findIndex(
              (i) => i.fieldId === fieldId && (other ? i.other : i.content === content)
            );
            return pre.filter((_item, i) => i !== index);
          }
          default:
            return pre;
        }
      });
    },
  };

  return {
    query: {
      isLoading,
      isError,
    },
    payload: {
      survey: {
        title,
        description,
        thumbnail,
        status,
        rewardConfig,
        finishMessage,
      },
      core: {
        responses,
        progress,
        actions,
        state,
        dispatch,
      },
    },
  };
};

export { usePreview };
