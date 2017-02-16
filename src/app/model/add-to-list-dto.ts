export class AddToListDTO{

    constructor(
        public username: String,
        public book: any,
        public list?: String,
        public rating?: Number,
        public bookstore?: String
    ){}
}