export const statusReader = (status: string): [string, string] => {
  switch (status) {
    case 'NOT_STARTED':
      return ['제작 중', '아직 공개되지 않았습니다.'] as const;
    case 'IN_PROGRESS':
      return ['응답 받는 중', '바로 참여할 수 있습니다.'] as const;
    case 'IN_MODIFICATION':
      return ['수정 중', '수정 중인 설문조사에 응답할 수 없습니다.'] as const;
    case 'CLOSED':
      return ['마감', '마감된 설문조사에 응답할 수 없습니다.'] as const;
    default:
      return ['알 수 없음', '알 수 없음'] as const;
  }
};
