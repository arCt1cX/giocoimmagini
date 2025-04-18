/**
 * Image Game Fixer
 * This script will check image loading and update the categories.json file
 * to include all available images from the img directory
 */

// Run this code in your browser console when you have the game open
// or include it in a script tag in your HTML

(function() {
    console.log('Running Image Game Fixer...');
    
    // Scan the image directories and generate an updated categories.json
    async function scanImageDirectories() {
        console.log('Scanning image directories...');
        
        const categories = [
            { name: 'actors', items: [] },
            { name: 'monuments', items: [] },
            { name: 'singers', items: [] },
            { name: 'politicians', items: [] },
            { name: 'cartoons', items: [] }
        ];
        
        // Check if directories exist and have images
        const foundImages = {};
        
        for (const category of categories) {
            foundImages[category.name] = 0;
            
            try {
                // Try to list files in the directory
                const dirResponse = await fetch(`img/${category.name}/`);
                if (!dirResponse.ok) {
                    console.warn(`Directory for ${category.name} cannot be accessed directly.`);
                }
            } catch (error) {
                console.warn(`Error checking directory for ${category.name}: ${error}`);
            }
            
            // Test loading a known sample image to verify path
            const testImg = new Image();
            testImg.onload = () => {
                console.log(`✅ Test image for ${category.name} loaded successfully`);
            };
            testImg.onerror = () => {
                console.error(`❌ Test image for ${category.name} failed to load`);
            };
            testImg.src = `img/${category.name}/test_image.jpg`;
        }
        
        // Fetch and process the categories.json file
        try {
            const response = await fetch('categories.json');
            if (response.ok) {
                const data = await response.json();
                
                // For each category in the JSON file
                for (const category of data) {
                    const existingCategory = categories.find(c => c.name === category.name);
                    if (existingCategory) {
                        // Test each item to see if its image exists
                        for (const item of category.items) {
                            const imgPath = `img/${category.name}/${item.toLowerCase().replace(/ /g, '_')}.jpg`;
                            
                            // Create a test image element
                            const testImg = new Image();
                            testImg.onload = () => {
                                // Image loaded successfully, add to found images count
                                existingCategory.items.push(item);
                                foundImages[category.name]++;
                                console.log(`Image found: ${imgPath}`);
                            };
                            testImg.onerror = () => {
                                console.warn(`Image not found: ${imgPath}`);
                            };
                            testImg.src = imgPath;
                        }
                    }
                }
            } else {
                console.error('Failed to load categories.json');
            }
        } catch (error) {
            console.error('Error processing categories.json:', error);
        }
        
        // Wait 2 seconds for image checks to complete
        setTimeout(() => {
            let totalImages = 0;
            for (const category of categories) {
                totalImages += category.items.length;
                console.log(`${category.name}: ${category.items.length} images found`);
            }
            console.log(`Total images found: ${totalImages}`);
            
            if (totalImages === 0) {
                console.error('No images found! Check that image paths are correct.');
                generateFixInstructions();
            } else {
                console.log('Images are available. If you still have issues, check browser console for errors.');
            }
            
            // Generate updated categories.json file
            const jsonContent = JSON.stringify(categories, null, 2);
            console.log('Generated updated categories.json:');
            console.log(jsonContent);
            
            // Show download link for the updated JSON file
            const blob = new Blob([jsonContent], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = 'categories.json';
            downloadLink.textContent = 'Download updated categories.json';
            downloadLink.style.display = 'block';
            downloadLink.style.margin = '20px';
            downloadLink.style.padding = '10px';
            downloadLink.style.backgroundColor = '#4a6da7';
            downloadLink.style.color = 'white';
            downloadLink.style.textAlign = 'center';
            downloadLink.style.textDecoration = 'none';
            downloadLink.style.borderRadius = '5px';
            
            document.body.appendChild(downloadLink);
        }, 2000);
    }
    
    // Generate instructions for fixing the game
    function generateFixInstructions() {
        console.log('Generating fix instructions...');
        
        const instructionsDiv = document.createElement('div');
        instructionsDiv.style.backgroundColor = '#f8d7da';
        instructionsDiv.style.color = '#721c24';
        instructionsDiv.style.padding = '20px';
        instructionsDiv.style.margin = '20px';
        instructionsDiv.style.borderRadius = '5px';
        instructionsDiv.style.border = '1px solid #f5c6cb';
        
        instructionsDiv.innerHTML = `
            <h2>Image Loading Issues Detected</h2>
            <p>The game can't find the images. Try these steps to fix the issue:</p>
            <ol>
                <li>Check that all images are in the correct folders:
                    <ul>
                        <li>img/actors/</li>
                        <li>img/monuments/</li>
                        <li>img/singers/</li>
                        <li>img/politicians/</li>
                        <li>img/cartoons/</li>
                    </ul>
                </li>
                <li>Make sure file names are lowercase and use underscores instead of spaces (e.g., keanu_reeves.jpg)</li>
                <li>Verify that all images have .jpg extension</li>
                <li>If using Chrome, open Developer Tools (F12) and check the Console tab for specific errors</li>
                <li>Try running the game from a local web server instead of directly from the file system</li>
            </ol>
            <p>If you've verified all the above, click the download link to get an updated categories.json file and replace your existing one.</p>
        `;
        
        document.body.appendChild(instructionsDiv);
    }
    
    // Create a debug panel to show game state
    function createDebugPanel() {
        const debugPanel = document.createElement('div');
        debugPanel.style.position = 'fixed';
        debugPanel.style.top = '10px';
        debugPanel.style.right = '10px';
        debugPanel.style.backgroundColor = 'rgba(0,0,0,0.8)';
        debugPanel.style.color = 'white';
        debugPanel.style.padding = '10px';
        debugPanel.style.borderRadius = '5px';
        debugPanel.style.zIndex = '9999';
        debugPanel.style.maxWidth = '300px';
        debugPanel.style.maxHeight = '80vh';
        debugPanel.style.overflow = 'auto';
        debugPanel.style.fontSize = '12px';
        
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Debug Info';
        toggleButton.style.backgroundColor = '#4a6da7';
        toggleButton.style.color = 'white';
        toggleButton.style.border = 'none';
        toggleButton.style.padding = '5px 10px';
        toggleButton.style.borderRadius = '3px';
        toggleButton.style.cursor = 'pointer';
        
        const contentDiv = document.createElement('div');
        contentDiv.style.display = 'none';
        contentDiv.style.marginTop = '10px';
        
        toggleButton.addEventListener('click', () => {
            if (contentDiv.style.display === 'none') {
                contentDiv.style.display = 'block';
                updateDebugInfo();
            } else {
                contentDiv.style.display = 'none';
            }
        });
        
        debugPanel.appendChild(toggleButton);
        debugPanel.appendChild(contentDiv);
        document.body.appendChild(debugPanel);
        
        function updateDebugInfo() {
            // Find the game script scope
            const gameScript = Array.from(document.scripts).find(s => s.src.includes('game.js'));
            
            contentDiv.innerHTML = `
                <h3>Debug Information</h3>
                <p>Game Script: ${gameScript ? '✅ Found' : '❌ Not found'}</p>
                <p>Categories.json: <button id="test-json">Test Load</button></p>
                <p>Image loading test: <button id="test-images">Test Images</button></p>
                <div id="debug-results"></div>
            `;
            
            document.getElementById('test-json').addEventListener('click', async () => {
                const resultsDiv = document.getElementById('debug-results');
                
                try {
                    const response = await fetch('categories.json');
                    if (response.ok) {
                        const data = await response.json();
                        resultsDiv.innerHTML = `✅ Categories.json loaded successfully.<br>Found ${data.length} categories.`;
                    } else {
                        resultsDiv.innerHTML = `❌ Failed to load categories.json: ${response.status} ${response.statusText}`;
                    }
                } catch (error) {
                    resultsDiv.innerHTML = `❌ Error loading categories.json: ${error}`;
                }
            });
            
            document.getElementById('test-images').addEventListener('click', () => {
                const resultsDiv = document.getElementById('debug-results');
                resultsDiv.innerHTML = 'Testing image loading...';
                
                const categories = ['actors', 'monuments', 'singers', 'politicians', 'cartoons'];
                let results = '';
                
                for (const category of categories) {
                    const img = new Image();
                    img.onload = () => {
                        results += `✅ Test image for ${category} loaded successfully.<br>`;
                        resultsDiv.innerHTML = results;
                    };
                    img.onerror = () => {
                        results += `❌ Test image for ${category} failed to load.<br>`;
                        resultsDiv.innerHTML = results;
                    };
                    img.src = `img/${category}/test_image.jpg`;
                }
            });
        }
    }
    
    // Run the fix
    createDebugPanel();
    scanImageDirectories();
    
    // Additionally, provide a way to manually test image loading
    window.testImageLoading = function(imagePath) {
        console.log(`Testing image loading for: ${imagePath}`);
        const img = new Image();
        img.onload = () => console.log(`✅ Image loaded successfully: ${imagePath}`);
        img.onerror = () => console.error(`❌ Image failed to load: ${imagePath}`);
        img.src = imagePath;
        
        // Display the test image
        const testDisplay = document.createElement('div');
        testDisplay.style.position = 'fixed';
        testDisplay.style.top = '50%';
        testDisplay.style.left = '50%';
        testDisplay.style.transform = 'translate(-50%, -50%)';
        testDisplay.style.backgroundColor = 'white';
        testDisplay.style.padding = '20px';
        testDisplay.style.borderRadius = '5px';
        testDisplay.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
        testDisplay.style.zIndex = '10000';
        
        testDisplay.innerHTML = `
            <h3>Image Test</h3>
            <p>Path: ${imagePath}</p>
            <div style="max-width: 300px; max-height: 300px; overflow: hidden;">
                <img src="${imagePath}" style="max-width: 100%; max-height: 100%;" alt="Test image">
            </div>
            <button style="margin-top: 10px; padding: 5px 10px;">Close</button>
        `;
        
        testDisplay.querySelector('button').addEventListener('click', () => {
            document.body.removeChild(testDisplay);
        });
        
        document.body.appendChild(testDisplay);
    };
})(); 