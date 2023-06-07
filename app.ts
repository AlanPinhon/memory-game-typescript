let card1:HTMLButtonElement | null = null;
let card2:HTMLButtonElement | null = null;
let openedCards:number = 0;
let hits:number = 0;
let secondsLeft:number = 30;
let moves: number = 0;
let initialSecs:number = secondsLeft;
let canOpenCards:boolean = true;
let timerActive:boolean = false;
let timeLeft:number;
let numbers: number[] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => Math.random() - .5);

const buttons = Array.from(document.querySelectorAll('#table-buttons button')) as HTMLButtonElement[];
const timer = document.querySelector('#time-left') as HTMLHeadElement;
const resetBtn = document.querySelector('#reset') as HTMLButtonElement;

// Inicia el temporizador solo una vez
//Start the timer once
const countdown = ():void => {
  if(!timerActive) {
    
    timeLeft = setInterval(() => {

      secondsLeft--;
      timer.textContent = `Tiempo restante: ${(secondsLeft === 1) ? secondsLeft + ' segundo' : secondsLeft + ' segundos'} `;
      (secondsLeft <= 10) ? timer.style.color = '#ff1e00' : timer.style.color = '#14396a'

      if(secondsLeft === 0){
        clearInterval(timeLeft);
        for(let i = 0; i < buttons.length; i++){
          buttons[i].textContent = numbers[i].toString();
          buttons[i].disabled = true;
        }
        timer.textContent = `Se acabó el tiempo. Perdiste 🙁❌`;
      }; 
    },1000);
  }

  timerActive = true;
};

//Suma los movimientos
//Add up the moves
const addMoves = ():void => {
  const movesCounter = document.querySelector('#moves') as HTMLHeadElement;
  moves++;
  movesCounter.textContent = `Movimientos: ${moves}`;
};

//Suma las coincidencias
//Add up the hits
const addHits = ():void => {
  const hitCounter = document.querySelector('#score') as HTMLHeadElement;
  hits++;
  hitCounter.textContent = `Aciertos: ${hits}`;
};

//Muestra los números al dar click
//Show numbers when clicked
const showNumber = (e: MouseEvent):void => {
  const btnSelected = e.target as HTMLButtonElement;
  const idBtn:number = parseInt(btnSelected.id);

  if(!canOpenCards) return;
  openedCards++;

  if(openedCards <= 2) {
    btnSelected.textContent = `${numbers[idBtn]}`;
    btnSelected.disabled = true;

    if(openedCards === 1){
      card1 = btnSelected;
    } else if (openedCards === 2){
      card2 = btnSelected;
      
      if(card1!.textContent === card2!.textContent){
        openedCards = 0;
        card1 = null;
        card2 = null;
        addHits();
        addMoves();
        if(hits === 8) {
          clearInterval(timeLeft);
          timer.textContent = `¡Felicidades! Lo lograste en ${initialSecs - secondsLeft} segundos. 🥳🏆`
          timer.style.color = '#0a8a1f'
        }
      } else {
        canOpenCards = false;
        openedCards = 0;
        addMoves();
        
        setTimeout(() => {
          card1!.disabled = false;
          card2!.disabled = false;
          card1!.textContent = '';
          card2!.textContent = '';
          card1 = null;
          card2 = null;
          canOpenCards = true;
        }, 600);
      };
    };
  };
};

buttons.forEach( btn => {
  btn.addEventListener('click', showNumber);
  btn.addEventListener('click', countdown);
});

resetBtn.addEventListener('click', () => {
  window.location.reload();
});