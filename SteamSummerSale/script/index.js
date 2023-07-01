let sunrise = 8;
let sunset = 20;
const date = new Date();
const hour = date.getHours();
let backgroundImage="";
if (hour > sunrise && hour < sunset) {
  document.body.setAttribute('class', 'day'); 
  backgroundImage="./assets/home_header_bg_day_japanese.gif";
} else {
  document.body.setAttribute('class', 'night');
  backgroundImage="./assets/home_header_bg_night_japanese.gif"
}

const image = new Image();
image.addEventListener('load', function() {
  document.querySelector('.hero').style.backgroundImage = 'url(' + backgroundImage + ')';
  document.querySelector('.scan').classList.add("animate");
});
image.src = backgroundImage;
