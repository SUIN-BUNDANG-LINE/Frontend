import moment, { now } from 'moment';
import { Submit } from '../misc/Route';
import { ErrorDescriptor, Store } from '../types';

type ValidationResult = {
  valid: boolean;
  reason: ErrorDescriptor[];
};

export const validate = (store: Store): ValidationResult => {
  const { rewardConfig, sections, fields } = store;
  const sectionIds = sections.map((i) => i.sectionId);

  // ========== 섹션 ==========

  // 섹션이 없음
  const noSections = () => {
    const reason = '적어도 1개의 섹션이 있어야 합니다.';
    return sections.length === 0 ? [{ location: undefined, reason }] : [];
  };

  // ========== 질문 ==========

  // 선택지가 없음
  const noOptions = () => {
    const reason = '적어도 1개의 선택지를 추가해야 합니다.';
    return fields
      .filter((i) => i.type !== 'text' && i.options.length === 0)
      .map((i) => ({ location: [i.sectionId, i.fieldId], reason }));
  };

  // 중복 선택지 존재
  const duplicatedOptions = () => {
    const reason = '동일한 내용의 선택지를 만들 수 없습니다.';
    return fields
      .filter((i) => i.type !== 'text')
      .filter((i) => {
        const prevs: string[] = [];
        return i.options.some(({ content }) => {
          if (prevs.includes(content)) {
            return true;
          }
          prevs.push(content);
          return false;
        });
      })
      .map((i) => ({ location: [i.sectionId, i.fieldId], reason }));
  };

  // ========== 라우팅 ==========

  // conditional의 key가 잘못됨
  const invalidRouteKey = () => {
    const reason = '잘못된 질문을 기준으로 분기하도록 설정되어 있습니다.';
    return sections
      .filter((i) => {
        const { type, detail } = i.routeStrategy;
        if (type !== 'conditional') return false;
        const kf = fields.find((j) => j.fieldId === detail.key);
        return !kf || kf.sectionId !== i.sectionId;
      })
      .map((i) => ({ location: [i.sectionId], reason }));
  };

  // 존재하지 않는 섹션 ID로 연결
  const invalidRouteNext = () => {
    const reason = '존재하지 않는 섹션으로 이동하도록 설정되어 있습니다.';
    return sections
      .filter(
        (i) =>
          (i.routeStrategy.type === 'manual' &&
            i.routeStrategy.detail !== Submit &&
            !sectionIds.includes(i.routeStrategy.detail)) ||
          (i.routeStrategy.type === 'conditional' &&
            i.routeStrategy.detail.router.some((j) => j.next !== Submit && !sectionIds.includes(j.next)))
      )
      .map((i) => ({ location: [i.sectionId], reason }));
  };

  // ========== 리워드 ==========

  // NO_REWARD
  const validateRewardConfig = () => {
    switch (rewardConfig.type) {
      case 'IMMEDIATE_DRAW': {
        const reason = [];
        const date = moment(rewardConfig.finishedAt);

        if (rewardConfig.rewards.length === 0) reason.push('리워드를 1개 이상 설정해야 합니다.');
        if (!rewardConfig.targetParticipantCount) reason.push('최대 참여 인원은 1명 이상이어야 합니다.');
        if (
          !date.isValid() ||
          date.isBefore(now()) ||
          date.minute() !== 0 ||
          date.second() !== 0 ||
          date.millisecond() !== 0
        )
          reason.push('마감 일정이 잘못되었습니다.');

        return reason.map((i) => ({ reason: i, location: undefined }));
      }
      case 'SELF_MANAGEMENT': {
        const reason = [];
        const date = moment(rewardConfig.finishedAt);

        if (rewardConfig.rewards.length === 0) reason.push('리워드를 1개 이상 설정해야 합니다.');
        if (
          !date.isValid() ||
          date.isBefore(now()) ||
          date.minute() !== 0 ||
          date.second() !== 0 ||
          date.millisecond() !== 0
        )
          reason.push('마감 일정이 잘못되었습니다.');

        return reason.map((i) => ({ reason: i, location: undefined }));
      }
      default:
        return [];
    }
  };

  // driver
  const reason: ErrorDescriptor[] = [
    ...noSections(),
    ...noOptions(),
    ...duplicatedOptions(),
    ...invalidRouteKey(),
    ...invalidRouteNext(),
    ...validateRewardConfig(),
  ].map((i) => ({
    reason: i.reason,
    location: i.location
      ? i.location.map((j) => {
          const keyf = fields.find((k) => k.fieldId === j);
          const keys = sections.find((s) => s.sectionId === j);
          if (keyf) return keyf.title || '제목 없는 질문';
          if (keys) return keys.title || '제목 없는 섹션';
          return '알 수 없음';
        })
      : undefined,
  }));

  return { valid: reason.length === 0, reason };
};
