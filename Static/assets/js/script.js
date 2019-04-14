// Loading router function for using in the app ---------------
let router = lsApp.router();

// Func for Loading user Login Page --------------------
function loadWelcome() {
    localStorage.clear();
    document.getElementById("view").innerHTML = document.getElementById("welcome_template").innerHTML;
}

// Function for loading home page -----------------------
function loadHome() {
    if (isSigned() == false) {
        window.location = "/#/welcome";
        return;
    }
    document.getElementById("view").innerHTML = document.getElementById("home_template").innerHTML;
    getGroups().then(function(data) {
            groups = data;
            showGroups();
        })
        .catch(function(error) {
            console.log(error);
        });
}

//  Function for loading particular group page ---------------
function loadGroup() {
    if (isSigned() == false) {
        window.location = "/#/welcome";
        return;
    }
    document.getElementById("view").innerHTML = document.getElementById("group_template").innerHTML;
}

// All Routes declared --------------------------
router.add("/", loadHome);
router.add("/welcome", loadWelcome);
router.add("/group/:id", loadGroup);