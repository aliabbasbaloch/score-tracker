# 🎱 Snooker Score Tracker

A fully responsive, interactive web application for tracking snooker game scores for up to 6 players. Built with modern web technologies including Tailwind CSS and Font Awesome, all loaded locally for offline use.

## ✨ Features

- 🎮 **Multi-Player Support**: Track scores for up to 6 players simultaneously
- 🎯 **Customizable Target Scores**: Choose from 100, 150, 200, or 250 points
- 🎱 **Complete Ball Set**: All snooker balls (Yellow, Green, Brown, Blue, Pink, Black, Red)
- ➖ **Subtract Mode**: Deduct points for fouls with a dedicated toggle mode
- ↩️ **Undo System**: Revert the last action with one click
- 📜 **Game History**: Track all actions with a detailed history log
- ⌨️ **Keyboard Shortcuts**: Quick actions for power users
- 📱 **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop
- 🌙 **Dark Theme**: Easy on the eyes with a modern dark interface
- 💾 **Offline Ready**: All assets (FontAwesome, Tailwind) loaded locally

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aliabbasbaloch/score-tracker.git
cd score-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Build the CSS:
```bash
npm run build
```

4. Open the application:
   - Open `public/index.html` in your web browser
   - Or use a local development server like Live Server

### Development Mode

To watch for CSS changes during development:
```bash
npm run dev
```

This will watch for changes in `src/css/input.css` and automatically rebuild the styles.

## 📖 How to Use

### Adding Players
1. Enter a player name in the input field
2. Click "Add" or press Enter
3. Players appear in the Players list with their current scores

### Scoring
1. Select a player by clicking on their card (highlighted in green)
2. Click on any ball to add its points to the current player's score
3. Use "Next Player" to move to the next active player

### Subtract Mode
1. Click "Subtract Mode" button (turns red when active)
2. Click any ball to subtract its points (for fouls)
3. Mode stays active until you toggle it off

### Other Actions
- **Undo**: Revert the last action
- **Next Player**: Switch to the next player
- **New Game**: Reset all scores and start fresh
- **Remove Player**: Click the × button on any player card

### Keyboard Shortcuts
- `1-7`: Score balls 1-7 directly
- `S`: Toggle subtract mode
- `Ctrl/Cmd + Z`: Undo last action
- `N`: Next player
- `Ctrl/Cmd + R`: Reset game (with confirmation)

## 🏗️ Project Structure

```
score-tracker/
├── public/
│   ├── css/
│   │   └── styles.css          # Built Tailwind CSS (generated)
│   └── index.html              # Main HTML file
├── src/
│   ├── assets/
│   │   └── fonts/              # Local fonts directory
│   ├── css/
│   │   └── input.css           # Tailwind input file with custom styles
│   └── js/
│       └── app.js              # Main JavaScript application logic
├── node_modules/               # Dependencies (gitignored)
│   └── @fortawesome/           # Local FontAwesome
├── .gitignore                  # Git ignore file
├── package.json                # Project dependencies and scripts
├── tailwind.config.js          # Tailwind configuration
└── README.md                   # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **Tailwind CSS v3.4.1**: Utility-first CSS framework (local)
- **Font Awesome v6.5.1**: Icon library (local)
- **Vanilla JavaScript**: No framework dependencies
- **CSS Grid & Flexbox**: Modern layout techniques

## 🎨 Color Scheme

The application uses a dark theme inspired by GitHub's dark mode:
- Background: `#0d1117`
- Secondary Background: `#161b22`
- Accent Background: `#21262d`
- Text Primary: `#f0f6fc`
- Text Secondary: `#8b949e`

Snooker ball colors are accurately represented:
- Yellow: `#ffdd00`
- Green: `#33ff77`
- Brown: `#d2691e`
- Blue: `#4d9fff`
- Pink: `#ff66cc`
- Black: `#222222`
- Red: `#ff5555`

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: < 400px (3-column ball grid)
- **Tablet**: 400px+ (4-column ball grid)
- **Desktop**: All features optimized for larger screens
- **Landscape Mode**: Special layout for landscape orientation

## 🔧 Build Scripts

- `npm run build`: Build production CSS (minified)
- `npm run build:css`: Build CSS without watching
- `npm run watch:css`: Watch for CSS changes
- `npm run dev`: Alias for watch:css

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Created by **Zeeshan Zounr**

## 🙏 Acknowledgments

- Font Awesome for the icon library
- Tailwind CSS for the utility-first CSS framework
- The snooker community for inspiration

---

Enjoy tracking your snooker games! 🎱
