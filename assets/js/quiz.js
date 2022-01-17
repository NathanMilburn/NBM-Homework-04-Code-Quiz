/*
 * questions.js is loaded in the HTML before quiz.js
 * It creates a global variable called questions that contains starter questions.
 * Take a look at the structure and familiarize yourself with each part
 * then, add some of your own questions!
 * Use this data to populate your quiz questions, choices, and answers.
 */
console.log(questions);

var timerEl = document.querySelector('#countdown');
var timer;
// var timeLeft;
// var mainEl = document.getElementById('main');

// var startButton = document.querySelector("#start-button");

// function startQuiz() {
//     document.getElementById('timeLeft').style='color.green;';
//     document.addEventListener(startButton);
//     countDown();
//   }

// Correct Guess Goes HERE

// Incorrect Guess Goes HERE

// KEEP FOR LATER VVVVVVV

// function countDown() {
//     var timeLeft = 60;
  
//     var timeInterval = setInterval(function () {
//       if (timeLeft > 1) {
//         timerEl.textContent = timeLeft + ' seconds remaining';
//         timeLeft--;
//       } else if (timeLeft === 1) {
//         timerEl.textContent = timeLeft + ' second remaining';
//         timeLeft--;
//       } else {
//         timerEl.textContent = '';
//         clearInterval(timeInterval);
//       }
//     }, 1000);
//   }

function countDown() {
    var sec = 60;
    clearInterval(timer);
    timer = setInterval(function(){
        sec--;
        console.log(sec);
        timerEl.textContent ='Time Left:'+sec + 'seconds';

        if (sec <= 0) {
            clearInterval(timer);
        }
    }, 1000);
}


  const startBtn = document.querySelector('#start-button');

  startBtn.addEventListener('click', () => {
      countDown();
  });
