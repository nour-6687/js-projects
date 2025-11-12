window.addEventListener("keydown", function (e) {
  const key = document.querySelector(`div[data-key="${e.key}"`);
  const audio = document.querySelector(`audio[data-key="${e.key}"`);

  if (!key) return;
  key.classList.add("playing");
  audio.currentTime = 0;
  audio.play();
});
const keys = Array.from(document.querySelectorAll(".key"));
keys.map((key) =>
  key.addEventListener("transitionend", function () {
    key.classList.remove("playing");
  }),
);
