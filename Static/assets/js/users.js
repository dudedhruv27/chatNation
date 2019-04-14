
// Sign In function ----------------
function signin(event) {
    event.preventDefault();
    fetch("/api/users/signin", {
            method: "post",
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: `{ "email" : "${event.target.email.value}", "password" : "${event.target.password.value}"}`
        }).then(function(data) {
            if (data.status == 200) {
                return data; // return data
            }
            throw "User email or password incorrect";
        }).then(function(data) {
            return data.json(); // converting data to json
        })
        .then(function(data) {
            localStorage.setItem("user", JSON.stringify(data)); // converting to string and storing to the localstorage
            window.location = "/#/"; // after setting user redirecting to home page
            return;
        })
        .catch(function(error) {
            console.log(error);
        });
}


// SignUp function -------------------------
function signup(event) {
    event.preventDefault();
    fetch('/api/users/signup', {
            method: "post",
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: `{ "email" : "${event.target.email.value}", "password" : "${event.target.password.value}", "name" : "${event.target.name.value}"}`
        }).then(function(data) {
            if (data.status == 404) {
                console.log("API not found");
                return;
            }
            return data; // successfully filled all data 
        }).then(function(data) {
            return data.json(); // converting to json format
        })
        .then(function(data) {
            localStorage.setItem("user", JSON.stringify(data)); //converting to string and storing to localstorage
            window.location = "/#/"; // redirecting to home page
            return;
        })
        .catch(function(error) {
            console.log(error);
        });
}


// Checking User is signed or not ---------------
function isSigned() {
    let r = true;
    if (localStorage.getItem("user") == null) {
        return false;
    }
    user = JSON.parse(localStorage.getItem("user")); // if user present then parse JSON
    return r;
}

// Declaring User as empty object ----------------------
let user = {}; 