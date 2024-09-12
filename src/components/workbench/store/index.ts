/* eslint-disable no-param-reassign */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuid } from 'uuid';
import type { Field, Section, Store, TextField, CheckboxField, RadioField } from '../types';

function getDefaultSection(): Section {
  return {
    sectionId: uuid(),
    title: '',
    description: '',
    routeStrategy: { type: 'sequential', detail: null },
  };
}

function getDefaultField(sectionId: string, type: Field['type']) {
  const basicField = {
    fieldId: uuid(),
    sectionId,
    title: '',
    description: '',
    type,
    other: false,
    required: false,
    options: [],
  };

  if (type === 'text') return { ...basicField, options: [{ id: uuid(), content: '' }] } as TextField;
  if (type === 'radio') return { ...basicField, options: [{ id: uuid(), content: '' }] } as RadioField;
  if (type === 'checkbox') return { ...basicField, options: [{ id: uuid(), content: '' }] } as CheckboxField;

  throw new Error('function getDefaultField failed: wrong type provided');
}

const DEFAULT_STORE: Store = {
  activeField: null,

  title: '',
  description: '',
  thumbnail: null,
  finishMessage: '',
  status: 'NOT_STARTED' as const,
  rewards: [],
  isVisible: true,
  finishedAt: '',
  publishedAt: null,

  legacyMode: false,
  targetParticipantCount: 0,

  sections: [],
  fields: [],
};

type Actions = {
  setActiveField: (fieldId: string) => void;

  initStore: ({ store }: { store: Store }) => void;

  setter: ({ key, value }: { key: string; value: unknown }) => void;

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

const useSurveyStore = create(
  immer<Store & Actions>((set) => ({
    ...DEFAULT_STORE,

    initStore: ({ store }) => {
      set((state) => {
        Object.assign(state, store);
      });
    },

    setter: ({ key, value }) => {
      set((state) => {
        Object.assign(state, { [key]: value });
      });
    },

    setActiveField: (fieldId: string) => {
      set((state) => {
        state.activeField = fieldId;
      });
    },

    // Add, edit, delete a section
    setSections: ({ sections }) => {
      set((state) => {
        state.sections = sections;
      });
    },

    setSectionTitle: ({ sectionId, title }) => {
      set((state) => {
        const section = state.sections.find((s: Section) => s.sectionId === sectionId);
        if (section) {
          Object.assign(section, { title });
        }
      });
    },

    setSectionDescription: ({ sectionId, description }) => {
      set((state) => {
        const section = state.sections.find((s: Section) => s.sectionId === sectionId);
        if (section) {
          Object.assign(section, { description });
        }
      });
    },

    addSection: ({ index }) =>
      set((state) => {
        state.sections.splice(index, 0, getDefaultSection());
      }),

    copySection: ({ section, index }) =>
      set((state) => {
        const newSectionId = uuid();
        const newSection = structuredClone(section);
        newSection.sectionId = newSectionId;
        newSection.routeStrategy = { type: 'sequential', detail: null };

        const newFields = state.fields
          .filter((f) => f.sectionId === section.sectionId)
          .map((f) => ({
            ...f,
            fieldId: uuid(),
            sectionId: newSectionId,
            options: f.options.map((o) => ({ id: uuid(), content: o.content })),
          }));

        state.sections.splice(index + 1, 0, newSection);
        state.fields.push(...newFields);
      }),

    editSection: ({ sectionId, updates }) =>
      set((state) => {
        const section = state.sections.find((s: Section) => s.sectionId === sectionId);
        if (section) {
          Object.assign(section, updates);
        }
      }),

    deleteSection: ({ sectionId }) =>
      set((state) => {
        state.sections = state.sections.filter((s: Section) => s.sectionId !== sectionId);
        state.fields = state.fields.filter((f: Field) => f.sectionId !== sectionId);
      }),

    // Add, edit, delete a field
    setFields: ({ fields }) =>
      set((state) => {
        state.fields = fields;
      }),

    copyField: ({ field, sectionId, index }) =>
      set((state) => {
        const position = state.fields.findIndex((f: Field) => f.sectionId === sectionId) + index;

        const newField = structuredClone(field);
        newField.fieldId = uuid();

        state.fields.splice(position, 0, newField);
        state.activeField = newField.fieldId;
      }),

    addField: ({ sectionId, index, type }) =>
      set((state) => {
        const position = state.fields.findIndex((f: Field) => f.sectionId === sectionId) + index;
        const newField = getDefaultField(sectionId, type);

        state.fields.splice(position, 0, newField);
        state.activeField = newField.fieldId;
      }),

    editField: ({ fieldId, updates }) =>
      set((state) => {
        const field = state.fields.find((f: Field) => f.fieldId === fieldId);
        if (!field) throw new Error('function editField failed: unknown field id');

        if (updates.type && updates.type === 'text') field.other = false;

        Object.assign(field, updates);
      }),

    deleteField: ({ fieldId }) =>
      set((state) => {
        const fieldIndex = state.fields.findIndex((f: Field) => f.fieldId === fieldId);
        if (fieldIndex !== -1) state.fields.splice(fieldIndex, 1);
      }),
  }))
);

export { useSurveyStore };
