interface Reward {
  category: string;
  items: string[];
}

interface Survey {
  surveyId: string;
  thumbnail: string;
  title: string;
  description: string;
  targetParticipants: number;
  rewardCount: number;
  finishedAt: string;
  rewards: Reward[];
}

export type { Reward, Survey };
