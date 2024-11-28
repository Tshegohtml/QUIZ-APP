const readline = require('readline');

const questions = [
    {
      question: "What is the largest planet in our solar system?",
      options: ["1. Earth", "2. Jupiter", "3. Mars", "4. Saturn"],
      answer: 2
    },
    {
      question: "What is the capital of Canada?",
      options: ["1. Toronto", "2. Ottawa", "3. Vancouver", "4. Montreal"],
      answer: 2
    },
    {
      question: "Which animal is known as the King of the Jungle?",
      options: ["1. Elephant", "2. Lion", "3. Tiger", "4. Bear"],
      answer: 2
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["1. H2O", "2. CO2", "3. O2", "4. H2"],
      answer: 1
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["1. Venus", "2. Earth", "3. Mars", "4. Jupiter"],
      answer: 3
    },
    {
      question: "What is the longest river in the world?",
      options: ["1. Nile", "2. Amazon", "3. Yangtze", "4. Mississippi"],
      answer: 1
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      options: ["1. William Shakespeare", "2. Charles Dickens", "3. Mark Twain", "4. Jane Austen"],
      answer: 1
    },
    {
      question: "Which country is famous for the Eiffel Tower?",
      options: ["1. Spain", "2. Italy", "3. France", "4. Germany"],
      answer: 3
    },
    {
      question: "What is the capital of Australia?",
      options: ["1. Sydney", "2. Melbourne", "3. Canberra", "4. Brisbane"],
      answer: 3
    },
    {
      question: "What is the smallest continent by land area?",
      options: ["1. Africa", "2. Australia", "3. Antarctica", "4. Europe"],
      answer: 2
    }
  ];

let score = 0;
let currentQuestionIndex = 0;
const questionTimeLimit = 60; // 60 seconds per question
const totalQuizTimeLimit = 1800; // 1800 seconds (30 minutes) total
let remainingQuizTime = totalQuizTimeLimit;
let questionTimer, quizTimer;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endQuiz();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  console.log(`\nQuestion ${currentQuestionIndex + 1}: ${currentQuestion.question}`);
  currentQuestion.options.forEach(option => console.log(option));

  let timeLeft = questionTimeLimit;

  questionTimer = setInterval(() => {
    timeLeft--;
    if (timeLeft === 0) {
      clearInterval(questionTimer);
      console.log("\nTime's up! Moving to the next question...");
      currentQuestionIndex++;
      askQuestion();
    }
  }, 1000);

  rl.question("\nYour answer (enter the option number): ", (answer) => {
    clearInterval(questionTimer);
    const userAnswer = parseInt(answer.trim());

    if (userAnswer === currentQuestion.answer) {
      console.log("✅ Correct!");
      score++;
    } else if (isNaN(userAnswer) || userAnswer < 1 || userAnswer > currentQuestion.options.length) {
      console.log("❌ Invalid input! Please enter a number corresponding to the options.");
    } else {
      console.log("❌ Wrong answer!");
    }
    currentQuestionIndex++;
    askQuestion();
  });
}

function startQuiz() {
  console.log("🎉 Quiz Started! You have limited time for each question.\n");
  quizTimer = setInterval(() => {
    remainingQuizTime--;
    if (remainingQuizTime <= 0) {
      clearInterval(quizTimer);
      console.log("\n⏰ Total quiz time's up!");
      endQuiz();
    }
  }, 1000);
  askQuestion();
}

function endQuiz() {
  clearInterval(quizTimer);
  clearInterval(questionTimer);
  rl.close();
  const passMark = Math.ceil(questions.length * 0.8); // 80% of total questions
  console.log(`\n📊 Quiz Over! Your score: ${score}/${questions.length}`);
  console.log(`🎯 Pass Mark: ${passMark}/${questions.length}`);

  const percentage = ((score / questions.length) * 100).toFixed(2);
  console.log(`📈 Percentage: ${percentage}%`);

  if (score >= passMark) {
    console.log("🏆 Congratulations! You passed the quiz!");
  } else {
    console.log("😞 Sorry, you failed the quiz. Better luck next time!");
  }
}

function displayInstructions() {
  console.log("📚 Welcome to the Quiz!");
  console.log("➡️ You will be presented with a series of multiple-choice questions.");
  console.log("⏰ You have 60 seconds to answer each question.");
  console.log("✅ Correct answers earn you a point.");
  console.log("❌ Incorrect answers do not earn points.");
  console.log("🕒 The quiz will end when you have answered all the questions or when the total quiz time limit of 60 seconds is reached.");
  console.log("💡 Good luck!\n");
}

displayInstructions();
startQuiz();

