
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
  fetchWord(word);
});

async function fetchWord(word) {
  const encodedWord = encodeURIComponent(word);

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodedWord}`);

    if (!response.ok) {
      if (response.status === 404) {
        loadMessages.textContent = "❌ Word not found.";
      } else {
        loadMessages.textContent = `❌ Error: ${response.status} ${response.statusText}`;
      }
      return;
    }

    const data = await response.json();
    displayWord(data);

  } catch (error) {
    loadMessages.textContent = "❌ Network or server failure.";
    console.error("Fetch error:", error);
  } finally {
    searchButton.disabled = false;
    loadMessages.classList.add("hidden");
  }
}
function getAudioUrl(entry) {
  if (!entry || !Array.isArray(entry.phonetics)) return null;
  const phoneticWithAudio = entry.phonetics.find(p => p.audio);
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
  const audioUrl = entry.phonetics?.find(p => p.audio)?.audio;

  if (audioUrl) {
    const playButton = document.createElement("button");
    playButton.textContent = "🔊 Play Pronunciation";

    playButton.addEventListener("click", () => {
      const audio = new Audio(audioUrl);
      audio.play();
    });

    audioControl.appendChild(playButton);
  } else {
    audioControl.textContent = "No pronunciation audio available.";
  }

  // Definitions & Examples
  entry.meanings.forEach(meaning => {
    const heading = document.createElement("h3");
    heading.textContent = meaning.partOfSpeech;
    definitions.appendChild(heading);

    const ul = document.createElement("ul");

    meaning.definitions.forEach(def => {
      const li = document.createElement("li");
      li.textContent = def.definition;
      ul.appendChild(li);

      if (def.example) {
        const p = document.createElement("p");
        p.textContent = `Example: ${def.example}`;
        examples.appendChild(p);
      }
    });

    definitions.appendChild(ul);
  });

  meanings.innerHTML = "";

entry.meanings.forEach((meaning) => {
    const p = document.createElement("p");
    p.textContent = meaning.partOfSpeech;
    meanings.appendChild(p);
});

  // Synonyms
  const allSynonyms = [];

  entry.meanings.forEach(meaning => {
    if (meaning.synonyms) {
      allSynonyms.push(...meaning.synonyms);
    }

    meaning.definitions.forEach(def => {
      if (def.synonyms) {
        allSynonyms.push(...def.synonyms);
      }
    });
  });

  const uniqueSynonyms = [...new Set(allSynonyms)];

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