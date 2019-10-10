import { Component } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material";
import { AddTaskDialogComponent } from "../add-task-dialog/add-task-dialog.component";
import { TaskList, Task } from "../../board.model";
import { ErrorService } from "src/app/layout/error/error.service";
import { BoardService } from '../../board.service';

@Component({
  selector: "app-task-list",
  templateUrl: "task-list.component.html",
  styleUrls: ["task-list.component.scss"]
})
export class TaskListComponent {
  todo: TaskList;
  inProgress: TaskList;
  done: TaskList;

  constructor(
    private dialog: MatDialog,
    private _errorService: ErrorService,
    private _boardService: BoardService
  ) {
    this.todo = this._boardService.getTodo();
    this.inProgress = this._boardService.getInProgress();
    this.done = this._boardService.getDone();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  openDialog(event): void {
    const filterData = {
      task: {}
    };
    this.dialog.closeAll();
    let dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: "350px",
      data: filterData,
      hasBackdrop: true,
      panelClass: "filter-popup"
    });

    dialogRef.afterClosed().subscribe((result: Task) => {
      if (!result) {
        return;
      }
      if (!result.title) {
        this._errorService.setNewError("Title required", "warn");
        return;
      }

      if (!result.description) {
        this._errorService.setNewError("Description required", "warn");
        return;
      }
      this.todo.push(result);
    });
  }
}
