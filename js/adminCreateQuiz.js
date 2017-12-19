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
        console.log(SDK.Storage.load("userId"));

        if(confirm("Are you sure you would like to delete your profile?")) {
            SDK.User.deleteUser(userId);
            SDK.Login.LogOut();
        } else {
            alert("Your profile has not been deleted :-)")
        }

    });

    $("#submitNewQuizButtonAdmin").click(() => {

        let chosenCourseId = 0;
        let answerChoiceONE = 1;
        let answerChoiceTWO = 1;

        if(document.getElementById("adminCourseDIS").checked) {
            chosenCourseId = 1;
        } else if(document.getElementById("adminCourseITF").checked) {
            chosenCourseId = 2;
        } else if(document.getElementById("adminCourseMAKRO").checked) {
            chosenCourseId = 3;
        } else if(document.getElementById("adminCourseFIN").checked) {
            chosenCourseId = 4;
        } else {
            alert("No quiz was created. Please pick a course and try again!");
            return;
        }

        if(document.getElementById("adminChoiceFirst").checked == false && document.getElementById("adminChoiceSecond").checked == false ) {
            alert("No quiz was created. No choice was picked as the correct answer. Please try again!")
            return;
        }

        let quizTitle = $("#inputCreateQuizTitleAdmin").val();
        let questionTitle = $("#inputCreateQuestionTitleAdmin").val();
        let choiceONE = $("#inputCreateFirstChoice").val();
        let choiceTWO = $("#inputCreateSecondChoice").val();

        SDK.Quiz.createQuiz(quizTitle, chosenCourseId, (err, quizData) => {
            quizData = JSON.parse(quizData);

            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            }
            else if (err){
                console.log("Error")
                alert("Quiz wasn't created correctly")
            } else {
                SDK.Question.createQuestion(questionTitle, quizData.quizId, (err, questionData) => {
                    questionData = JSON.parse(questionData);

                    if (err && err.xhr.status === 401) {
                        $(".form-group").addClass("has-error");
                    }
                    else if (err) {
                        console.log("Error")
                        alert("Question wasn't created correctly")
                    } else {
                        if(document.getElementById("adminChoiceFirst").checked) {
                            answerChoiceONE = 2;
                        } else if(document.getElementById("adminChoiceSecond").checked) {
                            answerChoiceTWO = 2;
                        }

                        //creating choice 1
                        SDK.Choice.createChoice(choiceONE, answerChoiceONE, questionData.questionId, (err, choiceDataONE) => {
                            choiceDataONE = JSON.parse(choiceDataONE);
                            if (err && err.xhr.status === 401) {
                                $(".form-group").addClass("has-error");
                            }
                            else if (err) {
                                console.log("Error")
                                alert("Choice 1 wasn't created correctly")
                            } else {
                                // creating choice 2
                                SDK.Choice.createChoice(choiceTWO, answerChoiceTWO, questionData.questionId, (err, choiceDataTWO) => {
                                    choiceDataTWO = JSON.parse(choiceDataTWO)
                                    if (err && err.xhr.status === 401) {
                                        $(".form-group").addClass("has-error");
                                    }
                                    else if (err) {
                                        console.log("Error")
                                        alert("Choice 2 wasn't created correctly")
                                    } else {
                                        alert("The quiz was crated succesfully.")
                                    }
                                });

                            }
                        });

                    }
                });
            }
        });
    });


});