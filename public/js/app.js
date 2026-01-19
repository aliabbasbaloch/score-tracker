// Game State
const gameState = {
    players: [],
    currentPlayerIndex: -1,
    history: [],
    scoringMode: 'add',
    targetScore: 150,
    winner: null,
    completedPlayers: [],
    isSubtractMode: false,
    balls: [
        { name: "Yellow", points: 2, color: "var(--yellow)", bg: "#ffdd00", emoji: "🟡" },
        { name: "Green", points: 3, color: "var(--green)", bg: "#33ff77", emoji: "🟢" },
        { name: "Brown", points: 4, color: "var(--brown)", bg: "#d2691e", emoji: "🟤" },
        { name: "Blue", points: 5, color: "var(--blue)", bg: "#4d9fff", emoji: "🔵" },
        { name: "Pink", points: 6, color: "var(--pink)", bg: "#ff66cc", emoji: "🌸" },
        { name: "Black", points: 7, color: "var(--black)", bg: "#222222", emoji: "⚫" },
        { name: "Red", points: 10, color: "var(--red)", bg: "#ff5555", emoji: "🔴" }
    ]
};

// DOM Elements
let playerNameInput, addPlayerBtn, playersList, ballsGrid, historyList;
let subtractBtn, undoBtn, nextPlayerBtn, resetBtn;
let currentPlayerName, currentPlayerScore, currentPlayerRemaining;
let targetScoreSelect, gameOverSection;

// Initialize DOM elements
function initDOMElements() {
    playerNameInput = document.getElementById('playerNameInput');
    addPlayerBtn = document.getElementById('addPlayerBtn');
    playersList = document.getElementById('playersList');
    ballsGrid = document.getElementById('ballsGrid');
    historyList = document.getElementById('historyList');
    subtractBtn = document.getElementById('subtractBtn');
    undoBtn = document.getElementById('undoBtn');
    nextPlayerBtn = document.getElementById('nextPlayerBtn');
    resetBtn = document.getElementById('resetBtn');
    currentPlayerName = document.getElementById('currentPlayerName');
    currentPlayerScore = document.getElementById('currentPlayerScore');
    currentPlayerRemaining = document.getElementById('currentPlayerRemaining');
    targetScoreSelect = document.getElementById('targetScoreSelect');
    gameOverSection = document.getElementById('gameOverSection');
}

// Initialize the app
function init() {
    initDOMElements();
    renderPlayers();
    renderBalls();
    updateCurrentPlayerDisplay();
    setupEventListeners();
}

// Player Management
function addPlayer(name) {
    if (!name.trim() || gameState.players.length >= 6) {
        if (gameState.players.length >= 6) {
            alert('❌ Maximum 6 players allowed!');
        }
        return;
    }
    
    const player = {
        id: Date.now(),
        name: name.trim(),
        score: 0,
        isCompleted: false,
        isWinner: false
    };
    
    gameState.players.push(player);
    
    if (gameState.currentPlayerIndex === -1) {
        gameState.currentPlayerIndex = 0;
    }
    
    renderPlayers();
    updateCurrentPlayerDisplay();
    
    // Add history entry
    const historyEntry = {
        type: 'add_player',
        playerName: player.name,
        timestamp: new Date().getTime()
    };
    gameState.history.push(historyEntry);
    renderHistory();
    
    playerNameInput.value = '';
    playerNameInput.focus();
}

function removePlayer(id) {
    const index = gameState.players.findIndex(p => p.id === id);
    if (index === -1) return;
    
    const playerName = gameState.players[index].name;
    gameState.players.splice(index, 1);
    
    if (gameState.players.length === 0) {
        gameState.currentPlayerIndex = -1;
    } else if (gameState.currentPlayerIndex >= index && gameState.currentPlayerIndex > 0) {
        gameState.currentPlayerIndex--;
    }
    
    renderPlayers();
    updateCurrentPlayerDisplay();
    
    // Add history entry
    const historyEntry = {
        type: 'remove_player',
        playerName: playerName,
        timestamp: new Date().getTime()
    };
    gameState.history.push(historyEntry);
    renderHistory();
}

function setCurrentPlayer(id) {
    const index = gameState.players.findIndex(p => p.id === id);
    if (index !== -1 && !gameState.players[index].isCompleted) {
        gameState.currentPlayerIndex = index;
        renderPlayers();
        updateCurrentPlayerDisplay();
    }
}

// Rendering Functions
function renderPlayers() {
    playersList.innerHTML = '';
    
    if (gameState.players.length === 0) {
        playersList.innerHTML = `
            <div class="text-center p-5 text-text-secondary italic flex flex-col items-center gap-2">
                <i class="fas fa-user-plus text-2xl"></i>
                No players yet. Add players to start.
            </div>
        `;
        return;
    }
    
    gameState.players.forEach((player, index) => {
        const playerCard = document.createElement('div');
        let cardClasses = 'bg-accent-bg p-2.5 rounded-lg border border-border-color transition-all duration-200 relative flex items-center justify-between min-h-[65px] cursor-pointer';
        
        if (index === gameState.currentPlayerIndex && !player.isCompleted) {
            cardClasses += ' !border-snooker-green shadow-[0_0_0_1px_var(--green),0_3px_10px_rgba(51,255,119,0.2)]';
        }
        if (player.isWinner) {
            cardClasses += ' !border-yellow-400 shadow-[0_0_0_2px_gold,0_5px_15px_rgba(255,215,0,0.3)] bg-gradient-to-br from-accent-bg to-yellow-900/10';
        }
        if (player.isCompleted) {
            cardClasses += ' !border-snooker-blue opacity-80 bg-gradient-to-br from-accent-bg to-blue-900/10';
        }
        
        playerCard.className = cardClasses;
        playerCard.onclick = () => setCurrentPlayer(player.id);
        
        // Calculate remaining score
        const remaining = gameState.targetScore - player.score;
        const showRemaining = remaining <= 20 && remaining > 0 && !player.isCompleted && !player.isWinner;
        
        // Determine status text and emoji
        let statusText = '';
        let statusEmoji = '';
        
        if (index === gameState.currentPlayerIndex && !player.isCompleted) {
            statusText = 'Current';
            statusEmoji = '🎱';
        } else if (player.isWinner) {
            statusText = 'WINNER!';
            statusEmoji = '🏆';
        } else if (player.isCompleted) {
            statusText = 'Completed';
            statusEmoji = '✅';
        } else {
            statusText = 'Tap to select';
            statusEmoji = '👆';
        }
        
        playerCard.innerHTML = `
            <div class="flex items-center gap-2.5 flex-1 min-w-0">
                <div class="w-9 h-9 rounded-full bg-gradient-to-br from-snooker-blue to-snooker-purple flex items-center justify-center font-bold text-base flex-shrink-0 border-2 border-white/20">
                    ${player.name.charAt(0).toUpperCase()}
                </div>
                <div class="flex-1 min-w-0">
                    <div class="font-semibold text-sm overflow-hidden text-ellipsis whitespace-nowrap mb-0.5 flex items-center gap-1.5" title="${player.name}">
                        <i class="fas fa-user"></i> ${player.name}
                    </div>
                    <div class="text-xs text-text-secondary flex items-center gap-1">
                        ${statusEmoji} ${statusText}
                    </div>
                    ${showRemaining ? `
                        <div class="text-xs text-snooker-yellow bg-snooker-yellow/15 px-2 py-0.5 rounded mt-0.5 font-bold inline-flex items-center gap-1 border border-snooker-yellow/20">
                            <i class="fas fa-hourglass-half"></i> ${remaining} points left
                        </div>
                    ` : ''}
                </div>
            </div>
            <div class="text-2xl font-bold text-snooker-green min-w-[50px] text-right pl-2 text-shadow-md">${player.score}</div>
            ${!player.isWinner && !player.isCompleted ? `
                <button class="bg-red-500/10 border border-red-500/30 text-snooker-red text-sm cursor-pointer p-1.5 rounded-md ml-1 flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-red-500/20 transition-colors" onclick="event.stopPropagation(); removePlayer(${player.id})" title="Remove player">
                    <i class="fas fa-times"></i>
                </button>
            ` : ''}
            ${player.isCompleted ? '<div class="absolute top-1.5 right-1.5 text-base">🏆</div>' : ''}
        `;
        
        playersList.appendChild(playerCard);
    });
}

function renderBalls() {
    ballsGrid.innerHTML = '';
    
    gameState.balls.forEach(ball => {
        const ballBtn = document.createElement('button');
        ballBtn.className = 'ball-btn border-2';
        ballBtn.style.background = `radial-gradient(circle at 30% 30%, ${ball.bg}, ${darkenColor(ball.bg, 20)})`;
        ballBtn.style.borderColor = ball.color;
        
        ballBtn.innerHTML = `
            <div class="ball-points">${ball.points}</div>
            <div class="ball-name">${ball.emoji} ${ball.name}</div>
        `;
        
        ballBtn.onclick = () => scoreBall(ball);
        ballsGrid.appendChild(ballBtn);
    });
}

function renderHistory() {
    historyList.innerHTML = '';
    
    if (gameState.history.length === 0) {
        historyList.innerHTML = `
            <div class="text-center p-5 text-text-secondary italic text-sm flex flex-col items-center gap-2">
                <i class="fas fa-clock text-2xl"></i>
                No actions yet
            </div>
        `;
        return;
    }
    
    [...gameState.history].reverse().forEach(entry => {
        const item = document.createElement('div');
        item.className = 'bg-accent-bg p-2 rounded-md border-l-4 flex justify-between items-center text-xs min-h-[40px] transition-all duration-200 hover:translate-x-0.5 hover:shadow-md';
        
        let borderColor = '#22c55e';
        let displayAction = '';
        let displayPlayer = '';
        let displayPoints = 0;
        let emoji = '';
        
        switch(entry.type) {
            case 'score':
                displayPlayer = entry.playerName;
                displayAction = `${entry.ballEmoji || ''} scored ${entry.ball}`;
                displayPoints = entry.points;
                emoji = entry.ballEmoji || '🎱';
                if (entry.ball === 'Yellow') borderColor = '#ffdd00';
                else if (entry.ball === 'Green') borderColor = '#33ff77';
                else if (entry.ball === 'Brown') borderColor = '#d2691e';
                else if (entry.ball === 'Blue') borderColor = '#4d9fff';
                else if (entry.ball === 'Pink') borderColor = '#ff66cc';
                else if (entry.ball === 'Black') borderColor = '#222222';
                else if (entry.ball === 'Red') borderColor = '#ff5555';
                break;
                
            case 'subtract':
                displayPlayer = entry.playerName;
                displayAction = `${entry.ballEmoji || ''} subtracted ${entry.ball}`;
                displayPoints = entry.points;
                emoji = '➖';
                borderColor = '#ff5555';
                break;
                
            case 'completion':
                displayPlayer = entry.playerName;
                displayAction = 'target reached 🎯';
                displayPoints = entry.score;
                emoji = '🏆';
                borderColor = '#4d9fff';
                break;
                
            case 'add_player':
                displayPlayer = 'System';
                displayAction = `Added player ${entry.playerName}`;
                displayPoints = 0;
                emoji = '➕';
                borderColor = '#4d9fff';
                break;
                
            case 'remove_player':
                displayPlayer = 'System';
                displayAction = `Removed player ${entry.playerName}`;
                displayPoints = 0;
                emoji = '➖';
                borderColor = '#ff5555';
                break;
                
            case 'new_game':
                displayPlayer = 'System';
                displayAction = 'New game started';
                displayPoints = 0;
                emoji = '🆕';
                borderColor = '#33ff77';
                break;
                
            default:
                displayPlayer = 'System';
                displayAction = entry.type || 'Action';
                displayPoints = entry.points || 0;
                emoji = '⚡';
        }
        
        item.style.borderLeftColor = borderColor;
        
        const pointsClass = displayPoints > 0 ? 'text-snooker-green' : displayPoints < 0 ? 'text-snooker-red' : '';
        
        item.innerHTML = `
            <div class="flex flex-col gap-0.5 flex-1 min-w-0">
                <div class="font-semibold text-text-primary text-[0.85rem] overflow-hidden text-ellipsis whitespace-nowrap flex items-center gap-1.5">
                    ${emoji} ${displayPlayer}
                </div>
                <div class="text-text-secondary text-xs overflow-hidden text-ellipsis whitespace-nowrap flex items-center gap-1">
                    <i class="fas fa-clock"></i> ${displayAction}
                </div>
            </div>
            <div class="font-bold text-sm min-w-[40px] text-right pl-1.5 flex items-center justify-center gap-1 ${pointsClass}">
                ${displayPoints > 0 ? '+' : ''}${displayPoints !== 0 ? displayPoints : ''}
            </div>
        `;
        
        historyList.appendChild(item);
    });
}

// Game Logic
function scoreBall(ball) {
    if (gameState.currentPlayerIndex === -1) {
        alert('⚠️ Please select a player first!');
        return;
    }
    
    const player = gameState.players[gameState.currentPlayerIndex];
    
    if (player.isCompleted || player.isWinner) {
        alert('✅ This player has completed the game!');
        return;
    }
    
    // Check if we're in subtract mode
    const isSubtract = gameState.isSubtractMode;
    const points = isSubtract ? -ball.points : ball.points;
    player.score += points;
    
    // Save action to history
    const historyEntry = {
        type: isSubtract ? 'subtract' : 'score',
        playerId: player.id,
        playerName: player.name,
        points: points,
        ball: ball.name,
        ballEmoji: ball.emoji,
        timestamp: new Date().getTime()
    };
    
    gameState.history.push(historyEntry);
    
    renderPlayers();
    updateCurrentPlayerDisplay();
    
    currentPlayerScore.classList.add('score-flash');
    setTimeout(() => currentPlayerScore.classList.remove('score-flash'), 400);
    
    // Check if player has completed the target score
    checkScoreCompletion();
    
    renderHistory();
}

function toggleSubtractMode() {
    gameState.isSubtractMode = !gameState.isSubtractMode;
    
    if (gameState.isSubtractMode) {
        subtractBtn.classList.add('!shadow-[0_0_15px_rgba(239,68,68,0.7),0_3px_6px_rgba(0,0,0,0.2)]', '!border-2', '!border-white/30');
        subtractBtn.innerHTML = '<i class="fas fa-minus"></i> 🔴 Subtract Mode (ON)';
    } else {
        subtractBtn.classList.remove('!shadow-[0_0_15px_rgba(239,68,68,0.7),0_3px_6px_rgba(0,0,0,0.2)]', '!border-2', '!border-white/30');
        subtractBtn.innerHTML = '<i class="fas fa-minus"></i> 🔄 Subtract Mode';
    }
}

function undoLast() {
    if (gameState.history.length === 0) return;
    
    const lastAction = gameState.history.pop();
    
    if (lastAction.type === 'score' || lastAction.type === 'subtract') {
        const playerIndex = gameState.players.findIndex(p => p.id === lastAction.playerId);
        if (playerIndex !== -1) {
            gameState.players[playerIndex].score -= lastAction.points;
            
            if (gameState.players[playerIndex].isCompleted) {
                gameState.players[playerIndex].isCompleted = false;
            }
            
            gameState.currentPlayerIndex = playerIndex;
        }
    } 
    else if (lastAction.type === 'completion') {
        const playerIndex = gameState.players.findIndex(p => p.name === lastAction.playerName);
        if (playerIndex !== -1) {
            gameState.players[playerIndex].isCompleted = false;
            gameState.currentPlayerIndex = playerIndex;
        }
    }
    
    renderPlayers();
    updateCurrentPlayerDisplay();
    renderHistory();
    gameOverSection.style.display = 'none';
}

function nextActivePlayer() {
    if (gameState.players.length === 0) return;
    
    let attempts = 0;
    let nextIndex = gameState.currentPlayerIndex;
    
    do {
        nextIndex = (nextIndex + 1) % gameState.players.length;
        attempts++;
    } while (gameState.players[nextIndex].isCompleted && attempts < gameState.players.length * 2);
    
    if (!gameState.players[nextIndex].isCompleted) {
        gameState.currentPlayerIndex = nextIndex;
        renderPlayers();
        updateCurrentPlayerDisplay();
    }
}

function nextPlayer() {
    nextActivePlayer();
}

function checkScoreCompletion() {
    const targetScore = parseInt(targetScoreSelect.value);
    gameState.targetScore = targetScore;
    
    const activePlayers = gameState.players.filter(p => !p.isCompleted);
    
    let newCompletedPlayers = [];
    
    activePlayers.forEach(player => {
        if (player.score >= targetScore && !player.isCompleted) {
            player.isCompleted = true;
            gameState.completedPlayers.push(player);
            newCompletedPlayers.push(player);
            
            const completionEntry = {
                type: 'completion',
                playerName: player.name,
                score: player.score,
                timestamp: new Date().getTime()
            };
            gameState.history.push(completionEntry);
            
            if (gameState.players[gameState.currentPlayerIndex].id === player.id) {
                nextActivePlayer();
            }
        }
    });
    
    renderPlayers();
    updateCurrentPlayerDisplay();
    renderHistory();
}

function updateCurrentPlayerDisplay() {
    if (gameState.currentPlayerIndex >= 0 && gameState.players.length > 0) {
        const player = gameState.players[gameState.currentPlayerIndex];
        currentPlayerName.innerHTML = `<i class="fas fa-user"></i> 🎱 ${player.name}`;
        currentPlayerScore.textContent = player.score;
        
        // Show remaining score for current player
        const remaining = gameState.targetScore - player.score;
        if (remaining <= 20 && remaining > 0 && !player.isCompleted) {
            currentPlayerRemaining.innerHTML = `<i class="fas fa-hourglass-half"></i> ${remaining} points left to target`;
            currentPlayerRemaining.style.display = 'flex';
        } else {
            currentPlayerRemaining.textContent = '';
            currentPlayerRemaining.style.display = 'none';
        }
    } else {
        currentPlayerName.innerHTML = '<i class="fas fa-user"></i> 🎱 Select player';
        currentPlayerScore.textContent = '0';
        currentPlayerRemaining.textContent = '';
        currentPlayerRemaining.style.display = 'none';
    }
}

function resetAll() {
    const newGame = confirm('🆕 Start a new game? Current scores will be reset.');
    if (!newGame) return;
    
    gameState.players.forEach(p => {
        p.score = 0;
        p.isCompleted = false;
        p.isWinner = false;
    });
    
    gameState.currentPlayerIndex = gameState.players.length > 0 ? 0 : -1;
    gameState.history = [];
    gameState.winner = null;
    gameState.completedPlayers = [];
    gameState.isSubtractMode = false;
    
    subtractBtn.classList.remove('!shadow-[0_0_15px_rgba(239,68,68,0.7),0_3px_6px_rgba(0,0,0,0.2)]', '!border-2', '!border-white/30');
    subtractBtn.innerHTML = '<i class="fas fa-minus"></i> 🔄 Subtract Mode';
    
    renderPlayers();
    updateCurrentPlayerDisplay();
    renderHistory();
    gameOverSection.style.display = 'none';
    
    const newGameEntry = {
        type: 'new_game',
        timestamp: new Date().getTime()
    };
    gameState.history.push(newGameEntry);
    renderHistory();
}

// Utility Functions
function darkenColor(color, percent) {
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);
    
    r = Math.floor(r * (100 - percent) / 100);
    g = Math.floor(g * (100 - percent) / 100);
    b = Math.floor(b * (100 - percent) / 100);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Event Listeners
function setupEventListeners() {
    addPlayerBtn.addEventListener('click', () => addPlayer(playerNameInput.value));
    playerNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addPlayer(playerNameInput.value);
    });
    
    subtractBtn.addEventListener('click', toggleSubtractMode);
    undoBtn.addEventListener('click', undoLast);
    nextPlayerBtn.addEventListener('click', nextPlayer);
    resetBtn.addEventListener('click', resetAll);
    
    targetScoreSelect.addEventListener('change', () => {
        gameState.targetScore = parseInt(targetScoreSelect.value);
        checkScoreCompletion();
        updateCurrentPlayerDisplay();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key >= '1' && e.key <= '7') {
            const index = parseInt(e.key) - 1;
            if (index < gameState.balls.length) scoreBall(gameState.balls[index]);
        }
        
        if (e.key === 's' || e.key === 'S') {
            toggleSubtractMode();
            e.preventDefault();
        }
        
        if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
            undoLast();
            e.preventDefault();
        }
        
        if (e.key === 'n' || e.key === 'N') {
            nextPlayer();
            e.preventDefault();
        }
        
        if (e.key === 'r' && (e.ctrlKey || e.metaKey)) {
            resetAll();
            e.preventDefault();
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
