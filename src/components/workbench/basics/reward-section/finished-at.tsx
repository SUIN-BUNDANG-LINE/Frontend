import Datetime from 'react-datetime';
import moment from 'moment';
import styles from './index.module.css';
import { useSurveyStore } from '../../store';

type Props = {
  readonly: boolean;
};

export default function FinishedAt({ readonly }: Props) {
  const { finishedAt, setter } = useSurveyStore((state) => ({
    finishedAt: state.rewardConfig.finishedAt,
    setter: state.rewardSetter,
  }));

  const finishedAtString = `${moment(finishedAt).format('YYYY년 MM월 DD일, A hh시')} 종료`;

  const changeHandler = (v: string | moment.Moment) => {
    setter({ updates: { finishedAt: v.toString() } });
  };

  return (
    <div className={styles.group}>
      <div className={styles.label}>
        <span>마감 일정</span>
        <input
          type="text"
          disabled
          className={styles.input}
          value={finishedAtString}
          style={{ marginBottom: '8px', cursor: 'text' }}
        />
        {!readonly && (
          <Datetime
            input={false}
            isValidDate={(current) => current.isAfter(moment().startOf('day').subtract(1, 'day'))}
            inputProps={{ className: styles.input }}
            locale="ko-KR"
            timeFormat="YYYY년 MM월 DD일, A hh시"
            value={new Date(finishedAt!)}
            onChange={changeHandler}
          />
        )}
      </div>
    </div>
  );
}
