fetch('assets/data/test.json')
    .then(function (data) {
        return data.json();
    })
    .then(function (data) {
        displayQuestions(data);
    });

let page = 1;

function displayQuestions(data) {
    let question = data.find(getPage);
    console.log(question);
}

function getPage() {
    return page;
}