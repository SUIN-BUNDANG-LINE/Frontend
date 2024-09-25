'use client';

import { usePreview } from '@/components/preview/hooks/usePreview';
import PreviewDetails from '@/components/preview/ui/Details';
import Navigator from '@/components/preview/ui/Participate/Navigator';
import Section from '@/components/preview/ui/Participate/Section';
import Placeholder from '@/components/preview/ui/Placeholder';

export default function Page({ params }: { params: { id: string } }) {
  const { payload, query } = usePreview(params.id);

  if (!payload) return <Placeholder isLoading={query.isLoading} isError={query.isError} />;

  const { title, description, thumbnail, status, rewardConfig /* , finishMessage */ } = payload.survey;
  const { progress, state, actions, responses, dispatch } = payload.core;

  switch (state) {
    case 'surveyDetails': {
      return (
        <PreviewDetails
          title={title}
          description={description}
          thumbnail={thumbnail}
          status={status}
          rewardConfig={rewardConfig}
          onStart={actions.push}
        />
      );
    }
    case 'participate': {
      const section = actions.top();
      if (!section) return <div />;
      return (
        <>
          <Section
            title={section.title}
            description={section.description}
            page={progress.page}
            responses={responses}
            dispatch={dispatch}
          />
          <Navigator stack={progress.stack} push={actions.push} pop={actions.pop} />
        </>
      );
    }
    default:
      return <div />;
  }
}
