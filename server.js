// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

process.on('uncaughtException', function (error) {
   console.log(error.stack);
});
//mongod --dbpath D:\mongodb\data
//Set up mongoose connection
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/SmartReadJS');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(err, req, res, next){
  console.error(err.stack);
});
// Point static path to dist
//app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('dist'));


// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));