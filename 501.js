/**
 * Player Class
 * @param {string} name - player name
 * @param {number} currentScore - player score
 * @param {array} legVisits - An array that holds every visit/turn taken by a player in a leg
 * @param {number} legsWon - legs won by a player
 * @function getAverage - returns the average of the player's leg visits
 */

class Player {
    constructor(name) {
        this.name = name;
        this.currentScore = 0;
        this.legVisits = [];
        this.legsWon = 0;
    }

    getAverage() {
        let total = 0;
        let darts = 0;
        this.legVisits.forEach(function(visit) {
            total += visit.score;
            darts += visit.darts;
        });
        return total / darts;
    }
}


/**
 * Match Class
 * @param {boolean} firstPlayerTurn - boolean used to determine the turn of the player
 * @param {Player} p1 - player object for match participant 1
 * @param {Player} p2 - player object for match participant 2
 * @param {number} needToWin - number of legs needed to win the match
 * @param {number} gameScore - number of points needed to win a leg
 * @function startMatch - starts the match
 * @function matchDirector - controls the flow of the match
 * @function updateMatchScore - updates the games won on the scoreboard
 * @function updateAverage - updates the average of the player
 * @function endGame - ends the match
 * @function playerTurn - conducts a complete turn of the player
 * @function validateScore - checks the input score for validity
 * @function resetScore - resets the score after a leg has finished
 *
 */



class Match {
    constructor(gameScore, p1object, p2object, needToWin) {
        this.firstPlayerTurn = true;
        this.p1 = p1object;
        this.p2 = p2object;
        this.p1name = p1object;
        this.p2name = p2object;
        this.needToWin = needToWin;
        this.gameScore = gameScore;
        this.gameOver = false;
        this.visitID = 1;
        this.goesFirst = this.p1;
        this.currentPlayer = this.p1;
    }

    startMatch() {
        this.p1.currentScore = this.gameScore;
        this.p2.currentScore = this.gameScore;
        console.log(this.p1.currentScore)
        document.querySelector('#player1-name').innerText = this.p1.name;
        p2nameDiv.innerText = this.p2.name;
        p1nameDiv.innerText = this.p1.name;
        player1scoreboard.innerHTML = this.p1.currentScore;
        player2scoreboard.innerHTML = this.p2.currentScore;
        this.updateDisplay();
    }

    matchDirector(scored) {

        let visit = new Visit(scored);

        if (this.validateScore(visit)) {

            this.playerTurn(this.currentPlayer, visit);

        }else{

            this.displayNotice('Invalid score');
        }

        if (this.currentPlayer.currentScore === 0) {

            this.currentPlayer.legsWon++;

            // check to see if target games required to win has been met
            if(this.currentPlayer.legsWon === parseInt(this.needToWin)){ console.log('game over'); this.endGame(); }

            this.displayNotice("Leg over: " + this.currentPlayer.name + ' wins');
            this.updateMatchScore();
            this.resetScores();
        }

        this.updateDisplay();
        this.nextPlayer();

    }

    playerTurn(currentPlayer, visit) {
        currentPlayer.currentScore -= visit.score;
        this.visitID++;
        this.firstPlayerTurn = !this.firstPlayerTurn;
        currentPlayer.legVisits.push(visit);
        currentPlayer === this.p1 ? p1avgDiv.innerHTML = (Math.round(this.p1.getAverage() * 10) / 10).toString() : p2avgDiv.innerHTML = (Math.round(this.p2.getAverage() * 10) / 10).toString();
    }

    validateScore(visit){
        let validateLessThanGameScore = visit.score <= this.currentPlayer.currentScore;
        let validateLessThan180 = visit.score <= 180;
        let validateDontLeave1 = (this.currentPlayer.currentScore - visit.score) !== 1;

        return validateLessThanGameScore && validateLessThan180 && validateDontLeave1;
    }

    resetScores(){
        this.p1.currentScore = this.gameScore;
        this.p2.currentScore = this.gameScore;
        this.goesFirst = this.goesFirst === this.p1 ? this.p2 : this.p1;
        this.updateDisplay();
    }

    updateDisplay(){
        p1scoreDiv.innerHTML = this.p1.currentScore;
        p2scoreDiv.innerHTML = this.p2.currentScore;
        p1nameDiv.classList.remove('green');
        p2nameDiv.classList.remove('green');
        if(this.p1.legVisits.length > this.p2.legVisits.length){
            p2nameDiv.classList.add('green');
        }else{
            p1nameDiv.classList.add('green');
        }
    }

    updateMatchScore(){
        document.querySelector('#p1legs').innerText = this.p1.legsWon;
        document.querySelector('#p2legs').innerText = this.p2.legsWon;
        if(this.p1.legsWon === this.needToWin || this.p2.legsWon === this.needToWin){
            this.gameOver()
        }
    }

    displayNotice(message){

        document.querySelector('#modal-body').innerText = "";

        let notice = document.createElement('div');
        notice.classList.add('notice');
        notice.innerText = message;

        document.querySelector('#modal-body').appendChild(notice);

        modal.style.display = "block";
        setTimeout(function(){ modal.style.display = "none"; }, 2300);
    }

    nextPlayer(){
        this.currentPlayer = this.currentPlayer === this.p1 ? this.p2 : this.p1;
    }

    endGame(){
        document.querySelector('#end-p1').innerText = this.p1.name + ": ";
        document.querySelector('#end-p2').innerText = this.p2.name + ": ";
        document.querySelector('#p1-final-score').innerText = this.p1.legsWon;
        document.querySelector('#p2-final-score').innerText = this.p2.legsWon;
        document.querySelector('#app').classList.add('hidden');
        document.querySelector('#its-over').classList.remove('hidden');
    }

}

/**
 * @class Visit
 * @classdesc Class for a visit object
 * @param {number} score - the score of the visit
 * @param {number} visitID - the ID of the visit
 * @param {number} darts - the number of darts thrown during the visit
 */

class Visit {
  constructor(score, darts=3) {
    this.visitID = match.visitID;
    this.score = score;
    this.darts = darts;
  }
}

/**
 * @function numpadHit - handles the user scoring input to enforce requirements and usability
 */

function numpadHit(num) {
    if (num !== 'enter' && num !== 'bust') {
        let currentValue = points.innerText;
        currentValue += num;
        if (currentValue.length > 3) {
            currentValue = num;
        }
        points.innerText = currentValue;
    }

    if (num === 'enter') {
        try {
           let currentValue = parseInt(points.innerText);
           match.matchDirector(currentValue);
           points.innerText = '';
        }catch (err) {
            console.log(err);
        }
    }

    if (num === 'bust') {
        match.matchDirector(0);
        points.innerText = '';
    }
}

let p1name;
let p2name;
let raceTo;
let match;

