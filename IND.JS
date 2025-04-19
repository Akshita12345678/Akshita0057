const questions = [
    {
    question: " 1. Amongst the following browsers, which browser supports almost all the CSS properties?",
    options: ["Firefox", "Safari", "Google Chrome", "Opera"],
    correct: 2
  },
  {
    question: "2. Which CSS function performs a calculation to be used as the property value?",
    options: ["sum()", "add()","calc()","addition()"],
    correct: 2
  },
  {
    question: "3. What CSS describes?",
    options: ["CSS describes how calculation perform on button click.", "CSS describes how HTML elements are to be displayed on screen, paper, or in other media","Both A. and B.","None of the above"],
    correct: 1
  },
  {
    question: "4. Which attribute is often used to point to a class name in a style sheet??",
    options: ["style", "css", "src", "class"],
    correct: 3
  },
  {
    question: "5. Nested HTML Elements are allowed in HTML?",
    options: ["Yes", "No"],
    correct: 0
  },
  {
    question: "6. Which of the following statement(s) is true about the JavaScript?",
    options: ["It is a scripting language used to make the website interactive", "It is an advanced version of Java for Desktop and Mobile application development","It is a markup language of Java to develop the webpages","All of the above"],
    correct: 0
  },
  {
    question: "7. In JavaScript, single line comment begins with ___.",
    options: ["#", "/*","$","//"],
    correct: 3
  },
  {
    question: "8. In which HTML element, we put the JavaScript code?",
    options: ["< javascript>...< /javascript>", "< js>...< /js>","< script>...< /script>","< css>...< /css>"],
    correct: 2
  },
  {
    question: "9. Which tag is used to create an HTML form for user input?",
    options: ["<form>", "< input>", "< form_put>", "< form_get>"],
    correct: 0
  },
    {
      question: "10. Which element/tag defines a paragraph??",
      options: ["<p>", "<pre>", "<panel>", "None of the above"],
      correct: 0
    },
    {
      question: "11. Which attribute specifies the path to the image?",
      options: ["href", "link", "src", "All of the above"],
      correct: 2
    },
    {
      question: "12. HTML stands for_______.",
      options: ["Hyperactive Text Markup Language", "Hyper Text Markup Language", "Hyper Text Machine Language", "None of these"],
      correct: 1
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timer;
  let timeLeft = 30;
  
  function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;
    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach((btn, index) => {
      btn.textContent = q.options[index];
      btn.disabled = false;
      btn.style.background = "#eee";
    });
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("result").textContent = "";
  
    // Reset and start timer
    clearInterval(timer);
    timeLeft = 30;
    document.getElementById("time").textContent = timeLeft;
    timer = setInterval(updateTimer, 1000);
  }
  
  function updateTimer() {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeout();
    }
  }
  
  function selectAnswer(index) {
    clearInterval(timer);
    const q = questions[currentQuestion];
    const buttons = document.querySelectorAll(".option-btn");
  
    if (index === q.correct) {
      score++;
      buttons[index].style.background = "lightgreen";
      document.getElementById("result").textContent = "Correct!";
    } else {
      buttons[index].style.background = "lightcoral";
      buttons[q.correct].style.background = "lightgreen";
      document.getElementById("result").textContent = "Oops! Wrong answer.";
    }
  
    buttons.forEach(btn => btn.disabled = true);
    document.getElementById("next-btn").style.display = "inline-block";
  }
  
  function handleTimeout() {
    const q = questions[currentQuestion];
    const buttons = document.querySelectorAll(".option-btn");
    buttons[q.correct].style.background = "lightgreen";
    buttons.forEach(btn => btn.disabled = true);
    document.getElementById("result").textContent = "Time's up!";
    document.getElementById("next-btn").style.display = "inline-block";
  }
  
  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showScore();
    }
  }
  
  function showScore() {
    clearInterval(timer);
    document.getElementById("quiz").innerHTML = `
      <h2>You scored ${score} out of ${questions.length}</h2>
      <button onclick="restartQuiz()">Restart</button>
    `;
  }
  
  function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("quiz").innerHTML = `
      <div id="question"></div>
      <div id="timer">Time left: <span id="time">15</span>s</div>
      <div class="options">
        <button class="option-btn" onclick="selectAnswer(0)"></button>
        <button class="option-btn" onclick="selectAnswer(1)"></button>
        <button class="option-btn" onclick="selectAnswer(2)"></button>
        <button class="option-btn" onclick="selectAnswer(3)"></button>
      </div>
      <button id="next-btn" onclick="nextQuestion()">Next</button>
      <div id="result"></div>
    `;
    loadQuestion();
  }
  
  // Start the quiz
  loadQuestion();
  