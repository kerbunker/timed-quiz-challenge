var quizDiv = document.querySelector("#quiz-div");
var quizQuest = document.querySelector("#quiz-question");
var optionOne = document.querySelector("#option1");
var optionTwo = document.querySelector("#option2");
var optionThree = document.querySelector("#option3");
var optionFour = document.querySelector("#option4");
var currentQuestion = 0;
var startButtonEl = document.querySelector("#start-button");
// Array of question objects
var questions = [
    {
        number: 1,
        question: "Commonly used data types Do Not include:",
        answer: "3. alerts",
        optionOne: "1. strings",
        optionTwo: "2. booleans",
        optionThree: "3. alerts",
        optionFour: "4. numbers"
    },
    {
        number: 2,
        question: "The condition in an if/else statement is enclosed with _____.",
        answer: "3. parenthesis",
        optionOne: "1. quotes",
        optionTwo: "2. curly brackets",
        optionThree: "3. parenthesis",
        optionFour: "4. square brackets"
    },
    {
        number: 1,
        question: "Commonly used data types Do Not include:",
        answer: "3. alerts",
        optionOne: "1. strings",
        optionTwo: "2. booleans",
        optionThree: "3. alerts",
        optionFour: "4. numbers"
    },
];

var changeQuestion = function() {
    quizQuest.textContent = questions[currentQuestion].question;
    optionOne.textContent = questions[currentQuestion].optionOne;
    optionTwo.textContent = questions[currentQuestion].optionTwo;
    optionThree.textContent = questions[currentQuestion].optionThree;
    optionFour.textContent = questions[currentQuestion].optionFour;
}

var startQuiz = function() {
    var startDiv = document.getElementById("start-info");
    console.log(startDiv);
    startDiv.style.display = "none";
    quizDiv.style.display = "block";

    changeQuestion();
    
};

startButtonEl.addEventListener("click", startQuiz);
