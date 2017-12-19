$(document).ready(() => {

    $("#loginButton").click(() => {

        let userName = $("#inputUsername").val();
        let password = $("#inputPassword").val();

        SDK.Login.authLogin(userName, password, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            }
            else if (err){
                console.log("Error")
                alert("Incorrect information, try again!")
            } else {
                if (SDK.Storage.load("type") == 2) {
                    window.location.href ="adminHome.html";
                } else {
                    window.location.href = "userHome.html";
                }
            }
        });

    });

});