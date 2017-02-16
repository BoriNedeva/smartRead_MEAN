var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  username: { type: String, 
    required: [true, 'Username is required!']},
  password: { type: String, 
    required: [true, 'Password is required!'] },
  email: { type: String, 
    required: [true, 'Email is required!']},
  location: String,
  age: Number,
  read: [{ type: Schema.Types.ObjectId, 
    ref: 'Book'}],
  toRead: [{ type: Schema.Types.ObjectId, 
    ref: 'Book'}],
  rated: [{
    book: { type: Schema.Types.ObjectId, ref: 'Book' },
    rating: Number
  }]
});


userSchema.query.byUsernamePassword = function(name, password) {
  return this.findOne({ username: name, password: password });
};

userSchema.query.byUsername = function(username) {
  return this.find({ username: username });
};
// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;