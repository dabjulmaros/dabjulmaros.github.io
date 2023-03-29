const track = document.getElementById("image-track");
const GalleryHero = document.querySelector(".gallery > img");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;

  GalleryHero.src = track.children[track.dataset.index].src;
  
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta /  maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;

  const index = Math.round(Math.abs(nextPercentage/10));

  track.dataset.index = index;

  let allowedValue = [-5,-15,-25,-35,-45,-55,-65,-75,-85,-95];

  if(index>3)
    track.classList.value = 'noInd';
  
  track.animate({
    transform: `translate(${allowedValue[index]}%, -10%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.querySelectorAll("img")) {
    image.animate({
      objectPosition: `${100 + allowedValue[index]}% center`
    }, { duration: 1200, fill: "forwards" });
    image.classList.value = ""
  }

  track.children[index].classList.value ="active";

}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);