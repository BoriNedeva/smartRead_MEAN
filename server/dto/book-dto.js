class BookDTO {
    constructor(book, list, rating) {
    this.isbn = book.isbn;
    this.author = book.author;
    this.image_url_m = book.image_url_m;
    this.publisher = book.publisher,
    this.vote_count = book.vote_count,
    this.rating = book.rating,
    this.title = book.title,
    this.last_seen = book.last_seen,
    this.user_rating = rating,
    this.list = list
    }
}

module.exports = BookDTO;