import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Util } from '../shared/commons';

@Injectable()
export class RecommendationsService {
    private requestOptions: RequestOptions;
    private dbScanUrl = 'http://localhost:8089/SmartRead/rest/recommendations/dbscan';
    private knnUrl = 'http://localhost:8089/SmartRead/rest/recommendations/knn';
    private kMeansUrl = 'https://smartread-bookstore.herokuapp.com/api/v1/bookstores/Helikon';

    constructor(private http: Http) {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        headers.append('Accept', 'application/json');
        this.requestOptions = new RequestOptions({ headers: headers });
    }

    getDbScanRecommends(): Observable<String> {
        if(Util.checkIfUserLoggedOut()){
            return;
        }
        let jsonBody = this.prepareBody();
        return this.http.post(this.dbScanUrl, jsonBody, this.requestOptions).map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json() || 'Server error')); //...errors if any
    }

    getKmeansRecommends(): Observable<String> {
        // if(Util.checkIfUserLoggedOut()){
        //     return;
        // }
        // let jsonBody = this.prepareBody();
        // return this.http.post(this.kMeansUrl, jsonBody, this.requestOptions).map((res: Response) => res.json()) // ...and calling .json() on the response to return data
        //     .catch((error: any) => Observable.throw(error.json() || 'Server error')); //...errors if any
        if(Util.checkIfUserLoggedOut()){
            return;
        }
        return this.http.get(this.kMeansUrl).map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json() || 'Server error')); //...errors if any
    }

    getKNNRecommends(): Observable<String> {
        if(Util.checkIfUserLoggedOut()){
            return;
        }
        let jsonBody = this.prepareBody();
        return this.http.post(this.knnUrl, jsonBody, this.requestOptions).map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json() || 'Server error')); //...errors if any
    }

    private prepareBody() : string {
        let user = { token: { token: Cookie.get('currentUser') }}; // throw error if no cookie
        let json = JSON.stringify(user);  
        return json;
    }
}