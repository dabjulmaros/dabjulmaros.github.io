let sunrise = 8;
let sunset = 20;
let oldDay, oldDate, oldTime;


const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
const dateOptions = { month: 'short', year: 'numeric', day: '2-digit' };
const dayOptions = { weekday: 'long' };

function setDate() {
  const date = new Date();
  const hour = date.getHours();

  if (hour >= sunrise && hour < sunset && !document.body.className.includes('day')) {
    document.body.className = "day"
    setBackground("./assets/home_header_bg_day_japanese.gif")
  } else if(!(hour >= sunrise && hour < sunset) && !document.body.className.includes('night')) {
    document.body.className = "night"
    setBackground("./assets/home_header_bg_night_japanese.gif")
  }

  const newTime = date.toLocaleDateString(undefined, timeOptions).split(',')[1];
  const newDate = date.toLocaleDateString(undefined, dateOptions);
  const newDay = date.toLocaleDateString(undefined, dayOptions);

  if (newTime !== oldTime) {
    document.querySelector('.time').innerText = newTime;
    oldTime = newTime
  }
  if (newDate !== oldDate) {
    document.querySelector('.date').innerText = newDate;
    oldDate = newDate
  }
  if (newDay !== oldDay) {
    document.querySelector('.weekDay').innerText = newDay;
    oldDay = newDay
  }
}

function setBackground(src){
  document.querySelector('.scan').classList.remove("animate")
  const image = new Image();
  image.addEventListener('load', function () {
    document.querySelector('.hero').style.backgroundImage = 'url(' + src + ')';
    document.querySelector('.scan').classList.add("animate");
  });
  image.src = src;
}

setInterval(() => setDate(), 30 * 1000);
setDate();