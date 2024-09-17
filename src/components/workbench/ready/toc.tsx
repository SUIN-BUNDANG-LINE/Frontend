import { Section, Field } from '../types';

export default function Toc({
  toc,
}: {
  toc: {
    section: Section;
    fields: Field[];
  }[];
}) {
  return (
    <div>
      {toc.map(({ section, fields }) => (
        <div key={section.sectionId}>
          {fields.map((field) => (
            <div key={field.fieldId}>{field.title}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
