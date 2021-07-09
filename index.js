const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const brushControl = document.getElementById('brushControl');
const size = document.getElementById('size');
const opacity = document.getElementById('opacity');
const opacityNumber = document.getElementById('opacityNumber');
const brush = document.getElementById('brush');
const eraser = document.getElementById('eraser');
const fill = document.getElementById('fill');
const reset = document.getElementById('reset');
const elementToChange = document.getElementsByTagName("body")[0];
const gradation = document.getElementById('gradation');
const color = document.getElementById('jsColor');
const square = document.getElementById('square');
const save = document.getElementById('save');
const notImg = document.getElementById('notImg');

elementToChange.style.cursor = "url('./asset/paint-brush.png'), auto";
opacityNumber.innerHTML = 1000;
size.innerHTML = `${document.getElementById('brushControl').value}`;
canvas.width = 900;
canvas.height = 700;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 900, 700);
let nowColor = "black"
ctx.strokeStyle = nowColor;
let painting = false;
ctx.lineWidth = 1;
let num = 0;
let firstColor = nowColor;
let secondColor = nowColor;
ctx.font = "50px Comic Sans MS";
ctx.strokeText("Canvas", 350, 100);
let shapes = false;

function start() {
    painting = true;
}

function stop() {
    painting = false;
}

function onMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!shapes) {
        if (!painting || num >= 1) {
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
        else {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
    else {
        if (!painting) {
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
        else {
            ctx.strokeRect(x, y, 100, 100)
        }
    }
}

function range() {
    ctx.lineWidth = document.getElementById('brushControl').value / 4;
    size.innerHTML = `${document.getElementById('brushControl').value}`;
}

function eraserTool() {
    shapes = false;
    ctx.strokeStyle = "white";
    elementToChange.style.cursor = "url('./asset/eraser.png'), auto";
}

function brushTool() {
    shapes = false;
    ctx.strokeStyle = nowColor;
    elementToChange.style.cursor = "url('./asset/paint-brush.png'), auto";
}

function fillTool() {
    ctx.fillStyle = nowColor;
    ctx.fillRect(0, 0, 900, 700);
}

function resetTool() {
    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, 900, 700);
    ctx.globalAlpha = document.getElementById('opacity').value / 100;
    ctx.lineWidth = 1;
    ctx.strokeText("Canvas", 350, 100);
    ctx.lineWidth = document.getElementById('brushControl').value / 4;
    ctx.strokeStyle = nowColor;
}

function opacityControl() {
    ctx.globalAlpha = document.getElementById('opacity').value / 100;
    opacityNumber.innerHTML = `${document.getElementById('opacity').value / 100 * 1000}`;
}

function gradationTool() {
    alert('두 개의 색깔을 정해주세요.');
    num = 1;
    elementToChange.style.cursor = "url('./asset/gradation.png'), auto";
}

function squareTool() {
    ctx.strokeStyle = nowColor;
    shapes = true;
    elementToChange.style.cursor = "url('./asset/square.png'), auto";
}

function gradationColor() {
    if (num == 1) {
        firstColor = nowColor
        num++;
    }
    else if (num == 2) {
        secondColor = nowColor
        let gra = ctx.createLinearGradient(0, 0, 900, 700);
        gra.addColorStop(0.2, firstColor);
        gra.addColorStop(1, secondColor);
        ctx.fillStyle = gra;
        ctx.fillRect(0, 0, 900, 700);
        num = 0;
        elementToChange.style.cursor = "url('./asset/paint-brush.png'), auto";
    }
}

function saveTool() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintEastcopper";
    link.click();
}

for (let i = 0; i < color.children.length; i++) {
    color.children[i].addEventListener('click', function () {
        ctx.strokeStyle = color.children[i].style.backgroundColor;
        nowColor = color.children[i].style.backgroundColor;
        gradationColor();
    })
}

let fileInput = document.getElementById("fileInput");
const upload = document.getElementById('upload');
upload.addEventListener('click', function() {
    fileInput.click();
})


fileInput.addEventListener('change', function (e) {
    let file = e.target.files[0]; //선택된 파일
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        notImg.remove();
        let photoFrame = document.createElement("div");
        photoFrame.style = `background : url(${reader.result}) no-repeat; background-size : contain;`;
        photoFrame.className = "photoFrame";
        document.getElementById("pictures").appendChild(photoFrame);
        e.target.value = "";

        photoFrame.addEventListener("click", function () {
            document.getElementById("pictures").removeChild(photoFrame);
        })
    }
})

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", start);
canvas.addEventListener("mouseup", stop);
canvas.addEventListener("mouseleave", stop);
brushControl.addEventListener("input", range);
opacity.addEventListener('input', opacityControl);
eraser.addEventListener('click', eraserTool);
brush.addEventListener('click', brushTool);
fill.addEventListener('click', fillTool);
reset.addEventListener('click', resetTool);
gradation.addEventListener('click', gradationTool);
square.addEventListener('click', squareTool);
save.addEventListener('click', saveTool);