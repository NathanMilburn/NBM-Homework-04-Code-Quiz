var title = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var scoreText = document.querySelector('#score');

var currentQuestion = {}
var acceptingAnswers = true
var score = 0
let availableQuestions = []

var questions = [
    {
        title: "Where was NFL Quarterback Dan Marino's last official win?",
        choice01: "Baltimore",
        choice02: "Miami",
        choice03: "Seattle",
        choice04: "Vancouver",
        answer: 3,
        
    },
    {
        title: "Which of these eSports organizations was the first U.S team to win a major tournament in Counter Strike: Global Offensive?",
        choice01: "Cloud9",
        choice02: "Team Liquid",
        choice03: "Evil Geniuses",
        choice04: "OpTic Gaming",
        answer: 1,
    },
    {
        title: "The Seattle Kraken played their inaugural season in the year ____.",
        choice01: "2015",
        choice02: "1983",
        choice03: "2021",
        choice04: "2007",
        answer: 3,
    },
    {
        title: "Which early 2000's sitcom featured actors Drake Bell and Josh Peck?",
        choice01: "Zoey 101",
        choice02: "The Suite Life of Zack and Cody",
        choice03: "Yu-Gi-Oh!",
        choice04: "Drake & Josh",
        answer: 4,
    },
    {
        title: "Who lives in a pineapple under the sea?",
        choice01: "Carly Shay",
        choice02: "Howie Long",
        choice03: "Spongebob Squarepants",
        choice04: "Lincoln Loud",
        answer: 3,
    },
    {
        title: "Things Rick Astley would never do.",
        choice01: "Give You up",
        choice02: "Let You Down",
        choice03: "Run Around and Hurt You",
        choice04: "All of the above",
        answer: 4,
    },
    {
        title: "Star Wars Episode Three: ___ is widely regarded as the best installment of the prequel series of Sci-Fi movies.",
        choice01: "Return of the Jedi",
        choice02: "Revenge of the Sith",
        choice03: "The Empire Strikes Back",
        choice04: "A New Hope",
        answer: 2,
    },
    {
        title: "This MMORPG (Massive Multiplayer Online Roleplaying Game) was a global phenomena released in November of 2004.",
        choice01: "RuneScape",
        choice02: "World of Warcraft",
        choice03: "EverQuest",
        choice04: "Star Wars: Knights of the Old Republic",
        answer: 2,
    }
];

const SCORE_INCREMENTS = 100
const TOTAL_QUESTIONS = 8

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > TOTAL_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/Users/ThrillHaus/Desktop/Code/Test%20Area/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${TOTAL_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/TOTAL_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

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

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()