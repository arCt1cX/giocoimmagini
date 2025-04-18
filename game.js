/**
 * Image Guessing Game
 * A browser-based guessing game that works completely offline
 */

document.addEventListener('DOMContentLoaded', function() {
    // Game elements
    const startScreen = document.getElementById('start-screen');
    const playerSetupScreen = document.getElementById('player-setup-screen');
    const gameScreen = document.getElementById('game-screen');
    const resultScreen = document.getElementById('result-screen');
    
    const openPlayerSetupButton = document.getElementById('open-player-setup');
    const backToMenuButton = document.getElementById('back-to-menu');
    const startButton = document.getElementById('start-game');
    const playAgainButton = document.getElementById('play-again');
    const submitButton = document.getElementById('submit-guess');
    
    const playerCountSelect = document.getElementById('player-count');
    const playerNamesContainer = document.getElementById('player-names-container');
    
    const guessInput = document.getElementById('guess-input');
    const gameImage = document.getElementById('game-image');
    const feedbackDiv = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
    const currentPlayerNameElement = document.getElementById('current-player-name');
    const playerScoresElement = document.getElementById('player-scores');
    const currentQuestionElement = document.getElementById('current-question');
    const resultDetailsElement = document.getElementById('result-details');

    // Game state
    let categories = [];
    let currentRound = [];
    let currentQuestionIndex = 0;
    let currentPlayerIndex = 0;
    let players = [];
    let roundResults = [];
    
    // Sound effects (optional)
    const correctSound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAqAABHnwAFBwkMDhATFRcaHB8hJCYpKy4wMzU4Ojs+QUNGSEtNUFJVV1pcX2FkZ2lsbnFzdnl7foGDhoiLjZCSlZeanZ+ipKeprK6xtLa5vL7BxMbJy87R09bY293g4uXn6uzu8fP2+fv+AAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAXaAAAAAAAAR5+fSpwoAAAAAAAAAAAAAAAAAAD/+0DEAAP7uuzoYwkAJ3VNOt7Pg3B7QwdgAsK6WTEsxoiWpnrJmDNDIwRtCY+g8BBIiDtHcMjAcMTCYAwCAmDkNzBIBuVP/1QLJcHgBmBYDAQMwNhmAK10MCQCzAzAcGA4AIHBMLTJm0MFgBwYBGCAHA2DphR+kDgCwSAYwFAGDgdHYZ+k14qigAYJgJAQCAAHgKHgRB/+NUB4gFwUAIwHAcS+VQj9rn//1QygNB3C//tAxAcAEn7s8f5iAAp8ZqH/sOAFLVBJ0iNTTy1DIMzIJPLTO3/xAAJDqIvGp9C5wJeJh3+LuH/5EAKjABG2aLu69F3C7sTzAEOwHBUJUNw6gdF36t80QmDIcCCFWXDtF3dF3d4O4nGQXB4MXSKlRuIgouIl3+r/yrVbiyUMDBBwfJcFYuAGTjXqP/7NKtQw2d8qsP/7QMQDARKq0uz+HgCKGFXh/5hQCbgzOYuIcUWkBIKQh/KqgxarILDEoJiYUZSfJjTaZMYU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=');
    const incorrectSound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAsAAAZyAAICgoNDQ8PEhIUFBcXGRkcHB4eISEjIyYmKCgrKy0tMDA0NDY2OTk7Oz4+QUFDRUhIS0tOTlFRU1NWVllZXFxfX2JiZWVnZ2pqbW1vb3JydXV3d3p6fX2AgIKChYWIiIqKjY2Pj5KSlZWXl5qanJyfn6KipKSnp6qqrKyvr7KytbW3t7q6vLy/v8LCxcXHx8rKzMzPz9LS1dXX19ra3d3f3+Li5eXn5+rq7e3v7/Ly9fX39/r6/f0AAAA5TEFNRTMuMTAwBLQAAAAAAAAAABUgJAjpTQABzAABmchOO7KBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//tAxAADwlwm9k5xAAhaV17dyKABECEVdjggAAkRFkcAABURc3K3K3KwICAgFQMDAwMDAwMYJ0CAoCAgFQoCpytytwICA3NzAwMDAwMD/K3AgCpwICAgIEaP/////+VuVuVg3Nzc3NzcqoHR0f/////KqoCAzNzc3Nzf///////++gICAgKqp0dHR0f/////+VUDp//6HAwMBAQEBGRkZGRnKqoCA3P//6qB0dH//tAxFuAE1J139vYbopP3rb7OqABqlVVf9+qodHR/wdOjAa+jt3a///70DoGB0dHR0dH//////6wPHDh////////kVERGPEDBP////////hgQEBR41SsrKysrK////////yqqqqsrKysr/////////////yssrP///////////6f/////////////////////////////////////////////////////7QMRFg9LaotbiMzxKIFrQsARAH////////////9JWWWXlf////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////tAxF0AEiAAvYAQAAAAAA0gAAAAAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7QMRLAAAAAaQAAAAAAAAA0gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==');

    // Cache for offline images
    let imageCache = {};

    // Event listeners for game navigation
    openPlayerSetupButton.addEventListener('click', openPlayerSetup);
    backToMenuButton.addEventListener('click', goBackToMenu);
    startButton.addEventListener('click', startGame);
    playAgainButton.addEventListener('click', openPlayerSetup);
    submitButton.addEventListener('click', checkAnswer);
    
    // Player count selection changes the input fields
    playerCountSelect.addEventListener('change', updatePlayerInputs);
    
    // Also allow Enter key to submit answers
    guessInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });

    // Initialize the game
    initGame();

    /**
     * Initialize the game by loading available categories
     */
    async function initGame() {
        try {
            // Try to load categories from the file system
            const response = await fetch('categories.json');
            
            if (response.ok) {
                const data = await response.json();
                categories = data;
                console.log("Successfully loaded categories from categories.json");
                console.log("Categories:", categories);
                
                // Pre-check if any image directories exist
                for (const category of categories) {
                    try {
                        // Log that we're checking for this category's directory
                        console.log(`Checking for directory: img/${category.name}/`);
                    } catch (e) {
                        console.warn(`Error checking directory for ${category.name}:`, e);
                    }
                }
            } else {
                console.warn("Could not load categories.json. Using fallback data.");
                // If categories.json doesn't exist, scan for categories manually
                await scanCategories();
            }
        } catch (error) {
            console.error('Error initializing game:', error);
            console.warn("Using fallback data.");
            // Fallback to manual category scanning
            await scanCategories();
        }
    }

    /**
     * Open the player setup screen
     */
    function openPlayerSetup() {
        startScreen.classList.add('hidden');
        resultScreen.classList.add('hidden');
        playerSetupScreen.classList.remove('hidden');
        
        // Reset player count to 1 and update inputs
        playerCountSelect.value = "1";
        updatePlayerInputs();
    }
    
    /**
     * Go back to the main menu
     */
    function goBackToMenu() {
        playerSetupScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
    }
    
    /**
     * Update player input fields based on selected player count
     */
    function updatePlayerInputs() {
        const playerCount = parseInt(playerCountSelect.value);
        playerNamesContainer.innerHTML = '';
        
        for (let i = 1; i <= playerCount; i++) {
            const playerInput = document.createElement('div');
            playerInput.className = 'player-input';
            
            const label = document.createElement('label');
            label.setAttribute('for', `player${i}-name`);
            label.textContent = `Player ${i}:`;
            
            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('id', `player${i}-name`);
            input.setAttribute('placeholder', 'Enter name...');
            
            // Set default name
            input.value = `Player ${i}`;
            
            playerInput.appendChild(label);
            playerInput.appendChild(input);
            playerNamesContainer.appendChild(playerInput);
        }
    }

    /**
     * Scan for categories by checking directories in the img folder
     */
    async function scanCategories() {
        console.log("Scanning for categories...");
        categories = [
            { name: 'actors', items: [] },
            { name: 'monuments', items: [] },
            { name: 'singers', items: [] },
            { name: 'politicians', items: [] },
            { name: 'cartoons', items: [] }
        ];
        
        // For each category, try to populate items by checking the img directory
        for (const category of categories) {
            // In a web environment, we can't read directories directly
            // So we'll use a fallback approach:
            // Try to load a few common items that are likely to exist
            
            // We'll manually add some common items for each category
            switch(category.name) {
                case 'actors':
                    category.items = ['Tom Hanks', 'Brad Pitt', 'Leonardo DiCaprio', 'Keanu Reeves', 
                                      'Scarlett Johansson', 'Robert Downey Jr', 'Meryl Streep'];
                    break;
                case 'monuments':
                    category.items = ['Eiffel Tower', 'Statue of Liberty', 'Colosseum', 'Taj Mahal',
                                      'Great Wall of China', 'Big Ben', 'Stonehenge'];
                    break;
                case 'singers':
                    category.items = ['Lady Gaga', 'Beyoncé', 'Ed Sheeran', 'Taylor Swift', 
                                     'Adele', 'Bruno Mars', 'Billie Eilish'];
                    break;
                case 'politicians':
                    category.items = ['Joe Biden', 'Donald Trump', 'Barack Obama', 'Vladimir Putin',
                                     'Angela Merkel', 'Justin Trudeau', 'Boris Johnson'];
                    break;
                case 'cartoons':
                    category.items = ['Mickey Mouse', 'Homer Simpson', 'SpongeBob SquarePants', 'Bugs Bunny',
                                     'Scooby-Doo', 'Tom and Jerry', 'Shrek'];
                    break;
            }
        }
        
        console.log("Scanned categories:", categories);
    }

    /**
     * Check if an image file exists at the specified path
     */
    function checkImageExists(imagePath) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = imagePath;
        });
    }

    /**
     * Generate an in-memory placeholder image when a real image is not found
     */
    function generatePlaceholderImage(name, category) {
        // Create a canvas element
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 300;
        
        // Get the context
        const ctx = canvas.getContext('2d');
        
        // Fill the background with a light color
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add a border
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 5;
        ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
        
        // Write the category
        ctx.fillStyle = '#555';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(category.toUpperCase(), canvas.width / 2, 40);
        
        // Write the item name
        ctx.fillStyle = '#333';
        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(name, canvas.width / 2, canvas.height / 2);
        
        return canvas.toDataURL();
    }

    /**
     * Setup players based on input fields
     */
    function setupPlayers() {
        const playerCount = parseInt(playerCountSelect.value);
        players = [];
        
        for (let i = 1; i <= playerCount; i++) {
            const nameInput = document.getElementById(`player${i}-name`);
            const playerName = nameInput.value.trim() || `Player ${i}`;
            
            players.push({
                name: playerName,
                score: 0
            });
        }
        
        console.log("Players setup:", players);
    }

    /**
     * Start a new game
     */
    function startGame() {
        console.log("Starting a new game...");
        
        // Setup players from input fields
        setupPlayers();
        
        // Reset game state
        currentQuestionIndex = 0;
        currentPlayerIndex = 0;
        roundResults = [];
        currentRound = [];
        
        // Reset player scores
        players.forEach(player => {
            player.score = 0;
        });
        
        // Check if we have categories data
        if (!categories || categories.length === 0 || categories.every(cat => !cat.items || cat.items.length === 0)) {
            console.error("No category data available. Using fallback data.");
            fallbackItems();
        } else {
            // Select random items for this round
            selectRandomItems();
        }
        
        console.log("Current round items:", currentRound);
        
        // Reset UI
        scoreElement.textContent = players[currentPlayerIndex].score;
        currentPlayerNameElement.textContent = players[currentPlayerIndex].name;
        currentQuestionElement.textContent = currentQuestionIndex + 1;
        feedbackDiv.classList.add('hidden');
        
        // Show game screen
        playerSetupScreen.classList.add('hidden');
        resultScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        
        // Load the first question
        loadQuestion();
    }

    /**
     * Select random items from different categories for this round
     */
    function selectRandomItems() {
        // Get all categories that have items
        const validCategories = categories.filter(cat => cat.items && cat.items.length > 0);
        
        if (validCategories.length === 0) {
            console.error("No valid categories with items found.");
            fallbackItems();
            return;
        }
        
        console.log("Valid categories for selection:", validCategories.map(c => c.name));
        
        // Sort categories by number of items (descending)
        const sortedCategories = [...validCategories].sort((a, b) => b.items.length - a.items.length);
        
        // Try to select one item from each category first
        for (const category of sortedCategories) {
            if (currentRound.length < 5) {
                const randomIndex = Math.floor(Math.random() * category.items.length);
                const item = category.items[randomIndex];
                
                // Create the file path
                const imagePath = `img/${category.name}/${item.replace(/ /g, '_').toLowerCase()}.jpg`;
                
                currentRound.push({
                    category: category.name,
                    item: item,
                    imagePath: imagePath
                });
            }
            
            if (currentRound.length >= 5) break;
        }
        
        // If we don't have 5 items yet, add more from any category
        if (currentRound.length < 5) {
            // Keep track of items we've already chosen
            const chosenItems = currentRound.map(item => `${item.category}-${item.item}`);
            
            // Continue adding items until we have 5 or run out of unique items
            while (currentRound.length < 5) {
                // Randomly select a category
                const categoryIndex = Math.floor(Math.random() * validCategories.length);
                const category = validCategories[categoryIndex];
                
                // Randomly select an item from that category
                const itemIndex = Math.floor(Math.random() * category.items.length);
                const item = category.items[itemIndex];
                
                // Check if this item is already in our round
                const itemKey = `${category.name}-${item}`;
                if (!chosenItems.includes(itemKey)) {
                    chosenItems.push(itemKey);
                    
                    // Create the file path
                    const imagePath = `img/${category.name}/${item.replace(/ /g, '_').toLowerCase()}.jpg`;
                    
                    currentRound.push({
                        category: category.name,
                        item: item,
                        imagePath: imagePath
                    });
                }
                
                // If we've tried all possible items, break to avoid infinite loop
                if (chosenItems.length >= validCategories.reduce((sum, cat) => sum + cat.items.length, 0)) {
                    break;
                }
            }
        }
        
        // Shuffle the round
        shuffleArray(currentRound);
        console.log("Selected items for this round:", currentRound);
    }

    /**
     * Fallback items for testing when no images are available
     */
    function fallbackItems() {
        console.log("Using fallback items for the game round");
        
        currentRound = [
            {
                category: 'actors',
                item: 'Keanu Reeves',
                imagePath: 'img/actors/keanu_reeves.jpg'
            },
            {
                category: 'monuments',
                item: 'Eiffel Tower',
                imagePath: 'img/monuments/eiffel_tower.jpg'
            },
            {
                category: 'singers',
                item: 'Lady Gaga',
                imagePath: 'img/singers/lady_gaga.jpg'
            },
            {
                category: 'politicians',
                item: 'Joe Biden',
                imagePath: 'img/politicians/joe_biden.jpg'
            },
            {
                category: 'cartoons',
                item: 'Homer Simpson',
                imagePath: 'img/cartoons/homer_simpson.jpg'
            }
        ];
        
        // Shuffle the round
        shuffleArray(currentRound);
    }

    /**
     * Load the current question
     */
    async function loadQuestion() {
        if (currentQuestionIndex >= currentRound.length) {
            showResults();
            return;
        }
        
        const currentQuestion = currentRound[currentQuestionIndex];
        console.log(`Loading question ${currentQuestionIndex + 1}: ${currentQuestion.item} (${currentQuestion.category})`);
        console.log(`Image path: ${currentQuestion.imagePath}`);
        
        // Clear previous feedback
        feedbackDiv.classList.add('hidden');
        
        // Update question number and current player
        currentQuestionElement.textContent = currentQuestionIndex + 1;
        currentPlayerNameElement.textContent = players[currentPlayerIndex].name;
        scoreElement.textContent = players[currentPlayerIndex].score;
        
        // Load image with fade effect
        gameImage.style.opacity = 0;
        
        try {
            // Try to load from cache first
            if (imageCache[currentQuestion.imagePath]) {
                console.log("Loading image from cache");
                gameImage.src = imageCache[currentQuestion.imagePath];
                gameImage.style.opacity = 1;
            } else {
                // Check if the image exists
                const exists = await checkImageExists(currentQuestion.imagePath);
                
                if (exists) {
                    console.log("Image exists, loading it");
                    gameImage.src = currentQuestion.imagePath;
                    
                    // Cache the image for future use
                    gameImage.onload = function() {
                        imageCache[currentQuestion.imagePath] = currentQuestion.imagePath;
                        gameImage.style.opacity = 1;
                    };
                } else {
                    console.warn(`Image not found: ${currentQuestion.imagePath}`);
                    console.log("Generating placeholder image");
                    
                    // Generate placeholder image
                    const placeholderDataUrl = generatePlaceholderImage(
                        currentQuestion.item, 
                        currentQuestion.category
                    );
                    
                    // Use the placeholder
                    gameImage.src = placeholderDataUrl;
                    imageCache[currentQuestion.imagePath] = placeholderDataUrl;
                    gameImage.style.opacity = 1;
                }
            }
        } catch (error) {
            console.error("Error loading image:", error);
            // Create a placeholder as fallback
            const placeholderDataUrl = generatePlaceholderImage(
                currentQuestion.item, 
                currentQuestion.category
            );
            
            gameImage.src = placeholderDataUrl;
            gameImage.style.opacity = 1;
        }
        
        // Clear and focus on input
        guessInput.value = '';
        guessInput.focus();
    }

    /**
     * Move to the next player
     */
    function nextPlayer() {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        console.log(`Switching to player: ${players[currentPlayerIndex].name}`);
        currentPlayerNameElement.textContent = players[currentPlayerIndex].name;
        scoreElement.textContent = players[currentPlayerIndex].score;
    }

    /**
     * Check if the user's answer is correct
     */
    function checkAnswer() {
        if (currentQuestionIndex >= currentRound.length) return;
        
        const currentQuestion = currentRound[currentQuestionIndex];
        const userAnswer = guessInput.value.trim().toLowerCase();
        const correctAnswer = currentQuestion.item.toLowerCase();
        const currentPlayer = players[currentPlayerIndex];
        
        console.log(`Checking answer from ${currentPlayer.name}: "${userAnswer}" against "${correctAnswer}"`);
        
        // Simple string normalization for comparison
        const normalizedUserAnswer = userAnswer.replace(/[^a-z0-9]/gi, '');
        const normalizedCorrectAnswer = correctAnswer.replace(/[^a-z0-9]/gi, '');
        
        // Check if the answer is correct (allowing for some flexibility)
        const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer || 
                         correctAnswer.includes(userAnswer) || 
                         normalizedCorrectAnswer.includes(normalizedUserAnswer) || 
                         (normalizedUserAnswer.length > 3 && normalizedCorrectAnswer.includes(normalizedUserAnswer));
        
        console.log(`Answer is ${isCorrect ? 'correct' : 'incorrect'}`);
        
        // Show feedback
        feedbackDiv.textContent = isCorrect 
            ? `Correct! It's ${currentQuestion.item}` 
            : `Incorrect. It was ${currentQuestion.item}`;
        
        feedbackDiv.className = isCorrect ? 'feedback correct' : 'feedback incorrect';
        feedbackDiv.classList.remove('hidden');
        
        // Play sound if available
        if (isCorrect) {
            correctSound.play().catch(e => console.log('Sound play error:', e));
        } else {
            incorrectSound.play().catch(e => console.log('Sound play error:', e));
        }
        
        // Update score if correct
        if (isCorrect) {
            currentPlayer.score++;
            scoreElement.textContent = currentPlayer.score;
        }
        
        // Save the result for the summary
        roundResults.push({
            item: currentQuestion.item,
            category: currentQuestion.category,
            imagePath: currentQuestion.imagePath,
            userAnswer: userAnswer,
            isCorrect: isCorrect,
            player: currentPlayer.name
        });
        
        // Move to the next question after a short delay
        setTimeout(() => {
            if (players.length > 1) {
                nextPlayer();
            }
            
            currentQuestionIndex++;
            loadQuestion();
        }, 1500);
    }

    /**
     * Show the final results
     */
    function showResults() {
        // Hide game screen, show result screen
        gameScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        
        // Sort players by score (highest first)
        const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
        const highestScore = sortedPlayers[0].score;
        
        // Display player scores
        playerScoresElement.innerHTML = '';
        
        sortedPlayers.forEach((player, index) => {
            const scoreItem = document.createElement('div');
            scoreItem.className = `player-score-item ${player.score === highestScore ? 'winner' : ''}`;
            
            const playerName = document.createElement('div');
            playerName.className = 'player-name';
            playerName.textContent = player.name;
            
            const playerScore = document.createElement('div');
            playerScore.className = 'player-score';
            playerScore.textContent = `${player.score} / ${currentRound.length}`;
            
            scoreItem.appendChild(playerName);
            scoreItem.appendChild(playerScore);
            playerScoresElement.appendChild(scoreItem);
        });
        
        // Clear previous results
        resultDetailsElement.innerHTML = '';
        
        // Add each result to the details
        roundResults.forEach((result, index) => {
            const resultItem = document.createElement('div');
            resultItem.className = `result-item ${result.isCorrect ? 'correct' : 'incorrect'}`;
            
            const icon = document.createElement('span');
            icon.className = 'result-icon';
            icon.textContent = result.isCorrect ? '✓' : '✗';
            
            const details = document.createElement('div');
            details.innerHTML = `
                <strong>Question ${Math.floor(index / players.length) + 1}:</strong> ${result.item} (${result.category})<br>
                <small>${result.player}: ${result.userAnswer || '(no answer)'}</small>
            `;
            
            resultItem.appendChild(icon);
            resultItem.appendChild(details);
            resultDetailsElement.appendChild(resultItem);
        });
    }

    /**
     * Shuffle an array in place
     */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}); 