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
      content: string;
      next: string;
    }[];
  };
};

type RouteStrategy = Sequential | Manual | Conditional;

interface Survey {
  surveyId: string;
  title: string;
  description: string;
}

interface Section {
  sectionId: string;
  title: string;
  description: string;
  routeStrategy: RouteStrategy;
}

interface BasicField {
  type: string;
  sectionId: string;
  fieldId: string;
  title: string;
  description: string;
  other: boolean;
  required: boolean;
}

interface RadioField extends BasicField {
  type: 'radio';
  options: { id: string; content: string }[];
}

interface CheckboxField extends BasicField {
  type: 'checkbox';
  options: { id: string; content: string }[];
}

interface TextField extends BasicField {
  type: 'text';
}

type Field = RadioField | CheckboxField | TextField;

export type { Survey, Section, Field, RadioField, CheckboxField, TextField, RouteStrategy };
