type RewardConfig = ImmediateDraw | SelfManagement | NoReward;

type Reward = {
  name: string;
  category: string;
  count: number;
};

type ImmediateDraw = {
  type: 'IMMEDIATE_DRAW';
  rewards: Reward[];
  targetParticipantCount: number;
  finishedAt: string;
};

type SelfManagement = {
  type: 'SELF_MANAGEMENT';
  rewards: Reward[];
  targetParticipantCount: null;
  finishedAt: string;
};

type NoReward = {
  type: 'NO_REWARD';
  rewards: Reward[];
  targetParticipantCount: null;
  finishedAt: null;
};

export type { RewardConfig, Reward, ImmediateDraw, SelfManagement, NoReward };
