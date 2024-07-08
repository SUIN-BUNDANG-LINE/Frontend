interface SurveyDetails {
  title: string;
  description: string;
  status: string;
  endDate: string;
  thumbnail: string;
  currentParticipants: number;
  targetParticipants: number;
  firstSectionId: number;
  rewards: { item: string; count: number }[];
}

export type { SurveyDetails };
