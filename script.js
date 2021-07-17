// Convert time to a format of hours, minutes, seconds, and milliseconds
function timeToString(time) {
  var diffInHrs = time / 3600000;
  var hh = Math.floor(diffInHrs);

  var diffInMin = (diffInHrs - hh) * 60;
  var mm = Math.floor(diffInMin);

  var diffInSec = (diffInMin - mm) * 60;
  var ss = Math.floor(diffInSec);

  var diffInMs = (diffInSec - ss) * 100;
  var ms = Math.floor(diffInMs);

  var formattedMM = mm.toString().padStart(2, "0");
  var formattedSS = ss.toString().padStart(2, "0");
  var formattedMS = ms.toString().padStart(2, "0");
  var formattedhh = hh.toString().padStart(2, "0");

  return `${formattedhh}:${formattedMM}:${formattedSS}:${formattedMS}`;
}

// Declare variables to use in our functions below
var lapList = document.getElementById("laps");
var buttonLap = document.getElementById("button-lap");
var lapCounter = 1;
var startTime;
var elapsedTime = 0;
var timerInterval;

// Create function to modify innerHTML
function print(txt) {
  document.getElementById("display").innerHTML = txt;
}

// Create "start", "pause" and "reset" functions
function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 10);
  showButton("PAUSE");
}

function pause() {
  clearInterval(timerInterval);
  showButton("PLAY");
}

function reset() {
  clearInterval(timerInterval);
  print("00:00:00:00");
  elapsedTime = 0;
  showButton("PLAY");
  lapList.innerHTML = "";
  lapCounter = 1;
  storeLaps();
}

// Create function to display buttons
function showButton(buttonKey) {
  var buttonToShow = buttonKey === "PLAY" ? playButton : pauseButton;
  var buttonToHide = buttonKey === "PLAY" ? pauseButton : playButton;
  buttonToShow.style.display = "block";
  buttonToHide.style.display = "none";
}
// Create event listeners
var playButton = document.getElementById("playButton");
var pauseButton = document.getElementById("pauseButton");
var resetButton = document.getElementById("resetButton");

playButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);

buttonLap.onclick = function () {
  lapList.innerHTML +=
    "<li id='lapStyle' class = 'lapStyle'> <b class='gold'>Lap - " +
    lapCounter +
    " :  </b>" +
    document.getElementById("display").innerHTML +
    "<br>";
  lapCounter++;
  storeLaps() + " </li>";
};

function storeLaps() {
  window.localStorage.myLaps = lapList.innerHTML;
}

function getLaps() {
  lapList.innerHTML = window.localStorage.myLaps;
}
