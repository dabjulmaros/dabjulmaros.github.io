var c = document.getElementById("c");
var ctx = c.getContext("2d");
// making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;
let backgroundC={'r':0,'g':0,'b':0};
let textC={'r':0,'g':255,'b':70};
// the characters
var konkani  = "゠アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレワヰヱヲンヺ・ーヽヿ0123456789"
// converting the string into an array of single characters
var characters = konkani.split("");
var font_size = 20;
var columns; // number of columns for the rain
// an array of drops - one per column
var drops;
// x below is the x coordinate
// 1 = y-coordinate of the drop (same for every drop initially)
function init(){
  columns = c.width/font_size;
  drops=[];
  for (var x = 0; x < columns; x++)
      drops[x] = 1;
}
// drawing the characters
function draw() {
    // Get the BG color based on the current time i.e. rgb(hh, mm, ss)
    // translucent BG to show trail

    ctx.fillStyle = `rgba(${backgroundC.r},${backgroundC.g},${backgroundC.b}, 0.05)`;
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.font = font_size + "px arial";

    // looping over drops
    for (var i = 0; i < drops.length; i++)
    {
        ctx.fillStyle = `rgb(${backgroundC.r},${backgroundC.g},${backgroundC.b})`;
        ctx.fillRect(i * font_size, drops[i] * font_size,font_size,font_size);
        // a random chinese character to print
        var text = characters[Math.floor(Math.random() * characters.length)];
        // x = i * font_size, y = value of drops[i] * font_size
        ctx.fillStyle = `rgb(${textC.r},${textC.g},${textC.b})`;
        ctx.fillText(text, i * font_size, drops[i] * font_size);
        // Incrementing Y coordinate
        drops[i]++;
        // sending the drop back to the top randomly after it has crossed the screen
        // adding randomness to the reset to make the drops scattered on the Y axis
       if (drops[i] * font_size > c.height && Math.random() > 0.975)
			      drops[i] = 0;
    }
}
function changeSettings(){
  document.getElementById('settings').style.display="none";
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(document.getElementById('backC').value);
  backgroundC={'r':parseInt(result[1], 16),'g':parseInt(result[2], 16),'b':parseInt(result[3], 16)};
  result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(document.getElementById('textC').value);
  textC={'r':parseInt(result[1], 16),'g':parseInt(result[2], 16),'b':parseInt(result[3], 16)};
  ctx.fillStyle = `rgba(${backgroundC.r},${backgroundC.g},${backgroundC.b})`;
  ctx.fillRect(0, 0, c.width, c.height);
  if(font_size)
  temp=document.getElementById('fontSize').value;
  if(font_size!=temp){
    font_size=temp;
    init();
  }
}
document.addEventListener("keydown",(e)=>{
  var settings=document.getElementById('settings').style;
  if(e.keyCode==27){
    if(settings.display=='inline-block'){
      settings.display="none";
    }else {
      settings.display='inline-block'
    }
  }
  if(e.keyCode==13 && settings.display=='inline-block'){
    changeSettings();
  }
});
window.onresize=()=>{
  c.height = window.innerHeight;
  c.width = window.innerWidth;
  init();
}
init();
setInterval(draw, 50);
