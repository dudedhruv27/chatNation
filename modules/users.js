// for getting object ID according to mongoDB
const ObjectId = require("mongodb").ObjectId;

// Checking details with DB and loging in
function signin(req, res) {
    req.Db.collection('users').findOne({ email: req.body.email, password: req.body.password })
        .then(function(result) {
            if (result == null) {
                res.status(501).send("No result");
            }
            res.status(200).send(result);
        }).catch(function(error) {
            res.status(500).send("Not Found");
        });
}

// taking frontend data and inserting new user in DB
function signup(req, res) {
    let newUser = { _id: new ObjectId(), email: req.body.email, name: req.body.name, password: req.body.password, created_at: new Date() };
    req.Db.collection('users').insertOne(newUser)
        .then(function(result) {
            if (result == null) {
                res.status(501).send("No result");
            }
            res.status(200).send(newUser);
        }).catch(function(error) {
            res.status(500).send("Not Found");
        });
}

// Exporting to use in Server.JS file
module.exports = {
    signin,
    signup
}