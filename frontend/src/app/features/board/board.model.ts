export enum TaskType{
  todo = "todo",
  inProgress = "inProgress",
  done = "done"
}

export interface Task {
  title: string;
  description: string;
  type: TaskType
}

export interface TaskList extends Array<Task> {}
