

var timerEl = document.querySelector('#countdown');
var timer;

var title = document.querySelector('#title');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var scoreText = document.querySelector('#score');

var questionCounter = 0
var currentQuestion = {}
var acceptingAnswers = true
var score = 0
var sec = 0
let availableQuestions = []

// Question and Answer Bank
var questions = [
    {
        title: "Where was NFL Quarterback Dan Marino's last official win?",
        choice1: "Baltimore",
        choice2: "Miami",
        choice3: "Seattle",
        choice4: "Vancouver",
        answer: 3,
        
    },
    {
        title: "Which of these eSports organizations was the first U.S team to win a major tournament in Counter Strike: Global Offensive?",
        choice1: "Cloud9",
        choice2: "Team Liquid",
        choice3: "Evil Geniuses",
        choice4: "OpTic Gaming",
        answer: 1,
    },
    {
        title: "The Seattle Kraken played their inaugural season in the year ____.",
        choice1: "2015",
        choice2: "1983",
        choice3: "2021",
        choice4: "2007",
        answer: 3,
    },
    {
        title: "Which early 2000's sitcom featured actors Drake Bell and Josh Peck?",
        choice1: "Zoey 101",
        choice2: "The Suite Life of Zack and Cody",
        choice3: "Drew & Jerry",
        choice4: "Drake & Josh",
        answer: 4,
    },
    {
        title: "Who lives in a pineapple under the sea?",
        choice1: "Carly Shay",
        choice2: "Howie Long",
        choice3: "Spongebob Squarepants",
        choice4: "Lincoln Loud",
        answer: 3,
    },
    {
        title: "Things Rick Astley would never do.",
        choice1: "Give You up",
        choice2: "Let You Down",
        choice3: "Run Around and Hurt You",
        choice4: "All of the above",
        answer: 4,
    },
    {
        title: "Star Wars Episode Three: ___ is widely regarded as the best installment of the prequel series of Sci-Fi movies.",
        choice1: "Return of the Jedi",
        choice2: "Revenge of the Sith",
        choice3: "The Empire Strikes Back",
        choice4: "A New Hope",
        answer: 2,
    },
    {
        title: "This MMORPG (Massive Multiplayer Online Roleplaying Game) was a global phenomena released in November of 2004.",
        choice1: "RuneScape",
        choice2: "World of Warcraft",
        choice3: "EverQuest",
        choice4: "Star Wars: Knights of the Old Republic",
        answer: 2,
    }
];


// Game Timer
function countDown() {
    var sec = 10;
    clearInterval(timer);
    timer = setInterval(function(){
        sec--;
        console.log(sec);
        timerEl.textContent ='Time Left:'+ sec + ' Seconds';

        if (sec <= 0) {
            clearInterval(timer);
            timerEl.textContent ='Game Over';
            endGame();
        }
    }, 1000);
}



  const startBtn = document.querySelector('#start-button');

countDown();

const SCORE_INCREMENTS = 100
const TOTAL_QUESTIONS = 8

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

endGame = () => {
    if(sec = 0) {
        // localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/Users/ThrillHaus/Desktop/Code/Homework/NBM-Homework-04-Code-Quiz/scoreinput.html')}
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > TOTAL_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/Users/ThrillHaus/Desktop/Code/Homework/NBM-Homework-04-Code-Quiz/scoreinput.html')
    } 

    questionCounter++

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    title.innerText = currentQuestion.title

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply ==='correct') {
            incrementScore(SCORE_INCREMENTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 500)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = 'Score: '+score
}

startGame()
