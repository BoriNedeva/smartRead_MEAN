import { Component } from '@angular/core';
import { SearchBook } from '../model/searchBook';
import { SearhBookService } from '../services/search-book.service';
import { Util } from '../shared/commons';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
    selector: 'search-book',
    templateUrl: 'search-book.template.html',
    providers: [SearhBookService]
})
export class SearchBookComponent {
    result: any;
    rating = true;
    rate = true;
    addToList = true;
    searchData = new SearchBook(Cookie.get('currentUser'), '', '');

    constructor(private searchService: SearhBookService) { 
        Util.toggleNavbarButtonActive('nav-search-book');
    }

    onSubmit() {
        let res = this.searchService.search(this.searchData).subscribe(result => {
            this.result = result;
        },
            err => {
                console.log(err);
            });
    }
}