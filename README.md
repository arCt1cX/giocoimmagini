# Image Guessing Game

A browser-based guessing game that works completely offline and can be hosted on GitHub Pages. Players are shown images and have to guess what or who is shown in the image.

## Features

- Plays entirely in the browser with no backend needed
- Works offline once loaded
- Randomly selects 5 images from different categories for each round
- Categories include: actors, monuments, singers, politicians, cartoon characters
- Responsive design that works well on mobile and desktop
- Sound effects for correct and incorrect answers

## How to Set Up

### 1. Download Images

First, run the image downloader script to fetch images for all your categories:

```bash
# Install dependencies
pip install requests beautifulsoup4

# Run the downloader script
python image_downloader.py
```

The script will:
- Read all .txt files from the `/categories/` directory
- Search for images for each item
- Download them to the `/img/[category]/` folders
- Skip any images that already exist to avoid redownloading

You can add new names to the category .txt files and run the script again - it will only download new images.

### 2. Run the Game

Simply open `index.html` in your browser to play the game locally.

### 3. Deploy to GitHub Pages

To deploy to GitHub Pages:

1. Push your repository to GitHub
2. Go to your repository settings
3. Under "GitHub Pages", select the main branch as source
4. Your game will be available at `https://[your-username].github.io/[repo-name]/`

## How to Play

1. Click "Start Game"
2. For each image, type your guess in the input field
3. Click "Submit" or press Enter
4. See if your guess was correct
5. After 5 guesses, see your final score
6. Click "Play Again" to start a new round

## Game Structure

- `/categories/` - Text files containing names for each category
- `/img/` - Downloaded images organized by category
- `image_downloader.py` - Python script to download images
- `index.html` - Main game HTML
- `styles.css` - Game styling
- `game.js` - Game logic
- `categories.json` - JSON index of all categories and items

## Customization

You can add your own categories by:

1. Creating a new .txt file in the `/categories/` folder
2. Adding one name per line
3. Running the image downloader script
4. The new category will automatically appear in the game

## Dependencies

For the image downloader script:
- Python 3.x
- requests
- BeautifulSoup4

The game itself has no external dependencies and runs completely in the browser.

## License

This project is open source and available under the MIT License. 