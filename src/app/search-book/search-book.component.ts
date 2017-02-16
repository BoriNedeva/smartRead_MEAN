import { Component } from '@angular/core';
import { SearchBook } from '../model/searchBook';
import { Book } from '../model/book';
import { SearhBookService } from '../services/search-book.service';
import { Util } from '../shared/commons';

@Component({
    selector: 'search-book',
    templateUrl: 'search-book.template.html',
    providers: [SearhBookService]
})
export class SearchBookComponent {
    result: any;
    rate = true;
    addToList = false;

    constructor(private searchService: SearhBookService) { 
        Util.toggleNavbarButtonActive('nav-search-book');
    }

    genres = [
        { name: 'Classics', checked: false },
        { name: 'Crime', checked: false },
        { name: 'Fantasy', checked: false },
        { name: 'Mystery', checked: false },
        { name: 'Thriller', checked: false },
        { name: 'Romance', checked: false }
    ];
    searchData = new SearchBook('', '', []);

    getSelectedGenres() {
        return this.genres
            .filter(genre => genre.checked)
            .map(genre => genre.name);
    }

    onSubmit() {
        this.searchData.genres = this.getSelectedGenres();
        let res = this.searchService.search(this.searchData).subscribe(result => {
            this.result = result;
        },
            err => {
                console.log(err);
            });
    }
}