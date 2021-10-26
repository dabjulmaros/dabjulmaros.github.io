/**
 * TODO:
 * 1-- Detect if text in fields are emojis or text
 *      if text is detected show controls to customize text
 *
 * 2-- Add custom emoji keyboard
 *      Have it support search and recently used emojis...
 *      Just like the system emoji keyboard... but worse
 */
//-----------------------------//
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const img = document.querySelector("#result");

let selectedLayer = 0;
var mousePosX, mousePosY, originalX, originalY;

var lastScrolled = "Size"; // used for scroll... possible values size, rotation, opacity

const settingsTemplate = {
  value: "",
  OffsetX: 0,
  OffsetY: 0,
  SizeOffset: 0,
  Mirror: false,
  Rotation: 0,
  Transparency: 100,
};
const layers = document.getElementById("layers");

let settings = [];

// use these alignment properties for "better" positioning
ctx.textAlign = "center";
ctx.textBaseline = "middle";

generateMad();
function generateHatted() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // The size of the emoji is set with the font
  for (var layer = settings.length - 1; layer >= 0; layer--) {
    ctx.font = `${160 + parseInt(settings[layer].SizeOffset)}px ${
      settings[layer].font ? settings[layer].font : "sans-serif"
    }`;
    ctx.fillStyle = `rgba(0,0,0,${settings[layer].Transparency / 100})`;
    ctx.save();
    ctx.translate(
      canvas.width * (1 / 2) + parseInt(settings[layer].OffsetX),
      canvas.height * (1 / 2) + parseInt(settings[layer].OffsetY)
    );
    ctx.rotate((parseInt(settings[layer].Rotation) * Math.PI) / 180);
    if (settings[layer].Mirror) {
      ctx.scale(-1, 1);
    }
    ctx.fillText(settings[layer].value, 0, 0);
    ctx.restore();
  }

  img.src = canvas.toDataURL("image/png");

  // canvas.toBlob(function(blob) {
  //     const item = new ClipboardItem({ "image/png": blob });
  //     navigator.clipboard.write([item]);
  // });
}

document.querySelectorAll("#showSettings").forEach((node) => {
  node.addEventListener("click", (e) => {
    if (e.currentTarget.classList.contains("rotate")) {
      e.currentTarget.classList.remove("rotate");
      e.currentTarget.parentElement.nextElementSibling.classList.remove("show");
    } else {
      e.currentTarget.classList.add("rotate");
      e.currentTarget.parentElement.nextElementSibling.classList.add("show");
    }
  });
});

["Size", "Rotation", "Transparency"].forEach((name) => {
  document.getElementById(`${name}Label`).addEventListener("click", (e) => {
    lastScrolled = name;
    setScrolling(name);
  });
});
document.querySelectorAll('input[type="number"]').forEach((ele) => {
  ele.addEventListener("wheel", (e) => {
    if ("createEvent" in document) {
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("change", false, true);
      e.target.dispatchEvent(evt);
    } else e.target.fireEvent("onchange");
  });
});

document.getElementById("addItem").addEventListener("click", (e) => {
  settings.unshift(JSON.parse(JSON.stringify(settingsTemplate)));
  addLayer();
  selectedLayer = 0;
  changeSelectedLayer();
});
document.getElementById("removeItem").addEventListener("click", (e) => {
  removeLayer(selectedLayer);
});
document.getElementById("resetCanvas").addEventListener("click", (e) => {
  let c = confirm("You are about to remove everything.");
  if (c) {
    resetCanvas();
    settings.unshift(JSON.parse(JSON.stringify(settingsTemplate)));
    addLayer();
    selectedLayer = 0;
    changeSelectedLayer();
    generateHatted();
  }
});

document.getElementById("Mirror").addEventListener("click", (e) => {
  settings[selectedLayer].Mirror = !settings[selectedLayer].Mirror;
  generateHatted();
});

function addLayer() {
  const div = document.createElement("div");
  div.classList.add("block", "layer");

  const input = document.createElement("input");
  input.type = "text";

  const controls = document.createElement("div");
  controls.classList.add("layerControl");

  const layerUp = document.createElement("button");
  layerUp.addEventListener("click", (e) => {
    event.stopPropagation();
    pos = getLayer(document.querySelector(".selected"));
    moveLayer(pos, -1);
  });
  layerUp.innerHTML = `<span class="material-icons">expand_less</span>`;

  const layerDown = document.createElement("button");
  layerDown.addEventListener("click", (e) => {
    event.stopPropagation();
    pos = getLayer(document.querySelector(".selected"));
    moveLayer(pos, 1);
  });
  layerDown.innerHTML = `<span class="material-icons">expand_more</span>`;

  controls.appendChild(layerUp);
  controls.appendChild(layerDown);

  const divBreak = document.createElement("div");
  divBreak.classList.add("break");

  div.appendChild(divBreak);
  div.appendChild(input);
  div.appendChild(controls);

  div.addEventListener("click", (e) => {
    let target = e.target;
    if (target.tagName === "INPUT") {
      target = target.parentElement;
    }
    selectedLayer = getLayer(target);
    changeSelectedLayer();
  });

  input.addEventListener("input", (e) => {
    let layer = getLayer(e.target.parentElement);
    settings[layer].value = e.target.value;
    generateHatted();
  });

  layers.insertBefore(div, layers.childNodes[0]);
}

function removeLayer(layer) {
  layers.removeChild(layers.children[layer]);
  settings.splice(layer, 1);

  if (selectedLayer !== 0) selectedLayer--;

  if (settings.length) changeSelectedLayer();

  generateHatted();
}

function moveLayer(pos, move) {
  const current = settings[pos];

  settings.splice(pos, 1);
  settings.splice(pos + move, 0, current);

  selectedLayer = pos + move;
  changeSelectedLayer();

  for (var x = 0; x < settings.length; x++)
    layers.children[x].querySelector("input").value = settings[x].value;

  generateHatted();
}

function resetCanvas() {
  for (var layer = settings.length - 1; layer >= 0; layer--) {
    removeLayer(layer);
  }
}

function changeSelectedLayer() {
  if (document.querySelector(".selected") !== null)
    document.querySelector(".selected").classList.remove("selected");

  // Keeps the last scrolled setting
  let temp = lastScrolled;

  layers.children[selectedLayer].classList.add("selected");

  setSize(settings[selectedLayer].SizeOffset);
  setOffsetX(settings[selectedLayer].OffsetX);
  setOffsetY(settings[selectedLayer].OffsetY);
  setRotation(settings[selectedLayer].Rotation);
  setOpacity(settings[selectedLayer].Transparency);
  setMirror(settings[selectedLayer].Mirror);

  lastScrolled = temp;
  setScrolling(lastScrolled);
}

document.getElementById("SizeSlide").addEventListener("change", (e) => {
  setSize(e.currentTarget.value);
  generateHatted();
});

document.getElementById("SizeField").addEventListener("change", (e) => {
  setSize(e.currentTarget.value);
  generateHatted();
});
document.getElementById("OffsetXSlide").addEventListener("change", (e) => {
  setOffsetX(e.currentTarget.value);
  generateHatted();
});
document.getElementById("OffsetXField").addEventListener("change", (e) => {
  setOffsetX(e.currentTarget.value);
  generateHatted();
});
document.getElementById("OffsetYSlide").addEventListener("change", (e) => {
  setOffsetY(e.currentTarget.value);
  generateHatted();
});
document.getElementById("OffsetYField").addEventListener("change", (e) => {
  setOffsetY(e.currentTarget.value);
  generateHatted();
});

img.addEventListener("mousedown", (e) => {
  mousePosX = e.offsetX - canvas.width / 2;
  mousePosY = e.offsetY - canvas.height / 2;
  originalX = settings[selectedLayer].OffsetX;
  originalY = settings[selectedLayer].OffsetY;
});

img.addEventListener("mousemove", (mouse) => {
  if (mouse.buttons == 1) {
    setOffsetX(originalX + (mouse.offsetX - canvas.width / 2 - mousePosX));
    setOffsetY(originalY + (mouse.offsetY - canvas.height / 2 - mousePosY));
    generateHatted();
  }
});

img.addEventListener("wheel", (e) => {
  switch (lastScrolled) {
    case "Size":
      setSize((settings[selectedLayer].SizeOffset += e.deltaY / 50));
      break;
    case "Rotation":
      setRotation((settings[selectedLayer].Rotation += e.deltaY / 50));
      break;
    case "Transparency":
      setOpacity((settings[selectedLayer].Transparency += e.deltaY / 50));
      break;
    default:
  }
  generateHatted();
});

document.getElementById("RotationSlide").addEventListener("change", (e) => {
  setRotation(e.currentTarget.value);
  generateHatted();
});
document.getElementById("RotationField").addEventListener("change", (e) => {
  setRotation(e.currentTarget.value);
  generateHatted();
});
document.getElementById("TransparencySlide").addEventListener("change", (e) => {
  setOpacity(e.currentTarget.value);
  generateHatted();
});
document.getElementById("TransparencyField").addEventListener("change", (e) => {
  setOpacity(e.currentTarget.value);
  generateHatted();
});

document.getElementById("Reset").addEventListener("click", (e) => {
  setSize(0);
  setOffsetX(0);
  setOffsetY(0);
  setRotation(0);
  setOpacity(100);
  setMirror(false);
  generateHatted();
});

function getLayer(t) {
  const target = t;
  const parent = target.parentElement;
  let layer = -1;
  for (var x = 0; x < parent.childElementCount; x++) {
    if (parent.children[x] == target) {
      layer = x;
    }
  }
  return layer;
}

function generateMad() {
  for (var x = 0; x < 3; x++) addLayer();

  settings = [
    {
      value: "☕",
      OffsetX: -105,
      OffsetY: -35,
      SizeOffset: -60,
      Mirror: false,
      Rotation: 135,
      Transparency: 100,
    },
    {
      value: "🎩",
      OffsetX: 55,
      OffsetY: -50,
      SizeOffset: 0,
      Mirror: false,
      Rotation: 0,
      Transparency: 100,
    },
    {
      value: "🤪",
      OffsetX: 55,
      OffsetY: 80,
      SizeOffset: 0,
      Mirror: false,
      Rotation: 0,
      Transparency: 100,
    },
  ];
  for (var x = 0; x < 3; x++)
    layers.children[x].querySelector("input").value = settings[x].value;
  generateHatted();
  changeSelectedLayer();
  setScrolling(lastScrolled);
}
function openImport() {
  document.getElementById("impexp").style.display = "block";
  document.getElementById("impexpName").innerText = "Import";
  document.getElementById("impexpText").removeAttribute("readonly", "");
  document.getElementById("importButton").style.display = "block";
  document.getElementById("zip").style.display = "none";
  document.getElementById("impexpText").value = "";
}
function textImport() {
  const value = document.getElementById("impexpText").value;
  if (value == null || value == "") {
    //show error cant be empty
    console.log("empty");
    return;
  }

  switch (typeof value) {
    case "string":
      try {
        importSettings(JSON.parse(value));
      } catch (e) {
        //invalid JSON
        console.log("badJSON");
        return;
      }
      break;
    case "object":
      importSettings(value);
      break;
    default:
      //show error invalid type
      console.log("invalid type");
      return;
  }
  document.getElementById("impexp").style.display = "none";
}
function openExport() {
  document.getElementById("impexp").style.display = "block";
  document.getElementById("impexpName").innerText = "Export";
  document.getElementById("impexpText").setAttribute("readonly", "");
  document.getElementById("importButton").style.display = "none";
  document.getElementById("zip").style.display = "flex";
  document.getElementById("impexpText").value = exportSettings();
}
async function exportZip() {
  var zip = new JSZip();
  let sizes = parseText();
  const image = document.createElement("img");
  image.src = await canvas.toDataURL();
  image.onload = () => {
    if (sizes.length) {
      addToZip(0);
    } else {
      alert(
        "Please enter a valid list of intergers separated by commas for the image sizes.\nRange 10 to 400."
      );
    }
  };

  function addToZip(index) {
    canvas.width = sizes[index];
    canvas.height = sizes[index];
    ctx.drawImage(image, 0, 0, 400, 400, 0, 0, sizes[index], sizes[index]);

    canvas.toBlob((e) => {
      zip.file(`emoji_${sizes[index]}.png`, e);

      if (index < sizes.length - 1) {
        const next = index + 1;
        addToZip(next);
      } else {
        zip.generateAsync({ type: "blob" }).then(function (content) {
          saveData(content, "images.zip");
          canvas.width = 400;
          canvas.height = 400;
          ctx.drawImage(image, 0, 0);
        });
      }
    });
  }
}

function importSettings(imprt) {
  for (var layer = layers.childElementCount - 1; layer >= 0; layer--) {
    removeLayer(layer);
  }

  settings = imprt;
  for (var x = 0; x < settings.length; x++) {
    addLayer();
    layers.children[0].querySelector("input").value =
      settings[settings.length - 1 - x].value;
  }
  generateHatted();
}

function exportSettings() {
  const exprtString = JSON.stringify(settings);
  console.log(exprtString);
  return exprtString;
}

function setOffsetX(num) {
  const value = parseInt(num);
  document.getElementById("OffsetXField").value = value;
  document.getElementById("OffsetXSlide").value = value;
  settings[selectedLayer].OffsetX = value;
}
function setOffsetY(num) {
  const value = parseInt(num);
  document.getElementById("OffsetYField").value = value;
  document.getElementById("OffsetYSlide").value = value;
  settings[selectedLayer].OffsetY = value;
}
function setRotation(num) {
  const value = parseInt(num);
  document.getElementById("RotationField").value = value;
  document.getElementById("RotationSlide").value = value;
  settings[selectedLayer].Rotation = value;

  setScrolling("Rotation");
}
function setOpacity(num) {
  const value = parseInt(num);
  document.getElementById("TransparencyField").value = value;
  document.getElementById("TransparencySlide").value = value;
  settings[selectedLayer].Transparency = value;

  setScrolling("Transparency");
}
function setSize(num) {
  const value = parseInt(num);
  document.getElementById("SizeField").value = value;
  document.getElementById("SizeSlide").value = value;
  settings[selectedLayer].SizeOffset = value;

  setScrolling("Size");
}
function setMirror(bool) {
  document.getElementById("Mirror").checked = bool;
  settings[selectedLayer].hatMirror = bool;
}

function parseText() {
  let text = document.getElementById("textArr").value;
  text = text.replace(/[^(0-9),]*/g, "");
  let arr = text.split(",");
  for (var x = arr.length - 1; x >= 0; x--) {
    if (arr[x] == "") arr.splice(x, 1);

    arr[x] = parseInt(arr[x]);

    if (arr[x] < 10 || arr[x] > 400) arr.splice(x, 1);
  }
  return arr;
}

function setScrolling(name) {
  lastScrolled = name;
  removeClass("scrolling");
  document.getElementById(`${name}Field`).classList.add("scrolling");
  document.getElementById(`${name}Slide`).classList.add("scrolling");
  document.getElementById(`${name}Label`).classList.add("scrolling");
}

function removeClass(className) {
  document
    .querySelectorAll(`.${className}`)
    .forEach((e) => e.classList.remove(className));
}

function saveData(data, fileName) {
  var a = document.createElement("a");
  var blob = new Blob([data], { type: "application/zip" });
  var url = window.URL.createObjectURL(blob);
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = fileName;
  a.click();
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
    a.remove();
  }, 1000);
}
