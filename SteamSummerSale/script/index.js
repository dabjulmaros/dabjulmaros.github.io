let sunrise = 8;
let sunset = 20;
let date = new Date();
const hour = date.getHours();
let backgroundImage = "";
if (hour > sunrise && hour < sunset) {
  document.body.setAttribute('class', 'day');
  backgroundImage = "./assets/home_header_bg_day_japanese.gif";
} else {
  document.body.setAttribute('class', 'night');
  backgroundImage = "./assets/home_header_bg_night_japanese.gif"
}

const image = new Image();
image.addEventListener('load', function () {
  document.querySelector('.hero').style.backgroundImage = 'url(' + backgroundImage + ')';
  document.querySelector('.scan').classList.add("animate");
});
image.src = backgroundImage;


const timeOptions = { hour: '2-digit', minute: '2-digit' };
const dateOptions = { month: 'short', year: 'numeric', day: '2-digit' };
const dayOptions = { weekday: 'long' };

function setDate() {
  date = new Date();
  document.querySelector('.time').innerText = date.toLocaleDateString(undefined, timeOptions).split(',')[1];
  document.querySelector('.date').innerText = date.toLocaleDateString(undefined, dateOptions);
  document.querySelector('.day').innerText = date.toLocaleDateString(undefined, dayOptions);
}

setInterval(()=>setDate,1000);
setDate();