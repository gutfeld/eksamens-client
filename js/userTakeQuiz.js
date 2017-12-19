function getRadioVal(form, name) {

    // Denne funktion er kopieret fra: http://www.dyn-web.com/tutorials/forms/radio/get-selected.php

    var val;
    // get list of radio buttons with specified name
    radios = document.forms[form].elements[name];
    var radiosObj = $(radios);

//    alert(radiosObj.val());

    // loop through list of radio buttons
    for (var i=0; i<2; i++) {
        if ( radiosObj[i].checked() ) { // radio checked?
            val = radiosObj[i].val(); // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val; // return value of checked radio or undefined if none checked
}

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

    SDK.Question.findQuestions((err, Qdata) => {

        var questions = $.parseJSON(Qdata);
        let radio = 0;
        questions.forEach((question) => {
            radio++;

            $(".table").append(`<div id="${question.questionId}"><p><b>${question.questionTitle}</b></p></div>`);

            SDK.Choice.findChoices(question.questionId, (err, Cdata) => {
            var choices = $.parseJSON(Cdata);

            choices.forEach((choice) => {

                $("#"+question.questionId).append(`<p><form name="radio"+radio><input type="radio" name="question"+${question.questionId} value="${choice.answer}"> ${choice.choiceTitle} </form></p>  `)

            })
            })
        });
    })

    $("#submitAnswersButton").click(() => {

        let counter = 0;
        let radios = $("input[type='radio']");
        var radiosObjects = $(radios.val());
        radiosObjects.filter(":checked");

        radiosObjects.forEach((radio) => {
            if (radio == 2) {
                counter++;
            }
        })

        alert("You had " + counter + " correct answers! You'll now be redirected back to the main menu.")
        window.location.href="userHome.html";

//        str = document.forms[0].elements[0];
//        var strObj = $(str);
//        alert(strObj.val());
//        for (var i=0, j=0, k=1; i<100; i++) {
//            var radios = $("input[type='radio']");
//            radios.filter(":checked");

//            var x = getRadioVal(i,j);
//            var y = getRadioVal(i,k);

//            if (a == 2 || b == 2) {
//                counter++;
 //           }
  //      }
        // dette loop virker kun for 100 spg. per quiz.


    });

});