import { Injectable } from "@angular/core";
import { TaskList, Task } from "./board.model";
import { HttpClient } from "@angular/common/http";
import * as fromRoot from 'src/app/app.reducer';
import * as UI from 'src/app/shared/ui.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class BoardService {

  constructor (private _http: HttpClient, private store: Store<{ ui: fromRoot.State }>) {

  }
  todo: TaskList = [
    // { title: "Get Up", description: "Need to wake up early" },
    // { title: "Have Breakfast", description: "Need to eat early" }
  ];

  inProgress: TaskList = [
    { title: "Get Up", description: "Need to wake up early" },
    { title: "Have Breakfast", description: "Need to eat early" }
  ];

  done: TaskList = [
    { title: "Get Up", description: "Need to wake up early" },
    { title: "Have Breakfast", description: "Need to eat early" }
  ];

  getAllTasks() {
    this.store.dispatch(new UI.StartLoading());
    this._http.get("api/tasks/getUserAllTasks")
      .pipe(
        map(
          (res: TaskList) => {
            return {
              tasks: res.map((task) => {
                return {
                  title: task.title,
                  description: task.description
                };
              })
            };
          }
        )
      )
      .subscribe((postData) => {
        this.todo = postData.tasks;
      });
    this.store.dispatch(new UI.StopLoading());
  }

  getTodo(): TaskList {
    return this.todo;
  }
  
  getInProgress(): TaskList {
    return this.inProgress;
  }
  getDone(): TaskList {
    return this.done;
  }
}
