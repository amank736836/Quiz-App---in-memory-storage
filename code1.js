const questions = [
    {
      title: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      correctAnswer: 1,
      score: 10,
    },
    {
      title: "What is the full form of CSS?",
      options: [
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Colorful Style Sheets",
        "Creative Style Sheets",
      ],
      correctAnswer: 0,
      score: 10,
    },
    {
      title: "Which planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
      correctAnswer: 0,
      score: 10,
    },
    {
      title: "What is the symbol for the chemical element 'Iron'?",
      options: ["Fe", "I", "Ir", "In"],
      correctAnswer: 0,
      score: 10,
    },
    {
      title: "Which mammal can fly?",
      options: ["Bat", "Squirrel", "Kangaroo", "Penguin"],
      correctAnswer: 0,
      score: 10,
    },
    {
      title: "What is the largest animal on Earth?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Gorilla"],
      correctAnswer: 1,
      score: 10,
    },
    {
      title: "Which country is home to the kangaroo?",
      options: ["Australia", "South Africa", "India", "Brazil"],
      correctAnswer: 0,
      score: 10,
    },
    {
      title: "How many continents are there in the world?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 2,
      score: 10,
    },
    {
      title: "What is the chemical symbol for water?",
      options: ["Wa", "W", "H2O", "Wat"],
      correctAnswer: 1,
      score: 10,
    },
    {
      title: "What is the currency of Japan?",
      options: ["Yen", "Dollar", "Euro", "Pound"],
      correctAnswer: 0,
      score: 10,
    },
    // Add more questions here
  ];
  
  // The rest of the JavaScript code remains the same
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const quizContainer = document.getElementById("quiz-container");
  const questionTitle = document.getElementById("question-title");
  const optionsForm = document.getElementById("options-form");
  const optionLabels = document.querySelectorAll("label[for^='option']");
  const submitBtn = document.getElementById("submit-btn");
  const nextBtn = document.getElementById("next-btn");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");
  const correctAnswersContainer = document.getElementById("correct-answers");
  const restartBtn = document.getElementById("restart-btn");
  
  function displayQuestion(question) {
    questionTitle.textContent = question.title;
    question.options.forEach((option, index) => {
      optionLabels[index].textContent = option;
    });
  }
  
  //Output
  function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    scoreDisplay.textContent = score;
    correctAnswersContainer.innerHTML = "";
    questions.forEach((question, index) => {
      const correctOptionIndex = question.correctAnswer;
      const correctOption = question.options[correctOptionIndex];
      const userAnswerIndex = parseInt(localStorage.getItem(`question_${index}`));
      const userAnswer = question.options[userAnswerIndex];
  
      const div = document.createElement("div");
      div.innerHTML = `<p><strong>Question ${index + 1}:</strong> ${
        question.title
      }</p>
      <p><strong>Correct Answer:</strong> ${correctOption}</p>
      <p><strong>Your Answer:</strong> ${userAnswer || "Not attempted"}</p><br>`;
      correctAnswersContainer.appendChild(div);
    });
  }
  
  //Next button
  function showNextQuestion() {
    optionsForm.reset();
    nextBtn.style.display = "none";
    submitBtn.style.display = "block";
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion(questions[currentQuestionIndex]);
    } else {
      showResult();
    }
  }
  
  //Submit button
  function handleSubmit(event) {
    event.preventDefault();
    const selectedOptionIndex = parseInt(
      optionsForm.querySelector("input[name='option']:checked")?.value
    );
  
    if (isNaN(selectedOptionIndex)) {
      alert("Please select an option");
      return;
    }
  
    const currentQuestion = questions[currentQuestionIndex];
    const correctOptionIndex = currentQuestion.correctAnswer;
  
    if (selectedOptionIndex === correctOptionIndex) {
      score += currentQuestion.score;
    }
  
    localStorage.setItem(`question_${currentQuestionIndex}`, selectedOptionIndex);
    submitBtn.style.display = "none";
    nextBtn.style.display = "block";
  }
  
  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.style.display = "block";
    resultContainer.style.display = "none";
    displayQuestion(questions[0]);
  }
  
  submitBtn.addEventListener("click", handleSubmit);
  nextBtn.addEventListener("click", showNextQuestion);
  restartBtn.addEventListener("click", restartQuiz);
  
  // Initialize the quiz
  displayQuestion(questions[currentQuestionIndex]);
  
  
  function showResult() {
  
    // Show the answer key
    const answerKeyContainer = document.getElementById("answer-key-container");
    questions.forEach((question, index) => {
      const correctOptionIndex = question.correctAnswer;
      const correctOption = question.options[correctOptionIndex];
  
      const div = document.createElement("div");
      div.innerHTML = `<p><strong>Question ${index + 1}:</strong> ${
        question.title
      }</p>
                       <p><strong>Correct Answer:</strong> ${correctOption}</p><br>`;
      answerKeyContainer.appendChild(div);
    });
  
    // Show the answer key section
    const answerKeySection = document.getElementById("answer-key");
    answerKeySection.style.display = "block";
  }