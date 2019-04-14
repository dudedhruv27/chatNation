// for getting object ID according to mongoDB
const ObjectId = require("mongodb").ObjectId;

// getting all the groups from DB
function getGroups(req, res){
	let email = req.params.email;
	req.Db.collection('groups').find({members: email}).toArray()
		.then(function(result){
			if(result == null){
				res.status(501).send("No result");
			}
			res.status(200).send(result);
		}).catch(function(err){
			res.status(500).send("Not found");
		});
}

// taking frontend data and inserting new groups in DB
function createGroups(req, res){
	let newGroup = {_id: new ObjectId(), admins: [req.body.email], members: [req.body.email], name: req.body.name, open: req.body.open, icon: req.body.icon, created_at: new Date()};
	req.Db.collection('groups').insertOne(newGroup)
		.then(function(result){
			if(result == null){
				res.status(501).send("No result");
			}
			res.status(200).send(newGroup);
		}).catch(function(err){
			res.status(500).send("Not found");
		});
}

// Exporting functions to be used in the Server.JS
module.exports = {
	getGroups,
	createGroups
}