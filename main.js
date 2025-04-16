console.log("Quiz Game Initialized");
// Define an array of question objects
const questions = [
  {
    question: "Hva er hovedstaden i Norge?",
    answers: [
      { text: "Oslo", correct: true },
      { text: "Bergen", correct: false },
      { text: "Trondheim", correct: false },
      { text: "Stavanger", correct: false }
    ]
  },
  {
    question: "Hva er 2 + 2?",
    answers: [
      { text: "3", correct: false },
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "6", correct: false }
    ]
  }
  // Du kan legge til flere spørsmål her om ønskelig.
];

let currentQuestionIndex = 0;  // Keeps track of the current question
let score = 0;                 // Keeps track of the user’s score

// Select elements from the DOM (these match the IDs we set in index.html)
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('next-btn');

// Load the first question when the page loads
loadQuestion();

function loadQuestion() {
  clearState();  // Clear previous question data and feedback
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  // Create buttons for each answer option
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    // When the button is clicked, run the selectAnswer function
    button.addEventListener('click', () => selectAnswer(answer));
    answerButtonsElement.appendChild(button);
  });
}

function clearState() {
  nextButton.style.display = 'none';  // Hide the Next button until it's needed
  feedbackElement.innerText = '';       // Clear previous feedback

  // Remove any existing answer buttons
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(answer) {
  // Check if the selected answer is correct
  if (answer.correct) {
    feedbackElement.innerText = "Riktig!";
    score++;  // Increment score for correct answer
  } else {
    feedbackElement.innerText = "Feil!";
  }
  scoreElement.innerText = "Score: " + score;

  // Disable all buttons after an answer is chosen so the user can’t click multiple times
  Array.from(answerButtonsElement.children).forEach(button => {
    button.disabled = true;
  });

  // If there are more questions, show the Next button; otherwise, finish the quiz
  if (currentQuestionIndex < questions.length - 1) {
    nextButton.style.display = 'block';
  } else {
    feedbackElement.innerText += " Quiz ferdig!";
    nextButton.innerText = "Start på nytt";
    nextButton.style.display = 'block';
  }
}

// Listen for clicks on the Next button to load the next question or restart
nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    // Restart the quiz
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.innerText = "Score: " + score;
    nextButton.innerText = "Neste";
    loadQuestion();
  }
});
