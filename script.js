const arrOfQuestions = [
  "Sabse zyada ‘momos’ khaane wala banda, ek chhota drink le!",
  "If your Insta bio says ‘wanderlust’ or ‘foodie,’ pee lo! (water or whatever).",
  "Aapki group mein jo banda ‘galeech’ jokes banata hai, drink!",
  "Jo banda ‘Kota Factory’ binge-watcher hai, unko treat kar do with a sip!",
  "If you’ve ever shouted in front of your family during a cricket match, bottoms up!",
  "The person with the most unread WhatsApp chats, drink one!",
  "Sabse zyada ‘reels’ banane wala banda, apna token sip le!",
  "Anyone who can perfectly mimic ‘DDLJ ka train scene,’ take two sips!",
  "If you’ve ever said ‘Modiji hai to mumkin hai,’ your turn to drink!",
  "Whoever is wearing red right now, take a drink!",
  "If you’ve ever stolen Wi-Fi from your neighbor, sip it up!",
  "Anyone who’s ever lied about their marks to their parents, take a drink.",
  "If you’re the last person to wake up in the group, bottoms up!",
  "If you’ve ever made an excuse like ‘tabiyat kharab hai’ to avoid plans, drink up!",
  "Whoever’s phone battery is below twenty percent, take two sips!",
  "If you’ve ever binge-watched an entire series in one sitting, bottoms up!",
  "Whoever’s most active in family WhatsApp groups, sip it up!",
  "If you’ve ever played ‘antakshari’ during a road trip, it’s your turn to drink!",
  "Anyone who’s ever done a Bollywood dance move at a party, take a drink.",
  "If you’ve ever forgotten a friend’s birthday, take two sips!",
  "Whoever has a pet name that only their family uses, bottoms up!",
  "Whoever’s been called ‘modern’ by their relatives, take a sip.",
  "If you’ve ever cried during a Shah Rukh Khan movie, drink twice!",
  "Whoever’s eaten paani puri in the last week, bottoms up!",
  "Whoever’s wearing glasses right now, take a drink.",
  "If you’ve ever accidentally liked an old Instagram post while stalking someone, sip it up!",
  "Anyone who has ever called someone ‘bhaiya’ or ‘didi’ just to get extra discount, take a drink.",
  "Whoever is currently single, take two sips—one for yourself and one for your imaginary partner!",
  "Whoever has forgotten their own wallet during a group outing, take a drink.",
  "Whoever’s the loudest person in the group, it’s your turn to drink.",
  "Whoever can recite the entire ‘3 Idiots’ speech, take a drink—you’ve earned it!",
  "Whoever has a hidden stash of snacks at home, take a drink and own it!",
  "Anyone who’s danced to ‘Kajra Re’ at a wedding, take two sips.",
  "Whoever owns a keychain with their name on it, take a drink.",
  "If you’ve ever stayed up all night just to watch cricket, sip it up!",
  "Whoever has ever tried to convince someone with ‘ek aur le lo na, kal gym kar lenge,’ drink up!",
];

let players = [];
let lastIndex = -1;
const playersGrid = document.getElementById("playersGrid");
const emptyState = document.getElementById("emptyState");

function showRandomQuestion() {
  let i;
  do {
    i = Math.floor(Math.random() * arrOfQuestions.length);
  } while (i === lastIndex && arrOfQuestions.length > 1);
  lastIndex = i;

  const el = document.getElementById("question");

  el.classList.remove("fade-in");
  void el.offsetWidth; // trigger reflow

  el.textContent = arrOfQuestions[i];
  el.classList.add("fade-in");
}

function addPlayer() {
  const playerNameInput = document.getElementById("playerName");
  const errorMessage = document.getElementById("error");
  const name = playerNameInput.value.trim();

  if (!name) {
    errorMessage.textContent = "Player name cannot be empty!";
    return;
  }
  if (players.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
    errorMessage.textContent = "Player already in the game!";
    return;
  }

  players.push({ name: name, score: 0 });
  playerNameInput.value = "";
  errorMessage.textContent = "";
  renderPlayers();
}

function updateScore(playerIndex, change) {
  players[playerIndex].score = Math.max(0, players[playerIndex].score + change);

  const scoreEl = document.getElementById(`score-${playerIndex}`);
  if (scoreEl) {
    scoreEl.textContent = players[playerIndex].score;
    scoreEl.classList.remove("pop-in");
    void scoreEl.offsetWidth;
    scoreEl.classList.add("pop-in");
  } else {
    renderPlayers();
  }
}

function renderPlayers() {
  playersGrid.innerHTML = ""; // Clear everything including empty state

  if (players.length === 0) {
    // If no players, put the empty state back
    playersGrid.appendChild(emptyState);
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none"; // Hide it when we have players

  players.forEach((player, index) => {
    const tile = document.createElement("div");
    tile.className = "player-tile pop-in";
    tile.style.animationDelay = `${index * 0.05}s`;

    tile.innerHTML = `
      <div class="player-name" title="${player.name}">${player.name}</div>
      <div class="player-score" id="score-${index}">${player.score}</div>
      <div class="score-controls">
        <button class="score-btn score-down" onclick="updateScore(${index}, -1)">-</button>
        <button class="score-btn score-up" onclick="updateScore(${index}, 1)">+</button>
      </div>
    `;
    playersGrid.appendChild(tile);
  });
}

// Allow pressing Enter to add a player
document.getElementById("playerName").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addPlayer();
  }
});
