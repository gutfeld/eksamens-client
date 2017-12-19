$(document).ready(() => {

    let firstName = SDK.Storage.load('firstName');
    let lastName = SDK.Storage.load('lastName');
    let username = SDK.Storage.load('username');
    let userId = SDK.Storage.load('userId');


    document.getElementById("currentUser").innerHTML = "Hey " + firstName + " " + lastName + ". You're logged in as: " + username + ". UserID: " + SDK.Storage.load('userId');

    $("#logoutNavButton").click(() => {
        SDK.Login.LogOut();
    });

    $("#deleteUserNavButton").click(() => {
        console.log(SDK.Storage.load("userId"));

        if (confirm("Are you sure you would like to delete your profile?")) {
            SDK.User.deleteUser(userId);
            SDK.Login.LogOut();
        } else {
            alert("Your profile has not been deleted :-)")
        }

    });

    SDK.Question.findQuestions((err, data) => {

        var questions = $.parseJSON(data);
        questions.forEach((question) => {

            $(".table").append(`<div id="${question.questionId}"><p><b>${question.questionTitle}</b></p></div>`);

            SDK.Choice.findChoices(question.questionId, (err, Cdata) => {
            var choices = $.parseJSON(Cdata);

            choices.forEach((choice) => {

                $("#"+question.questionId).append(`<p><input type="radio" class="answer-radio" name="question"+${question.questionId} value="${choice.answer}"> ${choice.choiceTitle} </p>  `)

            })
            })
        });
    })

    $("#submitAnswersButton").click(() => {

        let totalQuestions = 0;
        let correctAnswers = 0;


        //Function to count number of questions answered
        $(".answer-radio").each(function () {
            if ($(this).is(":checked")) {
                totalQuestions++;
                //Function to count number of correct answers
                if ($(this).val() == 2) {
                    correctAnswers++;

                }
            }
            console.log("Total: " + totalQuestions);
            console.log("Correct: " + correctAnswers);
        });

        let result = correctAnswers / totalQuestions * 100;

        alert("You were right " + result + "% of the time. You had " + correctAnswers + " correct answer(s) out of " + totalQuestions + " possible.");

    });

});