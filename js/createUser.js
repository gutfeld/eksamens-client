$(document).ready(() => {

    $("#submitNewUserButton").click(() => {

        let firstName = $("#inputCreateFirstName");
        let lastName = $("#inputCreateLastName");
        let username = $("#inputCreateUsername");
        let password = $("#inputCreatePassword");
        let type = 1;

        SDK.User.createUser(firstName, lastName, username, password, type, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            }
            else if (err){
                console.log("Error")
                alert("User wasn't created correctly")
            } else {
                window.location.href = "index.html";
            }
        });

    });

});