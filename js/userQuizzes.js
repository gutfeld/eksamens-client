function chooseQuiz(Id) {
    SDK.Storage.set('chosenQuizId', Id);
    window.location.href = "userTakeQuiz.html";
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



    SDK.Quiz.findQuizzes((err, data) => {

        var quizzes = $.parseJSON(data);
        quizzes.forEach((quiz) => {
            tableBody.append(`<tr>
                                    <td>${quiz.quizTitle}</td>
                                    <td> <button class="btn-success" onclick="chooseQuiz(${quiz.quizId})">Pick Quiz with the ID: ${quiz.quizId}</button> </td>
                              <tr/>
            `);

        });

    })
});