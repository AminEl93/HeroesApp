import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    CanMatchFn,
    Route,
    Router,
    UrlSegment,
    RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): Observable<boolean> | boolean => {
    // Se inyectan el AuthService y el Router
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
   
    return authService.checkAuthentication()
        .pipe(
            tap((isAuthenticated) => {
                if (!isAuthenticated) { router.navigate(['/auth/login']); }
            })
        );
};

/* En Angular 16 ya no hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing */

export const canActivateGuard: CanActivateFn = ( // Hay que tener en cuenta el tipado CanActiveFn
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    console.log('CanActivate');
    console.log({ route, state }); 
    return checkAuthStatus();
};
 
export const canMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    console.log('CanMatch');
    console.log({ route, segments }); 
    return checkAuthStatus();
};