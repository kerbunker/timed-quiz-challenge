// Divs for displaying elements
var startDiv = document.getElementById("start-info");
var quizDiv = document.querySelector("#quiz-div");
var ansDiv = document.querySelector("#answer-status");
var prevAns = document.querySelector("#prev-answer");
var endDiv = document.querySelector("#end-quiz");

// Div holding question options to listen for which is clicked
var questOptions = document.querySelector("#quest-options");


// Btn to show high scores
var highScoreBtnEl = document.querySelector("#high-score-btn");
// Btn to start quiz
var startButtonEl = document.querySelector("#start-button");
// Btn to submit user name for scores
var submitBtn = document.querySelector("#submit");

// Stores which question is currently selected
var currentQuestion = 0;

// Element to show remaining time in quiz
var timer = document.querySelector('#timer');
// Stores timeout function timer
var quizTimer;
// Stores interval timer to keep track of time left in quiz
var timeLeft;
// Stores amount of time remaining in quiz
var timeRemaining = 60;

//Array holding high scores
var highScores = [];
// Elements used to show high score list
var highScoreEl = document.querySelector("#high-scores");
var scoreListEl = document.querySelector("#score-list");
var scoreIdCounter = 0;

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

// Function called after all questions answered or when timer runs out
var endQuiz = function() {
    //hide questions and display end screen
    quizDiv.style.display = "none";
    endDiv.style.display = "block";
    // clears remaining timers
    clearInterval(timeLeft);
    clearTimeout(quizTimer);
    //shows the finaly score
    document.querySelector("#final-score").textContent = "Your final score is " + timeRemaining;
};   

// Called when user clicks submit button to submit high score
var submitHighScore = function() {
    // retrieves the username entered in text field
    var userName = document.querySelector("input[name='user-name']").value;
    // if the user does not enter anything, fills in the user name with default user name
    if(!userName) {
        userName = "user name";
    }
    // keeps score from being negative
    if (timeRemaining < 0) {
        timeRemaining = 0;
    }
    // creates an object for the score and the user name
    var newScore = {
        name: userName,
        score: timeRemaining
    };
    
    // Pushes the new score object onto array and then sorts array with the highest score first
    highScores = highScores || [];
    highScores.push(newScore);
    highScores.sort(function(a, b){
        let x = a.score;
        let y = b.score;
        if (x > y) {return -1;}
        if (x < y) {return 1;}
        return 0;
    });

    // hides the endQuiz screen
    endDiv.style.display = "none";
    //saves the high score array and calls the function to show the scores
    saveHighScores();
    showHighScores();
};
        
// Listens for the user to click the clear-scores btn 
document.querySelector("#clear-scores").addEventListener("click", function() {
    // clears high score data and hides and deletes displayed high score data
    highScores = [];
    localStorage.clear();
    scoreListEl.style.display = "none";
    for (var i = 0; i < scoreIdCounter; i++) {
        var currentScore = document.querySelector(".score-item[data-score-id='" + i + "']");
        currentScore.remove();
    }
    scoreIdCounter = 0;
});

// Listens for the go back button to be clicked
document.querySelector("#go-back").addEventListener("click", function() {
    // resets to beginning of quiz
    endDiv.style.display = "none";
    startDiv.style.display = "block";
    highScoreEl.style.display = "none";
    timer.textContent = "Time: " + 0;
});


var changeQuestion = function() {
    // Quiz questions and answer option buttons
    var quizQuest = document.querySelector("#quiz-question");
    var optionOne = document.querySelector("#option1");
    var optionTwo = document.querySelector("#option2");
    var optionThree = document.querySelector("#option3");
    var optionFour = document.querySelector("#option4");

    // Adds the question and answer options to the relative elements
    quizQuest.textContent = questions[currentQuestion].question;
    optionOne.textContent = questions[currentQuestion].optionOne;
    optionTwo.textContent = questions[currentQuestion].optionTwo;
    optionThree.textContent = questions[currentQuestion].optionThree;
    optionFour.textContent = questions[currentQuestion].optionFour;
};

// function called when user clicks an answer option for quiz question
var answerQuestion = function(event) {
    // gets the target of the click
    var ansOption = event.target;

    // gets the ID of the element clicked
    var ansID = ansOption.getAttribute('id');
    // sotres the just asked question and then increases the question to the next question in array
    var lastQuest = currentQuestion;
    currentQuestion++;
    // timer for displaying "correct" or "wrong"
    var ansTimer;
    // checks if user selected the correct option
    if (ansID === questions[lastQuest].answer) {
        // displays correct in the displayed ansDiv element
        prevAns.textContent = "Correct!";
        ansDiv.style.display = "block";
        
        // resets ansTimer if need to from prev. question
        clearInterval(ansTimer);
        //sets the ansTimer to only display correct for 5 seconds
        ansTimer = setTimeout(function() {
            ansDiv.style.display = "none";
        }, 5000);
    
    } else {
        //if answer was wrong - clears the timer if need from prev question
        clearInterval(ansTimer);
        //shows wrong to the user
        prevAns.textContent = "Wrong!";
        //sets timer to only display wrong for 5 seconds
        ansTimer = setTimeout(function() {
            ansDiv.style.display = "none";
        }, 5000);
        // decreases remaining quiz time by 10 seconds
        timeRemaining = timeRemaining - 10;
        // shows updated time remaining to user
        timer.textContent = "Time: " + timeRemaining;
        // clears the previous quiz timeout and reset it with new remaining time
        clearTimeout(quizTimer);
        quizTimer = setTimeout(endQuiz, timeRemaining * 1000);

    }
    // displays the Div element to user
    ansDiv.style.display = "block";
    // if there are questions remaining, calls function to display next question
    if (questions[currentQuestion]) {
        changeQuestion();
    } else {
        // ends quiz if no questions remain
        endQuiz();
    }
    

};

// function called from time interval to update time remaining each second
var updateTimer = function() {
    timeRemaining--;
    timer.textContent = "Time: " + timeRemaining;
};

// function called to start quiz when user clicks start quiz button
var startQuiz = function() {
    // resets if needed
    currentQuestion = 0;
    timeRemaining = 59;
    timer.textContent = "Time: " + timeRemaining;
    // sets quiz timer
    quizTimer = setTimeout(endQuiz, 60000);
    // hides starting screen and shows quiz screen
    startDiv.style.display = "none";
    quizDiv.style.display = "block";
    // shows time remaining
    timer.textContent = "Time: " + timeRemaining;
    // sets interval timer to update time remaining each second
    timeLeft = setInterval(updateTimer, 1000);
    // calls to change question
    changeQuestion();
};

// loads high score data from local storage
var loadHighScores = function() {
    highScores = localStorage.getItem("scores");

    if (!highScores) {
        return false;
    }
    highScores = JSON.parse(highScores);
    
};

// saves high score data to local storage
var saveHighScores = function() {
    localStorage.setItem("scores", JSON.stringify(highScores));
};

// shows high scores to user
var showHighScores = function() {
    // hides start div if currently showing
    startDiv.style.display = "none";
    // checks if there are high scores to show and exits function if there are none
    if (highScores.length === 0) {
        return false;
    }
    // deletes any current li elements if there are any to prevent duplicates
    for (var i = 0; i < scoreIdCounter; i++) {
        var currentScore = document.querySelector(".score-item[data-score-id='" + i + "']");
        currentScore.remove();
    }
    scoreIdCounter = 0;
    // creates list elements, adds the score and user name data from score objects in array and appends to list
    var scoreListEl = document.querySelector("#score-list");
    for (var j = 0; j < highScores.length; j++) {
        var scoreEl = document.createElement("li");
        scoreEl.className = "score-item";
        scoreEl.setAttribute("data-score-id", scoreIdCounter);
        var scoreDivEl = document.createElement("div");
        scoreEl.appendChild(scoreDivEl);
        var score = document.createElement("p");
        score.className = "score";
        score.textContent = (j + 1) + " - " + highScores[j].name + " - " + highScores[j].score;

        scoreDivEl.appendChild(score);
        
        scoreListEl.appendChild(scoreEl);
        scoreIdCounter++;

    }
    // shows the score divs 
    highScoreEl.style.display = "block";
    scoreListEl.style.display = "block";
};

// listeners for the buttons
startButtonEl.addEventListener("click", startQuiz);
questOptions.addEventListener("click", answerQuestion);
submitBtn.addEventListener("click", submitHighScore);
highScoreBtnEl.addEventListener("click", showHighScores);
// calls load high scores on page load
loadHighScores();


