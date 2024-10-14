interface Reward {
  category: string;
  items: string[];
}

interface Survey {
  surveyId: string;
  thumbnail: string | null;
  title: string;
  description: string;
  targetParticipants: number | null;
  rewardCount: number;
  finishedAt: string | null;
  isResultOpen: boolean;
  rewards: Reward[];
}

export type { Reward, Survey };
