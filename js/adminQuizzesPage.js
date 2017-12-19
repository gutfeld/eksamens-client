function deleteQuiz(Id) {
    if(confirm("Are you sure you want to delete the quiz with the following ID: " + Id + "?")) {
        SDK.Quiz.deleteQuiz(Id);
        window.location.reload();
    } else {
        alert("The quiz was NOT deleted.")
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



    let j = 0;
    j++;
    SDK.Storage.set("chosenCourseId",j);

    SDK.Quiz.findQuizzes((err, data) => {

        var quizzes = $.parseJSON(data);
        quizzes.forEach((quiz) => {
            tableBody.append(`<tr>
                                <td>${quiz.quizId}</td>
                                <td>${quiz.quizTitle}</td>
                                <td>${quiz.courseId}</td>
                                <td> <button class="btn-danger" onclick="deleteQuiz(${quiz.quizId})">Delete quiz</button> </td>
                          <tr/>
        `);

        });

    })

    j++;
    SDK.Storage.set("chosenCourseId",j);

    SDK.Quiz.findQuizzes((err, data) => {

        var quizzes = $.parseJSON(data);
        quizzes.forEach((quiz) => {
            tableBody.append(`<tr>
                                <td>${quiz.quizId}</td>
                                <td>${quiz.quizTitle}</td>
                                <td>${quiz.courseId}</td>
                                <td> <button class="btn-danger" onclick="deleteQuiz(${quiz.quizId})">Delete quiz</button> </td>
                          <tr/>
        `);

        });

    })

    j++;
    SDK.Storage.set("chosenCourseId",j);

    SDK.Quiz.findQuizzes((err, data) => {

        var quizzes = $.parseJSON(data);
        quizzes.forEach((quiz) => {
            tableBody.append(`<tr>
                                <td>${quiz.quizId}</td>
                                <td>${quiz.quizTitle}</td>
                                <td>${quiz.courseId}</td>
                                <td> <button class="btn-danger" onclick="deleteQuiz(${quiz.quizId})">Delete quiz</button> </td>
                          <tr/>
        `);

        });

    })

    j++;
    SDK.Storage.set("chosenCourseId",j);

    SDK.Quiz.findQuizzes((err, data) => {

        var quizzes = $.parseJSON(data);
        quizzes.forEach((quiz) => {
            tableBody.append(`<tr>
                                <td>${quiz.quizId}</td>
                                <td>${quiz.quizTitle}</td>
                                <td>${quiz.courseId}</td>
                                <td> <button class="btn-danger" onclick="deleteQuiz(${quiz.quizId})">Delete quiz</button> </td>
                          <tr/>
        `);

        });

    })






});