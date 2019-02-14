'use strict';
var gCanvas;
var gCtx;
var gColor;

function initCanvas(id) {
    createImages();
    var image = getImageById(id);
    // var image = getImageById(2);
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');

    var img = new Image();

    //drawing the image
    img.onload = function () {
        //draw background image
        gCtx.drawImage(img, 0, 0);
    };

    // img.src = 'meme-imgs/004.jpg';
    img.src = image.url;
}

function onClear() {
    var doClear = confirm('Are you sure?');
    if (doClear) {
        gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    }
}

function onAbout() {
    alert('Meme generator 1.0');
}

function downloadCanvas(elLink) {
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'my-img.jpg';
}