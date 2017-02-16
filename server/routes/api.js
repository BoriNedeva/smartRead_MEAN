const express = require('express');
const router = express.Router();

var mongoose = require('mongoose');

var User = require('../model/User')(mongoose.connection);
var Book = require('../model/Book')(mongoose.connection);
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
  let readL;
  let toReadL;
  let ratedL;
  User.findOne({ username: req.body.username }, 'read toRead rated')//.populate('read', 'toRead')
    .exec(function (err, result) {
      if (err) {
        res.status(constants.INTERNAL_SERVER_ERR);
      }
      if (result) {
        readL = result.read.map(item => {
         Book.findOne({_id: item}, (req, res) => {
            if (res) {
              item = res;
              return item;
            }
          });
          
        });
        toReadL = result.toRead.map(item => {
         Book.findOne({_id: item}, (req, res) => {
            if (res) {
              item = res;
              return item;
            }
          });
          
        });
        ratedL = result.rated.map(item => {
           Book.findOne({_id: item.book}, (req, res) => {
            if (res) {
              res.rating = item.rating;
              item = res;
              return item;
            }
          });
        });
        process.nextTick(() => {
          let resultWhole = {read: readL, toRead: toReadL, rated: ratedL};
          res.status(constants.OK).json(result);
        })
      }
    });
});

router.post('/addToList', (req, res) => {
  let book;
  //adding book to database or update prices
  Book.findOne().byIsbn(req.body.book.isbn).exec(function (err, result) {
    if (result) {
      book = result;
      if (req.body.bookstore) {
        let last_seen_item_index = result.last_seen.findIndex(item => item.bookstore === req.body.bookstore);
        if (last_seen_item_index !== -1) {
          if (result.last_seen[last_seen_item_index].price !== req.body.book.price) {
            result.last_seen[last_seen_item_index].price = req.body.book.price;
            result.save(function (err) {
              if (!err) { console.log('Success!'); }
            });
          }
        } else {
          result.last_seen.push({ bookstore: req.body.bookstore, price: req.body.book.price });
          result.save(function (err) {
            if (!err) { console.log('Success!'); }
          });
        }
      }
    } else {
      book = new Book({
        isbn: req.body.book.isbn,
        author: req.body.book.author,
        image_url_m: req.body.book.image_url_m,
        publisher: req.body.book.publisher,
        vote_count: req.body.book.vote_count,
        rating: req.body.book.rating,
        title: req.body.book.title,
        last_seen: [{ bookstore: req.body.bookstore, price: req.body.book.price }]
      })
      book.save(function (err, result) {
        if (err) {
          res.status(constants.INTERNAL_SERVER_ERR).json('Book was not saved!');
        }
        book = result;
      });
    }
    //adding book to user's list
    if (req.body.list && req.body.list === 'toRead') {
      User.update(
        { username: req.body.username },
        { $push: { toRead: book._id } },
        function (err, updated) {
          if (err) {
            res.status(constants.CONFLICT).json('Book was not saved!');
          } else {
            res.status(constants.OK).json("Done!");
          }
        });
      //   User.findOne().byUsername(req.body.name).exec(function (err, result) {
      //   if (err) {
      //     res.status(constants.INTERNAL_SERVER_ERR).json('Book was not saved!');
      //   } else {
      //     if (result) {
      //       result.toRead.push(book._id);
      //       user.save(function (err, result) {
      //       if (err) {
      //         res.status(constants.INTERNAL_SERVER_ERR).json('Book was not saved!');
      //       }
      //     })
      //     } else {
      //       res.status(constants.UNAUTHORIZED).json('Book was not saved!');
      //     }
      //   }
      // });
    }
    if (req.body.list && req.body.list === 'read') {
      User.update(
        { username: req.body.username },
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
      let rated = [];
      User.findOne().byUsername(req.body.username).exec(function (err, result) {
        if (err) {
          res.status(constants.INTERNAL_SERVER_ERR);
        }
        if (result) {
          rated = result.rated;
          let ratingIdx = rated.findIndex(item => item._doc.book === book._doc._id); //doesn't work
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
          User.update(
            { username: req.body.username },
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
    }
  });
});

module.exports = router;