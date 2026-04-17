let score = 0;
let missed = 0;
let gameInterval;
let spawnInterval;

const gameArea = document.getElementById("gameArea");
const basket = document.getElementById("basket");

function startGame() {
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");

  score = 0;
  missed = 0;
  updateScore();

  spawnInterval = setInterval(spawnIdea, 1000);
}

function spawnIdea() {
  const idea = document.createElement("div");
  idea.classList.add("idea");
  idea.innerText = "💡";

  idea.style.left = Math.random() * (window.innerWidth - 30) + "px";
  gameArea.appendChild(idea);

  let top = 0;

  const fall = setInterval(() => {
    top += 5;
    idea.style.top = top + "px";

    const basketRect = basket.getBoundingClientRect();
    const ideaRect = idea.getBoundingClientRect();

    // Collision
    if (
      ideaRect.bottom >= basketRect.top &&
      ideaRect.left < basketRect.right &&
      ideaRect.right > basketRect.left
    ) {
      score++;
      updateScore();
      idea.remove();
      clearInterval(fall);
    }

    // Missed
    if (top > window.innerHeight) {
      missed++;
      updateScore();
      idea.remove();
      clearInterval(fall);

      if (missed >= 5) {
        endGame(false);
      }
    }

  }, 30);
}

function updateScore() {
  document.getElementById("score").innerText = score;
  document.getElementById("missed").innerText = missed;

  if (score >= 15) {
    endGame(true);
  }
}

// Move basket
document.addEventListener("mousemove", (e) => {
  basket.style.left = e.clientX - 40 + "px";
});

// Mobile touch
document.addEventListener("touchmove", (e) => {
  basket.style.left = e.touches[0].clientX - 40 + "px";
});

function endGame(win) {
  clearInterval(spawnInterval);

  document.getElementById("gameScreen").classList.add("hidden");
  document.getElementById("endScreen").classList.remove("hidden");

  document.getElementById("resultText").innerText =
    win ? "🎉 You Spread Great Ideas!" : "💔 Too Many Ideas Lost!";
}

function restartGame() {
  location.reload();
}