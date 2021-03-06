$(document).ready(() => {

    let firstName = SDK.Storage.load('firstName');
    let lastName = SDK.Storage.load('lastName');
    let username = SDK.Storage.load('username');

    document.getElementById("currentUser").innerHTML="Hey " + firstName + " " + lastName + ". You're logged in as: " + username + ". UserID: " + SDK.Storage.load('userId');

    $("#logoutNavButton").click(() => {
        SDK.Login.LogOut();
    });

    $("#deleteUserNavButton").click(() => {
        if(confirm("Are you sure you would like to delete your profile?")) {
            SDK.User.deleteUser(SDK.Storage.load('userId'));
            SDK.Login.LogOut();
        } else {
            alert("Your profile has not been deleted :-)")
        }

    });

    $("#homeDIS").click(() => {
        SDK.Storage.set("chosenCourseId",1);
        window.location.href ="userQuizzes.html";
    });

    $("#homeITF").click(() => {
        SDK.Storage.set("chosenCourseId",2);
        window.location.href ="userQuizzes.html";
    });

    $("#homeMAKRO").click(() => {
        SDK.Storage.set("chosenCourseId",3);
        window.location.href ="userQuizzes.html";
    });

    $("#homeFIN").click(() => {
        SDK.Storage.set("chosenCourseId",4);
        window.location.href ="userQuizzes.html";
    });

});