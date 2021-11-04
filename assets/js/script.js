var quizDiv = document.querySelector("#quiz-div");
var ansDiv = document.querySelector("#answer-status");
var prevAns = document.querySelector("#prev-answer");
var endDiv = document.querySelector("#end-quiz");
var quizQuest = document.querySelector("#quiz-question");
var optionOne = document.querySelector("#option1");
var optionTwo = document.querySelector("#option2");
var optionThree = document.querySelector("#option3");
var optionFour = document.querySelector("#option4");
var currentQuestion = 0;
var startButtonEl = document.querySelector("#start-button");
var questOptions = document.querySelector("#quest-options");
var timer = document.querySelector('#timer');
var quizTimer;
var timeLeft;
var highScores = [];
var highScoreEl = document.querySelector("#high-scores");

var timeRemaining = 75;

//var quizTimer = setTimeout(endQuiz, 10000);
// Array of question objects
var questions = [
    {
        number: 1,
        question: "Commonly used data types Do Not include:",
        answer: "option3",
        optionOne: "1. strings",
        optionTwo: "2. booleans",
        optionThree: "3. alerts",
        optionFour: "4. numbers"
    },
    {
        number: 2,
        question: "The condition in an if/else statement is enclosed with _____.",
        answer: "option3",
        optionOne: "1. quotes",
        optionTwo: "2. curly brackets",
        optionThree: "3. parenthesis",
        optionFour: "4. square brackets"
    },
    {
        number: 3,
        question: "Arrays in javascript can be used to store ____.",
        answer: "option4",
        optionOne: "1. numbers and strings",
        optionTwo: "2. other arrays",
        optionThree: "3. booleans",
        optionFour: "4. all of the above"
    },
    {
        number: 4,
        question: "String values must be enclosed with _____ when being assigned to variables",
        answer: "option3",
        optionOne: "1. commas",
        optionTwo: "2. curly brackets",
        optionThree: "3. quotes",
        optionFour: "4. parenthesis"
    },
    {
        number: 5,
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer: "option4",
        optionOne: "1. JavaScript",
        optionTwo: "2. terminal/bash",
        optionThree: "3. for loops",
        optionFour: "4. console.log"
    }
];

var endQuiz = function() {
    //console.log("endQuiz reached");
    quizDiv.style.display = "none";
    endDiv.style.display = "block";
    clearInterval(timeLeft);
    document.querySelector("#final-score").textContent = "Your final score is " + timeRemaining;
    
    
    document.querySelector("#submit").addEventListener("click", function() {
        var userName = document.querySelector("input[name='user-name']").value;
        //console.log(userName);
        var newScore = {
            name: userName,
            score: timeRemaining
        };
        console.log(newScore);
        highScores = highScores || [];
        highScores.push(newScore);
        highScores.sort(function(a, b){
            let x = a.score;
            let y = b.score;
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
        endDiv.style.display = "none";
        highScoreEl.style.display = "block";
        showHighScores();

    })

};

var changeQuestion = function() {
    quizQuest.textContent = questions[currentQuestion].question;
    optionOne.textContent = questions[currentQuestion].optionOne;
    optionTwo.textContent = questions[currentQuestion].optionTwo;
    optionThree.textContent = questions[currentQuestion].optionThree;
    optionFour.textContent = questions[currentQuestion].optionFour;
};

var answerQuestion = function(event) {
    var ansOption = event.target;
    console.log(ansOption);
    var ansID = ansOption.getAttribute('id');
    var lastQuest = currentQuestion;
    currentQuestion++;
    if (ansID === questions[lastQuest].answer) {
        prevAns.textContent = "Correct!";
    } else {
        prevAns.textContent = "Wrong!";
        timeRemaining = timeRemaining - 10;
        timer.textContent = "Time: " + timeRemaining;
        clearTimeout(quizTimer);
        quizTimer = setTimeout(endQuiz, timeRemaining * 1000);

    }
    ansDiv.style.display = "block";
    if (questions[currentQuestion]) {
        changeQuestion();
    } else {
        clearTimeout(quizTimer);
        endQuiz();
    }
    

};

var updateTimer = function() {
    timeRemaining--;
    timer.textContent = "Time: " + timeRemaining;
};

var startQuiz = function() {
    var startDiv = document.getElementById("start-info");
    quizTimer = setTimeout(endQuiz, 75000);
    console.log(startDiv);
    startDiv.style.display = "none";
    quizDiv.style.display = "block";
    timer.textContent = "Time: " + timeRemaining;
    timeLeft = setInterval(updateTimer, 1000);
    changeQuestion();
};

var loadHighScores = function() {
    highScores = localStorage.getItem("scores");

    if (!highScores) {
        return false;
    }
    highScores = JSON.parse(highScores);
    
};

var showHighScores = function() {
    if (highScores.length === 0) {
        return false;
    }
    var scoreListEl = document.querySelector("#score-list");
    for (var i = 0; i < highScores.length; i++) {
        var scoreEl = document.createElement("li");
        scoreEl.className = "score-item";
        var scoreNameDiv = document.createElement("div");
        var scoreNumDiv = document.createElement("div");
        scoreEl.appendChild(scoreNameDiv);
        scoreEl.appendChild(scoreNumDiv);
        var scoreName = document.createElement("p");
        scoreName.className = "score-name";
        scoreName.textContent = highScores[i].name;

        scoreNameDiv.appendChild(scoreName);

        var scoreNum = document.createElement("p");
        scoreNum.className = "score-num";
        scoreNum.textContent = highScores[i].score;
        
        scoreNumDiv.appendChild(scoreNum);
        scoreListEl.appendChild(scoreEl);

    }
}

startButtonEl.addEventListener("click", startQuiz);
questOptions.addEventListener("click", answerQuestion);
loadHighScores();


// update styling
// add high scores
// add timer for how long correct and wrong are on screen for?
