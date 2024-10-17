export type Actions = {
  setPrompt: (arg: string) => void;
  setTarget: (arg: string | null) => void;
  setBase: (arg: boolean) => void;
};

export type Request = {
  isEditGeneratedResult: boolean;
  userPrompt: string;
  modificationTargetId: string;
  surveyId: string;
};
