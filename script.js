class RockPaperScissors {
    constructor() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.choices = ['rock', 'paper', 'scissors'];
        
        this.initializeGame();
    }

    initializeGame() {
        this.playerScoreElement = document.getElementById('player-score');
        this.computerScoreElement = document.getElementById('computer-score');
        this.roundResultElement = document.getElementById('round-result');
        this.choicesDisplayElement = document.getElementById('choices-display');
        this.resetButton = document.getElementById('reset-btn');

        this.setupEventListeners();
        this.updateScoreDisplay();
    }

    setupEventListeners() {
        const choiceButtons = document.querySelectorAll('.choice-btn');
        
        choiceButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const playerChoice = e.target.dataset.choice;
                this.playRound(playerChoice);
            });
        });

        this.resetButton.addEventListener('click', () => {
            this.resetGame();
        });
    }

    getComputerChoice() {
        const randomIndex = Math.floor(Math.random() * this.choices.length);
        return this.choices[randomIndex];
    }

    determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return 'tie';
        }

        const winConditions = {
            rock: 'scissors',
            paper: 'rock',
            scissors: 'paper'
        };

        return winConditions[playerChoice] === computerChoice ? 'player' : 'computer';
    }

    playRound(playerChoice) {
        const computerChoice = this.getComputerChoice();
        const winner = this.determineWinner(playerChoice, computerChoice);

        this.updateRoundResult(playerChoice, computerChoice, winner);
        this.updateScore(winner);
        this.updateScoreDisplay();
    }

    updateRoundResult(playerChoice, computerChoice, winner) {
        const playerEmoji = this.getEmoji(playerChoice);
        const computerEmoji = this.getEmoji(computerChoice);

        this.choicesDisplayElement.textContent = 
            `You chose ${playerEmoji} | Computer chose ${computerEmoji}`;

        switch (winner) {
            case 'player':
                this.roundResultElement.textContent = 'You win this round! 🎉';
                this.roundResultElement.className = 'win';
                break;
            case 'computer':
                this.roundResultElement.textContent = 'Computer wins this round! 🤖';
                this.roundResultElement.className = 'lose';
                break;
            default:
                this.roundResultElement.textContent = "It's a tie! 😐";
                this.roundResultElement.className = 'tie';
        }
    }

    getEmoji(choice) {
        const emojis = {
            rock: '✊',
            paper: '✋',
            scissors: '✌️'
        };
        return emojis[choice];
    }

    updateScore(winner) {
        if (winner === 'player') {
            this.playerScore++;
        } else if (winner === 'computer') {
            this.computerScore++;
        }
    }

    updateScoreDisplay() {
        this.playerScoreElement.textContent = this.playerScore;
        this.computerScoreElement.textContent = this.computerScore;
    }

    resetGame() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.updateScoreDisplay();
        
        this.roundResultElement.textContent = 'Make your choice!';
        this.roundResultElement.className = '';
        this.choicesDisplayElement.textContent = '';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new RockPaperScissors();
});