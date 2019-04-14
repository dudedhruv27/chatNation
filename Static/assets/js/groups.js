// Getting Private Groups for Showing groups --------------------
function getGroups() {
	return fetch(`/api/groups/${user.email}`, {
		method: "get",
		headers: {
			"content-type": "application/json; charset=UTF-8"
		}
	}).then(function(data){
		if(data.status == 200){
			return data; // fetching data 
		}
		throw "error while fetching data";
	}).then(function(data){
		return data.json(); // converting data to JSON
	});
}

function showGroups() {
	document.getElementById("groups").innerHTML = "";
// Loop for showing the groups on frontend -------------
	for (var i = 0; i<groups.length; i++) {
		let el = document.createElement("div");
		// making groups a link for going to particular group page -------------
		el.innerHTML = `<h4 onclick="javascript: window.location = '/#/group/${groups[i]._id}';">${groups[i].name}</h4>`;
		document.getElementById("groups").appendChild(el);
	}
}

function createGroup(event) {
	event.preventDefault();
	fetch('/api/groups/create', {
		method: "post",
		headers: {
			"content-type": "application/json; charset=UTF-8"
		},
		body: `{"email" : "${user.email}", "open": true, "icon": "default.png", "name": "${event.target.name.value}"}`
	}).then(function(data){
		if(data.status == 404){
			console.log("API not found");
			return;
		}
		return data; 
	}).then(function(data){
		return data.json();
	})
	.then(function(data){
		groups.push(data); // push data to groups array
		showGroups(); // showing groups again (no need of refreshing the page)
	})
	.catch(function(err){
		console.log(err);
	});
}

// Empty Groups Page for new groups -----------------
let groups = [];