type Store = {
  // for FE
  activeField: string | null;

  // about survey
  title: string;
  description: string;
  thumbnail: string | null;
  finishMessage: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'IN_MODIFICATION' | 'CLOSED';
  rewards: { name: string; category: string; count: number }[];
  isVisible: boolean;
  finishedAt: string;
  publishedAt: string | null;

  // support drawing board
  legacyMode: boolean;
  targetParticipantCount: number;

  // canvas
  sections: Section[];
  fields: Field[];
};

type Error = {
  type: 'error';
  detail: null;
};

type Sequential = {
  type: 'sequential';
  detail: null;
};

type Manual = {
  type: 'manual';
  detail: string;
};

type Conditional = {
  type: 'conditional';
  detail: {
    key: string;
    router: {
      id: string;
      content: string;
      next: string;
    }[];
  };
};

type RouteStrategy = Sequential | Manual | Conditional | Error;

type Section = {
  sectionId: string;
  title: string;
  description: string;
  routeStrategy: RouteStrategy;
};

type Field = RadioField | CheckboxField | TextField;

type RadioField = FieldBase & { type: 'radio'; options: { id: string; content: string }[] };
type CheckboxField = FieldBase & { type: 'checkbox'; options: { id: string; content: string }[] };
type TextField = FieldBase & { type: 'text'; options: { id: string; content: string }[] };

type FieldBase = {
  type: string;
  sectionId: string;
  fieldId: string;
  title: string;
  description: string;
  other: boolean;
  required: boolean;
};

export type {
  Store,
  Section,
  Field,
  RadioField,
  CheckboxField,
  TextField,
  RouteStrategy,
  Sequential,
  Manual,
  Conditional,
};
