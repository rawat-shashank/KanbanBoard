import { Component, Input } from '@angular/core';
import { ErrorService } from '../error/error.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent {

  constructor(
    private _errorService: ErrorService
    ){

  }

  openSnackBar(message: string, action: string) {
    this._errorService.setNewError(message, action);
  }
}
