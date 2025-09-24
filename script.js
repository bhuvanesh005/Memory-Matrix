const cards = document.querySelectorAll('.card');
const container = document.getElementById('container');
const playAgainBtn = document.getElementById('play-again');
playAgainBtn.addEventListener('click', () => window.location.reload());

let isFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
let matchCount = 0;

const totalPairs = 8;

cards.forEach(card => {
    card.addEventListener('click', flipCard);
});

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');

    if (!isFlipped) {
        isFlipped = true;
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}

function shuffle() {
    cards.forEach(card => {
        let rand = Math.floor(Math.random() * 16);
        card.style.order = rand;
    });
}
shuffle();

function checkForMatch() {
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;
    isMatch ? disableCard() : unflipCards();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function disableCard() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchCount++;
    if (matchCount === totalPairs) {
        showConfetti();
    }
    resetBoard();
}

function resetBoard() {
    [isFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function startConfetti() {
    function createConfettiPiece() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        const sizeClass = ['small', 'medium', 'large'][Math.floor(Math.random() * 3)];
        confetti.classList.add(sizeClass);

        const confettiColors = ['#FFC107', '#2196F3', '#FF5722', '#4CAF50', '#E91E63'];
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];

        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;

        container.appendChild(confetti);

        confetti.addEventListener('animationend', () => confetti.remove());
    }

    for (let i = 0; i < 2000; i++) {
        createConfettiPiece();
    }
}

function showConfetti() {
    startConfetti();
    playAgainBtn.style.display = 'block';
    document.getElementById('congt').style.display = 'block';
}
