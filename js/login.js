$(document).ready(() => {

    $("#loginButton").click(() => {

        const userName = $("#inputUsername").val();
        const password = $("#inputPassword").val();

        SDK.Login.authLogin(userName, password, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            }
            else if (err){
                console.log("Error")
                alert("Incorrect information, try again!")
            } else {
                window.location.href = "userHome.html";
            }
        });

    });

});