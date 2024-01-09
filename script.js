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
        this.resultTextElement = document.getElementById('result-text');
        this.choicesTextElement = document.getElementById('choices-text');
        
        this.setupEventListeners();
        this.updateScoreboard();
    }

    setupEventListeners() {
        // Choice buttons
        document.querySelectorAll('.choice-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const playerChoice = e.target.dataset.choice;
                this.playRound(playerChoice);
            });
        });

        // Reset button
        document.getElementById('reset-btn').addEventListener('click', () => {
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
            'rock': 'scissors',
            'paper': 'rock',
            'scissors': 'paper'
        };

        return winConditions[playerChoice] === computerChoice ? 'player' : 'computer';
    }

    playRound(playerChoice) {
        const computerChoice = this.getComputerChoice();
        const winner = this.determineWinner(playerChoice, computerChoice);

        this.displayChoices(playerChoice, computerChoice);
        this.updateGame(winner);
    }

    displayChoices(playerChoice, computerChoice) {
        const choiceEmojis = {
            'rock': '🪨',
            'paper': '📄',
            'scissors': '✂️'
        };

        this.choicesTextElement.textContent = 
            `You chose ${choiceEmojis[playerChoice]} ${playerChoice} | Computer chose ${choiceEmojis[computerChoice]} ${computerChoice}`;
    }

    updateGame(winner) {
        let resultMessage = '';
        let resultClass = '';

        switch (winner) {
            case 'player':
                this.playerScore++;
                resultMessage = '🎉 You win this round!';
                resultClass = 'win';
                break;
            case 'computer':
                this.computerScore++;
                resultMessage = '😞 Computer wins this round!';
                resultClass = 'lose';
                break;
            case 'tie':
                resultMessage = '🤝 It\'s a tie!';
                resultClass = 'tie';
                break;
        }

        this.resultTextElement.textContent = resultMessage;
        this.resultTextElement.className = resultClass;
        this.updateScoreboard();
    }

    updateScoreboard() {
        this.playerScoreElement.textContent = this.playerScore;
        this.computerScoreElement.textContent = this.computerScore;
    }

    resetGame() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.resultTextElement.textContent = 'Choose your weapon!';
        this.choicesTextElement.textContent = '';
        this.resultTextElement.className = '';
        this.updateScoreboard();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new RockPaperScissors();
});