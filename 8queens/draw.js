const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const otherSolutions = document.querySelector("#otherSolutions");

const canvasW = canvas.width;
const canvasH = canvas.height;
const squareW = canvasW / 8;
const squareH = canvasH / 8;
const pieceR = squareW * 0.4;

const checkerColor = "#945b5d";
const lightSquare = "#cca770";
const darkSquare = "#352e2f";

let dataArr;

function drawCanvas() {
  ctx.clearRect(0, 0, canvasW, canvasW);
  let color = true;
  for (let x = 0; x < 8; x++) {
    color = !color;
    for (let y = 0; y < 8; y++) {
      color = !color;
      if (color) ctx.fillStyle = lightSquare;
      else ctx.fillStyle = darkSquare;

      ctx.fillRect(x * squareH, y * squareW, squareW, squareH);
      ctx.strokeRect(x * squareH, y * squareW, squareW, squareH);

      if (dataArr !== undefined) if (dataArr[x][y] == 1) drawChecker(x, y);
    }
  }
}

drawCanvas();

function drawChecker(row, column) {
  let calcRow = row * squareH;
  calcRow += squareH / 2;
  let calcColumn = column * squareW;
  calcColumn += squareW / 2;

  ctx.fillStyle = checkerColor;
  ctx.beginPath();
  ctx.arc(calcRow, calcColumn, pieceR, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}

const allSolutionsFound = [];
function saveSolution() {
  const newImg = document.createElement("img");
  newImg.src = canvas.toDataURL();
  newImg.title = dataArr.reduce(
    (a, i) =>
      (a += i.reduce((a2, i2) => (a2 += i2 == 0 ? "X" : "Q"), "") + "\n"),
    ""
  );
  newImg.title = newImg.title.substring(-1);
  otherSolutions.append(newImg);

  allSolutionsFound.push(dataArr.toLocaleString().replaceAll(",", ""));
}

function allSolutions() {
  console.log(allSolutionsFound);
  const trueTotal = {};
  let moreThanOne = 0;
  for (let x of allSolutionsFound) {
    if (trueTotal[x]) trueTotal[x] = trueTotal[x] + 1;
    else trueTotal[x] = 1;
  }
  // console.log(trueTotal);

  for (var key in trueTotal) {
    if (trueTotal[key] > 1) {
      moreThanOne++;
      console.log(`${key} has ${trueTotal[key]} results`);
    }
  }

  console.log(
    `The script has found ${allSolutionsFound.length} solution${
      allSolutionsFound.length == 1 ? "" : "s"
    } with ${moreThanOne} duplicate${moreThanOne == 1 ? "" : "s"}`
  );
}
