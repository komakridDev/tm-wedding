import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthguardService } from './authguard.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this.isLoggedInSubject.asObservable();

    constructor(private AuthGuardservice: AuthguardService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        return this.AuthGuardservice.getObservableToken().pipe(
            map(e => {
                if (e) {
                    this.isLoggedInSubject.next(true)
                    return true;
                } else {
                    this.isLoggedInSubject.next(false)
                    this.router.navigate(['/login']);
                    return false;
                }
            }),
            catchError((err) => {
                this.isLoggedInSubject.next(false)
                this.router.navigate(['/login']);
                return of(false);
            })
        );
    }
}
