'use strict';
var gCanvas;
var gCtx;
// var gColor;
// var gImage;
var gImageObj;
var g

function initCanvas(id) {
    createImages();
    createMeme(id);
    gImageObj = getImageById(id);
    // var image = getImageById(2);
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');

    // gImage = new Image();
    renderCanvas();
}

function renderCanvas() {
    var meme = getMeme();
    var img = new Image();
    img.onload = function () {
        gCtx.drawImage(img, 0, 0);
        // gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);
        gCtx.textBaseline = 'middle';
        // gCtx.font = "50px 'Montserrat';
        // gCtx.font = "50px 'impact'";

        gCtx.font = meme.firstLine.size + 'px impact';
        gCtx.fillStyle = meme.firstLine.color;
        gCtx.fillText(meme.firstLine.line, meme.firstLine.x, meme.firstLine.y);

        gCtx.font = meme.secondLine.size + 'px impact';
        gCtx.fillStyle = meme.secondLine.color;
        gCtx.fillText(meme.secondLine.line, meme.secondLine.x, meme.secondLine.y);
    }
    img.src = gImageObj.url;
}

function onTextChanged(elText) {
    var text = elText.value;
    // var coordX = 50;
    // var coordY = 50;
    var meme = getMeme();
    if (elText.id === 'first-line') {
        meme.firstLine.line = text;
    } else if (elText.id === 'second-line') {
        // var coordY = 450;
        meme.secondLine.line = text;
    }
    renderCanvas();
}

function onTextFocus(elText) {
    var meme = getMeme();
    if (elText.id === 'first-line') {
        meme.firstLine.isActive = true;
        meme.secondLine.isActive = false;
        document.getElementById('color').value = meme.firstLine.color;
    } else if (elText.id === 'second-line') {
        meme.firstLine.isActive = false;
        meme.secondLine.isActive = true;
        document.getElementById('color').value = meme.secondLine.color;
    }
}


function onClear() {
    var meme = getMeme();
    var doClear = confirm('Are you sure?');
    if (doClear) {
        // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
        document.getElementById('first-line').value = '';
        meme.firstLine.line = '';
        document.getElementById('second-line').value = '';
        meme.secondLine.line = '';
        renderCanvas();
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
    var meme = getMeme();
    var color = document.getElementById('color').value;
    if (meme.firstLine.isActive) {
        meme.firstLine.color = color;
    } else {
        meme.secondLine.color = color;
    }
}


