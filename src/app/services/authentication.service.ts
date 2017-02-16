import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AuthenticationService {

    constructor(private http: Http, private router: Router) {}

    private loginUrl = '/api/login';

    login(user: User): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        let userjson = JSON.stringify(user);
        return this.http.post(this.loginUrl, userjson, options)
            .map((response: Response) => {
                let token = response.json() && response.json().token;
                if (token) {
                    Cookie.set('currentUser', response.json().token);
                    return true;
                } else {
                    return false;
                }
            }).catch((error: any) => Observable.of(false));
    }

    logout(): void {
        if (Cookie.get('currentUser')){
            Cookie.delete('currentUser');
        }
        this.router.navigate(['/login'])
    }
}