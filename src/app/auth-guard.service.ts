import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './authenticate/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return this.authService.checkToken(token).pipe(
        map(response => {
          return true;
        }),
        catchError(error => {
          this.router.navigate(['/authenticate']);
          return of(false);
        })
      );
    } else {
      this.router.navigate(['/authenticate']);
      return false;
    }
  }
}
