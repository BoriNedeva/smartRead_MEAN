const express = require('express');
const router = express.Router();

var User = require('../model/User');
var Book = require('../model/Book');
var constants = require('./constants_sr');
var BookDTO = require('../dto/book-dto');

router.get('/', (req, res) => {
  res.get('Api works');
});

router.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  User.findOne().byUsernamePassword(username, password).exec(function (err, result) {
    if (err) {
      res.status(constants.INTERNAL_SERVER_ERR);
    } else {
      if (result) {
        let token = { token: result.username };
        res.status(constants.OK).json(token);
      } else {
        res.status(constants.UNAUTHORIZED).json(constants.UNAUTHORIZED_MESS);
      }
    }
  });
});

router.post('/register', (req, res) => {
  try {
    let registerUser = req.body;
    let user = new User();
    user.username = registerUser.username;
    user.password = registerUser.password;
    user.email = registerUser.email;
    if (registerUser.location) {
      user.location = registerUser.location;
    }
    if (registerUser.age) {
      user.age = registrationUser.age;
    }
    user.save(function (err) {
      if (err) {
        if (err.errors['username'] && err.errors['username'].message) {
          res.status(constants.CONFLICT).json(err.errors['username'].message);
        } else if (err.errors['password'] && err.errors['password'].message) {
          res.status(constants.CONFLICT).json(err.errors['password'].message);
        } else if (err.errors['email'] && err.errors['email'].message) {
          res.status(constants.CONFLICT).json(err.errors['email'].message);
        } else {
          res.status(constants.INTERNAL_SERVER_ERR).json(constants.USER_NOT_SAVED);
        }
      } else {
        res.status(constants.OK).json(constants.SUCCESSFULL_REGISTER);
      }
    });
  }
  catch (error) {
    console.log(error);
    res.status(constants.INTERNAL_SERVER_ERR).json(constants.USER_NOT_SAVED);
  }
});

router.post('/searchBooks', (req, res) => {
  let user;
  User.findOne().byUsername(req.body.name).exec(function (err, result) {
    //Model.findOne({username: req.body.name}, //'read toRead rated', 
    //function (err, result) {
    if (docs) {
      user = result;
    }
  });
  let query = Book.find();
  if (req.body.name) {
    query.where('title').equals(name);
  }
  if (req.body.author) {
    query.where('author').equals(author);
  }
  query.exec(function (err, result) {
    if (err) {
      res.status(constants.INTERNAL_SERVER_ERR);
    } else {
      let books = [];
      books = result.map(item => {
        if (user.read.find(book => book._id === item._id)) {
          item.list = 'read';
        } else if (user.toRead.find(book => book._id === item._id)) {
          item.list = 'toRead';
        } else {
          item.list = 'none';
        }
        let userRating = user.rated.find(rated => rated.book._id === item._id);
        if (rating) {
          item.user_rating = userRating.rating;
        }
      });
      res.status(constants.OK).json(books);
    }
  });
});

  router.post('/getLists', (req, res) => {
    User.findOne({ username: req.body.name }, 'read toRead rated',
      function (err, result) {
        if (err) {
          res.status(constants.INTERNAL_SERVER_ERR);
        }
        if (result) {
          res.status(constants.OK).json(result);
        }
      });
    // User
    //   .findOne({ username: req.body.name }, 'read toRead rated')
    //   .populate('read', 'toRead')
    //   .exec(function (err, result) {
    //   });
  });

  router.post('/addToList', (req, res) => {
    let book;
    //adding book to database or update prices
    Book.findOne().byIsbn(rec.body.book.isbn).exec(function (err, result) {
      if (result) {
        book = result;
        if (rec.body.bookstore) {
          let last_seen_item_index = result.last_seen.findIndex(item => item.bookstore === rec.body.bookstore);
          if (last_seen_item_index !== -1) {
            if (result.last_seen[last_seen_item_index].price !== rec.body.price) {
              result.last_seen[last_seen_item_index].price = rec.body.price;
              result.save(function (err) {
                if (!err) { console.log('Success!'); }
              });
            }
          } else {
            result.last_seen.push({ bookstore: rec.body.bookstore, price: rec.body.price });
            result.save(function (err) {
              if (!err) { console.log('Success!'); }
            });
          }
        }
      } else {
        book = new Book({
          isbn: rec.body.book.isbn,
          author: rec.body.book.author,
          image_url_m: rec.body.book.image_url_m,
          publisher: rec.body.book.publisher,
          vote_count: rec.body.book.vote_count,
          rating: rec.body.book.rating,
          title: rec.body.book.title,
          last_seen: [{ bookstore: rec.body.bookstore, price: rec.body.price }]
        })
      }
    });
    //adding book to user's list
    if (req.body.list && req.body.list === 'toRead') {
      PersonModel.update(
        { username: username },
        { $push: { toRead: book._id } },
        function (err) {
          if (err) {
            res.status(constants.CONFLICT).json(error.errors['toRead'].message);
          } else {
            res.status(constants.OK).json("Done!");
          }
        });
    }
    if (req.body.list && req.body.list === 'read') {
      PersonModel.update(
        { username: username },
        { $push: { read: book._id } },
        function (err) {
          if (err) {
            res.status(constants.CONFLICT).json(error.errors['read'].message);
          } else {
            res.status(constants.OK).json("Done!");
          }
        });
    }
    if (req.body.rating) {
      //update rating in db
      //update user list - check if exists
      let rated = [];
      User.findOne({ username: req.body.username }, 'rated',
        function (err, result) {
          if (err) {
            res.status(constants.INTERNAL_SERVER_ERR);
          }
          if (result) {
            rated = result;
          }
        });
      let ratingIdx = rated.findIndex(item => item.book === book._id);
      let bookNewRating;
      if (ratingIdx !== -1) {
        let oldRating = rated[ratingIdx].rating;
        rated[ratingIdx].rating = req.body.rating;
        bookNewRating = ((book.rating * book.vote_count) - oldRating + req.body.rating) / book.vote_count;
        book.rating = bookNewRating;
      } else {
        rated.push({ book: book._id, rating: req.body.rating });
        book.vote_count += 1;
        bookNewRating = ((book.rating * book.vote_count) + req.body.rating) / book.vote_count;
        book.rating = bookNewRating;
      }
      PersonModel.update(
        { username: username },
        { rated: rated },
        function (err) {
          if (err) {
            res.status(constants.INTERNAL_SERVER_ERR);
          } else {
            book.save(function (err) {
              if (!err) { console.log('Success updating rating!'); }
            });
            res.status(constants.OK);
          }
        });
    }
  });

  module.exports = router;