import { Component } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { ErrorService } from "./error.service";

@Component({
  selector: "app-error",
  template: ``
})
export class ErrorComponent {
  durationInSeconds = 2000;
  errorMessage: string;
  error403: boolean;
  error404: boolean;

  constructor(
    private _snackBar: MatSnackBar,
    private _errorService: ErrorService
  ) {
    this._errorService.getNewError().subscribe(
      data => {
        this.openSnackBar(data.message, data.action);
      },
      error => console.log(error)
    );
  }

  openSnackBar(message: string, action: string, panelClass=null) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = "top";
    config.horizontalPosition = "end";
    config.panelClass = panelClass ? panelClass : undefined;
    this._snackBar.open(
        message,
        action, {
      duration: this.durationInSeconds
    });
  }
}
