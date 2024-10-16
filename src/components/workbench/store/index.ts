/* eslint-disable no-param-reassign */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuid } from 'uuid';
import { subscribeWithSelector } from 'zustand/middleware';
import type { Field, Section, Store, TextField, CheckboxField, RadioField, Actions } from '../types';

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
  title: '',
  description: '',
  thumbnail: null,
  finishMessage: '',
  status: 'NOT_STARTED' as const,
  isVisible: true,
  isResultOpen: false,
  publishedAt: null,

  rewardConfig: {
    type: 'NO_REWARD',
    rewards: [],
    targetParticipantCount: null,
    finishedAt: null,
  },

  sections: [],
  fields: [],
};

const useSurveyStore = create<Store & Actions>()(
  immer(
    subscribeWithSelector((set) => ({
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

      rewardSetter: ({ updates }) => {
        set((state) => {
          Object.assign(state.rewardConfig, updates);
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
        }),

      addField: ({ sectionId, index, type }) =>
        set((state) => {
          const position = state.fields.findIndex((f: Field) => f.sectionId === sectionId) + index;
          const newField = getDefaultField(sectionId, type);

          state.fields.splice(position, 0, newField);
        }),

      editField: ({ fieldId, updates }) =>
        set((state) => {
          const field = state.fields.find((f: Field) => f.fieldId === fieldId);
          if (!field) throw new Error('function editField failed: unknown field id');

          if (updates.type) {
            if (updates.type === 'text') {
              updates.other = false;
            }
            if ((updates.type === 'checkbox' || updates.type === 'radio') && field.options.length === 0) {
              updates.options = [{ id: uuid(), content: '' }];
            }
          }

          Object.assign(field, updates);
        }),

      deleteField: ({ fieldId }) =>
        set((state) => {
          const fieldIndex = state.fields.findIndex((f: Field) => f.fieldId === fieldId);
          if (fieldIndex !== -1) state.fields.splice(fieldIndex, 1);
        }),
    }))
  )
);

export { useSurveyStore };
