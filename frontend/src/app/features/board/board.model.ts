export enum TaskType {
  todo = "todo",
  inProgress = "inProgress",
  done = "done"
}

export const TaskPriorityColor = {
  high: "red",
  medium: "yellow",
  low: "green"
};

export enum TaskPriority {
  high = "high",
  medium = "medium",
  low = "low"
}

export interface Task {
  id?: number;
  title: string;
  description: string;
  type: TaskType;
  priority: TaskPriority;
}

export interface TaskList extends Array<Task> {}
