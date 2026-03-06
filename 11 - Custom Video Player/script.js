/* Get Our Elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullScreenButton = player.querySelector(".full-screen");

/* Build out functions */
function togglePlay() {
  let method = video.paused ? "play" : "pause";
  video[method]();
}

function updateButton() {
  // this here refers to the video it self that we added event listener to it on line 24.
  const icon = this.paused ? "►" : "❚ ❚";
  console.log(icon);
  toggle.textContent = icon;
}

function skip() {
  console.log("skip");
  console.log(typeof this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
  console.log(video.currentTime);
}

function handleRangeUpdate() {
  console.log(`The name is :${this.name} And the value is :${this.value}`);
  video[this.name] = this.value;
}

function handleProgress() {
  progressBar.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e);
}

function toggleFullScreen() {
  // Check the GLOBAL document to see if anything is fullscreen
  if (document.fullscreenElement) {
    document
      .exitFullscreen()
      .catch((err) => console.log("Error exiting:", err));
  } else {
    // Request fullscreen on the specific player container
    player
      .requestFullscreen()
      .catch((err) => console.log("Error entering:", err));
  }
}

function updateFullscreenButton() {
  if (document.fullscreenElement) {
    fullScreenButton.textContent = "⛶"; // Or whatever icon you prefer
  } else {
    fullScreenButton.textContent = "⇱⇲";
  }
}

/* Hook up the event listeners */
video.addEventListener("click", togglePlay);
window.addEventListener("keydown", function (e) {
  if (e.code == "Space") {
    e.preventDefault();
    togglePlay();
  }
});
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
// Event "progress" will work also.
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => {
  button.addEventListener("click", skip);
});
fullScreenButton.addEventListener("click", toggleFullScreen);
document.addEventListener("fullscreenchange", updateFullscreenButton);

ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate),
);

let mouseDown = false;
progress.addEventListener("click", scrub);
// We passed e because the scrub function we created we passed e to it as well
// And if the mouseDown is true it will execute the scrub function otherwise it won't.
progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));
