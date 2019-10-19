import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth-data.model";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';
import * as Auth from './store/auth.actions';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private token: string;
  public isAuthenticated = false;
  private tokenTimer: any;
  private userId: string;

  constructor(
    private _http: HttpClient,
    private router: Router,
    private store: Store<{ ui: fromRoot.State }>
  ) {
    this.store.select(fromRoot.getIsAuthenticated).subscribe(
      (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      }
    )
  }

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  createUser(email: string, password: string) {
    this.store.dispatch(new UI.StartLoading());
    const authData: AuthData = { email: email, password: password };
    this._http.post("api/user/signup", authData).subscribe(
      response => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Auth.SetAuthenticated())
        this.router.navigate(["/board"]);
      },
      error => {
        this.store.dispatch(new UI.StopLoading());
      }
    );
  }

  loginUser(email: string, password: string) {
    this.store.dispatch(new UI.StartLoading());
    const authData: AuthData = { email: email, password: password };
    this._http
      .post<{ token: string; expiresIn: number; userId: string }>(
        "api/user/login",
        authData
      )
      .subscribe(
        response => {
          if (response.token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.token = response.token;
            this.userId = response.userId;
            this.store.dispatch(new Auth.SetAuthenticated());
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(this.token, expirationDate, this.userId);
            this.router.navigate(["/board"]);
          }
          this.store.dispatch(new UI.StopLoading());
        },
        error => {
          this.store.dispatch(new UI.StopLoading());
        }
      );
  }

  logout() {
    this.token = null;
    this.store.dispatch(new Auth.SetUnauthentcated())
    this.store.dispatch(new fromRoot.Logout());
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/auth/login"]);
  }

  autoAuthUser() {
    this.store.dispatch(new UI.StartLoading());
    const authInformation = this.getAuthData();
    if (!authInformation) {
      this.store.dispatch(new UI.StopLoading());
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.store.dispatch(new Auth.SetAuthenticated());
      this.router.navigate(["/board"]);
    }
    this.store.dispatch(new UI.StopLoading());
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");

    if (!token || !expirationDate) {
      return;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }
}
