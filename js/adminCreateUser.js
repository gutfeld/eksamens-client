$(document).ready(() => {

    $("#submitNewUserButtonAdmin").click(() => {

        let firstName = $("#inputCreateFirstNameAdmin").val();
        let lastName = $("#inputCreateLastNameAdmin").val();
        let username = $("#inputCreateUsernameAdmin").val();
        let password = $("#inputCreatePasswordAdmin").val();
        let type = 1;

        if(document.getElementById("adminAdminUser").checked) {
            type = 2;
        }

        SDK.User.createUser(firstName, lastName, username, password, type, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            }
            else if (err){
                console.log("Error")
                alert("User wasn't created correctly")
            } else {
                alert("Succes! You will now be redirected to the homepage.")
                window.location.href = "adminHome.html";
            }
        });

    });

});