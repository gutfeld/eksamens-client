function deleteUser(Id) {
    if(confirm("Are you sure you want to delete the user with the following ID: " + Id + "?")) {
        SDK.User.deleteUser(Id);
        window.location.reload();
    } else {
        alert("The user was NOT deleted.")
    }
}

$(document).ready(() => {

    let firstName = SDK.Storage.load('firstName');
    let lastName = SDK.Storage.load('lastName');
    let username = SDK.Storage.load('username');
    let userId = SDK.Storage.load('userId');
    let tableBody = $("#tableBody");

    document.getElementById("currentUser").innerHTML="Hey " + firstName + " " + lastName + ". You're logged in as: " + username + ". UserID: " + SDK.Storage.load('userId');

    $("#logoutNavButton").click(() => {
        SDK.Login.LogOut();
    });

    $("#deleteUserNavButton").click(() => {
        console.log(SDK.Storage.load("userId"));

        if(confirm("Are you sure you would like to delete your profile?")) {
            SDK.User.deleteUser(userId);
            SDK.Login.LogOut();
        } else {
            alert("Your profile has not been deleted :-)")
        }

    });



    SDK.User.findUsers((err, data) => {

        var users = $.parseJSON(data);
        users.forEach((user) => {
            tableBody.append(`<tr>
                                    <td>${user.firstName}</td>
                                    <td>${user.lastName}</td>
                                    <td>${user.username}</td>
                                    <td>${user.type}</td>
                                    <td>${user.userId}</td>
                                    <td> <button class="btn-danger" onclick="deleteUser(${user.userId})">Delete user</button> </td>
                              <tr/>
            `);

        });

    })
});