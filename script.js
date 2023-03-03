document.querySelectorAll('canvas').forEach(e=>{
  const ctx = e.getContext('2d');
  const emoji = e.getAttribute('data');

  ctx.font = "150px mono";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji,100,110);
})