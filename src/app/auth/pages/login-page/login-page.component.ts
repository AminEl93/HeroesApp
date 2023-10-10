import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html'
})

export class LoginPageComponent {

    constructor(private _authService: AuthService, private _router: Router) { }

    onLogin(): void {
        this._authService.login('amin.elmeziani@gmail.com','123456')
            .subscribe(user => {
                this._router.navigate(['/']);
            });    
    }    
}
