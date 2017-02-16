import { Book } from "./book";

export class AddToListDTO{

    constructor(
        public username: String,
        public book: Book,
        public list: String
    ){}
}