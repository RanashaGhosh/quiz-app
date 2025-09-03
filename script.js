const question=[
    {
        question: "Which is the largest animal in the world?",
        answer: [
            { Text :"Shark", correct: false },
            { Text :"Blue Whale", correct: true },
            { Text :"Elephant", correct: false },
            { Text :"Giraffe", correct: false }
        ]
    }
    ,
    {
        question: "Which planet is known as the Red Planet?",
        answer: [
            { Text :"Earth", correct: false },
            { Text :"Mars", correct: true },
            { Text :"Jupiter", correct: false },
            { Text :"Saturn", correct: false }
        ]
    },
    {
        question: "What is the capital of France?",
        answer: [
            { Text :"Berlin", correct: false },
            { Text :"Madrid", correct: false },
            { Text :"Paris", correct: true },
            { Text :"Rome", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
} 

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
} 

function showscore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length) {
        showQuestion();
    }else{
        showscore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});



startQuiz();