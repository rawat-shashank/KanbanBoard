import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Task, TaskPriorityColor } from "../../board.model";

@Component({
  selector: "app-task",
  templateUrl: "task.component.html",
  styleUrls: ["task.component.scss"]
})
export class TaskComponent {
  task: Task;
  taskPriorityColor = TaskPriorityColor;
  @Input()
  set setTaskData(input: Task) {
    if (input) {
      this.task = input;
    }
  }

  @Output() updateTask = new EventEmitter<Task>();

  onEditTask() {
    this.updateTask.emit(this.task);
  }
}
