# Typing Speed Test

This is a simple typing speed test application built using HTML, CSS, and JavaScript. The application allows users to select a difficulty level, type the displayed text, and receive real-time feedback on their typing accuracy. The best score for each difficulty level is saved using `localStorage`.

## Table of Contents

- [Features](#features)
- [Game Data](#game-data)
- [User Interface](#user-interface)
- [Game Engine](#game-engine)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [Credits](#credits)
- [Reflections](#reflections)
- [License](#license)

## Features

- Real-time feedback on typing accuracy with correctly typed words highlighted in blue and incorrectly typed words highlighted in red.
- Best score tracking for each difficulty level using `localStorage`.
- User-friendly interface with a text-based input field, control buttons, and a results display area.

## Game Data

The game data is stored in a JSON object within the `script.js` file. It includes information about sentences for each difficulty level.

```javascript
const sentences = {
    easy: [
        "The quick brown fox jumps over the lazy dog.",
        "Pack my box with five dozen liquor jugs."
    ],
    medium: [
        "How razorback-jumping frogs can level six piqued gymnasts!",
        "Jinxed wizards pluck ivy from the big quilt."
    ],
    hard: [
        "Crazy Fredrick bought many very exquisite opal jewels.",
        "We promptly judged antique ivory buckles for the next prize."
    ]
};

## validation
![html validation](https://ibb.co/JqnMvt0)
![css validation](https://ibb.co/18Yszxf)
