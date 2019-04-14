// Getting messages ----------------
function getMessages(){
	return fetch(`/api/messages/${user.email}`, {
		method: "get",
		headers: {
			"content-type": "application/json; chartset=UTF-8"
		}
	}).then(function(data){
		if(data.status == 200){
			return data; // collecting messages data
		}
		throw "error while fetching messages";
	}).then(function(data){
		return data.json(); // converting to message data to JSON
	});
}

function showMessages(){
	document.getElementById("messages").innerHTML = ""; 
// Start Loop for messages and appending to frontend -----------------
	for (var i = 0; i < messages.length; i++) {
		let el = document.createElement("div");
		el.innerHTML = `<h4>${messages[i].content}</h4>`;
		document.getElementById("messages").appendChild(el);
	}
}

function createMessage(event){
	event.preventDefault();
	fetch(`/api/messages/create`, {
		method: "post",
		headers: {
			"content-type": "application/json chartset=UTF-8"
		},
		body: `{"content": "${event.target.message.value}", "from": "{}", "to": "{}", "created_at": "", "seenBy": "[]", "seen": false, "info": false}`
	}).then(function(data){
		if(data.status == 404){
			console.log("API not found");
			return;
		}
		return data;
	}).then(function(data){
		return data.json(); // convert data to JSON
	})
	.then(function(data){
		messages.push(data); // pushing messages data to message array
		showMessages(); // showing messages (no need of refreshing the page)
	})
	.catch(function(err){
		console.log(err);
	});
}

let messages = []; // Empty messages array for storing all messages