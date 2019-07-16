fetch('assets/data/test.json')
    .then(function (data) {
        return data.json();
    })
    .then(function (data) {
        let question = getQuestion(data);
        console.log(question);
    });

let activePage = 1;

function getQuestion(data) {
    let question = data.find(x => x.id === activePage);
    return question;
}
