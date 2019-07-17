/* Variables */

let activePage = 1;
let confident = 0;
let unsure = 0;
let allQuestions = [];
let questionData = [];
let startTime;
let finishTime;
let progress = 0;

let formAnswer = document.querySelector('#formAnswer');

fetch('assets/data/questions.json')
    .then(function (data) {
        return data.json();
    })
    .then(function (data) {
        allQuestions = data;
        questionData = getQuestion(allQuestions);
        displayQuestion(questionData);
    })
    .catch(err => console.log(err));

$('#start-btn').click(function () {
    $('#start-page').addClass('d-none');
    $('#formAnswer, #restart-quiz-btn').removeClass('d-none');
    startTime = Date.now();
})

$('#restart-quiz-btn').click(function () {
    $('input').prop('checked', false);
    location.reload(); 
})

function getQuestion(allQuestions) {
    let question = allQuestions.find(x => x.id === activePage);
    return question;
}

function displayQuestion(questionData) {

    let progressText = "Question " + activePage + " of 3"
    $('#progress-bar-text').text(progressText);

    /* Question */
    $('#questionIntro').text(questionData.questionIntro);
    $('#question').text(questionData.question);

    /* Options */
    $('#option1Label').text('A: ' + questionData.choices.option1).removeClass('d-none');
    $('#option2Label').text('B: ' + questionData.choices.option2).removeClass('d-none');
    $('#option3Label').text('C: ' + questionData.choices.option3).removeClass('d-none');
    $('#option4Label').text('D: ' + questionData.choices.option4).removeClass('d-none');
    $('#option5Label').text('E: ' + questionData.choices.option5).removeClass('d-none');

    return;
}

$('#confident-btn').click(function () {
    confident++;
    return;
})

$('#unsure-btn').click(function () {
    unsure++;
    return;
})

formAnswer.addEventListener('submit', (event) => {
    // prevents default behaviour of submit button to refresh page
    event.preventDefault();

    finishTime = Date.now();
    progress++;
    const givenAnswer = $("input[type='radio'][name='radios']:checked").val();
    respondAnswer(questionData, givenAnswer);
    progressBar(progress);
    return;
});

function respondAnswer(questionData, givenAnswer) {

    if (givenAnswer == questionData.answer) {
        correctAnswer(questionData, givenAnswer);
    } else {
        incorrectAnswer(questionData, givenAnswer);
    }

    // display info for each choice
    $('#option1-response-box .choice-response')
        .text(questionData.choiceResponses.option1)
        .removeClass('d-none');

    $('#option2-response-box .choice-response')
        .text(questionData.choiceResponses.option2)
        .removeClass('d-none');

    $('#option3-response-box .choice-response')
        .text(questionData.choiceResponses.option3)
        .removeClass('d-none');

    $('#option4-response-box .choice-response')
        .text(questionData.choiceResponses.option4)
        .removeClass('d-none');

    $('#option5-response-box .choice-response')
        .text(questionData.choiceResponses.option5)
        .removeClass('d-none');

    // display icons to indicate correct / incorrect answer
    let correctCircle = '#circle-' + questionData.answer;
    $(correctCircle)
        .addClass('fa-check-circle')
        .removeClass('fa-times-circle')
        .parent().removeClass('d-none');

    // make selected radio color grey
    $('.radio-orange').addClass('radio-grey').removeClass('radio-orange');

    // display data in side info bar
    $('#percent-correct').text(questionData.percentCorrect);

    timeCompleted = finishTime - startTime;
    timeCompleted = Math.round(timeCompleted / 1000);

    $('#timerResult').text(timeCompleted + ' sec.');
    $('#key-concept').text(questionData.keyConcept);

    // change visible buttons at bottom of page
    $('#confident-btn, #unsure-btn').addClass('d-none');
    $('#next-btn').removeClass('d-none');
    $('.radio').css('pointer-events', 'none');

    // show side info bar
    $('#question-column').removeClass('col-12').addClass('col-9');
    $('#side-info-bar').removeClass('d-none');

    return;
}

function correctAnswer(questionData) {
    $('#question-response')
        .text('Your answer is correct.')
        .css('color', '#008000')
        .removeClass('d-none');

    let correctMsg = '#' + questionData.answer + '-response-box .radio-response';
    $(correctMsg).text('Correct').css('color', '#015f06');
    return;
}

function incorrectAnswer(questionData, givenAnswer) {
    $('#question-response')
        .text('Your answer is incorrect.')
        .css('color', '#c20606')
        .removeClass('d-none');

    let incorrectCircle = '#circle-' + givenAnswer;
    $(incorrectCircle)
        .addClass('fa-times-circle')
        .removeClass('fa-check-circle')
        .parent().removeClass('d-none');

    let incorrect = '#' + givenAnswer + '-response-box .radio-response';
    let correct = '#' + questionData.answer + '-response-box .radio-response';
    $(incorrect).text('Incorrect').css('color', '#c20606');
    $(correct).text('Correct').css('color', '#015f06');
    return;
}

$('#next-btn').click(function () {
    activePage++;
    progress++;
    if (activePage <= 3) {
        loadNextQuestion();
    } else {
        progress = 0;
        $('#formAnswer').addClass('d-none');
        $('#email-signup-page').removeClass('d-none');
        return;
    }
})

function loadNextQuestion() {
    $('.radio').css('pointer-events', 'auto');
    $('.circle-wrapper, .radio-response, .choice-response, #question-response')
        .addClass('d-none');

    $('#confident-btn, #unsure-btn').removeClass('d-none');
    $('#next-btn').addClass('d-none');

    $('input').prop('checked', false);

    $('.radio-grey').addClass('radio-orange').removeClass('radio-grey');

    $('#question-column').removeClass('col-9').addClass('col-12');
    $('#side-info-bar').addClass('d-none');

    questionData = getQuestion(allQuestions);
    displayQuestion(questionData);

    startTime = Date.now();

    return;
}

function progressBar(progress) {
    switch(progress) {
        case 1:
            $('.progress-bar').css('width', "33.33%").attr('aria-valuenow', '33.33');
            break;
        case 3: 
            $('.progress-bar').css('width', "66.66%").attr('aria-valuenow', '66.66');
            break;
        case 5: 
            $('.progress-bar').css('width', "100%").attr('aria-valuenow', '100');
            break;
        default:
            break;
    }
    return;
}

/**
 * Send email with form data. UserID deliberately obscured using https://obfuscator.io/
 */
const emailSignupForm = document.querySelector('#emailSignupForm');

emailSignupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = {
        service_id: "gmail",
        template_id: "elsevier",
        user_id: "user_CQSk7h9Wyuw2xLhYG0hBX",
        template_params: {
            "firstName": emailSignupForm.firstName.value,
            "lastName": emailSignupForm.lastName.value,
            "email": emailSignupForm.email.value
        }
    };
    showLoading();
    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
    }).done(function () {
        hideLoading();
        alert('Subscription confirmed');
        $('input').prop('checked', false);
        location.reload(); 
    }).fail(function (error) {
        hideLoading();
        console.log('Oops... ' + JSON.stringify(error));
        alert('Oops something went wrong, please try again.');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    hideLoading();
    return;
});

// Show and hide spinner animation
function showLoading() {
    $("#spinner-background").css("visibility", "visible");
    return;
}

function hideLoading() {
    $("#spinner-background").css("visibility", "hidden");
    return;
}