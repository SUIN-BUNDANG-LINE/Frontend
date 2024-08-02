interface DrawingInfoResponse {
  id: string;
  surveyId: string;
  selectedTicketCount: number;
  tickets: boolean[];
}

interface DrawingDrawParams {
  participantId: string;
  phoneNumber: string;
  selectedNumber: number;
}

type Lose = { isWon: false };
type Win = { isWon: true; rewardName: string };
type DrawingDrawResponse = Lose | Win;

export type { DrawingInfoResponse, DrawingDrawParams, DrawingDrawResponse };
