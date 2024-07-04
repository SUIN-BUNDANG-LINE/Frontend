interface Reward {
  category: string;
  items: string[];
}

interface Survey {
  surveyId: number;
  thumbnail: string;
  title: string;
  description: string;
  targetParticipants: number;
  rewardCount: number;
  endDate: string;
  rewards: Reward[];
}

export type { Reward, Survey };
