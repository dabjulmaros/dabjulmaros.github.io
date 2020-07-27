//-----------------------------//
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");
const img = document.querySelector("#result");

let selectedLayer=0;

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
    ctx.font = `${160+parseInt(settings[layer].SizeOffset)}px sans-serif`;
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
    addLayer();
});
document.getElementById('removeItem').addEventListener('click',e=>{
    removeLayer(selectedLayer);
});
document.getElementById('resetCanvas').addEventListener('click',e=>{
  //loop to removeLayer
});

document.getElementById("Mirror").addEventListener("click",e=>{
  settings[selectedLayer].Mirror=!settings[selectedLayer].Mirror;
  generateHatted();
});

function addLayer(){
  settings.unshift(JSON.parse(JSON.stringify(settingsTemplate)));
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
  input.addEventListener('blur',e=>{
    let layer = getLayer(e.target.parentElement);
    settings[layer].value = e.target.value;
    generateHatted();
  })
  layers.insertBefore(div,layers.childNodes[0]);
  selectedLayer = 0;
  changeSelectedLayer();
}

function removeLayer(layer){
  layers.removeChild(layers.children[layer]);
  settings.splice(layer,1);
  if(selectedLayer !== 0)
    selectedLayer--;
  if(settings.length)
    changeSelectedLayer();

}

function changeSelectedLayer(){
  if(document.querySelector('.selected')!==null){
    document.querySelector('.selected').classList.remove('selected');
  }
  layers.children[selectedLayer].classList.add('selected');
  
  var value = settings[selectedLayer].SizeOffset;
  document.getElementById("SizeField").value=value;
  document.getElementById("SizeSlide").value=value;
  value = settings[selectedLayer].OffsetX;
  document.getElementById("OffsetXField").value=value;
  document.getElementById("OffsetXSlide").value=value;
  value = settings[selectedLayer].OffsetY;
  document.getElementById("OffsetYField").value=value;
  document.getElementById("OffsetYSlide").value=value;
  value = settings[selectedLayer].Rotation;
  document.getElementById("RotationField").value=value;
  document.getElementById("RotationSlide").value=value;
  value = settings[selectedLayer].Transparency;
  document.getElementById("TransparencyField").value=value;
  document.getElementById("TransparencySlide").value=value;
  value = settings[selectedLayer].Mirror;
  document.getElementById("Mirror").checked=value;

}

document.getElementById("SizeSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("SizeField").value=value;
  settings[selectedLayer].SizeOffset=value;
  generateHatted();
});
document.getElementById("SizeField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("SizeSlide").value=value;
  settings[selectedLayer].SizeOffset=value;
  generateHatted();
});
document.getElementById("OffsetXSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("OffsetXField").value=value;
  settings[selectedLayer].OffsetX=value;
  generateHatted();
});
document.getElementById("OffsetXField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("OffsetXSlide").value=value;
  settings[selectedLayer].OffsetX=value;
  generateHatted();
});
document.getElementById("OffsetYSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("OffsetYField").value=value;
  settings[selectedLayer].OffsetY=value;
  generateHatted();
});
document.getElementById("OffsetYField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("OffsetYSlide").value=value;
  settings[selectedLayer].OffsetY=value;
  generateHatted();
});
document.getElementById("RotationSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("RotationField").value=value;
  settings[selectedLayer].Rotation=value;
  generateHatted();
});
document.getElementById("RotationField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("RotationSlide").value=value;
  settings[selectedLayer].Rotation=value;
  generateHatted();
});
document.getElementById("TransparencySlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("TransparencyField").value=value;
  settings[selectedLayer].Transparency=value;
  generateHatted();
});
document.getElementById("TransparencyField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("TransparencySlide").value=value;
  settings[selectedLayer].Transparency=value;
  generateHatted();
});
  
document.getElementById('Reset').addEventListener('click',e=>{
  var value = 0;
  document.getElementById("SizeField").value=value;
  document.getElementById("SizeSlide").value=value;
  settings[selectedLayer].SizeOffset=value;
  document.getElementById("OffsetXField").value=value;
  document.getElementById("OffsetXSlide").value=value;
  settings[selectedLayer].OffsetX=value;
  document.getElementById("OffsetYField").value=value;
  document.getElementById("OffsetYSlide").value=value;
  settings[selectedLayer].OffsetY=value;
  document.getElementById("RotationField").value=value;
  document.getElementById("RotationSlide").value=value;
  settings[selectedLayer].Rotation=value;
  value=100;
  document.getElementById("TransparencyField").value=value;
  document.getElementById("TransparencySlide").value=value;
  settings[selectedLayer].Transparency=value;
  document.getElementById("Mirror").checked=false;
  settings[selectedLayer].hatMirror=false;
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