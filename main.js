"use strict";
let card1 = null;
let card2 = null;
let openedCards = 0;
let hits = 0;
let secondsLeft = 30;
let moves = 0;
let initialSecs = secondsLeft;
let canOpenCards = true;
let timerActive = false;
let timeLeft;
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => Math.random() - .5);
const buttons = Array.from(document.querySelectorAll('#table-buttons button'));
const timer = document.querySelector('#time-left');
const resetBtn = document.querySelector('#reset');
const countdown = () => {
    if (!timerActive) {
        timeLeft = setInterval(() => {
            secondsLeft--;
            timer.textContent = `Tiempo restante: ${(secondsLeft === 1) ? secondsLeft + ' segundo' : secondsLeft + ' segundos'} `;
            (secondsLeft <= 10) ? timer.style.color = '#ff1e00' : timer.style.color = '#14396a';
            if (secondsLeft === 0) {
                clearInterval(timeLeft);
                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].textContent = numbers[i].toString();
                    buttons[i].disabled = true;
                }
                timer.textContent = `Se acabó el tiempo. Perdiste 🙁❌`;
            }
            ;
        }, 1000);
    }
    timerActive = true;
};
const addMoves = () => {
    const movesCounter = document.querySelector('#moves');
    moves++;
    movesCounter.textContent = `Movimientos: ${moves}`;
};
const addHits = () => {
    const hitCounter = document.querySelector('#score');
    hits++;
    hitCounter.textContent = `Aciertos: ${hits}`;
};
const showNumber = (e) => {
    const btnSelected = e.target;
    const idBtn = parseInt(btnSelected.id);
    if (!canOpenCards)
        return;
    openedCards++;
    if (openedCards <= 2) {
        btnSelected.textContent = `${numbers[idBtn]}`;
        btnSelected.disabled = true;
        if (openedCards === 1) {
            card1 = btnSelected;
        }
        else if (openedCards === 2) {
            card2 = btnSelected;
            if (card1.textContent === card2.textContent) {
                openedCards = 0;
                card1 = null;
                card2 = null;
                addHits();
                addMoves();
                if (hits === 8) {
                    clearInterval(timeLeft);
                    timer.textContent = `¡Felicidades! Lo lograste en ${initialSecs - secondsLeft} segundos. 🥳🏆`;
                    timer.style.color = '#0a8a1f';
                }
            }
            else {
                canOpenCards = false;
                openedCards = 0;
                addMoves();
                setTimeout(() => {
                    card1.disabled = false;
                    card2.disabled = false;
                    card1.textContent = '';
                    card2.textContent = '';
                    card1 = null;
                    card2 = null;
                    canOpenCards = true;
                }, 600);
            }
            ;
        }
        ;
    }
    ;
};
buttons.forEach(btn => {
    btn.addEventListener('click', showNumber);
    btn.addEventListener('click', countdown);
});
resetBtn.addEventListener('click', () => {
    window.location.reload();
});
//# sourceMappingURL=main.js.map