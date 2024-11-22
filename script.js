// 生成随机题目
function generateQuestion() {
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let a, b;

    switch(operator) {
        case '+':
        case '-':
            a = Math.floor(Math.random() * 100);
            b = Math.floor(Math.random() * 100);
            break;
        case '*':
            a = Math.floor(Math.random() * 12) + 1;
            b = Math.floor(Math.random() * 12) + 1;
            break;
        case '/':
            b = Math.floor(Math.random() * 11) + 2;  // 避免除以1
            a = b * (Math.floor(Math.random() * 10) + 1);
            break;
    }

    const question = `${a} ${operator} ${b} = `;
    const answer = eval(question.slice(0, -2));
    return { question, answer: Math.round(answer * 100) / 100 };
}

// 创建题目
const quizContainer = document.getElementById('quiz-container');
const questions = [];

for (let i = 0; i < 20; i++) {
    const { question, answer } = generateQuestion();
    questions.push({ question, answer });

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = `
        <label for="q${i}">第${i + 1}题 ${question}</label>
        <input type="number" id="q${i}" step="0.01" required>
    `;
    quizContainer.appendChild(questionElement);
}

// 提交按钮逻辑
const submitButton = document.getElementById('submit-btn');
const inputs = document.querySelectorAll('input[type="number"]');

inputs.forEach(input => {
    input.addEventListener('input', () => {
        submitButton.disabled = Array.from(inputs).some(input => !input.value);
    });
});

// 提交答案和显示结果
submitButton.addEventListener('click', () => {
    let score = 0;
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '<h2>结果</h2>';

    questions.forEach((q, i) => {
        const userAnswer = parseFloat(document.getElementById(`q${i}`).value);
        const isCorrect = Math.abs(userAnswer - q.answer) < 0.01;
        if (isCorrect) score++;

        const resultElement = document.createElement('p');
        resultElement.innerHTML = `
            第${i + 1}题 ${q.question} ${userAnswer} 
            <span class="${isCorrect ? 'correct' : 'incorrect'}">
                (${isCorrect ? '正确' : '错误，正确答案：' + q.answer})
            </span>
        `;
        resultsContainer.appendChild(resultElement);
    });

    const scoreElement = document.createElement('h3');
    scoreElement.textContent = `得分: ${score} / 20`;
    resultsContainer.insertBefore(scoreElement, resultsContainer.firstChild);

    resultsContainer.classList.remove('hidden');
    submitButton.disabled = true;
});

