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
    quizDiv.style.display = "none";
    endDiv.style.display = "block";
    document.querySelector("#final-score").textContent = "Your final score is " // + endTime

}

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
        //timer - 10 seconds
    }
    ansDiv.style.display = "block";
    if (questions[currentQuestion]) {
        changeQuestion();
    } else {
        endQuiz();
    }
    

};

var startQuiz = function() {
    var startDiv = document.getElementById("start-info");
    console.log(startDiv);
    startDiv.style.display = "none";
    quizDiv.style.display = "block";

    changeQuestion();

    
     
};

startButtonEl.addEventListener("click", startQuiz);
questOptions.addEventListener("click", answerQuestion);

