let sunrise = 8;
let sunset = 20;
let oldDay, oldDate, oldTime;
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


const timeOptions = { hour: '2-digit', minute: '2-digit', hour12:true };
const dateOptions = { month: 'short', year: 'numeric', day: '2-digit' };
const dayOptions = { weekday: 'long' };

function setDate() {
  date = new Date();
  const newtTime = date.toLocaleDateString(undefined, timeOptions).split(',')[1];
  const newDate = date.toLocaleDateString(undefined, dateOptions);
  const newDay = date.toLocaleDateString(undefined, dayOptions);

  if (newtTime !== oldTime) {
    document.querySelector('.time').innerText = newtTime;
    oldTime = newtTime
  }
  if (newDate !== oldDate) {
    document.querySelector('.date').innerText = newDate;
    oldDate = newDate
  }
  if (newDay !== oldDay) {
    document.querySelector('.day').innerText = newDay;
    oldDay = newDay
  }
}

setInterval(() => setDate(), 30 * 1000);
setDate();