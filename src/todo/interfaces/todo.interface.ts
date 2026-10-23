export interface Todo {
  title: string;
  task: string;
  createdAt: Date;
  completed: boolean;
  id: string;
  user: string;
  hasBeenEdited: boolean;
}