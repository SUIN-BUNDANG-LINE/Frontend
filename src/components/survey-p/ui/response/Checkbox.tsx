import type { Response, ResponseDispatcher } from '../../types/interaction';
import Option from './Option';

interface Props extends Response {
  choices: string[];
  dispatcher: ResponseDispatcher;
  allowOthers: boolean;
}

export default function CheckboxResponse({ content, selected, choices, dispatcher, allowOthers }: Props) {
  return (
    <>
      {choices.map((choice) => (
        <Option
          key={choice}
          type="CHECKBOX"
          label={choice}
          active={selected.includes(choice)}
          dispatcher={dispatcher}
        />
      ))}
      {allowOthers && (
        <Option
          others
          type="CHECKBOX"
          label={null}
          active={selected.includes(null)}
          dispatcher={dispatcher}
          content={content}
        />
      )}
    </>
  );
}
