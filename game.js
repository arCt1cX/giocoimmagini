/**
 * Image Guessing Game
 * A browser-based guessing game that works completely offline
 */

document.addEventListener('DOMContentLoaded', function() {
    // Game elements
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const resultScreen = document.getElementById('result-screen');
    const startButton = document.getElementById('start-game');
    const playAgainButton = document.getElementById('play-again');
    const submitButton = document.getElementById('submit-guess');
    const guessInput = document.getElementById('guess-input');
    const gameImage = document.getElementById('game-image');
    const feedbackDiv = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
    const finalScoreElement = document.getElementById('final-score');
    const currentQuestionElement = document.getElementById('current-question');
    const resultDetailsElement = document.getElementById('result-details');

    // Game state
    let categories = [];
    let currentRound = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let roundResults = [];
    
    // Sound effects (optional)
    const correctSound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAqAABHnwAFBwkMDhATFRcaHB8hJCYpKy4wMzU4Ojs+QUNGSEtNUFJVV1pcX2FkZ2lsbnFzdnl7foGDhoiLjZCSlZeanZ+ipKeprK6xtLa5vL7BxMbJy87R09bY293g4uXn6uzu8fP2+fv+AAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAXaAAAAAAAAR5+fSpwoAAAAAAAAAAAAAAAAAAD/+0DEAAP7uuzoYwkAJ3VNOt7Pg3B7QwdgAsK6WTEsxoiWpnrJmDNDIwRtCY+g8BBIiDtHcMjAcMTCYAwCAmDkNzBIBuVP/1QLJcHgBmBYDAQMwNhmAK10MCQCzAzAcGA4AIHBMLTJm0MFgBwYBGCAHA2DphR+kDgCwSAYwFAGDgdHYZ+k14qigAYJgJAQCAAHgKHgRB/+NUB4gFwUAIwHAcS+VQj9rn//1QygNB3C//tAxAcAEn7s8f5iAAp8ZqH/sOAFLVBJ0iNTTy1DIMzIJPLTO3/xAAJDqIvGp9C5wJeJh3+LuH/5EAKjABG2aLu69F3C7sTzAEOwHBUJUNw6gdF36t80QmDIcCCFWXDtF3dF3d4O4nGQXB4MXSKlRuIgouIl3+r/yrVbiyUMDBBwfJcFYuAGTjXqP/7NKtQw2d8qsP/7QMQDARKq0uz+HgCKGFXh/5hQCbgzOYuIcUWkBIKQh/KqgxarILDEoJiYUZSfJjTaZMYU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=');
    const incorrectSound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAsAAAZyAAICgoNDQ8PEhIUFBcXGRkcHB4eISEjIyYmKCgrKy0tMDA0NDY2OTk7Oz4+QUFDRUhIS0tOTlFRU1NWVllZXFxfX2JiZWVnZ2pqbW1vb3JydXV3d3p6fX2AgIKChYWIiIqKjY2Pj5KSlZWXl5qanJyfn6KipKSnp6qqrKyvr7KytbW3t7q6vLy/v8LCxcXHx8rKzMzPz9LS1dXX19ra3d3f3+Li5eXn5+rq7e3v7/Ly9fX39/r6/f0AAAA5TEFNRTMuMTAwBLQAAAAAAAAAABUgJAjpTQABzAABmchOO7KBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//tAxAADwlwm9k5xAAhaV17dyKABECEVdjggAAkRFkcAABURc3K3K3KwICAgFQMDAwMDAwMYJ0CAoCAgFQoCpytytwICA3NzAwMDAwMD/K3AgCpwICAgIEaP/////+VuVuVg3Nzc3NzcqoHR0f/////KqoCAzNzc3Nzf///////++gICAgKqp0dHR0f/////+VUDp//6HAwMBAQEBGRkZGRnKqoCA3P//6qB0dH//tAxFuAE1J139vYbopP3rb7OqABqlVVf9+qodHR/wdOjAa+jt3a///70DoGB0dHR0dH//////6wPHDh////////kVERGPEDBP////////hgQEBR41SsrKysrK////////yqqqqsrKysr/////////////yssrP///////////6f/////////////////////////////////////////////////////7QMRFg9LaotbiMzxKIFrQsARAH////////////9JWWWXlf////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////tAxF0AEiAAvYAQAAAAAA0gAAAAAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7QMRLAAAAAaQAAAAAAAAA0gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==');

    // Cache for offline images
    let imageCache = {};

    // Start game when button is clicked
    startButton.addEventListener('click', startGame);
    playAgainButton.addEventListener('click', startGame);
    submitButton.addEventListener('click', checkAnswer);
    
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
            } else {
                // If categories.json doesn't exist, scan for categories manually
                await scanCategories();
            }
        } catch (error) {
            console.error('Error initializing game:', error);
            // Fallback to manual category scanning
            await scanCategories();
        }
    }

    /**
     * Scan for categories by checking directories in the img folder
     */
    async function scanCategories() {
        categories = [
            { name: 'actors', items: [] },
            { name: 'monuments', items: [] },
            { name: 'singers', items: [] },
            { name: 'politicians', items: [] },
            { name: 'cartoons', items: [] }
        ];
        
        // If we're in a development environment, we could try loading some sample data
        // In a real deployment, the images would be preloaded in the img folder
        
        // For each category, try to load some sample images from the img folder
        for (const category of categories) {
            try {
                const response = await fetch(`img/${category.name}/index.json`);
                
                if (response.ok) {
                    const data = await response.json();
                    category.items = data;
                } else {
                    // If no index.json is available, we'll rely on the items being added during game play
                    console.warn(`No index.json found for ${category.name}`);
                }
            } catch (error) {
                console.warn(`Could not load items for ${category.name}:`, error);
            }
        }
    }

    /**
     * Generate an index of available images by category
     */
    function generateIndex() {
        // This function would scan the img directories and create a categories.json file
        // Not needed for the core game functionality, but useful for development
        console.log('Generating index of available images...');
    }

    /**
     * Start a new game
     */
    function startGame() {
        // Reset game state
        currentQuestionIndex = 0;
        score = 0;
        roundResults = [];
        currentRound = [];
        
        // Select random items for this round
        selectRandomItems();
        
        // Reset UI
        scoreElement.textContent = score;
        currentQuestionElement.textContent = currentQuestionIndex + 1;
        feedbackDiv.classList.add('hidden');
        
        // Show game screen
        startScreen.classList.add('hidden');
        resultScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        
        // Load the first question
        loadQuestion();
    }

    /**
     * Select random items from different categories for this round
     */
    function selectRandomItems() {
        // Get all available items from all categories
        const allItems = [];
        
        // For development/fallback
        if (!categories.length || categories.every(cat => cat.items.length === 0)) {
            // Fallback data for testing if no images are loaded
            fallbackItems();
            return;
        }
        
        // Sort categories by number of items (descending)
        const sortedCategories = [...categories].sort((a, b) => b.items.length - a.items.length);
        
        // Select one item from each category that has items
        const selectedCategories = [];
        
        for (const category of sortedCategories) {
            if (category.items.length > 0 && currentRound.length < 5) {
                const randomIndex = Math.floor(Math.random() * category.items.length);
                const item = category.items[randomIndex];
                
                currentRound.push({
                    category: category.name,
                    item: item,
                    imagePath: `img/${category.name}/${item.replace(/ /g, '_')}.jpg`
                });
                
                selectedCategories.push(category.name);
            }
            
            if (currentRound.length >= 5) break;
        }
        
        // If we still need more items, select from any category
        if (currentRound.length < 5) {
            for (const category of sortedCategories) {
                if (category.items.length > 0) {
                    while (currentRound.length < 5) {
                        const randomIndex = Math.floor(Math.random() * category.items.length);
                        const item = category.items[randomIndex];
                        
                        // Check if this item is already selected
                        const alreadySelected = currentRound.some(
                            selected => selected.category === category.name && selected.item === item
                        );
                        
                        if (!alreadySelected) {
                            currentRound.push({
                                category: category.name,
                                item: item,
                                imagePath: `img/${category.name}/${item.replace(/ /g, '_')}.jpg`
                            });
                        }
                        
                        if (currentRound.length >= 5) break;
                    }
                }
                
                if (currentRound.length >= 5) break;
            }
        }
        
        // Shuffle the round
        shuffleArray(currentRound);
    }

    /**
     * Fallback items for testing when no images are available
     */
    function fallbackItems() {
        // Sample data for testing without images
        currentRound = [
            {
                category: 'actors',
                item: 'keanu reeves',
                imagePath: 'img/actors/keanu_reeves.jpg'
            },
            {
                category: 'monuments',
                item: 'eiffel tower',
                imagePath: 'img/monuments/eiffel_tower.jpg'
            },
            {
                category: 'singers',
                item: 'lady gaga',
                imagePath: 'img/singers/lady_gaga.jpg'
            },
            {
                category: 'politicians',
                item: 'joe biden',
                imagePath: 'img/politicians/joe_biden.jpg'
            },
            {
                category: 'cartoons',
                item: 'homer simpson',
                imagePath: 'img/cartoons/homer_simpson.jpg'
            }
        ];
        
        // Shuffle the round
        shuffleArray(currentRound);
    }

    /**
     * Load the current question
     */
    function loadQuestion() {
        if (currentQuestionIndex >= currentRound.length) {
            showResults();
            return;
        }
        
        const currentQuestion = currentRound[currentQuestionIndex];
        
        // Clear previous feedback
        feedbackDiv.classList.add('hidden');
        
        // Update question number
        currentQuestionElement.textContent = currentQuestionIndex + 1;
        
        // Load image with fade effect
        gameImage.style.opacity = 0;
        
        // Try to load from cache first
        if (imageCache[currentQuestion.imagePath]) {
            gameImage.src = imageCache[currentQuestion.imagePath];
            gameImage.style.opacity = 1;
        } else {
            // If not in cache, load from file system
            gameImage.src = currentQuestion.imagePath;
            
            // Cache the image for future use
            gameImage.onload = function() {
                imageCache[currentQuestion.imagePath] = currentQuestion.imagePath;
                gameImage.style.opacity = 1;
            };
            
            // Handle image loading errors
            gameImage.onerror = function() {
                // Use a placeholder image if the actual image can't be loaded
                gameImage.src = `https://via.placeholder.com/400x300?text=Image+Not+Found+For+${currentQuestion.category}`;
                gameImage.style.opacity = 1;
            };
        }
        
        // Clear and focus on input
        guessInput.value = '';
        guessInput.focus();
    }

    /**
     * Check if the user's answer is correct
     */
    function checkAnswer() {
        if (currentQuestionIndex >= currentRound.length) return;
        
        const currentQuestion = currentRound[currentQuestionIndex];
        const userAnswer = guessInput.value.trim().toLowerCase();
        const correctAnswer = currentQuestion.item.toLowerCase();
        
        // Simple string normalization for comparison
        const normalizedUserAnswer = userAnswer.replace(/[^a-z0-9]/gi, '');
        const normalizedCorrectAnswer = correctAnswer.replace(/[^a-z0-9]/gi, '');
        
        // Check if the answer is correct (allowing for some flexibility)
        const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer || 
                         correctAnswer.includes(userAnswer) || 
                         normalizedCorrectAnswer.includes(normalizedUserAnswer) || 
                         (normalizedUserAnswer.length > 3 && normalizedCorrectAnswer.includes(normalizedUserAnswer));
        
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
            score++;
            scoreElement.textContent = score;
        }
        
        // Save the result for the summary
        roundResults.push({
            item: currentQuestion.item,
            category: currentQuestion.category,
            imagePath: currentQuestion.imagePath,
            userAnswer: userAnswer,
            isCorrect: isCorrect
        });
        
        // Move to the next question after a short delay
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 1500);
    }

    /**
     * Show the final results
     */
    function showResults() {
        // Update score
        finalScoreElement.textContent = score;
        
        // Hide game screen, show result screen
        gameScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        
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
                <strong>Question ${index + 1}:</strong> ${result.item} (${result.category})<br>
                <small>Your answer: ${result.userAnswer || '(no answer)'}</small>
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