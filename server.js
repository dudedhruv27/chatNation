const express = require('express');
const bodyParser = require('body-parser');
const mongoDb = require('mongodb');
const path = require('path');
const cookieParser = require('cookie-parser');
const md5 = require('md5');

var app = express();

app.use(express.static(path.join(__dirname, 'Static')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
var db;
// Database Name
const dbName = 'chatnation_db';

// Use connect method to connect to the server
mongoDb.MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    if (err) {
        console.log(err);
    }
    console.log("Connected successfully to server");

    db = client.db(dbName);
});


app.use(function(req, res, next) {
    req.Db = db;
    next();
});

// Modules ------------
var users = require('./modules/users.js');
var groups = require('./modules/groups.js');
var messages = require('./modules/messages.js');

// API ---------------
app.post("/api/users/signin", users.signin);
app.post("/api/users/signup", users.signup);
app.get("/api/groups/:email", groups.getGroups);
app.post("/api/groups/create", groups.createGroups);
app.get("/api/messages/:email", messages.getMessages);
app.post("/api/messages/create", messages.createMessage);

// Server Listening Port ------------
app.listen('3000', function() {
    console.log('server is running....');
});