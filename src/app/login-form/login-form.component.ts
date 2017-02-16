import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { User } from '../model/user';
import { AuthenticationService } from '../services/authentication.service';
import { Util, Events } from '../shared/commons';

@Component({
    selector: 'login-form',
    templateUrl: 'login-form.template.html',
})
export class LoginFormComponent implements OnInit{
    user = new User('','');
    //submitted = false;
    loginFailed = false;
    returnUrl: string;

    constructor(private route: ActivatedRoute ,private loginService: AuthenticationService, private router: Router) {
        Util.toggleNavbarButtonActive('nav-login');
    }

    ngOnInit(){
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    }

    onSubmit(){
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
        if (!this.returnUrl){
            this.returnUrl = '/search-book';
        }
        //this.submitted = true;
        this.loginService.login(this.user).subscribe((logged: Boolean) => {
            if (logged){
                this.router.navigate([this.returnUrl]);
                Events.onUserLogged.emit();
            }else{
                this.loginFailed = true;
            }
        });
    }
}

