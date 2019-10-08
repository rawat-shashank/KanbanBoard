import { Injectable } from "@angular/core";
import { TaskList } from "./board.model";

@Injectable({
  providedIn: "root"
})
export class BoardService {
  todo: TaskList = [
    { title: "Get Up", description: "Need to wake up early" },
    { title: "Have Breakfast", description: "Need to eat early" }
  ];

  inProgress: TaskList = [
    { title: "Get Up", description: "Need to wake up early" },
    { title: "Have Breakfast", description: "Need to eat early" }
  ];

  done: TaskList = [
    { title: "Get Up", description: "Need to wake up early" },
    { title: "Have Breakfast", description: "Need to eat early" }
  ];

  getTodos(): TaskList {
    return this.todo;
  }
  getInProgress(): TaskList {
    return this.inProgress;
  }
  getDone(): TaskList {
    return this.done;
  }
}
