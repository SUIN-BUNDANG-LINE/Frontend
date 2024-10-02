interface ParticipantList {
  participants: ParticipantInfo[];
  targetParticipant: number | null;
}

interface ParticipantInfo {
  participantId: string;
  participatedAt: string;
  drawInfo: DrawInfo | null;
}

interface DrawInfo {
  drawResult: DrawResult;
  reward: string;
  phoneNumber: string;
}

type DrawResult = 'BEFORE_DRAW' | 'WIN' | 'LOSE';

export type { ParticipantList, ParticipantInfo, DrawInfo, DrawResult };
