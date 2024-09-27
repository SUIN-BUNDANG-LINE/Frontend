import React from 'react';
import { v4 as uuid } from 'uuid';
import { useSurveyStore } from '@/components/workbench/store';
import { FaX } from 'react-icons/fa6';
import Button from '@/components/ui/button/Button';
import Modal from '@/components/ui/modal/Modal';
import useModal from '@/hooks/useModal';
import { Reward } from '@/components/workbench/types';
import moment from 'moment';
import Datetime from 'react-datetime';
import 'moment/locale/ko';
import styles from './tab0.module.css';

function RewardModal({
  maxTargetParticipant,
  handleRewardAdd,
  closeModal,
  init,
}: {
  maxTargetParticipant: number;
  handleRewardAdd: (reward: Reward) => void;
  closeModal: () => void;
  init: RewardWithKey | null;
}) {
  const [category, setCategory] = React.useState(init?.category || '');
  const [name, setName] = React.useState(init?.name || '');
  const [count, setCount] = React.useState(init?.count || '');

  const categoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value.trimStart().slice(0, 20));
  };

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trimStart().slice(0, 40));
  };

  const countHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCount(val);
  };

  const onSubmit = () => {
    if (category.trim() === '' || name.trim() === '' || count === '') {
      return;
    }

    handleRewardAdd({ category, name, count: Math.min(maxTargetParticipant, Math.max(1, +count)) });
    closeModal();
  };

  return (
    <div className={styles.newReward}>
      <div className={styles.inputGroup}>
        <label htmlFor="new-reward-category" className={styles.label}>
          카테고리
          <input
            id="new-reward-category"
            type="text"
            className={styles.input}
            placeholder="커피, 치킨, 상품권..."
            value={category}
            onChange={categoryHandler}
          />
        </label>
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="new-reward-name" className={styles.label}>
          리워드 이름
          <input
            id="new-reward-name"
            type="text"
            className={styles.input}
            placeholder="스타벅스 아메리카노 T"
            value={name}
            onChange={nameHandler}
          />
        </label>
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="new-reward-count" className={styles.label}>
          수량
          <input
            id="new-reward-count"
            type="text"
            className={styles.input}
            placeholder="1"
            value={count}
            onChange={countHandler}
          />
        </label>
      </div>
      <Button
        variant="primary"
        onClick={onSubmit}
        disabled={category.trim() === '' || name.trim() === '' || count === ''}>
        추가
      </Button>
    </div>
  );
}

function RewardItem({
  name,
  category,
  count,
  deleteHandler,
  editHandler,
}: {
  name: string;
  category: string;
  count: number;
  deleteHandler: () => void;
  editHandler: () => void;
}) {
  return (
    <div className={styles.rewardItem}>
      <button type="button" className={styles.rewardItemContent} onClick={editHandler}>
        <div className={styles.rewardItemLeft}>
          <div className={styles.rewardCategory}>{category}</div>
          <div className={styles.rewardName}>{name}</div>
        </div>
        <div className={styles.rewardCount}>x{count}</div>
      </button>
      <button type="button" aria-label="삭제" className={styles.rewardDelete} onClick={deleteHandler}>
        <FaX />
      </button>
    </div>
  );
}

type RewardWithKey = Reward & {
  key: string;
};

function Tab0() {
  const { isOpen, openModal, closeModal: closeModalInner } = useModal();
  const [rewardAddTarget, setRewardAddTarget] = React.useState<RewardWithKey | null>(null);

  const closeModal = () => {
    setRewardAddTarget(null);
    closeModalInner();
  };

  const { title, description, finishMessage, isVisible, rewardConfig, setter, rewardSetter, status } = useSurveyStore(
    (state) => ({
      title: state.title,
      description: state.description,
      finishMessage: state.finishMessage,
      isVisible: state.isVisible,
      rewardConfig: state.rewardConfig,
      setter: state.setter,
      rewardSetter: state.rewardSetter,
      status: state.status,
    })
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setter({
        key: name,
        value: (e as React.ChangeEvent<HTMLInputElement>).target.checked,
      });
      return;
    }
    setter({ key: name, value });
  };

  const handleRewardChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'targetParticipantCount':
        rewardSetter({
          updates: {
            targetParticipantCount: Math.max(1, Math.min(500, +e.target.value.replace(/[^0-9]/g, ''))),
          },
        });
        break;
      default: {
        rewardSetter({ updates: { [name]: value } });
        if (name === 'type') {
          if (value === 'NO_REWARD') {
            rewardSetter({ updates: { finishedAt: null } });
          } else if (!rewardConfig.finishedAt) {
            rewardSetter({ updates: { finishedAt: moment().startOf('day').add(7, 'days').toISOString() } });
          }
        }
      }
    }
  };

  const rewardArray = React.useMemo<RewardWithKey[]>(
    () => rewardConfig.rewards.map((i) => ({ ...i, key: uuid() })),
    [rewardConfig.rewards]
  );

  const handleRewardAdd = (reward: Reward) => {
    if (rewardAddTarget) {
      // edit
      const newRewards = rewardArray.map((i) => (i.key === rewardAddTarget.key ? reward : i));
      rewardSetter({ updates: { rewards: newRewards } });
    } else {
      // add
      const newRewards = rewardArray.concat([{ ...reward, key: uuid() }]);
      rewardSetter({ updates: { rewards: newRewards } });
    }
  };

  const handleRewardDelete = (key: string) => () => {
    if (status !== 'NOT_STARTED') return;
    const newRewards = rewardArray.filter((i) => i.key !== key).map(({ key: _, ...rest }) => rest);
    rewardSetter({ updates: { rewards: newRewards } });
  };

  const handleRewardEdit = (reward: RewardWithKey) => () => {
    if (status !== 'NOT_STARTED') return;
    setRewardAddTarget(reward);
    openModal();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} title="리워드 추가">
        <RewardModal
          maxTargetParticipant={Math.min(500, rewardConfig.targetParticipantCount || 500)}
          handleRewardAdd={handleRewardAdd}
          closeModal={closeModal}
          init={rewardAddTarget}
        />
      </Modal>
      <div className={styles.container}>
        <div className={styles.groupInfo}>
          <h3>주요 정보</h3>
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="survey-title">
            <span>설문지 제목</span>
            <input
              id="survey-title"
              type="text"
              name="title"
              className={styles.input}
              value={title}
              onChange={handleChange}
              placeholder="설문지 제목을 입력하세요"
            />
          </label>
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="survey-description">
            <span>설문지 설명</span>
            <textarea
              id="survey-description"
              name="description"
              className={styles.textarea}
              value={description}
              onChange={handleChange}
              placeholder="설문지 설명을 입력하세요"
            />
          </label>
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="survey-thumbnail">
            <span>썸네일</span>
            <input id="survey-thumbnail" type="file" name="thumbnail" className={styles.inputFile} accept="image/*" />
          </label>
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="survey-finish-message">
            <span>종료 메시지</span>
            <textarea
              id="survey-finish-message"
              name="finishMessage"
              className={styles.textarea}
              value={finishMessage}
              onChange={handleChange}
              placeholder="종료 메시지를 입력하세요"
            />
          </label>
        </div>

        <div className={styles.groupInfo}>
          <h3>리워드</h3>
        </div>

        {status !== 'NOT_STARTED' && (
          <div className={styles.rewardFrozen}>공개했던 설문의 리워드는 수정할 수 없습니다.</div>
        )}

        <div className={styles.group}>
          <label className={styles.label} htmlFor="reward-type">
            <span>지급 방식</span>
            <select
              name="type"
              id="reward-type"
              className={styles.select}
              value={rewardConfig.type}
              onChange={handleRewardChange}
              disabled={status !== 'NOT_STARTED'}>
              <option value="NO_REWARD">리워드 없음</option>
              <option value="SELF_MANAGEMENT">리워드 직접 지급</option>
              <option value="IMMEDIATE_DRAW">즉시 추첨 뽑기</option>
            </select>
          </label>
        </div>

        {rewardConfig.type !== 'NO_REWARD' && (
          <div className={styles.group}>
            <label className={styles.label} htmlFor="reward-rewards">
              <span>리워드</span>
              <div className={styles.rewardContainer}>
                {rewardArray.map(({ name, category, count, key }) => (
                  <RewardItem
                    name={name}
                    category={category}
                    count={count}
                    key={key}
                    deleteHandler={handleRewardDelete(key)}
                    editHandler={handleRewardEdit({ name, category, count, key })}
                  />
                ))}
              </div>
              {status === 'NOT_STARTED' && (
                <Button variant="primary" style={{ marginTop: '12px' }} onClick={openModal}>
                  + 리워드 추가
                </Button>
              )}
            </label>
          </div>
        )}

        {rewardConfig.type !== 'NO_REWARD' && (
          <div className={styles.group}>
            <div className={styles.label}>
              <span>마감 일정</span>
              <input
                type="text"
                disabled
                className={styles.input}
                value={`${moment(rewardConfig.finishedAt).format('YYYY년 MM월 DD일 HH시')} 종료`}
                style={{ marginBottom: '8px' }}
              />
              {status === 'NOT_STARTED' && (
                <Datetime
                  input={false}
                  isValidDate={(current) => current.isAfter(moment().subtract(1, 'day'))}
                  inputProps={{ className: styles.input }}
                  locale="ko-KR"
                  timeFormat="YYYY년 MM월 DD일, HH시"
                  timeConstraints={{ minutes: { min: 0, max: 0, step: 1 } }}
                  value={new Date(rewardConfig.finishedAt)}
                  onChange={(v) => rewardSetter({ updates: { finishedAt: v.toString() } })}
                />
              )}
            </div>
          </div>
        )}

        {rewardConfig.type === 'IMMEDIATE_DRAW' && (
          <div className={styles.group}>
            <label className={styles.label} htmlFor="reward-target-participant-count">
              <span>최대 참여 인원</span>
              <input
                id="reward-target-participant-count"
                type="text"
                pattern="[0-9]"
                step={1}
                min={1}
                max={500}
                name="targetParticipantCount"
                className={styles.input}
                value={rewardConfig.targetParticipantCount || 0}
                onChange={handleRewardChange}
                disabled={status !== 'NOT_STARTED'}
                placeholder="최대 참여 인원을 입력하세요"
              />
            </label>
          </div>
        )}

        <hr />

        <div className={styles.group}>
          <label className={styles.checkboxLabel} htmlFor="survey-is-visible">
            <input
              id="survey-is-visible"
              type="checkbox"
              name="isVisible"
              className={styles.checkbox}
              checked={isVisible}
              onChange={handleChange}
            />
            설문지를 설문이용에 공개하는데 동의합니다.
          </label>
        </div>
      </div>
    </>
  );
}

export default Tab0;
