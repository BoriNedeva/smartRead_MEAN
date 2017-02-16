import { Component, Input } from '@angular/core';
import { ActionsService } from '../../services/actions.service';
import { AddToListDTO } from '../../model/add-to-list-dto';
import { RatingDTO } from '../../model/rating-dto';
import { Book } from '../../model/book';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
    selector: 'result-thumbnails',
    templateUrl: 'result-thumbnails.template.html',
})
export class ResultThumbnailsComponent{
    @Input() books: any;
    @Input() showPrice = false;
    @Input() addToList = false;
    @Input() showRating = false;
    @Input() rate = false;

    listOptions = ['Read',  'To Read', 'Favourite'];
    successful = false;
    unsuccessful = false;
    message: String;

    public max: number = 5;
    public isReadonly: boolean = false;

    constructor(private actionsService: ActionsService){}

    addBookToList(option: String, book: Book, bookContainer: Element) { //TODO can change button value //won't be book
        let addToListDto = new AddToListDTO(Cookie.get('currentUser'), book, option);
        let res = this.actionsService.addToList(addToListDto).subscribe(mess => {
            let alert = document.createElement('span');
            alert.setAttribute('type', 'bg-success');
            alert.className = 'bg-success';
            alert.innerHTML = mess.toString();
            bookContainer.appendChild(alert);

        },
            err => {
                let alert = document.createElement('span');
                alert.className = 'bg-danger'
                alert.innerHTML = err.toString();
                bookContainer.appendChild(alert);
                console.log(err);
            });
    }

    rateBook(book) {
        let ratingDto = new RatingDTO(Cookie.get('currentUser'), book.isbn, book.rating);
        this.actionsService.rateBook(ratingDto).subscribe(mess => {
            console.log(mess)
        },
            err => {
                console.log(err);
            });
    }
}
