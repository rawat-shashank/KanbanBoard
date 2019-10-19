import { Injectable } from "@angular/core";
import { TaskList, Task, TaskType } from "./board.model";
import { HttpClient } from "@angular/common/http";
import * as fromBoard from "./stores/board.reducer";
import * as UI from "src/app/shared/ui.actions";
import * as Board from "./stores/board.actions";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BoardService {
  constructor(
    private _http: HttpClient,
    private store: Store<{ ui: fromBoard.State }>
  ) {}

  getAllTasks() {
    this.store.dispatch(new UI.StartLoading());
    this._http
      .get("api/tasks/getUserAllTasks")
      .pipe(
        map((res: TaskList) => {
          return res.map(task => {
            return {
              title: task.title,
              description: task.description,
              type: task.type
            };
          });
        })
      )
      .subscribe(postData => {
        postData.forEach(element => {
          switch (element.type) {
            case TaskType.todo:
              this.store.dispatch(new Board.SetTodo(element));
              break;
            case TaskType.inProgress:
              this.store.dispatch(new Board.SetInprogress(element));
              break;
            case TaskType.done:
              this.store.dispatch(new Board.SetDone(element));
              break;
            default:
              break;
          }
        });
      });
    this.store.dispatch(new UI.StopLoading());
  }
}
