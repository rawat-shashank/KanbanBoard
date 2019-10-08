import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../auth.service";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../../../app.reducer";

@Component({
  selector: "app-user-register",
  templateUrl: "register.component.html",
  styleUrls: ["register.component.scss"]
})
export class UserRegisterComponent implements OnInit {
  isLoading$: Observable<boolean>;
  constructor(
    public authService: AuthService,
    private store: Store<{ ui: fromRoot.State }>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.createUser(form.value.email, form.value.password);
  }
}
