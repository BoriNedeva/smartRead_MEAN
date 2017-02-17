import { Component } from '@angular/core';
import { SearchBook } from '../model/searchBook';
import { Book } from '../model/book';
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
    rate = true;
    addToList = false;
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