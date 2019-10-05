
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate{
	constructor( 
		private _authService: AuthService,
		private _router: Router){}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		const isAuth = this._authService.getIsAuth();
		if(!isAuth){
			this._router.navigate(['/login']);
		}
		return isAuth;
	}
}