$(document).ready(() => {

    let firstName = SDK.Storage.load('firstName');
    let lastName = SDK.Storage.load('lastName');
    let username = SDK.Storage.load('username');
    let userId = SDK.Storage.load('userId');

    document.getElementById("currentUser").innerHTML="Hey " + firstName + " " + lastName + ". You're logged in as: " + username + ". UserID: " + SDK.Storage.load('userId');

    $("#logoutNavButton").click(() => {
        SDK.Login.LogOut();
    });

    $("#deleteUserNavButton").click(() => {
        if(confirm("Are you sure you would like to delete your profile?")) {
            SDK.User.deleteUser(userId);
            SDK.Login.LogOut();
        } else {
            alert("Your profile has not been deleted :-)")
        }

    });


    $("#adminQuizzesPageButton").click(() => {
        window.location.href="adminQuizzesPage.html";
    });

    $("#adminUsersPageButton").click(() => {
        window.location.href="adminUsersPage.html";
    });


});