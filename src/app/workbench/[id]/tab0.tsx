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
}: {
  maxTargetParticipant: number;
  handleRewardAdd: (reward: Reward) => void;
  closeModal: () => void;
}) {
  const [category, setCategory] = React.useState('');
  const [name, setName] = React.useState('');
  const [count, setCount] = React.useState(1);

  const categoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value.trim().slice(0, 20));
  };

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim().slice(0, 40));
  };

  const countHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(1, Math.min(maxTargetParticipant, +e.target.value.replace(/[^0-9]/g, '')));
    setCount(val);
  };

  const onSubmit = () => {
    if (category.trim() === '' || name.trim() === '') {
      return;
    }

    handleRewardAdd({ category, name, count });
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
          <input id="new-reward-count" type="text" className={styles.input} value={count} onChange={countHandler} />
        </label>
      </div>
      <Button variant="primary" onClick={onSubmit} disabled={category.trim() === '' || name.trim() === ''}>
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
}: {
  name: string;
  category: string;
  count: number;
  deleteHandler: () => void;
}) {
  return (
    <div className={styles.rewardItem}>
      <div className={styles.rewardItemContent}>
        <div className={styles.rewardItemLeft}>
          <div className={styles.rewardCategory}>{category}</div>
          <div className={styles.rewardName}>{name}</div>
        </div>
        <div className={styles.rewardCount}>x{count}</div>
      </div>
      <button type="button" aria-label="삭제" className={styles.rewardDelete} onClick={deleteHandler}>
        <FaX />
      </button>
    </div>
  );
}

function Tab0() {
  const { isOpen, openModal, closeModal } = useModal();

  const title = useSurveyStore((state) => state.title);
  const description = useSurveyStore((state) => state.description);
  const finishMessage = useSurveyStore((state) => state.finishMessage);
  const isVisible = useSurveyStore((state) => state.isVisible);
  const rewardConfig = useSurveyStore((state) => state.rewardConfig);
  const setter = useSurveyStore((state) => state.setter);
  const rewardSetter = useSurveyStore((state) => state.rewardSetter);

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
      default:
        rewardSetter({ updates: { [name]: value } });
    }
  };

  const rewardArray = React.useMemo(
    () => rewardConfig.rewards.map((i) => ({ ...i, key: uuid() })),
    [rewardConfig.rewards]
  );

  const handleRewardAdd = (reward: Reward) => {
    const newRewards = rewardArray.concat([{ ...reward, key: uuid() }]);
    rewardSetter({ updates: { rewards: newRewards } });
  };

  const handleRewardDelete = (key: string) => () => {
    const newRewards = rewardArray.filter((i) => i.key !== key).map(({ key: _, ...rest }) => rest);
    rewardSetter({ updates: { rewards: newRewards } });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} title="리워드 추가">
        <RewardModal
          maxTargetParticipant={Math.min(500, rewardConfig.targetParticipantCount || 500)}
          handleRewardAdd={handleRewardAdd}
          closeModal={closeModal}
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

        <div className={styles.group}>
          <label className={styles.label} htmlFor="reward-type">
            <span>지급 방식</span>
            <select
              name="type"
              id="reward-type"
              className={styles.select}
              value={rewardConfig.type}
              onChange={handleRewardChange}>
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
                  />
                ))}
              </div>
              <Button variant="primary" style={{ marginTop: '12px' }} onClick={openModal}>
                + 리워드 추가
              </Button>
            </label>
          </div>
        )}

        {rewardConfig.type !== 'NO_REWARD' && (
          <div className={styles.group}>
            <div className={styles.label}>
              <span>마감 일정</span>
              <Datetime
                input={false}
                isValidDate={(current) => current.isAfter(moment().subtract(1, 'day'))}
                inputProps={{ className: styles.input }}
                locale="ko-KR"
                timeFormat="MMMM Do YYYY, h"
                timeConstraints={{ minutes: { min: 0, max: 0, step: 1 } }}
                value={new Date(rewardConfig.finishedAt)}
                onChange={(v) => rewardSetter({ updates: { finishedAt: v.toString() } })}
              />
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
