const quizData = [
    {
        question: " Which of the following is not an example of data structure?",
        options: {
            a: "Stack",
            b: "String",
            c: "Queue",
            d: "Array",
        },
        correct: "b",
    },
    {
        question: " ____ are variable that store the memory address of another variable.",
        options: {
            a: "Pointer",
            b: "Linked list",
            c: "Array ",
            d: "Graph",
        },
        correct: "a",
    },
    {
        question: "______is a way of organized and stored data so it can be access and work with efficiently.",
        options: {
           a: "Value range",
           b: "Data attributes",
           c: "Data structure",
           d: "Tree",
        },   
        correct: "c",
    },
    {
        question: " stack is a data structure that follows the last-in-first-out(Lifo) principles, where the last element added to the stack is the first one to be removed.",
        options: {
           a: "True",
           b: "False",
        },
        correct: "a",
    },
    {
        question: "Queue is a data structure that follows the Fast-in-first-out(Fifo) principles, where the last element added to the stack is the first one to be removed",
        options: {
           a: "True",
           b: "False",
        },
        correct: "a",
    },
      {
        question: "Which of the following is not an example of data structure?",
        options: {
           a: "Graph",
           b: "String",
           c: "Tree",
           d: "Array",
        },
        correct: "c",
    },
    {
        question: " ____ is a collection of nodes, where each node contain a data field and a dointer to the next node.",
        options: {
           a: "Pointer",
           b: "Linked list",
           c: "Array ",
           d: "Graph",
        },
        correct: "b",
    },
    {
        question: "____ is a hierarchical data structure that consist of node connected by edge.",
        options: {
           a: "Value range",
           b: "Data attributes",
           c: "Data structure",
           d: "Tree",
        },
        correct: "d",
    },
    {
        question: " Graph is a data structure that consist of node(also called vertices) connected by edge.",
        options: {
           a: "True",
           b: "False",
        },
        correct: "a",
    },
    {
        question: "Array is a collection of elements of the same data type arranged in contagious memory location",
        options: {
           a: "True",
           b: "False",
        },
        correct: "a",
    },
];

// Shuffle questions
const shuffledQuizData = quizData.sort(() => Math.random() - 0.5);

const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const answerOptionsEl = document.getElementById("answer-options");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;
const userAnswers = Array(shuffledQuizData.length).fill(null);

loadQuiz();

function loadQuiz() {
    const currentQuizData = shuffledQuizData[currentQuiz];
    questionEl.innerText = (currentQuiz + 1) + '. ' + currentQuizData.question;

    answerOptionsEl.innerHTML = '';
    Object.keys(currentQuizData.options).forEach(key => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="radio" name="answer" id="${key}" class="answer" value="${key}">
            <label for="${key}">${currentQuizData.options[key]}</label>
        `;
        answerOptionsEl.appendChild(li);
    });

    if (userAnswers[currentQuiz] !== null) {
        document.getElementById(userAnswers[currentQuiz]).checked = true;
    }
}

function getSelected() {
    const answerEls = document.querySelectorAll(".answer");
    let answer = null;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.value;
        }
    });
    return answer;
}

prevBtn.addEventListener("click", () => {
    userAnswers[currentQuiz] = getSelected();
    if (currentQuiz > 0) {
        currentQuiz--;
        loadQuiz();
        updateNavigationButtons();
    }
});

nextBtn.addEventListener("click", () => {
    userAnswers[currentQuiz] = getSelected();
    if (currentQuiz < shuffledQuizData.length - 1) {
        currentQuiz++;
        loadQuiz();
        updateNavigationButtons();
    }
});

submitBtn.addEventListener("click", () => {
    userAnswers[currentQuiz] = getSelected();
    score = userAnswers.reduce((score, answer, index) => {
        return answer === shuffledQuizData[index].correct ? score + 1 : score;
    }, 0);

    quiz.innerHTML = `
        <h2>You answered ${score}/${shuffledQuizData.length} questions correctly</h2>
        <button id='reload' onclick="location.reload()">Reload</button>
    `;
});

function updateNavigationButtons() {
    prevBtn.style.display = currentQuiz === 0 ? "none" : "block";
    nextBtn.style.display = currentQuiz === shuffledQuizData.length - 1 ? "none" : "block";
    submitBtn.style.display = currentQuiz === shuffledQuizData.length - 1 ? "block" : "none";
}

updateNavigationButtons();