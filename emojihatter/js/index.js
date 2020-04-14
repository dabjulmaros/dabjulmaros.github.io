//-----------variables----------//
const settings={
  "inverseOrder":false,
  "hatOffsetX":0,
  "hatOffsetY":0,
  "hatSizeOffset":0,
  "hatMirror":false,
  "hatRotation":0,
  "hatTransparency":100,
  "faceOffsetX":0,
  "faceOffsetY":0,
  "faceSizeOffset":0,
  "faceMirror":false,
  "faceRotation":0,
  "faceTransparency":100,
  "itemOffsetX":0,
  "itemOffsetY":0,
  "itemSizeOffset":0,
  "itemMirror":false,
  "itemRotation":0,
  "itemTransparency":100,
  "itemPosition":"top"
};
//-----------------------------//
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");
const img = document.querySelector("#result");

const hat = document.querySelector('#hat');
const face = document.querySelector('#face');
const item = document.querySelector('#item');

// use these alignment properties for "better" positioning
ctx.textAlign = "center";
ctx.textBaseline = "middle";

generateMad();

function generateHatted(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // The size of the emoji is set with the font
  if(settings.itemPosition=="bottom"){
    drawItem();
  }
  if(!settings.inverseOrder){
    drawFace();
  }
  if(settings.itemPosition=="middle" && !settings.inverseOrder){
    drawItem();
  }
  drawHat();
  if(settings.itemPosition=="middle" && settings.inverseOrder){
    drawItem();
  }
  if(settings.inverseOrder){
    drawFace();
  }
  if(settings.itemPosition=="top"){
    drawItem();
  }

  img.src=canvas.toDataURL("image/png");

  // canvas.toBlob(function(blob) {
  //     const item = new ClipboardItem({ "image/png": blob });
  //     navigator.clipboard.write([item]);
  // });

}
function drawHat(){
  ctx.font = `${160+parseInt(settings.hatSizeOffset)}px sans-serif`;
  ctx.fillStyle=`rgba(0,0,0,${settings.hatTransparency/100})`;
  ctx.save();
  ctx.translate(canvas.width*(1/2)+parseInt(settings.hatOffsetX),canvas.height*(1/3)+parseInt(settings.hatOffsetY));
  ctx.rotate(parseInt(settings.hatRotation) * Math.PI / 180);
  if(settings.hatMirror){
    ctx.scale(-1,1);
  }
  ctx.fillText(hat.value,0,0);
  ctx.restore();
}
function drawFace(){
  ctx.font = `${160+parseInt(settings.faceSizeOffset)}px sans-serif`;
  ctx.fillStyle=`rgba(0,0,0,${settings.faceTransparency/100})`;
  ctx.save();
  ctx.translate(canvas.width*(1/2)+parseInt(settings.faceOffsetX),canvas.height*(2/3)+parseInt(settings.faceOffsetY));
  ctx.rotate(parseInt(settings.faceRotation) * Math.PI / 180);
  if(settings.faceMirror){
    ctx.scale(-1,1);
  }
  ctx.fillText(face.value,0,0);
  ctx.restore();
}
function drawItem(){
  ctx.font = `${160+parseInt(settings.itemSizeOffset)}px sans-serif`;
  ctx.fillStyle=`rgba(0,0,0,${settings.itemTransparency/100})`;
  ctx.save();
  ctx.translate(canvas.width*(1/2)+parseInt(settings.itemOffsetX),canvas.height*(3/4)+parseInt(settings.itemOffsetY));
  ctx.rotate(parseInt(settings.itemRotation) * Math.PI / 180);
  if(settings.itemMirror){
    ctx.scale(-1,1);
  }
  ctx.fillText(item.value,0,0);
  ctx.restore();
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

document.getElementById('hat').addEventListener('focus',e=>{
   e.currentTarget.value="";
});
document.getElementById('face').addEventListener('focus',e=>{
   e.currentTarget.value="";
});
document.getElementById('item').addEventListener('focus',e=>{
  e.currentTarget.value="";
});
document.getElementById('hat').addEventListener('blur',e=>{
  generateHatted();
});
document.getElementById('face').addEventListener('blur',e=>{
  generateHatted();
});
document.getElementById('item').addEventListener('blur',e=>{
  generateHatted();
});

document.getElementById("inverse").addEventListener("click",e=>{
  settings.inverseOrder=!settings.inverseOrder;
  generateHatted();
});

document.getElementById("hatMirror").addEventListener("click",e=>{
  settings.hatMirror=!settings.hatMirror;
  generateHatted();
});
document.getElementById("faceMirror").addEventListener("click",e=>{
  settings.faceMirror=!settings.faceMirror;
  generateHatted();
});
document.getElementById("itemMirror").addEventListener("click",e=>{
  settings.itemMirror=!settings.itemMirror;
  generateHatted();
});

document.getElementById("hatSizeSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("hatSizeField").value=value;
  settings.hatSizeOffset=value;
  generateHatted();
});
document.getElementById("hatSizeField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("hatSizeSlide").value=value;
  settings.hatSizeOffset=value;
  generateHatted();
});
document.getElementById("hatOffsetXSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("hatOffsetXField").value=value;
  settings.hatOffsetX=value;
  generateHatted();
});
document.getElementById("hatOffsetXField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("hatOffsetXSlide").value=value;
  settings.hatOffsetX=value;
  generateHatted();
});
document.getElementById("hatOffsetYSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("hatOffsetYField").value=value;
  settings.hatOffsetY=value;
  generateHatted();
});
document.getElementById("hatOffsetYField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("hatOffsetYSlide").value=value;
  settings.hatOffsetY=value;
  generateHatted();
});
document.getElementById("hatRotationSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("hatRotationField").value=value;
  settings.hatRotation=value;
  generateHatted();
});
document.getElementById("hatRotationField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("hatRotationSlide").value=value;
  settings.hatRotation=value;
  generateHatted();
});
document.getElementById("hatTransparencySlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("hatTransparencyField").value=value;
  settings.hatTransparency=value;
  generateHatted();
});
document.getElementById("hatTransparencyField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("hatTransparencySlide").value=value;
  settings.hatTransparency=value;
  generateHatted();
});

document.getElementById("faceSizeSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("faceSizeField").value=value;
  settings.faceSizeOffset=value;
  generateHatted();
});
document.getElementById("faceSizeField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("faceSizeSlide").value=value;
  settings.faceSizeOffset=value;
  generateHatted();
});
document.getElementById("faceOffsetXSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("faceOffsetXField").value=value;
  settings.faceOffsetX=value;
  generateHatted();
});
document.getElementById("faceOffsetXField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("faceOffsetXSlide").value=value;
  settings.faceOffsetX=value;
  generateHatted();
});
document.getElementById("faceOffsetYSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("faceOffsetYField").value=value;
  settings.faceOffsetY=value;
  generateHatted();
});
document.getElementById("faceOffsetYField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("faceOffsetYSlide").value=value;
  settings.faceOffsetY=value;
  generateHatted();
});
document.getElementById("faceRotationSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("faceRotationField").value=value;
  settings.faceRotation=value;
  generateHatted();
});
document.getElementById("faceRotationField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("faceRotationSlide").value=value;
  settings.faceRotation=value;
  generateHatted();
});
document.getElementById("faceTransparencySlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("faceTransparencyField").value=value;
  settings.faceTransparency=value;
  generateHatted();
});
document.getElementById("faceTransparencyField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("faceTransparencySlide").value=value;
  settings.faceTransparency=value;
  generateHatted();
});

document.getElementById("itemSizeSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("itemSizeField").value=value;
  settings.itemSizeOffset=value;
  generateHatted();
});
document.getElementById("itemSizeField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("itemSizeSlide").value=value;
  settings.itemSizeOffset=value;
  generateHatted();
});
document.getElementById("itemOffsetXSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("itemOffsetXField").value=value;
  settings.itemOffsetX=value;
  generateHatted();
});
document.getElementById("itemOffsetXField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("itemOffsetXSlide").value=value;
  settings.itemOffsetX=value;
  generateHatted();
});
document.getElementById("itemOffsetYSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("itemOffsetYField").value=value;
  settings.itemOffsetY=value;
  generateHatted();
});
document.getElementById("itemOffsetYField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("itemOffsetYSlide").value=value;
  settings.itemOffsetY=value;
  generateHatted();
});
document.getElementById("itemRotationSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("itemRotationField").value=value;
  settings.itemRotation=value;
  generateHatted();
});
document.getElementById("itemTransparencySlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("itemTransparencyField").value=value;
  settings.itemTransparency=value;
  generateHatted();
});
document.getElementById("itemTransparencyField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("itemTransparencySlide").value=value;
  settings.itemTransparency=value;
  generateHatted();
});
document.getElementById("itemRotationField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("itemRotationSlide").value=value;
  settings.itemRotation=value;
  generateHatted();
});
document.getElementById("itemPosition").addEventListener("change",e=>{
  settings.itemPosition=e.currentTarget.value;
  generateHatted();
});

document.getElementById('hatReset').addEventListener('click',e=>{
  var value = 0;
  document.getElementById("hatSizeField").value=value;
  document.getElementById("hatSizeSlide").value=value;
  settings.hatSizeOffset=value;
  document.getElementById("hatOffsetXField").value=value;
  document.getElementById("hatOffsetXSlide").value=value;
  settings.hatOffsetX=value;
  document.getElementById("hatOffsetYField").value=value;
  document.getElementById("hatOffsetYSlide").value=value;
  settings.hatOffsetY=value;
  document.getElementById("hatRotationField").value=value;
  document.getElementById("hatRotationSlide").value=value;
  settings.hatRotation=value;
  value=100;
  document.getElementById("hatTransparencyField").value=value;
  document.getElementById("hatTransparencySlide").value=value;
  settings.hatTransparency=value;
  document.querySelector("#hatMirror").checked=false;
  settings.hatMirror=false;
  generateHatted();
});

document.getElementById('faceReset').addEventListener('click',e=>{
  let value = 0;
  document.getElementById("faceSizeField").value=value;
  document.getElementById("faceSizeSlide").value=value;
  settings.faceSizeOffset=value;
  document.getElementById("faceOffsetXField").value=value;
  document.getElementById("faceOffsetXSlide").value=value;
  settings.faceOffsetX=value;
  document.getElementById("faceOffsetYField").value=value;
  document.getElementById("faceOffsetYSlide").value=value;
  settings.faceOffsetY=value;
  document.getElementById("faceRotationField").value=value;
  document.getElementById("faceRotationSlide").value=value;
  settings.faceRotation=value;
  value=100;
  document.getElementById("faceTransparencyField").value=value;
  document.getElementById("faceTransparencySlide").value=value;
  settings.faceTransparency=value;
  document.querySelector("#faceMirror").checked=false;
  settings.faceMirror=false;
  generateHatted();
});
document.getElementById('itemReset').addEventListener('click',e=>{
  let value = 0;
  document.getElementById("itemSizeField").value=value;
  document.getElementById("itemSizeSlide").value=value;
  settings.itemSizeOffset=value;
  document.getElementById("itemOffsetXField").value=value;
  document.getElementById("itemOffsetXSlide").value=value;
  settings.itemOffsetX=value;
  document.getElementById("itemOffsetYField").value=value;
  document.getElementById("itemOffsetYSlide").value=value;
  settings.itemOffsetY=value;
  document.getElementById("itemRotationField").value=value;
  document.getElementById("itemRotationSlide").value=value;
  settings.itemRotation=value;
  value=100;
  document.getElementById("itemTransparencyField").value=value;
  document.getElementById("itemTransparencySlide").value=value;
  settings.itemTransparency=value;
  document.querySelector("#itemPosition").value="top";
  document.querySelector("#itemmMirror").checked=false;
  settings.itemMirror=false;
  settings.itemPosition="top";
  generateHatted();
});
function generateMad(){

  ctx.font = "160px sans-serif";
  ctx.save();
  ctx.translate(240,260);
  ctx.fillText("🤪",0,0);
  ctx.restore();
  
  ctx.font = "160px sans-serif";
  ctx.save();
  ctx.translate(240,133.33);
  ctx.fillText("🎩",0,0);
  ctx.restore();

  ctx.font = '82px sans-serif';
  ctx.save();
  ctx.translate(101,171);
  ctx.rotate(2.56);
  ctx.fillText("☕",0,0);
  ctx.restore();
  
  img.src=canvas.toDataURL("image/png");
}