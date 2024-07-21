import type { Response, ResponseDispatcher } from '../../types/interaction';
import Option from './Option';

interface Props extends Response {
  choices: string[];
  dispatcher: ResponseDispatcher;
  allowOthers: boolean;
}

export default function RadioResponse({ content, selected, choices, dispatcher, allowOthers }: Props) {
  return (
    <>
      {choices.map((choice) => (
        <Option key={choice} type="RADIO" label={choice} active={selected.includes(choice)} dispatcher={dispatcher} />
      ))}
      {allowOthers && (
        <Option
          others
          type="RADIO"
          label={null}
          active={selected.includes(null)}
          dispatcher={dispatcher}
          content={content}
        />
      )}
    </>
  );
}
