import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataBaseService } from '../data-base/data-base.service';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private db: DataBaseService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.db.bd.pipe(
      map((data: any) => {
        if (!data?.auth?.email) {
          this.router.navigate(['sign-in']);
        }
        return !!data.auth.email;
      })
    );
  }
}
