'use strict';
var gCanvas;
var gCtx;
var gColor;
// var gImage;
var gImageObj;

function initCanvas(id) {
    createImages();
    gImageObj = getImageById(id);
    // var image = getImageById(2);
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');

    // gImage = new Image();
    drawImag('');
}

function drawImag(text) {
    var img = new Image();
    img.onload = function () {
        gCtx.drawImage(img, 0, 0);
        // gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);
        gCtx.fillStyle = gColor;
        gCtx.textBaseline = 'middle';
        gCtx.font = "50px 'Montserrat'";
        gCtx.fillText(text, 50, 50);
    }
    img.src = gImageObj.url;
}

function onTextChanged(elText) {
    var text = elText.value;
    drawImag(text);
}

function onClear() {
    var doClear = confirm('Are you sure?');
    if (doClear) {
        // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
        document.getElementById('first-line').value = '';
        drawImag('');
    }
}

function onAbout() {
    alert('Meme generator 1.0');
}

function downloadCanvas(elLink) {
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'my-img.jpg';
}

function colorChanged() {
    gColor = document.getElementById('color').value;
}

