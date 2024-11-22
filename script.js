// Station data
const stations = [
  {
    station: "Station №1",
    name: "Gear & Equipment",
    description: "Put on all the clothes on the table as fast as you can.",
    backgroundImage: "url('images/gear.jpg')",
  },
  {
    station: "Station №2",
    name: "Hiking Challenge",
    description: "Spin the wheel to get your hiking challenge!",
    backgroundImage: "url('images/hiking.jpg')",
  },
  {
    station: "Station №3",
    name: "Tent Building",
    description:
      "Build a tent using blankets and chairs, then take a photo inside.",
    backgroundImage: "url('images/tent.jpg')",
  },
  {
    station: "Station №4",
    name: "Animal Cave",
    description: "Listen to animal sounds and guess which animal it is.",
    backgroundImage: "url('images/cave.jpg')",
  },
  {
    station: "Station №5",
    name: "Sandwich Making",
    description: "Make a sandwich using only your teammate's hands!",
    backgroundImage: "url('images/meal.webp')",
  },
  {
    station: "Station №6",
    name: "First Aid",
    description: "Complete the quiz about extreme weather survival.",
    backgroundImage: "url('images/first-aid.jpg')",
  },
  {
    station: "Station №7",
    name: "Survival Quiz",
    description: "Start a fire using provided materials.",
    backgroundImage: "url('images/survival.jpg')",
  },
];

// Group flows: Each group starts at a different station and follows a specific order
const groupFlows = {
  "Ice Baby": [0, 1, 2, 3, 4, 5, 6],
  "Frostbite Fighters": [0, 1, 2, 3, 4, 5, 6],
  "Snow-vivors": [1, 2, 3, 4, 5, 6, 0],
  "Puff Jacket Posse": [2, 3, 4, 5, 6, 0, 1],
  "The Yeti Betis": [3, 4, 5, 6, 0, 1, 2],
  "Hot Cocoa Hustlers": [4, 5, 6, 0, 1, 2, 3],
  "Sleet Fleet": [6, 0, 1, 2, 3, 4, 5],
};

// State variables
let currentStationIndex = 0;
let currentGroup = "";
let countdown;

// DOM Elements
const loadingPage = document.getElementById("loading-page");
const startAdventureButton = document.getElementById("start-adventure");
const groupSelection = document.getElementById("group-selection");
const groupForm = document.getElementById("groupForm");
const groupDescription = document.querySelector(".group-description");
const stationContent = document.getElementById("station-content");
const stationName = document.getElementById("station-name");
const stationDescription = document.getElementById("station-description");
const nextStationButton = document.getElementById("next-station");
const timerDisplay = document.getElementById("timer");

// Timer functions
function startTimer(durationInSeconds, onTimerEnd) {
  clearInterval(countdown);
  let timeRemaining = durationInSeconds;

  // Update the timer display
  updateTimerDisplay(timeRemaining);

  // Countdown logic
  countdown = setInterval(() => {
    timeRemaining--;
    updateTimerDisplay(timeRemaining);

    if (timeRemaining <= 0) {
      clearInterval(countdown);
      onTimerEnd();
    }
  }, 1000);
}

function updateTimerDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
    secs
  ).padStart(2, "0")}`;
}

// Load current station based on the group's flow
function loadStation() {
  const groupFlow = groupFlows[currentGroup];
  const station = stations[groupFlow[currentStationIndex]];
  stationName.textContent = station.name;
  stationDescription.textContent = station.description;
  startTimer(150, goToNextStation); // 3-minute timer
}

// Navigate to the next station based on the group’s flow
function goToNextStation() {
  currentStationIndex++;
  const groupFlow = groupFlows[currentGroup];

  if (currentStationIndex < groupFlow.length) {
    loadStation();
  } else {
    stationContent.innerHTML = "<h2>All stations completed! Well done!</h2>";
  }
}

// Event Listeners
startAdventureButton.addEventListener("click", () => {
  loadingPage.style.display = "none";
  groupSelection.style.display = "block";
});

groupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectedGroup = document.getElementById("group").value;

  // Set the current group based on the user's selection
  currentGroup = selectedGroup;
  currentStationIndex = 0; // Reset to the first station

  groupSelection.style.display = "none";
  groupDescription.style.display = "none";
  stationContent.style.display = "block"; // Show the station content
  loadStation();
});

nextStationButton.addEventListener("click", goToNextStation);

function loadStation() {
  const groupFlow = groupFlows[currentGroup];
  const station = stations[groupFlow[currentStationIndex]];
  stationName.innerHTML = `${station.station}<br>${station.name}`; // Combine with a line break
  stationDescription.textContent = station.description;
  stationContent.style.backgroundImage = station.backgroundImage;
  stationContent.style.display = "flex"; // Ensure the station content is displayed
  startTimer(150, goToNextStation); // 3-minute timer
}
