'use strict';
var gCanvas;
var gCtx;
// var gColor;
// var gImage;
var gImageObj;
var gCurrText;

function initCanvas(id) {
    // createImages();
    createMeme(id);
    var meme = getMeme();
    gCurrText = meme.txts[0];

    gImageObj = getImageById(id);
    // gImageObj = getImageById(2);
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');

    // gImage = new Image();
    resetFields();
    clearCanvas();
    renderCanvas();
}

function onBacktoGallery() {
    var elGallery = document.querySelector('.gallery-main');
    elGallery.classList.remove('hide');

    var elCanvas = document.querySelector('.canvas-main-container');
    elCanvas.classList.add('hide');
    init();
}

function renderCanvas() {
    var meme = getMeme();
    // console.log(meme);

    var img = new Image();

    img.onload = function () {
        gCtx.drawImage(img, 0, 0);

        // gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);
        // gCtx.textBaseline = 'middle';
        // gCtx.shadowColor = 'black';
        // gCtx.strokeStyle = 'black';
        // gCtx.shadowBlur = 15;
        // gCtx.lineJoin = 'round';

        meme.txts.map(function (txt) {
            gCtx.font = txt.size + 'px ' + txt.font;
            // gCtx.font = txt.size + 'px Ariel';
            // gCtx.font = txt.size + 'px Montserrat';
            gCtx.lineWidth = txt.size / 10;
            gCtx.fillStyle = txt.color;
            gCtx.strokeText(txt.line, txt.x, txt.y);
            gCtx.fillText(txt.line, txt.x, txt.y);
        });
    }
    img.src = gImageObj.url;
    // gCanvas.width = img.width;
    // gCanvas.height = img.height;

}

function onTextChanged(elText) {
    if (gCurrText === null) return;
    gCurrText.line = elText.value;
    renderCanvas();
}

function onAddText() {
    resetFields();
    var meme = getMeme();
    var txt = meme.txts.find(function (txt) {
        return txt.type === 'top';
    });
    if (txt.line !== '') {// top text is not empty
        txt = meme.txts.find(function (txt) {
            return txt.type === 'bottom';
        });
        if (txt.line !== '') {// bottom text is not empty
            txt = meme.txts.find(function (txt) {
                return txt.type === 'center';
            });
        }
    }
    gCurrText = txt;
    updateFields();
}

function onDeleteText() {
    gCurrText.line = '';
    updateFields();
    renderCanvas();
}

function onTextFocus(elText) {
    // var meme = getMeme();
    // if (elText.id === 'first-line') {
    //     meme.firstLine.isActive = true;
    //     meme.secondLine.isActive = false;
    //     document.getElementById('color').value = meme.firstLine.color;
    // } else if (elText.id === 'second-line') {
    //     meme.firstLine.isActive = false;
    //     meme.secondLine.isActive = true;
    //     document.getElementById('color').value = meme.secondLine.color;
    // }
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function resetFields() {
    document.getElementById('text-area').value = '';
    document.getElementById('color').value = '#FFFFFF';
}

function onMoveUp() {
    gCurrText.y -= 5;
    renderCanvas();
}

function onMoveDown() {
    gCurrText.y += 5;
    renderCanvas();
}

function onMoveLeft() {
    gCurrText.x -= 5;
    renderCanvas();
}

function onMoveRight() {
    gCurrText.x += 5;
    renderCanvas();
}

function onClear() {
    var doClear = confirm('Are you sure?');
    if (doClear) {
        var meme = getMeme();
        // createMeme(meme.selectedImgId);
        var id = meme.selectedImgId;
        initCanvas(id);
        // gCurrText = meme.txts[0];
        // resetFields();
        // renderCanvas();
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
    if (gCurrText === null) return;
    gCurrText.color = document.getElementById('color').value;
    renderCanvas();
}

function onFontChanged() {
    if (gCurrText === null) return;
    gCurrText.font = document.querySelector('.canvas-font').value;
    renderCanvas();
}

function onSizeChanged() {
    if (gCurrText === null) return;
    gCurrText.size = document.querySelector('.canvas-size').value;
    renderCanvas();
}

function canvasClicked(ev) {
    var meme = getMeme();
    meme.txts.map(function (txt) {
        var textWidth = gCtx.measureText(txt.line).width;
        var txtHeight = txt.size;
        if (ev.offsetX > txt.x &&
            ev.offsetX < txt.x + textWidth &&
            ev.offsetY > txt.y - txtHeight / 2 &&
            ev.offsetY < txt.y + txtHeight / 2) {
            // console.log(txt.line);
            // txt.color = '#FFFF00';
            gCurrText = txt;
            updateFields();
        } else {
            // console.log('canvas');
            // txt.color = '#000000';
            // gCurrText = null;
        }

    });
    renderCanvas();
}

function updateFields() {
    // gCurrText = txt;
    document.getElementById('text-area').value = gCurrText.line;
    document.getElementById('color').value = gCurrText.color;
    document.querySelector('.canvas-font').value = gCurrText.font;
    document.querySelector('.canvas-size').value = gCurrText.size;
}