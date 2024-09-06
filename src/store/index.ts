/* eslint-disable no-param-reassign */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';
import type { Field, Section, Survey } from './types';

const DUMMY_SURVEY = {
  activeField: null,
  survey: {
    surveyId: 'sf72m4WEWQb1SIdX',
    title: 'Default title',
    description: 'Default description',
  },
  sections: [
    {
      sectionId: '6dcde3c6-9b46-4d1a-887c-d70dea2874f2',
      title: '',
      description: '',
      routeStrategy: { type: 'sequential' as const, detail: null },
    },
    {
      sectionId: '7a3ea74d-085e-4b97-9ccf-af3b7d009cdc',
      title: '',
      description: '',
      routeStrategy: { type: 'sequential' as const, detail: null },
    },
  ],
  fields: [
    {
      sectionId: '6dcde3c6-9b46-4d1a-887c-d70dea2874f2',
      fieldId: uuidv4(),
      title: '현재 주로 플레이하는 서버는 무엇인가요?',
      description: '',
      type: 'radio' as const,
      options: [
        { id: 'o1', content: '리부트 서버' },
        { id: 'o2', content: '본서버' },
        { id: 'o3', content: '두 서버 모두 플레이 함' },
        { id: 'o4', content: '플레이하지 않음' },
      ],
      other: false,
      required: false,
    },
    {
      sectionId: '6dcde3c6-9b46-4d1a-887c-d70dea2874f2',
      fieldId: uuidv4(),
      title: '리부트 서버의 어떤 점이 매력적이라고 생각하시나요?',
      description: '해당되는 모든 항목을 선택해주세요.',
      type: 'checkbox' as const,
      options: [
        { id: 'o1', content: '본 서버 따잇하는 재미' },
        { id: 'o2', content: '메소, 큐브, 스타포스 딸깍하는 재미' },
      ],
      other: false,
      required: false,
    },
    {
      sectionId: '7a3ea74d-085e-4b97-9ccf-af3b7d009cdc',
      fieldId: uuidv4(),
      title: '',
      description: '',
      type: 'text' as const,
      other: false,
      required: false,
    },
  ],
};

interface SurveyStore {
  // states
  activeField: string | null;
  survey: Survey;
  sections: Section[];
  fields: Field[];
  // functions
  setActiveField: (fieldId: string) => void;
  setSurveyTitle: (title: string) => void;
  setSurveyDescription: (description: string) => void;
  setSections: (sections: Section[]) => void;
  setSectionTitle: (sectionId: string, title: string) => void;
  setSectionDescription: (sectionId: string, description: string) => void;
  addSection: ({ section, index }: { section: Omit<Section, 'sectionId'>; index?: number }) => void;
  editSection: (sectionId: string, updatedSection: Partial<Section>) => void;
  deleteSection: (sectionId: string) => void;
  setFields: (fields: Field[]) => void;
  addField: ({
    field,
    type,
    index,
    sectionId,
  }: {
    field?: Omit<Field, 'fieldId'>;
    type?: Field['type'];
    index: number;
    sectionId: string;
  }) => void;
  editField: (fieldId: string, updatedField: Partial<Field>) => void;
  deleteField: (fieldId: string) => void;
}

const useSurveyStore = create(
  immer<SurveyStore>((set) => ({
    // TODO: replace w/ actual survey
    ...DUMMY_SURVEY,

    setActiveField: (fieldId: string) => {
      set((state) => {
        state.activeField = fieldId;
      });
    },

    // Update survey title, description
    setSurveyTitle: (title: string) => {
      set((state) => {
        state.survey.title = title;
      });
    },

    setSurveyDescription: (description: string) =>
      set((state) => {
        state.survey.description = description;
      }),

    // Add, edit, delete a section
    setSections: (sections) => {
      set((state) => {
        state.sections = sections;
      });
    },

    setSectionTitle: (sectionId: string, title: string) => {
      set((state) => {
        const section = state.sections.find((s: Section) => s.sectionId === sectionId);
        if (section) {
          Object.assign(section, { title });
        }
      });
    },

    setSectionDescription: (sectionId: string, description: string) => {
      set((state) => {
        const section = state.sections.find((s: Section) => s.sectionId === sectionId);
        if (section) {
          Object.assign(section, { description });
        }
      });
    },

    addSection: ({ section, index }) =>
      set((state) => {
        const newS: Section = { ...section, sectionId: uuidv4() };
        if (index !== undefined) state.sections.splice(index, 0, newS);
        else state.sections.push(newS);
      }),

    editSection: (sectionId, updatedSection) =>
      set((state) => {
        const section = state.sections.find((s: Section) => s.sectionId === sectionId);
        if (section) {
          Object.assign(section, updatedSection);
        }
      }),

    deleteSection: (sectionId) =>
      set((state) => {
        state.sections = state.sections.filter((s: Section) => s.sectionId !== sectionId);
        state.fields = state.fields.filter((f: Field) => f.sectionId !== sectionId);
      }),

    // Add, edit, delete a field
    setFields: (fields) =>
      set((state) => {
        state.fields = fields;
      }),

    addField: ({ field, index, sectionId, type }) =>
      set((state) => {
        let newField: Field | undefined;
        const position = state.fields.findIndex((f: Field) => f.sectionId === sectionId) + index;

        if (field) {
          newField = { ...field, fieldId: uuidv4() } as Field;
        } else {
          switch (type) {
            case 'text':
              newField = {
                type,
                sectionId,
                fieldId: uuidv4(),
                title: '',
                description: '',
                other: false,
                required: false,
              };
              break;
            case 'radio':
            case 'checkbox':
              newField = {
                type,
                sectionId,
                fieldId: uuidv4(),
                title: '',
                description: '',
                options: [{ id: uuidv4(), content: '' }],
                other: false,
                required: false,
              };
              break;
            default:
          }
        }

        if (typeof newField === 'undefined' || (!field && !type))
          throw new Error('No field to copy, and no type was defined.');

        state.fields.splice(position, 0, newField);
        state.activeField = newField.fieldId;
      }),

    editField: (fieldId, updatedField) =>
      set((state) => {
        const field = state.fields.find((f: Field) => f.fieldId === fieldId);
        if (field) Object.assign(field, updatedField);
      }),

    deleteField: (fieldId) =>
      set((state) => {
        const fieldIndex = state.fields.findIndex((f: Field) => f.fieldId === fieldId);
        if (fieldIndex !== -1) state.fields.splice(fieldIndex, 1);
      }),
  }))
);

export { useSurveyStore };
