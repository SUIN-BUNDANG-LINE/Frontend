interface MySurveys {
  surveys: MySurvey[];
}

interface MySurvey {
  id: string;
  title: string;
  thumbnail: string;
  updatedAt: string;
  status: SurveyStatus;
  finishedAt: string;
  responseCount: number;
}

type SurveyStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'IN_MODIFICATION' | 'CLOSED';

type StatusForFilter = null | 'NOT_STARTED' | 'IN_PROGRESS' | 'IN_MODIFICATION' | 'CLOSED';

type SortType = 'LAST_MODIFIED' | 'OLD_MODIFIED' | 'TITLE_ASC' | 'TITLE_DESC';

export type { MySurveys, SurveyStatus, MySurvey, StatusForFilter, SortType };
