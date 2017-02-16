import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { SearchBook } from '../model/searchBook';
import { SearchBookWrapper } from '../model/search-book-wrapper';
import { Util } from '../shared/commons';
import { Observable } from 'rxjs';

@Injectable()
export class SearhBookService {
    constructor(private http: Http) { }

    private searchUrl = 'http://localhost:8089/SmartRead/rest/search/searchBooks';
    //private searchUrl = 'api/recs1';

    search(searchData: SearchBook): Observable<String> {
        if(Util.checkIfUserLoggedOut()){
            return;
        }
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        let wrapper = new SearchBookWrapper(searchData);
        let json = JSON.stringify(wrapper);
        return this.http.post(this.searchUrl, json, options).map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json() || 'Server error')); //...errors if any
    }
} 