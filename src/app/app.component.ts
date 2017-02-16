import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Events } from './shared/commons';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
    selector: 'my-app',
    templateUrl: 'app.template.html', 
    host: {'window:beforeunload':'logout'}
})
export class AppComponent{
    userLogged: boolean;

    constructor(private authService: AuthenticationService) { 
        this.userLogged = Cookie.get('currentUser') ? true : false;
        Events.onUserLogged.subscribe(data => {
            this.userLogged = true;
        });
        Events.onUserLoggedOut.subscribe(data => {
            this.userLogged = false;
        });
    }

    logout() {
        this.userLogged = false;
        this.authService.logout();
    }
}