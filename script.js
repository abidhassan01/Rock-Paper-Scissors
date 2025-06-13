(() => {
  const choices = ['rock', 'paper', 'scissors'];
  const emojiMap = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
  };

  let playerScore = 0;
  let computerScore = 0;
  let drawScore = 0;

  const userChoiceDisplay = document.getElementById('userChoice');
  const computerChoiceDisplay = document.getElementById('computerChoice');
  const resultMessage = document.getElementById('resultMessage');
  const playerScoreDisplay = document.getElementById('playerScore');
  const computerScoreDisplay = document.getElementById('computerScore');
  const drawScoreDisplay = document.getElementById('drawScore');
  const buttons = document.querySelectorAll('.choice-btn');

  function computerPlay() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  function determineWinner(player, computer) {
    if (player === computer) return 'draw';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) return 'win';
    return 'lose';
  }

  function updateScores(result) {
    if (result === 'win') {
      playerScore++;
      playerScoreDisplay.textContent = playerScore;
    } else if (result === 'lose') {
      computerScore++;
      computerScoreDisplay.textContent = computerScore;
    } else {
      drawScore++;
      drawScoreDisplay.textContent = drawScore;
    }
  }

  function clearActiveButtons() {
    buttons.forEach(btn => btn.setAttribute('aria-pressed', 'false'));
  }

  function playRound(playerSelection) {
    clearActiveButtons();
    document.getElementById(playerSelection).setAttribute('aria-pressed', 'true');

    const computerSelection = computerPlay();

    userChoiceDisplay.textContent = emojiMap[playerSelection];
    computerChoiceDisplay.textContent = emojiMap[computerSelection];

    const result = determineWinner(playerSelection, computerSelection);

    resultMessage.textContent =
      result === 'win' ? 'You Win! 🎉' :
      result === 'lose' ? 'You Lose! 😞' :
      "It's a Draw! 🤝";

    resultMessage.style.color =
      result === 'win' ? 'var(--win-color)' :
      result === 'lose' ? 'var(--lose-color)' :
      'var(--draw-color)';

    updateScores(result);
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => playRound(button.id));
    button.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });
})();
