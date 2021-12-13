const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
const timer = document.getElementById("Timer");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let avalibleQuestions = [];
let time = 45;


let questions = [];

fetch('https://opentdb.com/api.php?amount=50&category=9&difficulty=hard&type=multiple').then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });
        startGame();
    })

//CONSTANTS
const correctBonus = 100;
const maxQuestions = 10;

startGame = () => {
    var x = setInterval(() => {
        if (time == 0){
            clearInterval(x);
            question.innerHTML = "TIME's UP!";
            setTimeout(() => {
             window.location.assign('/end.html');  
                }, 1000);
            return;
         }
      time--;
      timer.innerText = time;
    }, 1000);
    questionCounter = 0;
    score = 0;
    avalibleQuestions = [...questions];
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};


getNewQuestion = async () => {    
    if (avalibleQuestions.length === 0 || questionCounter >= maxQuestions) {
    let acc = JSON.parse(localStorage.getItem("account"));
    console.log(acc);
    let url = '/end.html?mostRecentScore=' + score;
    if(!acc.type) return setTimeout(() => window.location.assign(url), 500)
    const res = await fetch("/update", {
            method: "POST",
            body: JSON.stringify({ name: acc.name, score}),
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        });
        const data = await res.json();
        console.log(data.changed, data.diff);
        if(data.changed){
            url += "&diff=" + data.diff;
            localStorage.removeItem("highscore");
            localStorage.setItem("highscore", score)
        }
        setTimeout( () => window.location.assign(url), 500)
    return
}
    questionCounter++;
    progressText.innerText = "Question " + questionCounter + "/" + maxQuestions
    //Update the progress bar!
    progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

    const questionIndex = Math.floor(Math.random() * avalibleQuestions.length);
    currentQuestion = avalibleQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    avalibleQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        var classToApply = 'incorrect';

        if (selectedAnswer == currentQuestion.answer){
            classToApply = 'correct';
        }
        if(classToApply == 'correct'){
            time += 3;
            increaseScore(correctBonus)
        }
        else {
            time += 1;
        }
         selectedChoice.parentElement.classList.add(classToApply);
         setTimeout(()  => {
         selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
}, 1000)
    });
});

const increaseScore = num => {
     score += num;
     scoreText.innerText = score;
}

