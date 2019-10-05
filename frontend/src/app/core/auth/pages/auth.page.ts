import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: "app-user-auth",
    templateUrl: "auth.page.html",
    styleUrls: ["auth.page.scss"]
  })

  export class AuthComponent implements OnInit, OnDestroy {
    isLoading = false;
    private authStatusSub: Subscription;

    constructor(public authService: AuthService) {}

    ngOnInit() {
      this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
        () => {
          this.isLoading = false;
        }
      );
    }

    ngOnDestroy() {
      this.authStatusSub.unsubscribe();
    }
  }