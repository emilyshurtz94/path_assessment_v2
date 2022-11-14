//Page Selectors
const headerEl = document.getElementById('header');
const formEl = document.getElementById('form');
const quizEl = document.getElementById('quiz');
const q1El = document.getElementById("q1")
const resultsEl = document.getElementById('results');

let answerScores = {
    "agency": 0,
    "knowledge": 0,
    "sales": 0
}

//Button Selectors
const startBtn = document.getElementById('start');
const endBtn = document.getElementById('end');

// Link to Google Sheet Excel Sheet- Post route
const url = 'https://script.google.com/macros/s/AKfycbz6MT9_BGVVtfUEunAkzvAOwHrjOYrmE94c0jiWrxJF01r1rimxY8yHFbzLnKDUPbKrTQ/exec'

// Input Elements
const nameEl = document.getElementById('inputName');
const email = document.getElementById('inputEmail');
const label1 = document.createTextNode('Name:');
const label2 = document.createTextNode('Email:');
const label3 = document.createTextNode('Agency')
const label4 = document.createTextNode('Knowledge');
const label5 = document.createTextNode('Sales');


function startQuiz() {
    quizEl.style.display = "block";
    formEl.style.display = "none";
    headerEl.classList.add("hide");

}

// Answer Selectors
let buttons = document.querySelectorAll('.form-check-input')
for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = buttonClicked

}

function buttonClicked(e) {
    let target = e.target;
    let selectedType = target.dataset.score
    answerScores[selectedType]++;

}

// instead of increasing the answerScores by 1 it increases by 2 which is why I am dividing by 2 and then dividing by 9.

function calculateScore() {
    quizEl.style.display = "none";
    formEl.style.display = "none";
    headerEl.classList.add("hide");
    resultsEl.style.display = "block";

    let agency = Math.round(((answerScores.agency / 2) / 9) * 100);
    let knowledge = Math.round(((answerScores.knowledge / 2) / 9) * 100);
    let sales = Math.round(((answerScores.sales / 2) / 9) * 100);


    const agencyScoreEl = document.getElementById('agency-score');
    agencyScoreEl.innerText = agencyScoreEl.innerText + "Agency is " + `${agency}`
    const knowledgeScoreEl = document.getElementById('knowledge-score');
    knowledgeScoreEl.innerText = knowledgeScoreEl.innerText + "Knowledge is " + `${knowledge}`
    const saleScoreEl = document.getElementById('sales-score');
    saleScoreEl.innerText = saleScoreEl.innerText + "Sale is " + `${sales}`

    const formData = new FormData();
    formData.append('name', nameEl.value);
    formData.append('email', email.value);
    formData.append('agency', `${agency}`);
    formData.append('knowledge', `${knowledge}`);
    formData.append('sales', `${sales}`)
    fetch(url, {
        method: 'POST',
        body: formData
    }).then(rep => rep.json())
        .then(data => {
            console.log(data)
        })

}
startBtn.onclick = () => {
    startQuiz();
    //  sendData();
}

endBtn.onclick = () => {
    calculateScore();
}
