//-----------------------------//
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");
const img = document.querySelector("#result");

let selectedLayer=0;
var mousePosX,mousePosY,originalX,originalY;;

const settingsTemplate={
  "value":"",
  "OffsetX":0,
  "OffsetY":0,
  "SizeOffset":0,
  "Mirror":false,
  "Rotation":0,
  "Transparency":100
};
const layers = document.getElementById('layers');

let settings=[];

// use these alignment properties for "better" positioning
ctx.textAlign = "center";
ctx.textBaseline = "middle";

generateMad();
function generateHatted(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // The size of the emoji is set with the font
  for(var layer = settings.length-1;layer>=0;layer--){
    ctx.font = `${160+parseInt(settings[layer].SizeOffset)}px ${settings[layer].font?settings[layer].font:'sans-serif'}`;
    ctx.fillStyle=`rgba(0,0,0,${settings[layer].Transparency/100})`;
    ctx.save();
    ctx.translate(canvas.width*(1/2)+parseInt(settings[layer].OffsetX),canvas.height*(1/2)+parseInt(settings[layer].OffsetY));
    ctx.rotate(parseInt(settings[layer].Rotation) * Math.PI / 180);
    if(settings[layer].Mirror){
      ctx.scale(-1,1);
    }
    ctx.fillText(settings[layer].value,0,0);
    ctx.restore();
  }

  img.src=canvas.toDataURL("image/png");

  // canvas.toBlob(function(blob) {
  //     const item = new ClipboardItem({ "image/png": blob });
  //     navigator.clipboard.write([item]);
  // });
}
  

document.querySelectorAll('#showSettings').forEach(node=>{
  node.addEventListener('click',e=>{
    if(e.currentTarget.classList.contains('rotate')){
      e.currentTarget.classList.remove('rotate');
      e.currentTarget.parentElement.nextElementSibling.classList.remove("show");
    }else{
      e.currentTarget.classList.add('rotate');
      e.currentTarget.parentElement.nextElementSibling.classList.add("show");
    }
  });
});

document.getElementById('addItem').addEventListener('click',e=>{
  settings.unshift(JSON.parse(JSON.stringify(settingsTemplate)));
  addLayer();
  selectedLayer = 0;
  changeSelectedLayer();
});
document.getElementById('removeItem').addEventListener('click',e=>{
    removeLayer(selectedLayer);
});
document.getElementById('resetCanvas').addEventListener('click',e=>{
  let c = confirm("You are about to remove everything.");
  if(c){
    resetCanvas();
    addLayer();
    generateHatted();
  }
});


document.getElementById("Mirror").addEventListener("click",e=>{
  settings[selectedLayer].Mirror=!settings[selectedLayer].Mirror;
  generateHatted();
});

function addLayer(){
  const div = document.createElement('div');
  div.classList.add('block','layer');
  const input = document.createElement('input');
  const divBreak = document.createElement('div');
  divBreak.classList.add('break');
  input.type="text";
  div.appendChild(divBreak);
  div.appendChild(input);
  div.addEventListener('click',e=>{
    let target = e.target;
    if(target.tagName==="INPUT"){
      target=target.parentElement;
    }
    selectedLayer=getLayer(target);
    changeSelectedLayer();
  });
  input.addEventListener('input',e=>{
    let layer = getLayer(e.target.parentElement);
    settings[layer].value = e.target.value;
    generateHatted();
  })
  layers.insertBefore(div,layers.childNodes[0]);
}

function removeLayer(layer){
  layers.removeChild(layers.children[layer]);
  settings.splice(layer,1);

  if(selectedLayer !== 0)
    selectedLayer--;

  if(settings.length)
    changeSelectedLayer();

  generateHatted();
}

function resetCanvas(){
  for(var layer = settings.length-1;layer>=0;layer--){
    removeLayer(layer);
  }
}

function changeSelectedLayer(){
  if(document.querySelector('.selected')!==null)
    document.querySelector('.selected').classList.remove('selected');
  
  layers.children[selectedLayer].classList.add('selected');
  
  setSize(settings[selectedLayer].SizeOffset);
  setOffsetX(settings[selectedLayer].OffsetX)
  setOffsetY(settings[selectedLayer].OffsetY)
  setRotation(settings[selectedLayer].Rotation);
  setOpacity(settings[selectedLayer].Transparency);
  setMirror(settings[selectedLayer].Mirror);
}

document.getElementById("SizeSlide").addEventListener("change",e=>{
  setSize(e.currentTarget.value);
  generateHatted();
});

document.getElementById("SizeField").addEventListener("change",e=>{
  setSize(e.currentTarget.value);
  generateHatted();
});
document.getElementById("OffsetXSlide").addEventListener("change",e=>{
  setOffsetX(e.currentTarget.value);
  generateHatted();
});
document.getElementById("OffsetXField").addEventListener("change",e=>{
  setOffsetX(e.currentTarget.value);
  generateHatted();
});
document.getElementById("OffsetYSlide").addEventListener("change",e=>{
  setOffsetY(e.currentTarget.value);
  generateHatted();
});
document.getElementById("OffsetYField").addEventListener("change",e=>{
  setOffsetY(e.currentTarget.value);
  generateHatted();
});

img.addEventListener("mousedown",e=>{
  mousePosX = e.offsetX-(canvas.width/2);
  mousePosY = e.offsetY-(canvas.height/2);
  originalX = settings[selectedLayer].OffsetX;
  originalY = settings[selectedLayer].OffsetY;
});

img.addEventListener('mousemove',mouse=>{
  if(mouse.buttons==1){
    setOffsetX(originalX + (mouse.offsetX-(canvas.width/2) - mousePosX));
    setOffsetY(originalY + (mouse.offsetY-(canvas.height/2) - mousePosY));
    generateHatted();
  }
})

document.getElementById("RotationSlide").addEventListener("change",e=>{
  setRotation(e.currentTarget.value);;
  generateHatted();
});
document.getElementById("RotationField").addEventListener("change",e=>{
  setRotation(e.currentTarget.value);
  generateHatted();
});
document.getElementById("TransparencySlide").addEventListener("change",e=>{
  setOpacity(e.currentTarget.value);
  generateHatted();
});
document.getElementById("TransparencyField").addEventListener("change",e=>{
  setOpacity(e.currentTarget.value);
  generateHatted();
});
  
document.getElementById('Reset').addEventListener('click',e=>{
  setSize(0);
  setOffsetX(0);
  setOffsetY(0);
  setRotation(0)
  setOpacity(100);
  setMirror(false);
  generateHatted();
});

function getLayer(t){
  const target = t;
  const parent = target.parentElement;
  let layer=-1;
  for(var x= 0;x<parent.childElementCount;x++){
    if(parent.children[x] == target){
        layer=x;
    }
  }
  return layer;
}

function generateMad(){
  for(var x = 0;x<3;x++)addLayer();

  settings=[{
    "value":"☕",
    "OffsetX":-105,
    "OffsetY":-35,
    "SizeOffset":-60,
    "Mirror":false,
    "Rotation":135,
    "Transparency":100
  },{
    "value":"🎩",
    "OffsetX":55,
    "OffsetY":-50,
    "SizeOffset":0,
    "Mirror":false,
    "Rotation":0,
    "Transparency":100
  },{
    "value":"🤪",
    "OffsetX":55,
    "OffsetY":80,
    "SizeOffset":0,
    "Mirror":false,
    "Rotation":0,
    "Transparency":100
  }];
  layers.children[0].querySelector('input').value="☕";
  layers.children[1].querySelector('input').value="🎩";
  layers.children[2].querySelector('input').value="🤪";
  generateHatted();
}

function setOffsetX(num){
  const value = parseInt(num);
  document.getElementById("OffsetXField").value=value;
  document.getElementById("OffsetXSlide").value=value;
  settings[selectedLayer].OffsetX=value;
}
function setOffsetY(num){
  const value = parseInt(num);
  document.getElementById("OffsetYField").value=value;
  document.getElementById("OffsetYSlide").value=value;
  settings[selectedLayer].OffsetY=value;
}
function setRotation(num){
  const value = parseInt(num);
  document.getElementById("RotationField").value=value;
  document.getElementById("RotationSlide").value=value;
  settings[selectedLayer].Rotation=value;
}
function setOpacity(num){
  const value = parseInt(num);
  document.getElementById("TransparencyField").value=value;
  document.getElementById("TransparencySlide").value=value;
  settings[selectedLayer].Transparency=value;
}
function setSize(num){
  const value = parseInt(num);
  document.getElementById("SizeField").value=value;
  document.getElementById("SizeSlide").value=value;
  settings[selectedLayer].SizeOffset=value;
}
function setMirror(bool){
  document.getElementById("Mirror").checked=bool;
  settings[selectedLayer].hatMirror=bool;
}

