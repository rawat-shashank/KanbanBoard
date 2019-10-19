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
import { Store } from "@ngrx/store";
import * as Board from '../../stores/board.actions';
import * as fromBoard from '../../stores/board.reducer';
import { Observable, from } from 'rxjs';

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
      this.store.dispatch(new Board.SetTodo(result));
    });
  }
}
