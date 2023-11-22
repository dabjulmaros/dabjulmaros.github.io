const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const input = document.querySelector("input#input");
const widthEle = document.querySelector("input#width");
const heightEle = document.querySelector("input#height");
const textArea = document.querySelector("textarea");
const button = document.querySelector("button");

let width = widthEle.value;
let height = heightEle.value;

input.addEventListener("input", () => {
  drawToCanvas();
});

widthEle.addEventListener("input", () => {
  width = widthEle.value;
  canvas.width = width;
  drawToCanvas();
});

heightEle.addEventListener("input", () => {
  height = heightEle.value;
  canvas.height = height;
  drawToCanvas();
});

button.addEventListener("click", () => {
  navigator.clipboard.writeText("<empty clipboard>").then(
    () => {
      console.log("success");
    },
    () => {
      console.log("nope");
    }
  );
});

function drawToCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = `normal normal normal ${
    width > height ? width : height
  }px "Material Icons"`;
  ctx.fillStyle = "#bbc6ce";
  ctx.textAlign = "center";
  ctx.fillText(input.value, canvas.width / 2, canvas.height);
  canvasToBase64();
}

function canvasToBase64() {
  textArea.value = canvas.toDataURL();
}

if (!window.isSecureContext) {
  button.style.display = "none";
}
