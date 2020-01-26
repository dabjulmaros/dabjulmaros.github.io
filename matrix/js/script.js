//settings
var clampNum=1;
let noClock = false;
let _12hour =true;
let smoothing=true;
var mmddyy=true;

var c = document.getElementById("c");
var ctx = c.getContext("2d");
// making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;
let backgroundC={'r':0,'g':0,'b':0};
const originalTC= {'r':0,'g':255,'b':70};
let vizC=originalTC;
let textC=originalTC;
// the characters
var konkani  = "゠アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレワヰヱヲンヺ・ーヽヿ0123456789"
// converting the string into an array of single characters
var characters = konkani.split("");
var font_size = 20;
var columns; // number of columns for the rain
// an array of drops - one per column
var drops;
var dropRate=1;
var timing=false;
var timingTimeout;
let clockEl=document.querySelector("#clock");
let timeEl=document.querySelector(".time");
let dateEl=document.querySelector(".date");
clockEl.style.color=`rgb(${textC.r},${textC.g},${textC.b})`;
clockEl.style.textShadow=` -5px 0 rgb(${backgroundC.r},${backgroundC.g},${backgroundC.b}), 0 5px rgb(${backgroundC.r},${backgroundC.g},${backgroundC.b}), 5px 0 rgb(${backgroundC.r},${backgroundC.g},${backgroundC.b}), 0 -5px rgb(${backgroundC.r},${backgroundC.g},${backgroundC.b})`;
clockEl.style.marginTop=`${timeEl.offsetHeight}px`

var canvas = document.getElementById('canvas');
var audioCanvasCtx = canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let oldAudioArray=[];
let charAudioArray=[];
const decreseRate=.07;
const audioIncrease = 0.02;
let vizTexSize=canvas.width/64;
setInterval(time,1000);
time();

// x below is the x coordinate
// 1 = y-coordinate of the drop (same for every drop initially)
function init(){
  columns = c.width/font_size;
  drops=[];
  for (var x = 0; x < columns; x++)
      //drops[x]=0;
      drops[x] = Math.floor(Math.random()*-100);
}
function time(){
  if(noClock)
  {
    timeEl.style.display="none";
    dateEl.style.display="none";
    return;
  }
  else{
    timeEl.style.display="block";
    dateEl.style.display="block";
  }
  let d = new Date();

  if(_12hour)
    timeEl.innerHTML=new Intl.DateTimeFormat('en-US',{'hour':'2-digit','minute':'2-digit','second':'2-digit','hour12':true}).format(d);
  else
    timeEl.innerHTML=new Intl.DateTimeFormat('en-US',{'hour':'2-digit','minute':'2-digit','second':'2-digit','hour12':false}).format(d);

  if(mmddyy)
    dateEl.innerText=new Intl.DateTimeFormat('en-US',{'month':'short','day':'2-digit','year':'2-digit'}).format(d).replace(',','').replace(/ /g,'/');
  else
    dateEl.innerText=new Intl.DateTimeFormat('en-GB',{'day':'2-digit','month':'2-digit','year':'2-digit'}).format(d).replace(',','').replace(/ /g,'/');

}
// drawing the characters
function draw() {
    // translucent BG to show trail

    ctx.fillStyle = `rgba(${backgroundC.r},${backgroundC.g},${backgroundC.b}, 0.05)`;
    ctx.fillRect(0, 0, c.width, c.height);
    //ctx.font = "2em arial";
    ctx.font = font_size+"px arial";

    // looping over drops
    for (var i = 0; i < drops.length; i++)
    {
      if(dropRate>0)
      {
        if(textC!=originalTC)
        {
          textC=originalTC;
          clockEl.style.color=`rgb(${textC.r},${textC.g},${textC.b})`;
        }

        ctx.clearRect(i * font_size, drops[i] * font_size,font_size,-font_size);

        // a random chinese character to print
        var text = characters[Math.floor(Math.random() * characters.length)];
        // x = i * font_size, y = value of drops[i] * font_size
        ctx.fillStyle = `rgb(${textC.r},${textC.g},${textC.b})`;
        ctx.fillText(text, i * font_size, drops[i] * font_size);
        // Incrementing Y coordinate
        drops[i]+=dropRate;
        // sending the drop back to the top randomly after it has crossed the screen
        // adding randomness to the reset to make the drops scattered on the Y axis
       if (drops[i] * font_size > c.height && Math.random() > 0.975)
            drops[i] = 0;
      }
    }
}

window.onresize=()=>{
  c.height = window.innerHeight;
  c.width = window.innerWidth;
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  init();
}
init();
setInterval(draw, 50);

for(var x =0;x<64;x++){
  charAudioArray.push([]);
  for(y=0;y<(canvas.height*clampNum)/vizTexSize;y++){
    charAudioArray[x].push(null);
  }
}
//wpe functions
try{
	window.wallpaperPropertyListener ={
		applyUserProperties: function(properties) {
			if (properties.audioHeight) {
				clampNum=(100-Math.floor(properties.audioHeight.value))/100;
			}if (properties.textColor) {
			var schemeColor = properties.textColor.value.split(' ');
			schemeColor = schemeColor.map(function(c) {
			  return Math.ceil(c * 255);
			});
				textC={'r':schemeColor[0],'g':schemeColor[1],'b':schemeColor[2]};
			}
		  if (properties.backgroundColor) {
			var schemeColor = properties.backgroundColor.value.split(' ');
			schemeColor = schemeColor.map(function(c) {
			  return Math.ceil(c * 255);
			});
				backgroundC={'r':schemeColor[0],'g':schemeColor[1],'b':schemeColor[2]};
			}
		  if(properties.smoothing){
			smoothing=properties.smoothing.value;
		  }
		  if(properties.clock){
			noClock=!properties.clock.value;
		  }
		  if(properties._12hour){
			_12hour=properties._12hour.value;
		  }
		  if(properties.mmddyy){
			mmddyy=properties.mmddyy.value;
		  }
		},
	};

	window.wallpaperRegisterAudioListener(wallpaperAudioListener);

}catch{};

function wallpaperAudioListener(audioArray) {
  //audioCanvasCtx.font="30px arial";
  audioCanvasCtx.font=font_size+"px arial";
  let halfCount=audioArray.length/2;
  let cHeight=canvas.height*clampNum;
  //gets the audiovisualizer bar with with some space to the sides
  // Clears the canvas
  audioCanvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  if(((audioArray[0]*cHeight)+(audioArray[halfCount]*cHeight))/2>.15)
  {
    if(!timing){
      timing=true;
      canvas.setAttribute("class", "fade-in");
      timingTimeout=setTimeout(()=>{
        dropRate=0;
        timing=false;
        if(textC!=vizC){
          textC=vizC;
          clockEl.style.color=`rgb(${textC.r},${textC.g},${textC.b})`;
        }
      },500);
    }
    if(dropRate==0 && timing){
      clearTimeout(timingTimeout);
      timing=false;
    }
  }
  else {
    if(!timing){
      timing=true;
      timingTimeout=setTimeout(()=>{
        dropRate=1;
        timing=false;
        canvas.setAttribute("class", "");
        init();
      },750);
    }
    if(dropRate==1 && timing){
      clearTimeout(timingTimeout);
      timing=false;
    }
  }

  let height = [];

  for (var x = 0; x < halfCount; ++x) {
    //averges the left and right channel
      //audioArray[x] ?0-1 * canvas height makes it the height of the window
    if(audioArray[x]>1)
      audioArray[x]=1;

    if(audioArray[x+halfCount]>1)
      audioArray[x+halfCount]=1;

    height[x] = ((audioArray[x]*cHeight)+(audioArray[x+halfCount]*cHeight))/2;
    if(smoothing)
    {
      if(oldAudioArray[x] && height[x]<oldAudioArray[x])
        height[x]=oldAudioArray[x]-(oldAudioArray[x]*decreseRate);

      oldAudioArray[x]=height[x];
    }
  }

  //render bars
  if(canvas.getAttribute('class')=='fade-in'){
    for (var x = 0; x < halfCount; ++x) {
      for(var y=0;y<height[x]/vizTexSize;y++){
        var text;
        if(charAudioArray[x][y]!=null ||charAudioArray[x][y]!=undefined)
          text = charAudioArray[x][y];
        else {
          text = characters[Math.floor(Math.random() * characters.length)];
          charAudioArray[x][y]=text;
        }

        if(y+1>=height[x]/vizTexSize)
          for(var z = y+1;z<(canvas.height*clampNum)/vizTexSize;z++)
            charAudioArray[x][z]=null;

        tempHeight=(y * vizTexSize)-vizTexSize;
        audioCanvasCtx.fillStyle = `rgba(${backgroundC.r},${backgroundC.g},${backgroundC.b},.7)`;
        audioCanvasCtx.fillRect(x * vizTexSize, tempHeight,vizTexSize,-vizTexSize);
        audioCanvasCtx.fillStyle = `rgb(${textC.r},${textC.g},${textC.b})`;
        audioCanvasCtx.fillText(text, x * vizTexSize, tempHeight);
      }
    }
  }
}
