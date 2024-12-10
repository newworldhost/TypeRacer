document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const retryBtn = document.getElementById('retry-btn');
    const userInput = document.getElementById('user-input');
    const sampleText = document.getElementById('sample-text');
    const timeDisplay = document.getElementById('time');
    const wpmDisplay = document.getElementById('wpm');
    const levelDisplay = document.getElementById('level');
    const difficultySelect = document.getElementById('difficulty');
    const bestScoreDisplay = document.getElementById('bestScore');

    let timer;
    let startTime;
    let isRunning = false;
    let score = 0;
    let currentTexts = [];
    let currentIndex = 0;

    const sentences = {
        easy: [
            "The quick brown fox jumps over the lazy dog.",
            "Pack my box with five dozen liquor jugs."
        ],
        medium: [
            "How razorback-jumping frogs can level six piqued gymnasts!",
            "Jinxed wizards pluck ivy from the big quilt."
        ],
        hard: [
            "Crazy Fredrick bought many very exquisite opal jewels.",
            "We promptly judged antique ivory buckles for the next prize."
        ]
    };

    function getBestScore(difficulty) {
        return localStorage.getItem(`bestScore_${difficulty}`) || 0;
    }

    function setBestScore(difficulty, score) {
        localStorage.setItem(`bestScore_${difficulty}`, score);
    }

    difficultySelect.addEventListener('change', function() {
        const difficulty = this.value;
        const randomSentence = sentences[difficulty][Math.floor(Math.random() * sentences[difficulty].length)];
        sampleText.textContent = randomSentence;
        currentTexts = sentences[difficulty];
        currentIndex = 0;
        bestScoreDisplay.textContent = getBestScore(difficulty);
    });

    function startGame() {
        if (isRunning) return;
        isRunning = true;
        userInput.value = '';
        userInput.disabled = false;
        userInput.focus();
        const difficulty = difficultySelect.value;
        const randomSentence = sentences[difficulty][Math.floor(Math.random() * sentences[difficulty].length)];
        sampleText.textContent = randomSentence;
        levelDisplay.textContent = difficultySelect.options[difficultySelect.selectedIndex].text;
        startTime = new Date().getTime();
        timer = setInterval(updateTime, 1000);
    }

    function stopGame() {
        if (!isRunning) return;
        isRunning = false;
        clearInterval(timer);
        userInput.disabled = true;
        calculateWPM();
        const difficulty = difficultySelect.value;
        const bestScore = getBestScore(difficulty);
        if (score > bestScore) {
            setBestScore(difficulty, score);
            bestScoreDisplay.textContent = score;
        }
    }

    function resetGame() {
        stopGame();
        userInput.value = '';
        sampleText.textContent = '';
        timeDisplay.textContent = '0';
        wpmDisplay.textContent = '0';
        score = 0;
    }

    function updateTime() {
        const currentTime = new Date().getTime();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        timeDisplay.textContent = elapsedTime;
    }

    function calculateWPM() {
        const elapsedTime = parseInt(timeDisplay.textContent);
        const wordsTyped = userInput.value.trim().split(/\s+/).length;
        const wpm = Math.round((wordsTyped / elapsedTime) * 60);
        wpmDisplay.textContent = isNaN(wpm) ? '0' : wpm;
    }

    userInput.addEventListener('input', function() {
        const currentSentence = sampleText.textContent;
        const userInputValue = userInput.value;
        let highlightedText = '';

        for (let i = 0; i < currentSentence.length; i++) {
            if (i < userInputValue.length) {
                if (userInputValue[i] === currentSentence[i]) {
                    highlightedText += `<span style="color: blue;">${currentSentence[i]}</span>`;
                } else {
                    highlightedText += `<span style="color: red;">${currentSentence[i]}</span>`;
                }
            } else {
                highlightedText += currentSentence[i];
            }
        }

        sampleText.innerHTML = highlightedText;

        if (userInput.value === currentSentence) {
            score++;
            userInput.value = '';
            currentIndex++;
            if (currentIndex < currentTexts.length) {
                sampleText.textContent = currentTexts[currentIndex];
            } else {
                clearInterval(timer);
                userInput.disabled = true;
                sampleText.textContent = 'Test completed!';
                stopGame();
            }
        }
    });

    startBtn.addEventListener('click', startGame);
    stopBtn.addEventListener('click', stopGame);
    retryBtn.addEventListener('click', resetGame);
});