import { Injectable } from "@angular/core";
import { TaskList, Task } from "./board.model";
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
              id: task.id,
              title: task.title,
              description: task.description,
              type: task.type,
              priority: task.priority
            };
          });
        })
      )
      .subscribe(postData => {
        this.store.dispatch(new Board.SetTasks(postData));
      });
    this.store.dispatch(new UI.StopLoading());
  }

  createTodo(todo: Task) {
    this.store.dispatch(new UI.StartLoading());
    this._http
      .post("api/tasks/createUserTask", todo)
      .pipe(
        map((task: Task) => {
          return {
            id: task.id,
            title: task.title,
            description: task.description,
            type: task.type,
            priority: task.priority
          };
        })
      )
      .subscribe(task => {
        this.store.dispatch(new Board.AddTodo(task));
      });
    this.store.dispatch(new UI.StopLoading());
  }

  updateTodo(todo: Task) {
    if (!todo.id) {
      return;
    }
    this.store.dispatch(new UI.StartLoading());
    this._http
      .post("api/tasks/updateUserTask", todo)
      .pipe(
        map((task: Task) => {
          return {
            id: task.id,
            title: task.title,
            description: task.description,
            type: task.type,
            priority: task.priority
          };
        })
      )
      .subscribe(task => {
        this.store.dispatch(new Board.UpdateTask(task));
      });
    this.store.dispatch(new UI.StopLoading());
  }
}
