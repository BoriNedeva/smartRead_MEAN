import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable()
export class RegisterService {
    constructor(private http: Http) { }

    private registerUrl = 'api/register';

    register(user: User): Observable<String> {
        let response: Response;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        let userjson = JSON.stringify(user);
        return this.http.post(this.registerUrl, userjson, options).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }
}
