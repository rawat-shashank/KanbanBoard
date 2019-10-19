import { Component } from "@angular/core";
import { Observable } from "rxjs";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from "@angular/cdk/layout";
import { AuthService } from "src/app/core/auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  isHandset$: Observable<BreakpointState> = this.breakpointObserver.observe(
    Breakpoints.Handset
  );
  drawerToggle = false;
  otherTheme = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {}

  logout() {
    this.authService.logout();
  }
}
