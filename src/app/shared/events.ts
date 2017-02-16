import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class Events {

    public static onUserLogged: EventEmitter<any> = new EventEmitter<any>();

    public static onUserLoggedOut: EventEmitter<any> = new EventEmitter<any>();
}
