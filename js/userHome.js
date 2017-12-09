$(document).ready(() => {

    let firstName = SDK.Storage.load('firstName');
    let lastName = SDK.Storage.load('lastName');
    let username = SDK.Storage.load('username');

    document.getElementById("currentUser").innerHTML="Hey " + firstName + " " + lastName + ". You're logged in as: " + username;
});