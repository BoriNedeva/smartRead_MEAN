import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { AddToListDTO } from '../model/add-to-list-dto';
import { RatingDTO } from '../model/rating-dto';
import { Util } from '../shared/commons';

import { Observable } from 'rxjs';

@Injectable()
export class ActionsService {

    private requestOptions: RequestOptions;

    constructor(private http: Http) {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        headers.append('Accept', 'application/json');
        this.requestOptions = new RequestOptions({ headers: headers });
     }

    private addToListServiceUrl = '/api/addToList';
    private rateServiceUrl = 'http://localhost:8089/SmartRead/rest/actions/rate';
    private rateAlgoServiceUrl = 'http://localhost:8089/SmartRead/rest/actions/rateAlgo';
    private bookstoresUrl = 'https://smartread-bookstore.herokuapp.com/api/v1/bookstores/';

    addToList(data: AddToListDTO): Observable<String> {
        if(Util.checkIfUserLoggedOut()){
            return;
        }
        let json = JSON.stringify(data);
        return this.http.post(this.addToListServiceUrl, json, this.requestOptions).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    rateBook(data: RatingDTO): Observable<String> {
        if(Util.checkIfUserLoggedOut()){
            return;
        }
        let wrapper = { ratingObj: data };
        let json = JSON.stringify(wrapper);
        return this.http.post(this.rateServiceUrl, json, this.requestOptions).map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json() || 'Server error')); //...errors if any//.map((res: Response) => console.log(res.json())); // ...and calling .json() on the response to return data
    }

    getBookstores(): Observable<String> {
        if(Util.checkIfUserLoggedOut()){
            return;
        }
        return this.http.get(this.bookstoresUrl).map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json() || 'Server error')).delay(3000); //...errors if any
    }

    getOffers(name): Observable<String> {
        if(Util.checkIfUserLoggedOut()){
            return;
        }
        let url = this.bookstoresUrl + name;
        return this.http.get(url).map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json() || 'Server error')); //...errors if any
    }
} 