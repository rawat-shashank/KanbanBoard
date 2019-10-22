import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Task } from "../../board.model";

@Component({
  selector: "app-add-task-dialog",
  templateUrl: "add-task-dialog.component.html"
})
export class AddTaskDialogComponent implements OnInit {
  priorities = [
    { selector: "High", value: "high" },
    { selector: "Medium", value: "medium" },
    { selector: "Low", value: "low" }
  ];

  types = [
    { selector: "Todo", value: "todo" },
    { selector: "InProgress", value: "inProgress" },
    { selector: "Done", value: "done" }
  ];

  constructor(
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public input: {
      type: "New";
      task: Task;
    }
  ) {}

  filterData: any;

  ngOnInit() {
    this.filterData = this.input;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
