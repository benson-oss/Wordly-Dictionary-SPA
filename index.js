
const DictionaryAPI=`https://api.dictionaryapi.dev/api/v2/entries/en/<word>`

document.addEventListener("DOMContentLoaded",()=>{
// 🔘 Buttons first
const favoriteButton = document.getElementById("favoriteButton");
// Grab all "Search Again" buttons
const searchAgainButtons = document.querySelectorAll(".search-again");
// Grab all "Remove" buttons
const removeFavoriteButtons = document.querySelectorAll(".remove-favorite");

const searchButton= document.getElementById("searchButton")

// 📋 Form and input
const formDiv = document.getElementById("formDiv");
const searchform = document.getElementById("searchform");
const inputs = document.getElementById("inputs");
const loadMessages = document.getElementById("loadMessages");

// 📊 Results section
const SearchedWord = document.getElementById("Searched-word");
const pronunciationText = document.getElementById("pronunciation-text");
const audioControl = document.getElementById("audio-control");
const audioSource=document.getElementById("audio-source");
const pronunciationAudio = document.getElementById("pronunciation-audio");
const definitions = document.getElementById("definitions");
const meanings = document.getElementById("meanings");
const synonyms = document.getElementById("synonyms");
const examples = document.getElementById("examples");
const sourceLink = document.getElementById("source-link");

// ⭐ Favorites section
const favouritesectionDiv = document.getElementById("favouritesectionDiv");
const favouritesection = document.getElementById("favouritesection");
const favouritesEmpty = document.getElementById("favourites-empty");
const favoritesList = document.getElementById("favorites-list");

// ♿ Accessibility
const Accessibility = document.getElementById("Accessibility");

let favorites = [];

//The button toggles between light-mode and dark-mode classes on <body>.
//CSS applies the correct background and text colors.
//The button text updates to show the current mode.
const body = document.body;
const theme = document.getElementById("theme"); // <-- add this

// Set initial mode
body.classList.add("light-mode");

theme.addEventListener("click", () => {
  if (body.classList.contains("light-mode")) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    theme.textContent = "dark"; // update button label
  } else {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    theme.textContent = "light"; // update button label
  }
});
searchform.addEventListener("submit", function(event) {
  event.preventDefault();
  const word = inputs.value.trim();
  if (!word) return;

  SearchedWord.textContent = `You searched for: ${word}`;

  // Show loading state
  searchButton.disabled = true;
  loadMessages.textContent = "🔄 Searching...";
  loadMessages.classList.remove("hidden");

  // Call fetchWord
  fetchWord(word);k
});

async function fetchWord(word) {
  //Ensures the word is safe to put in a URL.eg spaces like %20
  //const encodedWord = word;
   //const encodedWord=encodeURI(word);
const encodedWord = word.trim();

  try {
    //Sends a request to the Free Dictionary API for the given word.
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodedWord}`);
//Checks if the server responded successfully.
    if (!response.ok) {
      if (response.status === 404) {
        loadMessages.textContent = "❌ Word not found.";
      } else {
        loadMessages.textContent = `❌ Error: ${response.status} ${response.statusText}`;
      }
      return;
    }
//Converts the response body into usable JavaScript objects.
    const data = await response.json();
    //Passes the parsed data to another function that updates the UI with word details (
    displayWord(data);
//Handles network failures (like no internet or server down).
  } catch (error) {
    loadMessages.textContent = "❌ Network or server failure.";
    console.error("Fetch error:", error);
  } finally {
    searchButton.disabled = false;
    loadMessages.classList.add("hidden");
  }
}
function getAudioUrl(entry) {
    // If entry is missing or phonetics is not an array, return null
  if (!entry || !Array.isArray(entry.phonetics)) return null;
    // Find the first phonetic object that has a non-empty audio property
  const phoneticWithAudio = entry.phonetics.find(p => p.audio);
    // If found, return its audio URL; otherwise return null
  return phoneticWithAudio ? phoneticWithAudio.audio : null;
}

function displayWord(data) {
  if (!Array.isArray(data) || data.length === 0) {
    loadMessages.textContent = "❌ Invalid response.";
    return;
  }

  const entry = data[0];

  // Clear previous results
  SearchedWord.textContent = "";
  pronunciationText.textContent = "";
  audioControl.innerHTML = "";
  definitions.innerHTML = "";
  synonyms.textContent = "";
  examples.innerHTML = "";
  sourceLink.innerHTML = "";

  // Word
  SearchedWord.textContent = `You searched for: ${entry.word}`;

  // Pronunciation
  const phonetic = entry.phonetics?.find(p => p.text);
  if (phonetic) {
    pronunciationText.textContent = phonetic.text;
  }

  // Audio
  //Finds the first phonetic object with an audio URL.
  const audioUrl = entry.phonetics?.find(p => p.audio)?.audio;
//If audio exists, creates a Play Pronunciation button that plays the audio when clicked.
  if (audioUrl) {
    const playButton = document.createElement("button");
    playButton.textContent = "🔊 Play Pronunciation";
    playButton.addEventListener("click", () => {
      const audio = new Audio(audioUrl);
      audio.play();
    });

    audioControl.appendChild(playButton);
    //If no audio exists, shows "No pronunciation audio available.".
  } else {
    audioControl.textContent = "No pronunciation audio available.";
  }

  // Definitions & Examples
  //looping through meaning
  entry.meanings.forEach(meaning => {
    //Creates an h3 heading showing the part of speech.
    const heading = document.createElement("h3");
    heading.textContent = meaning.partOfSpeech;
    definitions.appendChild(heading);
//Creates a ul list to hold definitions.
    const ul = document.createElement("ul");
//Loops through each definition inside the meaning.
    meaning.definitions.forEach(def => {
     // Creates a li for each definition and adds it to the list.
      const li = document.createElement("li");
      li.textContent = def.definition;
      ul.appendChild(li);
//If the definition has an example sentence, creates a p element and adds it to the examples section.
      if (def.example) {
        const p = document.createElement("p");
        p.textContent = `Example: ${def.example}`;
        examples.appendChild(p);
      }
    });
//After finishing all definitions for that meaning, appends the list to the definitions section.
    definitions.appendChild(ul);
  });
//Clears the meanings section before adding new content.
  meanings.innerHTML = "";
//loops through meaning again showing parts of speech
entry.meanings.forEach((meaning) => {
    const p = document.createElement("p");
    p.textContent = meaning.partOfSpeech;
    meanings.appendChild(p);
});

  // Synonyms
  //Starts an empty array to collect synonyms.
  const allSynonyms = [];
//loops through meanings
  entry.meanings.forEach(meaning => {
    if (meaning.synonyms) {
      //if meaning has synonym it pushes the synonym to the allsynonym array
      allSynonyms.push(...meaning.synonyms);
    }
 //loops again and add definitions and synonym
    meaning.definitions.forEach(def => {
      if (def.synonyms) {
        allSynonyms.push(...def.synonyms);
      }
    });
  });
//Removes duplicates by converting to a Set and back to an array.

  const uniqueSynonyms = [...new Set(allSynonyms)];
//Displays synonyms as a comma-separated list, or shows “None available” if empty.
  synonyms.textContent =
    uniqueSynonyms.length > 0
      ? "Synonyms: " + uniqueSynonyms.join(", ")
      : "Synonyms: None available.";

  // Source Link
  if (entry.sourceUrls?.length > 0) {
    const link = document.createElement("a");
    link.href = entry.sourceUrls[0];
    link.target = "_blank";
    link.textContent = "View Source";
    sourceLink.appendChild(link);
  }

  // Favorite Button
  favoriteButton.textContent = "Save Word";

  favoriteButton.onclick = () => {
    if (!favorites.includes(entry.word)) {
        favorites.push(entry.word);
                favouritesection.classList.remove("hidden");

        renderFavorites();
    }
};
function renderFavorites() {
    favoritesList.innerHTML = "";

    if (favorites.length === 0) {
        favouritesEmpty.classList.remove("hidden");
        return;
    }

    favouritesEmpty.classList.add("hidden");

    favorites.forEach(word => {

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = word;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";

        removeBtn.onclick = () => {
            favorites = favorites.filter(item => item !== word);
            renderFavorites();
        };

        li.appendChild(span);
        li.appendChild(removeBtn);

        favoritesList.appendChild(li);
    });
}
}
});