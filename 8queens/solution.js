const button = document.querySelector("button");
const checkbox = document.querySelector("#autoSolve");
const animateCheckbox = document.querySelector("#animateSolve");
const slider = document.querySelector("#slider");

let animDelay = slider.value;
let animate = false;
let solving = false;

function setDataArr() {
  dataArr = [];
  for (let x = 0; x < 8; x++) {
    dataArr.push([]);
    for (let y = 0; y < 8; y++) dataArr[x].push(0);
  }
}

button.addEventListener("click", async (e) => {
  if (solving) return;

  solving = true;
  button.innerText = "Solving";
  button.disabled = true;
  setDataArr();
  let temp = allSolutionsFound.length;
  if (await solver(0)) {
    drawCanvas();
    saveSolution();
  } else {
    if (temp == allSolutionsFound.length) {
      if (temp == 0) alert("No Solutions Found");
      else alert("No New Solutions Found");
    }
  }
  solving = false;
  button.innerText = "Solve";
  button.disabled = false;
});

animateCheckbox.addEventListener("input", (e) => {
  animate = e.target.checked;
  if (animate) slider.parentElement.style.display = "flex";
  else slider.parentElement.style.display = "none";
});
slider.addEventListener("input", (e) => {
  animDelay = e.target.value;
});

// recursion
async function solver(currentColumn) {
  for (let row = 0; row < 8; row++) {
    if (checkPosition(currentColumn, row)) {
      dataArr[row][currentColumn] = 1;
      drawCanvas();
      if (animate) await new Promise((r) => setTimeout(r, animDelay));
      if (currentColumn == 7 && !solutionFound()) {
        if (checkbox.checked) {
          drawCanvas();
          saveSolution();
        } else {
          return true;
        }
      }
      if ((await solver(currentColumn + 1)) && currentColumn !== 7) {
        return true;
      } else {
        dataArr[row][currentColumn] = 0;
        drawCanvas();
      }
    }
  }
  return false;
}

function checkPosition(column, row) {
  //check row
  if (dataArr[row].includes(1)) return false;
  //check column
  for (let x = 0; x < 8; x++) if (dataArr[x][column] == 1) return false;

  //check diagonal + +
  if (!checkDiagonal(column, row, "+", "+")) return false;
  //check diagonal - -
  if (!checkDiagonal(column, row, "-", "-")) return false;
  //check diagonal + -
  if (!checkDiagonal(column, row, "+", "-")) return false;
  //check diagonal - +
  if (!checkDiagonal(column, row, "-", "+")) return false;

  return true;
}

function checkDiagonal(column, row, add1, add2) {
  let x = row;
  let y = column;
  while (x < 8 && y < 8 && x >= 0 && y >= 0) {
    if (dataArr[x][y] == 1) {
      return false;
    }
    if (add1 == "+") x += 1;
    else x -= 1;
    if (add2 == "+") y += 1;
    else y -= 1;
  }
  return true;
}

function solutionFound() {
  return allSolutionsFound.includes(
    dataArr.toLocaleString().replaceAll(",", "")
  );
}
