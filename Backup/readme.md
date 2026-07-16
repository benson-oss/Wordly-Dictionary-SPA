# 📖 Wordly Dictionary App

A modern and interactive **Dictionary Web Application** built using **HTML, CSS, and JavaScript**. The application allows users to search for English words and instantly view their definitions, pronunciation, synonyms, examples, and pronunciation audio using the free Dictionary API.

---

## 🚀 Features

- 🔍 Search for any English word
- 📚 Display word definitions
- 🗣️ Show pronunciation text
- 🔊 Play pronunciation audio
- 💡 View parts of speech
- 📝 Display example sentences
- 🤝 Display synonyms
- ⭐ Save favorite words
- ❌ Remove favorite words
- 🌙 Light/Dark mode toggle
- ⚡ Fetch data without refreshing the page
- 📱 Responsive and user-friendly interface

---

# 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Dictionary API

---

# 📂 Project Structure

```
Wordly-Dictionary-App/
│
├── index.html
├── Index.css
├── Index.js
└── README.md
```

---

# 📄 HTML

The HTML file provides the structure of the application.

### Main Sections

### Header

Contains:

- Application title
- Theme toggle button

```html
<header>
    <h1>Wordly Dictionary App</h1>
    <button id="theme">Light</button>
</header>
```

---

### About Section

Provides a brief explanation of what the application does.

```html
<div class="about">
```

---

### Search Form

Allows users to enter a word and search.

Contains:

- Text input
- Search button
- Loading message

---

### Results Section

Displays:

- Searched word
- Pronunciation
- Audio button
- Definitions
- Meanings
- Synonyms
- Examples
- Source link
- Save Word button

---

### Favorites Section

Displays all saved words.

Users can:

- View favorites
- Remove favorites

---

### Accessibility Section

Reserved for accessibility messages.

---

# 🎨 CSS

The CSS file styles the application.

## Features

### Light Mode

```css
body.light-mode
```

Uses:

- White background
- Black text

---

### Dark Mode

```css
body.dark-mode
```

Uses:

- Dark background
- White text

---

### Header Styling

The header uses:

- Flexbox
- Black background
- White text
- Responsive spacing

---

### Search Form

Styled with:

- Rounded corners
- Center alignment
- Grey background

---

### Results Section

Displays dictionary information inside a bordered container.

---

### Favorites Section

Uses Grid layout to organize favorite words.

---

### Main Layout

The main page uses Flexbox for arranging:

- Search Results
- Favorites

---

# ⚙️ JavaScript

JavaScript provides all application functionality.

---

## 1. DOM Selection

The application first selects all HTML elements.

Example:

```javascript
const searchButton = document.getElementById("searchButton");
```

---

## 2. Theme Toggle

Users can switch between:

- Light Mode
- Dark Mode

Using:

```javascript
theme.addEventListener("click", ...)
```

---

## 3. Search Form

When the user submits the form:

- Prevents page refresh
- Gets the entered word
- Shows loading message
- Calls the Dictionary API

---

## 4. Fetching Data

Uses the Fetch API.

```javascript
fetch(...)
```

The application:

- Sends a request
- Waits for the response
- Converts JSON
- Displays the results

---

## 5. Error Handling

Handles:

- Word not found
- Network errors
- Invalid responses

Using:

```javascript
try {
}
catch(error){
}
```

---

## 6. Display Results

Shows:

- Word
- Pronunciation
- Definitions
- Parts of speech
- Examples
- Synonyms
- Source URL

---

## 7. Pronunciation Audio

If audio exists:

- Creates a Play button
- Plays pronunciation

```javascript
new Audio(audioUrl).play();
```

---

## 8. Favorites

Users can save searched words.

Favorites are stored in an array.

```javascript
let favorites = [];
```

---

## 9. Remove Favorites

Each saved word has a Remove button.

Clicking it removes the word from the favorites list.

---

## 10. Rendering Favorites

Whenever favorites change,

```javascript
renderFavorites();
```

updates the displayed list automatically.

---

# 🌐 API Used

Dictionary API

```
https://api.dictionaryapi.dev/api/v2/entries/en/<word>
```

Example:

```
https://api.dictionaryapi.dev/api/v2/entries/en/hello
```

---

# ▶️ How to Run

1. Clone the repository

```bash
git clone https://github.com/yourusername/wordly-dictionary-app.git
```

2. Open the project folder.

3. Open `index.html` in your browser.

No installation is required.

---

# 📸 Application Workflow

```
User enters a word
        │
        ▼
Click Search
        │
        ▼
JavaScript validates input
        │
        ▼
Fetch API requests Dictionary API
        │
        ▼
Response received
        │
        ▼
Display:
• Definitions
• Pronunciation
• Audio
• Synonyms
• Examples
• Source
        │
        ▼
User may save the word as a favorite
```

---

# 🔮 Future Improvements

- Store favorites using Local Storage
- Search history
- Recent searches
- Multiple language support
- Voice search
- Better mobile responsiveness
- Offline dictionary support

---

# 👨‍💻 Author

**Benson Maina**

Software Engineering Student

---

# 📄 License

This project is open-source and available under the MIT License.