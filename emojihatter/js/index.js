//-----------variables----------//
const settings={
  "inverseOrder":false,
  "hatOffsetX":0,
  "hatOffsetY":0,
  "faceOffsetX":0,
  "faceOffsetY":0,
  "faceSizeOffset":0,
  "hatSizeOffset":0,
  "hatRotation":0,
  "faceRotation":0
};
//-----------------------------//
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");
const img = document.querySelector("#result");

const hat = document.querySelector('#hat');
const face = document.querySelector('#face');

// use these alignment properties for "better" positioning
ctx.textAlign = "center";
ctx.textBaseline = "middle";

generateHatted("😃","🎩");

document.querySelector('#gen').addEventListener("click",e=>{
  generateHatted(face.value,hat.value);
});

function generateHatted(face,hat){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // The size of the emoji is set with the font
  if(!settings.inverseOrder){
    ctx.font = `${160+parseInt(settings.faceSizeOffset)}px sans-serif`;
    ctx.save();
    ctx.translate(canvas.width*(1/2)+parseInt(settings.faceOffsetX),canvas.height*(2/3)+parseInt(settings.faceOffsetY));
    ctx.rotate(parseInt(settings.faceRotation) * Math.PI / 180);
    ctx.fillText(face,0,0);
    ctx.restore();
  }

  ctx.font = `${160+parseInt(settings.hatSizeOffset)}px sans-serif`;
  ctx.save();
  ctx.translate(canvas.width*(1/2)+parseInt(settings.hatOffsetX),canvas.height*(1/3)+parseInt(settings.hatOffsetY));
  ctx.rotate(parseInt(settings.hatRotation) * Math.PI / 180);
  ctx.fillText(hat,0,0);
  ctx.restore();

  if(settings.inverseOrder){
    ctx.font = `${160+parseInt(settings.faceSizeOffset)}px sans-serif`;
    ctx.save();
    ctx.translate(canvas.width*(1/2)+parseInt(settings.faceOffsetX),canvas.height*(2/3)+parseInt(settings.faceOffsetY));
    ctx.rotate(parseInt(settings.faceRotation) * Math.PI / 180);
    ctx.fillText(face,0,0);
    ctx.restore();
  }

  img.src=canvas.toDataURL("image/png");

  // canvas.toBlob(function(blob) {
  //     const item = new ClipboardItem({ "image/png": blob });
  //     navigator.clipboard.write([item]);
  // });

}
document.getElementById("inverse").addEventListener("click",e=>{
  settings.inverseOrder=!settings.inverseOrder;
  generateHatted(face.value,hat.value);
});
document.getElementById("hatSizeSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("hatSizeField").value=value;
  settings.hatSizeOffset=value;
  generateHatted(face.value,hat.value);
});
document.getElementById("hatSizeField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("hatSizeSlide").value=value;
  settings.hatSizeOffset=value;
  generateHatted(face.value,hat.value);
});
document.getElementById("hatOffsetXSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("hatOffsetXField").value=value;
  settings.hatOffsetX=value;
  generateHatted(face.value,hat.value);
});
document.getElementById("hatOffsetXField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("hatOffsetXSlide").value=value;
  settings.hatOffsetX=value;
  generateHatted(face.value,hat.value);
});
document.getElementById("hatOffsetYSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("hatOffsetYField").value=value;
  settings.hatOffsetY=value;
  generateHatted(face.value,hat.value);
});
document.getElementById("hatOffsetYField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("hatOffsetYSlide").value=value;
  settings.hatOffsetY=value;
  generateHatted(face.value,hat.value);
});
document.getElementById("hatRotationSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("hatRotationField").value=value;
  settings.hatRotation=value;
  generateHatted(face.value,hat.value);
});
document.getElementById("hatRotationField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("hatRotationSlide").value=value;
  settings.hatRotation=value;
  generateHatted(face.value,hat.value);
});

document.getElementById("faceSizeSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("faceSizeField").value=value;
  settings.faceSizeOffset=value;
  generateHatted(face.value,hat.value);
});
document.getElementById("faceSizeField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("faceSizeSlide").value=value;
  settings.faceSizeOffset=value;
  generateHatted(face.value,hat.value);
});
document.getElementById("faceOffsetXSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("faceOffsetXField").value=value;
  settings.faceOffsetX=value;
  generateHatted(face.value,hat.value);
});
document.getElementById("faceOffsetXField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("faceOffsetXSlide").value=value;
  settings.faceOffsetX=value;
  generateHatted(face.value,hat.value);
});
document.getElementById("faceOffsetYSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("faceOffsetYField").value=value;
  settings.faceOffsetY=value;
  generateHatted(face.value,hat.value);
});
document.getElementById("faceOffsetYField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("faceOffsetYSlide").value=value;
  settings.faceOffsetY=value;
  generateHatted(face.value,hat.value);
});
document.getElementById("faceRotationSlide").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("faceRotationField").value=value;
  settings.faceRotation=value;
  generateHatted(face.value,hat.value);
});
document.getElementById("faceRotationField").addEventListener("change",e=>{
  const value = e.currentTarget.value;
  document.getElementById("faceRotationSlide").value=value;
  settings.faceRotation=value;
  generateHatted(face.value,hat.value);
});
