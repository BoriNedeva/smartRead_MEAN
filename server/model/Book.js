var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    isbn: { type: String, required: true, unique: true },
    author: String,
    image_url_m: String,
    publisher: String,
    //price: number,
    vote_count: Number,
    rating: Number,
    title: String,
    last_seen: [{
        bookstore: String,
        price: Number
    }]
});

bookSchema.query.byIsbn = function(isbn) {
  return this.find({ isbn: isbn });
};

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;