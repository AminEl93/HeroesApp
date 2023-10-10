import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of, map, catchError } from 'rxjs';

import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private baseUrl = environments.baseUrl;
    private user?: User;

    constructor(private _http: HttpClient) { }

    // Obtener el usuario actual
    get currentUser(): User | undefined {
        if (!this.user) return undefined;
        return structuredClone(this.user);
    }

    // Servicio de Login (método de autenticación)
    login(email: string, password: string): Observable<User> {
        // En un backend real sería: http.post('login', {email, password});
        return this._http.get<User>(`${this.baseUrl}/users/1`)
            .pipe(
                tap( user => this.user = user ), // Establecer el usuario en la propiedad de la clase
                tap( user => localStorage.setItem('token', 'aASDgjhasda.asdasd.aadsf123k') )
            );
    }

    logout() {
        this.user = undefined;
        localStorage.clear();
    }
}