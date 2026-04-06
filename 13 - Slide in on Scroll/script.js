const sliderImages = document.querySelectorAll(".slide-in");

function checkSlide(e) {
  console.count(e);
}
window.addEventListener("scroll", debounce(checkSlide));
