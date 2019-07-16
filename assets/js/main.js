/* Variables */

let activePage = 1;
let confident = 0;
let unsure = 0;
let questionData = [];

let formAnswer = document.querySelector('#formAnswer');

fetch('assets/data/test.json')
    .then(function (data) {
        return data.json();
    })
    .then(function (data) {
        questionData = getQuestion(data);
        displayQuestion(questionData);
    })
    .catch(err => console.log(err));

function getQuestion(data) {
    let question = data.find(x => x.id === activePage);
    return question;
}

function displayQuestion(questionData) {
    
    let progressText = "Question " + activePage + "of 3"
    $('#progress-bar-text').text(progressText);

    /* Question */
    $('#questionIntro').text(questionData.questionIntro);
    $('#question').text(questionData.question);

    /* Options */
    $('#option1Label').text('A: ' + questionData.choices.option1);
    $('#option2Label').text('B: ' + questionData.choices.option2);
    $('#option3Label').text('C: ' + questionData.choices.option3);
    $('#option4Label').text('D: ' + questionData.choices.option4);
    $('#option5Label').text('E: ' + questionData.choices.option5);

    return;
}

$('#confident').click(function() {
    confident =+ 1;
})

$('#unsure').click(function() {
    unsure =+ 1;
})

function displayAnswer(questionData) {

}

formAnswer.addEventListener('submit', (event) => {
    // prevents default behaviour of submit button to refresh page
    event.preventDefault();

    const givenAnswer = $("input[type='radio'][name='radios']:checked").val();
    compareAnswer(questionData, givenAnswer);
});

function compareAnswer(questionData, givenAnswer) {
    if (givenAnswer == questionData.answer) {
        $('#question-response')
        .text('Your answer is correct.')
        .css('color', '#008000')
        .removeClass('d-none');
    } 
    else {
        $('#question-response')
        .text('Your answer is incorrect.')
        .css('color', '#c20606')
        .removeClass('d-none');
    }
}