import { Priority } from '../interfaces/priorities';

export type Task = {
  task: string;
  priority: keyof Priority;
};
