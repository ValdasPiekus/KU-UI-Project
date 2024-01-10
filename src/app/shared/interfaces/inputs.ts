export type InputType = {
  title: string;
  unit?: string;
  class: string;
};

export type Inputs = {
  [key: string]: InputType;
};
