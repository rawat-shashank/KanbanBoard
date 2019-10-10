import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../error/error.service';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromRoot from "src/app/app.reducer";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(
    private _errorService: ErrorService,
    private store: Store<{ ui: fromRoot.State }>
    ){
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  openSnackBar(message: string, action: string) {
    this._errorService.setNewError(message, action);
  }
}
