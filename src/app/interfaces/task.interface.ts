import { Person } from './person.interface';

export interface Task {
  id?: number;
  name: string;
  dueDate: Date;
  completed: boolean;
  persons: Person[];
}