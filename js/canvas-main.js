'use strict';
var gCanvas;
var gCtx;
var gImage;
var gCurrText;
var gFirstLoad;

function initCanvas(id) {
    // createImages();
    createMeme(id);
    var meme = getMeme();
    gCurrText = meme.txts[0];

    gImage = getImageById(id);
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    gFirstLoad = true;
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
    // window.location = '/';
}

function renderCanvas() {
    var meme = getMeme();
    // console.log(meme);

    var img = new Image();

    img.onload = function () {
        var imgWidth = img.naturalWidth;
        var screenWidth = $(window).width() - 20;
        var scaleX = 1;
        if (imgWidth > screenWidth)
            scaleX = screenWidth / imgWidth;
        var imgHeight = img.naturalHeight;
        var screenHeight = $(window).height() - gCanvas.offsetTop - 10;
        var scaleY = 1;
        if (imgHeight > screenHeight)
            scaleY = screenHeight / imgHeight;
        var scale = scaleY;
        if (scaleX < scaleY)
            scale = scaleX;
        if (scale < 1) {
            imgHeight = imgHeight * scale;
            imgWidth = imgWidth * scale;
        }
        gCanvas.height = imgHeight;
        gCanvas.width = imgWidth;

        gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, imgWidth, imgHeight);

        if (gFirstLoad) {
            if (gCanvas.width < 450) {
                // console.log('450');
                // console.log(gCanvas.width);
                updateFontSize();
                document.getElementById('text-area').style.width = gCanvas.width -20 + 'px';
                // document.querySelector('.canvas-gallery').style.width = gCanvas.width + 'px';
                document.querySelector('.canvas-main-controller').style.width = gCanvas.width -20 + 'px';
                document.querySelector('.canvas-control-box').style.width = gCanvas.width -20 + 'px';
                document.querySelector('.canvas-control-text').style.width = gCanvas.width -20 + 'px';
                document.querySelector('.canvas-download').style.width = gCanvas.width -20 + 'px';
            }
            updateMemeHeights();
            gFirstLoad = false;
        }

        // gCtx.drawImage(img, 0, 0);

        // gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);
        // gCtx.textBaseline = 'middle';

        meme.txts.map(function (txt) {
            gCtx.font = txt.size + 'px ' + txt.font;
            gCtx.lineWidth = txt.size / 10;
            gCtx.fillStyle = txt.color;
            // txt.x = gCanvas.width / 2 - gCtx.measureText(txt.line).width / 2;
            gCtx.strokeText(txt.line, txt.x, txt.y);
            gCtx.fillText(txt.line, txt.x, txt.y);
        });
    }
    img.src = gImage.url;
}

function updateMemeHeights() {
    var meme = getMeme();
    meme.txts.map(function (txt) {
        if (txt.type === 'top') {
            txt.y = txt.size + 20;
        }
        if (txt.type === 'bottom') {
            txt.y = gCanvas.height - 20;
        }
        if (txt.type === 'center') {
            txt.y = (gCanvas.height / 2) + (txt.size / 2);
        }
    });
}

function updateFontSize() {
    var meme = getMeme();
    meme.txts.map(function (txt) {
        txt.size = 30;
    });
    document.querySelector('.canvas-size').value = 30;
}

function onTextChanged(elText) {
    if (gCurrText === null) return;
    gCtx.font = gCurrText.size + 'px ' + gCurrText.font;
    var textWidth = gCtx.measureText(elText.value).width;
    if (gCurrText.x + textWidth + 10 > gCanvas.width) return;
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

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function resetFields() {
    document.getElementById('text-area').value = '';
    document.getElementById('color').value = WHITE;
    document.querySelector('.canvas-font').value = 'Impact';
    document.querySelector('.canvas-size').value = 60;
}

function moveText(eventKeyboard) {
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            onMoveUp();
            break;
        case 'ArrowDown':
            onMoveDown();
            break;
        case 'ArrowLeft':
            onMoveLeft();
            break;
        case 'ArrowRight':
            onMoveRight();
            break;
        default: return null;
    }
}

function onMoveUp() {
    if (gCurrText.y < gCurrText.size + 5) return;
    gCurrText.y -= 5;
    renderCanvas();
}

function onMoveDown() {
    if (gCurrText.y > gCanvas.height - 5) return;
    gCurrText.y += 5;
    renderCanvas();
}

function onMoveLeft() {
    if (gCurrText.x < 5) return;
    gCurrText.x -= 5;
    renderCanvas();
}

function onMoveRight() {
    gCtx.font = gCurrText.size + 'px ' + gCurrText.font;
    var textWidth = gCtx.measureText(gCurrText.line).width;
    if (gCurrText.x + textWidth > gCanvas.width) return;
    gCurrText.x += 5;
    renderCanvas();
}

function onAlignLeft() {
    gCurrText.x = 10;
    renderCanvas();
}

function onAlignCenter() {
    gCtx.font = gCurrText.size + 'px ' + gCurrText.font;
    gCurrText.x = gCanvas.width / 2 - gCtx.measureText(gCurrText.line).width / 2;
    renderCanvas();
}

function onAlignRight() {
    gCtx.font = gCurrText.size + 'px ' + gCurrText.font;
    gCurrText.x = gCanvas.width - gCtx.measureText(gCurrText.line).width - 10;
    renderCanvas();
}

// function onClear() {
//     var doClear = confirm('Are you sure?');
//     if (doClear) {
//         var meme = getMeme();
//         var id = meme.selectedImgId;
//         initCanvas(id);
//     }
// }

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
    gCurrText.size = +document.querySelector('.canvas-size').value;
    renderCanvas();
}

function canvasClicked(ev) {
    // console.log(gCanvas.width);
    // var isCanvasClicked = true;
    var meme = getMeme();
    meme.txts.map(function (txt) {
        gCtx.font = txt.size + 'px ' + txt.font;
        var textWidth = gCtx.measureText(txt.line).width;
        var txtHeight = txt.size;
        if (ev.offsetX > txt.x &&
            ev.offsetX < txt.x + textWidth &&
            ev.offsetY > txt.y - txtHeight &&
            ev.offsetY < txt.y) {
            // console.log(txt.line);
            // isCanvasClicked = false;
            // txt.color = YELLOW;
            gCurrText = txt;
            updateFields();
            renderCanvas();
        }
    });
    // if (isCanvasClicked) {
    //     console.log('canvas');
    // }
}

function updateFields() {
    // gCurrText = txt;
    document.getElementById('text-area').value = gCurrText.line;
    document.getElementById('color').value = gCurrText.color;
    document.querySelector('.canvas-font').value = gCurrText.font;
    document.querySelector('.canvas-size').value = gCurrText.size;
}