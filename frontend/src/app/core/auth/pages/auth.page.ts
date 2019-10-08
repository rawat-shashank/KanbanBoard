import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: "app-user-auth",
    templateUrl: "auth.page.html",
    styleUrls: ["auth.page.scss"]
  })

  export class AuthComponent {
    routerUrl : string;
    constructor(private _router: Router) {
      this.routerUrl = this._router.url;
    }
  }