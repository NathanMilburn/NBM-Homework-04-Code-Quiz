
// Defined variables for timer, questions, and scores
var timerEl = document.querySelector('#countdown');
var timer;
var title = document.querySelector('#title');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var scoreTotal = document.querySelector('#score');
var questionCounter = 0
var currentQuestion = {}
var acceptingAnswers = true
var score = 0
var sec = 60
let availableQuestions = []
const scoreIncrements = 100
const totalQuestions = 8

// Question and Answer Bank
var questions = [
    {
        title: "Where was NFL Quarterback Dan Marino's last official win?",
        selector1: "Baltimore",
        selector2: "Miami",
        selector3: "Seattle",
        selector4: "Vancouver",
        answer: 3,
        
    },
    {
        title: "Which of these eSports organizations was the first U.S team to win a major tournament in Counter Strike: Global Offensive?",
        selector1: "Cloud9",
        selector2: "Team Liquid",
        selector3: "Evil Geniuses",
        selector4: "OpTic Gaming",
        answer: 1,
    },
    {
        title: "The Seattle Kraken played their inaugural season in the year ____.",
        selector1: "2015",
        selector2: "1983",
        selector3: "2021",
        selector4: "2007",
        answer: 3,
    },
    {
        title: "Which early 2000's sitcom featured actors Drake Bell and Josh Peck?",
        selector1: "Zoey 101",
        selector2: "The Suite Life of Zack and Cody",
        selector3: "Drew & Jerry",
        selector4: "Drake & Josh",
        answer: 4,
    },
    {
        title: "Who lives in a pineapple under the sea?",
        selector1: "Carly Shay",
        selector2: "Howie Long",
        selector3: "Spongebob Squarepants",
        selector4: "Lincoln Loud",
        answer: 3,
    },
    {
        title: "Things Rick Astley would do:",
        selector1: "Give You up",
        selector2: "Let You Down",
        selector3: "Run Around and Hurt You",
        selector4: "None of the above",
        answer: 4,
    },
    {
        title: "Star Wars Episode Three: ___ is widely regarded as the best installment of the prequel series of Sci-Fi movies.",
        selector1: "Return of the Jedi",
        selector2: "Revenge of the Sith",
        selector3: "The Empire Strikes Back",
        selector4: "A New Hope",
        answer: 2,
    },
    {
        title: "This MMORPG (Massive Multiplayer Online Roleplaying Game) was a global phenomena released in November of 2004.",
        selector1: "RuneScape",
        selector2: "World of Warcraft",
        selector3: "EverQuest",
        selector4: "Star Wars: Knights of the Old Republic",
        answer: 2,
    }
];

// Game Start
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    NewQuestion()
}


// Game Timer
function countDown() {
    clearInterval(timer);
    timer = setInterval(function(){
        sec--;
        console.log(sec);
        timerEl.textContent ='Time Left:'+ sec + ' Seconds Remaining';
        if (sec <= 0) {
            clearInterval(timer);
            timerEl.textContent ='Game Over';
            endGame();
        }
    }, 1000);
}

countDown();

// Populating next question
NewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > totalQuestions) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./scoreinput.html')
    } 

    questionCounter++

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    title.innerText = currentQuestion.title

    choices.forEach(selector => {
        const num = selector.dataset['number']
        selector.innerText = currentQuestion['selector' + num]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(selector => {
    selector.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply ==='correct') {
            incrementScore(scoreIncrements)
        }

        if(classToApply ==='incorrect') {
            sec -=8;
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            NewQuestion()

        }, 500)
    })
})

incrementScore = num => {
    score +=num
    scoreTotal.innerText = 'Score: '+score
}

// If time expires, the game ends and the user is directed to the info input page for the high score sheet
endGame = () => {
    if(sec <= 0) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./scoreinput.html')}
}

startGame()
