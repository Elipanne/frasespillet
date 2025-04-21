console.log("Quiz Game Initialized");
// Define an array of question objects
const questions = [
  {
    question: "Hva er kjernen i frasen 'åpent landskap'?",
    answers: [
      { text: "landskap", correct: true },
      { text: "åpent", correct: false },
      { text: "åpent landskap", correct: false },
      { text: "skap", correct: false }
    ]
  },
   {
    question: "Hva er kjernen i frasen 'mørk lilla'?",
    answers: [
      { text: "mørke", correct: false },
      { text: "mørkelilla", correct: false },
      { text: "mørk", correct: false },
      { text: "lilla", correct: true }
    ]
  },
   {
    question: "Hva er kjernen i frasen 'sprøstekt løk''?",
    answers: [
      { text: "løk", correct: true },
      { text: "sprøstekt", correct: false },
      { text: "stekt", correct: false },
      { text: "sprø", correct: false }
    ]
  },
  {
    question: "Hva er kjerne i frasen 'på badet'?",
    answers: [
      { text: "badet", correct: false },
      { text: "på", correct: true },
      { text: "på badet", correct: false },
      { text: "frasen har ingen kjerne", correct: false }
    ]
  },
   {
    question: "Hva er kjernen i frasen 'han med de fine tennene'?",
    answers: [
      { text: "tennene", correct: false },
      { text: "fine", correct: false },
      { text: "han", correct: true },
      { text: "de fine", correct: false }
    ]
  },
   {
    question: "Hva er kjernen i frasen 'et svart hull som sluker jorda'?",
    answers: [
      { text: "hull", correct: true },
      { text: "jorda", correct: false },
      { text: "sluker", correct: false },
      { text: "som", correct: false }
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
