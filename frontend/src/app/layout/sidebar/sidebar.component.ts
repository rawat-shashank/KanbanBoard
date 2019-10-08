import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/auth/auth.service";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromRoot from "src/app/app.reducer";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class LayoutComponent implements OnInit{
  otherTheme: boolean = true;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private _authService: AuthService,
    private store: Store<fromRoot.State>,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this._authService.autoAuthUser();
    this.matIconRegistry.addSvgIcon(
      `logo`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/logo.svg")
    );
  }

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
  }
}
