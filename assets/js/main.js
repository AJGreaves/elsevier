fetch('assets/data/test.json')
    .then(function (data) {
        return data.json();
    })
    .then(function (data) {
        let questionData = getQuestion(data);
        displayQuestion(questionData);
    });

let activePage = 1;

function getQuestion(data) {
    let question = data.find(x => x.id === activePage);
    return question;
}

function displayQuestion(questionData) {
    
    let progressText = "Question " + activePage + "of 3"
    $('#progress-bar-text').text(progressText);

    $('#questionIntro').text(questionData.questionIntro);
    $('#question').text(questionData.question);
    $('#option1Label').text('A: ' + questionData.choices.option1);
    $('#option2Label').text('B: ' + questionData.choices.option2);
    $('#option3Label').text('C: ' + questionData.choices.option3);
    $('#option4Label').text('D: ' + questionData.choices.option4);
    $('#option5Label').text('E: ' + questionData.choices.option5);
    
}