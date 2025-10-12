/* Random Bilder je nach Theme - Neues Paar bei jedem Reload */
let selectedDarkImage;
let selectedLightImage;

function chooseRandomImages() {
  const darkimages = [
    "Bilder/dark_mountain.webp", 
    "Bilder/dark_forest.webp",
    "Bilder/dark_sky.webp", 
    "Bilder/dark_snowy.webp"
  ];

  const lightimages = [
    "Bilder/light_ocean_adobe.webp",
    "Bilder/light_forest.webp",
    "Bilder/light_ocean.webp",
    "Bilder/light_beach.webp"
  ];

  // Vorherige Indizes aus localStorage holen
  const previousDarkIndex = parseInt(localStorage.getItem("lastDarkIndex")) || -1;
  const previousLightIndex = parseInt(localStorage.getItem("lastLightIndex")) || -1;

  // Dark-Bild wählen (nicht den vorherigen Index)
  let randomDarkIndex;
  do {
    randomDarkIndex = Math.floor(Math.random() * darkimages.length);
  } while (randomDarkIndex === previousDarkIndex && darkimages.length > 1);
  
  selectedDarkImage = darkimages[randomDarkIndex];

  // Light-Bild wählen (nicht den vorherigen Index)
  let randomLightIndex;
  do {
    randomLightIndex = Math.floor(Math.random() * lightimages.length);
  } while (randomLightIndex === previousLightIndex && lightimages.length > 1);
  
  selectedLightImage = lightimages[randomLightIndex];

  // Neue Indizes für nächsten Reload speichern
  localStorage.setItem("lastDarkIndex", randomDarkIndex);
  localStorage.setItem("lastLightIndex", randomLightIndex);
}

function setBackgroundForCurrentTheme() {
  // Aktuelles Theme abfragen
  const theme = document.documentElement.getAttribute("data-theme");
  
  // Das richtige Bild für das aktuelle Theme auswählen
  const selectedImage = theme === "light" ? selectedLightImage : selectedDarkImage;

  // Hintergrund setzen
  const pageWrapper = document.getElementById("page-wrapper");
  pageWrapper.style.backgroundImage =
    `linear-gradient(to top, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${selectedImage})`;
  pageWrapper.style.backgroundSize = "cover";
  pageWrapper.style.backgroundPosition = "center";
}

function initializeBackgroundSystem() {
  // Einmalig bei Reload: Neue zufällige Bilder auswählen
  chooseRandomImages();
  
  // Initial das richtige Bild für das aktuelle Theme setzen
  setBackgroundForCurrentTheme();
}

// Beim Laden der Seite: Neues Bilderpaar auswählen und initialisieren
window.addEventListener("load", initializeBackgroundSystem);

// Observer für Theme-Wechsel: Nur zwischen den bereits gewählten Bildern umschalten
const themeObserver = new MutationObserver(() => {
  setBackgroundForCurrentTheme();
});

themeObserver.observe(document.documentElement, { 
  attributes: true, 
  attributeFilter: ["data-theme"] 
});