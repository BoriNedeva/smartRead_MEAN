import { Component } from '@angular/core';
import { ActionsService } from '../services/actions.service';
import { Util } from '../shared/commons';

@Component({
    selector: 'offers',
    templateUrl: 'offers.template.html',
})
export class OffersComponent {
    bookstores: any
    books: any
    bookstoreName: string;
    showPrice = true;
    
    constructor(private actionsService: ActionsService){
        Util.toggleNavbarButtonActive('nav-offers');
        this.bookstoreName = "Bookstores";
        this.actionsService.getBookstores().subscribe(result => {
            this.bookstores = result;
        },
            err => {
                console.log(err);
            });
    }

    getOffersFromBookstore(name){
        this.bookstoreName = name;
        this.actionsService.getOffers(name).subscribe(result => {
            this.books = result;
        },
            err => {
                console.log(err);
            });
    }
}