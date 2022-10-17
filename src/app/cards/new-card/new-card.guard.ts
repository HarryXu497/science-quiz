import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, tap, Observable } from 'rxjs';
import { AuthenticationService } from '../../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NewCardGuard implements CanActivate {
	constructor(
		private router: Router,
		private auth: AuthenticationService,
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.auth.user$.pipe(
			map(user => user !== null),
			tap(canActivate => {
				if (!canActivate) {
					this.router.navigate(['/questions']);
				}
			})
		);
	}
  
}
