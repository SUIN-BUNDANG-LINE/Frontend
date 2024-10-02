import React from 'react';
import { v4 as uuid } from 'uuid';
import Button from '@/components/ui/button/Button';
import useModal from '@/hooks/useModal';
import Modal from '@/components/ui/modal/Modal';
import { Reward } from '../../types';
import RewardItem from './reward-item';
import { useSurveyStore } from '../../store';
import styles from './list.module.css';

type RewardWithKey = Reward & { key: string };

type ModalProps =
  | {
      action: 'ADD';
      apply: (reward: Reward) => void;
      init: undefined;
    }
  | {
      action: 'EDIT';
      apply: (reward: Reward, target: string) => void;
      init: RewardWithKey;
    };

function ModalContent({ action, apply, init }: ModalProps) {
  const [category, setCategory] = React.useState(init?.category || '');
  const [name, setName] = React.useState(init?.name || '');
  const [count, setCount] = React.useState(init ? `${init.count}` : '');

  const valid = (() => {
    if (category.trim() === '' || name.trim() === '' || count === '') return false;

    const parsed = Number.parseInt(count, 10);
    return parsed >= 1;
  })();

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

    const newReward = { category, name, count: +count };

    if (action === 'ADD') apply(newReward);
    if (action === 'EDIT') apply(newReward, init.key);
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
          <span style={{ color: 'var(--gray)', padding: '2px 0 0 4px' }}>* 적어도 1개는 지급해야 합니다.</span>
        </label>
      </div>
      <Button variant="primary" onClick={onSubmit} disabled={!valid}>
        저장하고 닫기
      </Button>
    </div>
  );
}

type Props = {
  readonly: boolean;
};

export default function RewardList({ readonly }: Props) {
  const {
    rewards: rawRewards,
    setter,
    maxParticipants,
  } = useSurveyStore((state) => ({
    rewards: state.rewardConfig.rewards,
    setter: state.rewardSetter,
    maxParticipants: state.rewardConfig.targetParticipantCount,
  }));

  const rewards = React.useMemo(() => rawRewards.map((i) => ({ ...i, key: uuid() })), [rawRewards]);

  const { isOpen: isAddOpen, closeModal: closeAdd, openModal: openAdd } = useModal();
  const { isOpen: isEditOpen, closeModal: closeEdit, openModal: openEdit } = useModal();

  const [editTarget, setEditTarget] = React.useState<RewardWithKey>();

  const apply = (reward: Reward, target?: string) => {
    console.log(reward, target);
    if (target) {
      const newRewards = rewards.map((i) => (i.key === target ? reward : i));
      setter({ updates: { rewards: newRewards } });
      closeEdit();
    } else {
      const newRewards = rewards.concat([{ ...reward, key: uuid() }]);
      setter({ updates: { rewards: newRewards } });
      closeAdd();
    }
  };

  const addHandler = () => {
    openAdd();
  };

  const getDeleteHandler = (key: string) => () => {
    const newRewards = rewards.filter((i) => i.key !== key);
    setter({ updates: { rewards: newRewards } });
  };

  const getEditHandler = (key: string) => () => {
    setEditTarget(rewards.find((i) => i.key === key));
    openEdit();
  };

  const overflowWarning = React.useMemo(() => {
    if (typeof maxParticipants !== 'number') return false;

    const total = rewards.reduce((a, c) => a + c.count, 0);
    if (total <= maxParticipants) return false;

    return true;
  }, [maxParticipants, rewards]);

  return (
    <>
      <Modal isOpen={isAddOpen} onClose={closeAdd} title="리워드 추가">
        <ModalContent action="ADD" apply={apply} init={undefined} />
      </Modal>
      <Modal isOpen={isEditOpen} onClose={closeEdit} title="리워드 편집">
        <ModalContent action="EDIT" apply={apply} init={editTarget!} />
      </Modal>
      <div className={styles.group}>
        <label className={styles.label} htmlFor="reward-rewards">
          <span>리워드 목록</span>
          <div className={styles.rewardContainer}>
            {rewards.length === 0 && <div style={{ color: 'var(--gray)' }}>아직 추가한 리워드가 없습니다.</div>}
            {rewards.map(({ name, category, count, key }) => (
              <RewardItem
                name={name}
                category={category}
                count={count}
                key={key}
                deleteHandler={getDeleteHandler(key)}
                editHandler={getEditHandler(key)}
              />
            ))}
          </div>
          {overflowWarning && <div className={styles.warning}>⚠ 리워드 수의 합계가 최대 참여 인원보다 많습니다.</div>}
          {!readonly && (
            <Button variant="primary" style={{ marginTop: '12px' }} onClick={addHandler}>
              + 리워드 추가
            </Button>
          )}
        </label>
      </div>
    </>
  );
}
