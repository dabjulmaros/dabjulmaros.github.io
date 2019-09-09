window.addEventListener('load',setup);
//im so sorry
let ctx,width,height,snake,food,update,movementSpeed,score,div,canvas,oveHold,overlayPrim,overlaySeco,length,scoreHold,sqrpaCheck,pasCount,pahCount,snSize,snSpeed,foColor,snColor,gridCheck,wrapCheck;
let lastMove=0;
let playArea=50;
let pauseGame=false;
let gameOver=true;
let xTouch=null;
let yTouch=null;
let gameOverText='Click here to play again!';
let gamePauseText='Click here to Resume, or press P/ESC.';
const strokeS=3;
function setup(){
  //ui animation stuff
  let elementsArray = document.querySelectorAll(".material-icons");
  let settingBox = document.querySelector(".settings.boxes");
  elementsArray.forEach(function(elem) {
    elem.addEventListener("click", function() {
      if(settingBox.style.display=="none"){
        document.getElementById("settingClick").classList.value+=" rotate-center-right";
        settingBox.classList.value="settings boxes slide-left";
        settingBox.style.display="block";
      }else{
        settingBox.classList.value="settings boxes slide-right";
        document.getElementById("settingClick").classList.value+=" rotate-center-left";
      }
    });
  });
  settingBox.addEventListener("webkitAnimationEnd", setAnimEnd,false);
  settingBox.addEventListener("animationend", setAnimEnd,false);
  settingBox.addEventListener("oanimationend", setAnimEnd,false);

  //dom elements
  div    = document.querySelector('.main');
  canvas = document.querySelector("#canvas");

  wrapCheck = document.querySelector('#wrapCheck')//done
  oveHold = document.querySelector('.overlayHold')//done
  oveHold.addEventListener('click',clickedOverlay);//done
  overlayPrim = document.getElementById('overlayPrim');//done
  overlaySeco = document.getElementById('overlaySeco');//done
  scoreHold   = document.getElementById('score');//done
  length  = document.getElementById('length');//done

  //event handlers for game settings changes
  document.getElementById('snSize').addEventListener("change",e=>{
    size=Math.floor(e.target.value);
    sizePlayArea();
  });//done
  size=Math.floor(document.getElementById('snSize').value);//done
  snSpeed = document.getElementById('snSpeed');//done

  document.getElementById('foColor').addEventListener("change",e=>{foColor=e.target.value;
    if(food){
      food.updateColor(foColor);
    }
  });//done
  document.getElementById('snColor').addEventListener("change",e=>{snColor=e.target.value;
    if(snake){
      snake.updateColor(snColor);
    }
  });//done
  foColor=document.getElementById('foColor').value;//done
  snColor=document.getElementById('snColor').value;//done

  gridCheck=document.getElementById('gridCheck');//done
  circleCheck=document.getElementById('circleCheck');//done

  pasCount = document.getElementById('pasCount').value;
  pahCount = document.getElementById('pahCount').value;
  document.getElementById('pasCount').addEventListener('change',e=>{
    pasCount=e.target.value;
    if(document.getElementById('sqrpaCheck').checked)
    {
      pahCount=e.target.value;
    }
  });
  document.getElementById('pahCount').addEventListener('change',e=>pahCount=e.target.value);

  document.getElementById('sqrpaCheck').addEventListener('change',e=>{
    //make Square or not
    let originalVal=pahCount;
    if(e.target.checked){
      pahCount=pasCount;
      document.getElementById('pahCount').parentElement.style.display='none';
    }
    else{
      document.getElementById('pahCount').parentElement.style.display='block';
      pahCount=document.getElementById('pahCount').value;
    }
  });
  //primes the canvas, and the overlay
  canvas.tabIndex = 1000;
  canvas.addEventListener("keydown",canvasKey);
  canvas.addEventListener("focusout",canvasFocusLost);
  canvas.addEventListener('touchstart', handleTouchStart, false);
  canvas.addEventListener('touchmove', handleTouchEnd, false);
  ctx = canvas.getContext("2d");

  if(mobilecheck()){
    showOverlay("Touch to Start Game",'Swipe controls, Touch outside the play area to pause');
    gameOverText= 'Touch here to play again!';
    gamePauseText='Touch here to Resume, or press P/ESC.'
    snSpeed.value=1;
    wrapCheck.checked=true;
  }
  sizePlayArea();
  sizeCanvas();
  alignOverlay();
}
function newGame(){
  sizeCanvas();
  snake = new Snake(Math.floor(Math.floor(canvas.width/size)/2),Math.floor(Math.floor(canvas.height/size)/2),size,snColor,strokeS);
  food  = new Food(0,0,size,foColor,strokeS);
  food.newFood();
  score=0;
  scoreHold.innerHTML=score;
  length.innerHTML=score+1;
  update={"x":0,"y":-1};
  movementSpeed=Math.floor(snSpeed.value);
  pauseGame=false;
  gameOver=false;
  window.requestAnimationFrame(gameLoop)
}
function gameLoop(timeStamp){
  if(!pauseGame&&!gameOver){
    let nextMove=lastMove+(1000/movementSpeed);
    //DONT TIE MOVEMENT TO FRAMERATE... BETHESDA
    snake.updateVelocity(update.x,update.y)
    if(timeStamp>nextMove){
      //Move snake
      snake.move();

      if(snake.checkDeath(wrapCheck.checked)){
        showOverlay("GAME OVER!",gameOverText);
        gameOver=true;
        return;
      }
      if(food.eat(snake.position)){
        food.newFood();
        snake.grow();
        score++;
        length.innerHTML=score+1;
        movementSpeed+=Math.floor(snSpeed.value)/score;
        scoreHold.innerHTML=Math.floor(score*movementSpeed);
      }
      draw();
      lastMove=timeStamp;
    }
  }
  window.requestAnimationFrame(gameLoop);
}
function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //draw sneak
  snake.show();
  //draw food,
  food.show();
  ctx.lineWidth = 2;
  //ctx.strokeStyle="white";
  //ctx.strokeRect(0,0,width,height);

  if(gridCheck.checked){
    ctx.fillStyle="rgba(255,255,255,.1)";
    for(var x=size;x<width;x+=size){
      ctx.fillRect(x-1,0,3,height);
    }
    for(var y=size;y<height;y+=size){
      ctx.fillRect(0,y-1,width,3);
    }
  }
}

function clickedOverlay(){
  oveHold.style.display='none';
  canvas.style.cursor='none';
  canvas.focus();
  if(pauseGame){
    pauseGame=!pauseGame;
  }
  if (gameOver) {
    newGame();
  }
}
function alignOverlay(){
  oveHold.style.left=canvas.offsetLeft+"px";
  oveHold.style.width=width+2+"px";
  oveHold.style.top=(canvas.height/2)-(oveHold.offsetHeight/2)+"px";
}
function sizeCanvas(){
  //max height; -40 cause there is SO MUCH padding and margins
  //canvas.height=window.innerHeight-document.querySelector('.scores.settings').offsetHeight-40
  //max width; the -4 is the 2 px border each side of the canvas
  //canvas.width=document.querySelector('body > div.main.boxes > center').offsetWidth-4

  let maxW = document.querySelector('body > div.main.boxes > center').offsetWidth-4;
  let maxH = window.innerHeight-document.querySelector('.scores.settings').offsetHeight-40;

  canvas.width = width  = Math.floor(Math.floor(maxW/(maxW/pasCount))*size);
  canvas.height= height = Math.floor(Math.floor(maxH/(maxH/pahCount))*size);
}
function sizePlayArea(){
  var x = document.getElementById('pasCount');
  var y = document.getElementById('pahCount');
  x.value=Math.floor((document.querySelector('body > div.main.boxes > center').offsetWidth-4)/size);
  y.value=Math.floor((window.innerHeight-document.querySelector('.scores.settings').offsetHeight-40)/size);
  var event = new Event('change');
  x.dispatchEvent(event);
  y.dispatchEvent(event);
}
function showOverlay(header,text){
  oveHold.style.display="block";
  canvas.style.cursor = "default";
  overlayPrim.innerHTML=header;
  overlaySeco.innerHTML=text;
  alignOverlay();
}
//pauses game if the canvas loses focus
function canvasFocusLost(){
  if(oveHold.style.display=="none"){
    canvasKey({'which':27});
  }
}
function setAnimEnd(){
  let settingBox = document.querySelector(".settings.boxes");
  if(settingBox.classList.value.includes("slide-left")){
    settingBox.classList.value="settings boxes";
    document.getElementById("settingClick").classList.value="material-icons";
  }else if (settingBox.classList.value.includes("slide-right")){
    settingBox.style.display="none";
    document.getElementById("settingClick").classList.value="material-icons";
  }
}

function canvasKey(event){
  switch (event.which) {
    //W
    case 87:
      update={"x":0,"y":-1};
      break;
    //S
    case 83:
      update={"x":0,"y":1};
      break;
    // A
    case 65:
      update={"x":-1,"y":0};
      break;
    //D
    case 68:
      update={"x":1,"y":0};
      break;
    ///\
    case 38:
      update={"x":0,"y":-1};
      break;
    //\/
    case 40:
      update={"x":0,"y":1};
      break;
    // <
    case 37:
      update={"x":-1,"y":0};
      break;
    //>
    case 39:
      update={"x":1,"y":0};
      break;
    //ESC
    case 27:
      pause();
      break;
    //ESC
    case 80:
      pause();
      break;
    default:
  }
}
function pause(){
  pauseGame=!pauseGame;
  if(pauseGame && !gameOver){
    showOverlay("Game Paused!",gamePauseText);
  }else {
    clickedOverlay();
  }
}
function handleTouchStart(e){
  xTouch=e.touches[0].clientX;
  yTouch=e.touches[0].clientY;
}

function handleTouchEnd(e){
  if(xTouch || yTouch){
    let diffX = xTouch - e.touches[0].clientX;
    let diffY = yTouch - e.touches[0].clientY;
    if ( Math.abs( diffX ) > Math.abs( diffY ) ) {
        if ( diffX > 0 ) {
            canvasKey({'which':65});
        } else {
            canvasKey({'which':68});
        }
    } else {
        if ( diffY > 0 ) {
            canvasKey({'which':87});
        } else {
            canvasKey({'which':83});
        }
    }
    xTouch=null;
    yTouch=null;
  }
}

mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
