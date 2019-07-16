/* Variables */

let activePage = 1;
let confident = 0;
let unsure = 0;
let allQuestions = [];
let questionData = [];
let timer = 0;

let formAnswer = document.querySelector('#formAnswer');



fetch('assets/data/test.json')
    .then(function (data) {
        return data.json();
    })
    .then(function (data) {
        allQuestions = data;
        questionData = getQuestion(allQuestions);
        displayQuestion(questionData);
    })
    .catch(err => console.log(err));

function getQuestion(allQuestions) {
    let question = allQuestions.find(x => x.id === activePage);
    return question;
}

function displayQuestion(questionData) {
    
    let progressText = "Question " + activePage + "of 3"
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

$('#confident-btn').click(function() {
    confident++;
    return;
})

$('#unsure-btn').click(function() {
    unsure++;
    return;
})

formAnswer.addEventListener('submit', (event) => {
    // prevents default behaviour of submit button to refresh page
    event.preventDefault();

    const givenAnswer = $("input[type='radio'][name='radios']:checked").val();
    respondAnswer(questionData, givenAnswer);
    return;
});

function respondAnswer(questionData, givenAnswer) {

    if (givenAnswer == questionData.answer) {
        correctAnswer(questionData, givenAnswer);
    } 
    else {
        incorrectAnswer(questionData, givenAnswer);
    }

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

    let correctCircle = '#circle-' + questionData.answer;
    $(correctCircle)
    .addClass('fa-check-circle')
    .removeClass('fa-times-circle')
    .parent().removeClass('d-none');

    $('.radio-orange').addClass('radio-grey').removeClass('radio-orange');

    $('#percent-correct').text(questionData.percentCorrect);

    $('#confident-btn, #unsure-btn').addClass('d-none');
    $('#next-btn').removeClass('d-none');
    $('.radio').css('pointer-events', 'none');

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

$('#next-btn').click(function() {
    activePage++;
    resetPage();
})

function resetPage() {
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
    return;
}

