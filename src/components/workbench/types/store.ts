import { RewardConfig } from './shared';

type Actions = {
  initStore: ({ store }: { store: Store }) => void;

  setter: ({ key, value }: { key: string; value: unknown }) => void;
  rewardSetter: ({ updates }: { updates: Partial<RewardConfig> }) => void;

  setSections: ({ sections }: { sections: Section[] }) => void;
  setFields: ({ fields }: { fields: Field[] }) => void;

  setSectionTitle: ({ sectionId, title }: { sectionId: string; title: string }) => void;
  setSectionDescription: ({ sectionId, description }: { sectionId: string; description: string }) => void;

  addSection: ({ index }: { index: number }) => void;
  copySection: ({ index, section }: { index: number; section: Section }) => void;
  editSection: ({ sectionId, updates }: { sectionId: string; updates: Partial<Section> }) => void;
  deleteSection: ({ sectionId }: { sectionId: string }) => void;

  addField: ({ sectionId, index, type }: { sectionId: string; index: number; type: Field['type'] }) => void;
  copyField: ({ sectionId, index, field }: { sectionId: string; index: number; field: Field }) => void;
  editField: ({ fieldId, updates }: { fieldId: string; updates: Partial<Field> }) => void;
  deleteField: ({ fieldId }: { fieldId: string }) => void;
};

type Store = {
  // about survey
  title: string;
  description: string;
  thumbnail: string | null;
  publishedAt: string | null;
  finishMessage: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'IN_MODIFICATION' | 'CLOSED';
  isVisible: boolean;
  isResultOpen: boolean;

  // reward
  rewardConfig: RewardConfig;

  // canvas
  sections: Section[];
  fields: Field[];
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
      // content: string;
      next: string;
    }[];
  };
};

type RouteStrategy = Sequential | Manual | Conditional;

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
  Actions,
};
