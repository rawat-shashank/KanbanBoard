import { Component } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material";
import { AddTaskDialogComponent } from "../add-task-dialog/add-task-dialog.component";
import { TaskList, Task, TaskType, TaskPriority } from "../../board.model";
import { ErrorService } from "src/app/layout/error/error.service";
import { Store } from "@ngrx/store";
import * as fromBoard from "../../stores/board.reducer";
import { Observable } from "rxjs";
import { BoardService } from "../../board.service";

@Component({
  selector: "app-task-list",
  templateUrl: "task-list.component.html",
  styleUrls: ["task-list.component.scss"]
})
export class TaskListComponent {
  todo$: Observable<TaskList>;
  inProgress$: Observable<TaskList>;
  done$: Observable<TaskList>;

  constructor(
    private dialog: MatDialog,
    private _errorService: ErrorService,
    private boardService: BoardService,
    private store: Store<{ board: fromBoard.State }>
  ) {
    this.todo$ = this.store.select(fromBoard.getTodo);
    this.inProgress$ = this.store.select(fromBoard.getInProgress);
    this.done$ = this.store.select(fromBoard.getDone);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      switch (event.container.id) {
        case "todo":
          event.item.data.type=TaskType.todo;
          
          break;
        case "inProgress":
          event.item.data.type=TaskType.inProgress;
          break;
        case "done":
          event.item.data.type=TaskType.done;
          break;

        default:
          break;
      }
      this.boardService.updateTodo(event.item.data);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onTaskUpdate(task: Task) {
    this.openDialog(task, "Update");
  }

  openDialog(event = null, type = "New"): void {
    let newTask = {
      type: type,
      task: {
        title: "",
        description: "",
        type: TaskType.todo,
        priority: TaskPriority.low
      }
    };
    if (event) {
      newTask["task"] = event;
    }
    this.dialog.closeAll();
    let dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: "350px",
      data: JSON.parse(JSON.stringify(newTask)),
      hasBackdrop: true,
      panelClass: "theme-alternate"
    });

    dialogRef.afterClosed().subscribe((task: Task) => {
      if (task === newTask.task) {
        this._errorService.setNewError("No Changes", "Warn");
      }
      if (!task) {
        return;
      }
      if (!task.title) {
        this._errorService.setNewError("Title required", "Warn");
        return;
      }

      if (!task.description) {
        this._errorService.setNewError("Description required", "Warn");
        return;
      }

      switch (newTask.type) {
        case "New":
          this.boardService.createTodo(task);
          break;

        case "Update":
          this.boardService.updateTodo(task);
          break;

        default:
          break;
      }
    });
  }
}
