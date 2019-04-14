// for getting object ID according to mongoDB
const ObjectId = require("mongodb").ObjectId;

// getting all the messages from DB
function getMessages(req, res){
	let email = req.params.email;
	req.Db.collection('messages').find({members: email}).toArray()
		.then(function(result){
			if(result == null){
				res.status(501).send("No messages result");
			}
			res.status(200).send(result);
		}).catch(function(err){
			res.status(500).send("Not Found");
		});
}

// taking frontend data and inserting new message in DB
function createMessage(req, res){
	let newMessage = {_id: new ObjectId(), content: req.body.email, from: {}, to: {}, created_at: new Date(), seenBy: [], seen: false, info: false}
	req.Db.collection('messages').insertOne(newMessage)
		.then(function(result){
			if(result == null){
				res.status(501).send("No result");
			}
			res.status(200).send(result);
		}).catch(function(err){
			res.status(500).send("Not Found ");
		});
}

// Exporting to use in Server.JS file
module.exports = {
	getMessages,
	createMessage
}