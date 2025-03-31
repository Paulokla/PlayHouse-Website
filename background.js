// Background Images
var backgrounds = ["img/ph1.jpg", "img/ph2.jpg", "img/ph3.jpg", "img/ph4.jpg"];
var currentBackgroundIndex = 0;

// Change Background Function
function changeBackground() {
  document.body.style.backgroundImage =
    "url(" + backgrounds[currentBackgroundIndex] + ")";
  currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
}

// Initial background
changeBackground();
// Change background every 10 seconds
setInterval(changeBackground, 10000);
