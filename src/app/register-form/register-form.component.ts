import { Component } from '@angular/core';
import { User } from '../model/user';
import { RegisterService } from '../services/register.service';
import { Util } from '../shared/commons';

@Component({
    selector: 'register-form',
    templateUrl: 'register-form.template.html',
    providers: [RegisterService]
})
export class RegisterFormComponent {
    newUser = new User('', '', '', '');
    successful = false;
    unsuccessful = false;
    message: String;

    constructor(private registerService: RegisterService) {
        Util.toggleNavbarButtonActive('nav-register');
    }

    onSubmit() {
        let res = this.registerService.register(this.newUser).subscribe(mess => {
            this.unsuccessful = false;
            this.successful = true;
            this.message = mess;
        },
            err => {
                this.successful = false;
                this.unsuccessful = true;
                this.message = err;
                console.log(err);
            });
    }
}