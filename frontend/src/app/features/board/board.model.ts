export interface Task {
  title: string;
  description: string;
}

export interface TaskList extends Array<Task> {}
