// add event listener for all items of class "number-btn
const keyPadNums = document.querySelectorAll('.number-btn');

// iterate through all the buttons
keyPadNums.forEach(function(num){
    num.addEventListener("click", function(e) {
    numpadHit(e.target.innerText);
    });
});

// listen for page load
document.addEventListener("DOMContentLoaded", function() {

    // add listener for the start button
    document.querySelector('#start-btn').addEventListener('click', function() {
        // toggle display of the registration form
        document.querySelector('#registration').classList.toggle('hidden');
        document.querySelector('#app').classList.toggle('hidden');
        let p1name = document.querySelector('#player1-name-input').value;
        let p2name = document.querySelector('#player2-name-input').value;
        let raceTo = document.querySelector('#race-to').value;
        p1name = p1name === "" ? "Player 1" : p1name;
        p2name = p2name === "" ? "Player 2" : p2name;
        raceTo = raceTo === "" ? 8 : raceTo;
        let playerOne = new Player(p1name);
        let playerTwo = new Player(p2name);
        match = new Match(101, playerOne, playerTwo, raceTo);
        match.startMatch();

    });
});


// set div selector shortcuts
const player1scoreboard = document.querySelector('#player1-score');
const player2scoreboard = document.querySelector('#player2-score');
const p2scoreDiv = document.querySelector('#player2-score');
const p1scoreDiv = document.querySelector('#player1-score');
const p1nameDiv = document.querySelector('#player1-name');
const p2nameDiv = document.querySelector('#player2-name');
const p1avgDiv = document.querySelector('#player1-avg');
const p2avgDiv = document.querySelector('#player2-avg');
const points = document.querySelector('#turn-score');
const numpad1 = document.querySelector('#num-one');
const numpad2 = document.querySelector('#num-two');
const numpad3 = document.querySelector('#num-three');
const numpad4 = document.querySelector('#num-four');
const numpad5 = document.querySelector('#num-five');
const numpad6 = document.querySelector('#num-six');
const numpad7 = document.querySelector('#num-seven');
const numpad8 = document.querySelector('#num-eight');
const numpad9 = document.querySelector('#num-nine');
const numpad0 = document.querySelector('#num-zero');
const numSubmit = document.querySelector('#num-submit');
const numUndo = document.querySelector('#num-undo');


