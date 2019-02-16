'use strict'

var gCanvas;
var gCtx;
// var gColor;
// var gImage;
var gImageObj;

function init() {
  createImages();
  renderGallery();
  renderFirstFillter();
  renderSecndFilter();
  // createDefualtSearchCounter()
}

function renderGallery() {
  var images = getImagesForDisplay();
  var strHtmls = images.map(function (image) {
    return `
    <div class="img img-1" style="background-image: url(${image.url}); background-repeat: no-repeat; background-size: cover; background-position: center center; position: relative;
     width:100%; object-fit: cover" onclick="onImageClicked(${image.id})"></div>`
  })
  var container = document.querySelector('.main-container');
  container.innerHTML = strHtmls.join('');

}

function onImageClicked(id) {
  var elGallery = document.querySelector('.gallery-main');
  elGallery.classList.add('hide');
  var elCanvas = document.querySelector('.canvas-main-container');
  elCanvas.classList.remove('hide');
  initCanvas(id);
}

function onBacktoGallery() {
  var elGallery = document.querySelector('.gallery-main');
  elGallery.classList.remove('hide');
  var elCanvas = document.querySelector('.canvas-main-container');
  elCanvas.classList.add('hide');
  init();
}

function filtreDistinctKewords() {
  createImages();
  var allMemes = getImagesForDisplay();
  var memeKywords = allMemes.map(meme => meme.keywords);
  var result = flatten(memeKywords)
  var filteredArray = result.filter(function (item, pos) {
    return result.indexOf(item) === pos;
  });
  return filteredArray
}

function flatten(result) {
  var res = result.reduce(function (acc, val) {
    if (val instanceof Array) {
      return acc.concat(flatten(val));
    }
    return acc.concat(val);
  }, []);
  return res;
}

function renderFirstFillter() {
  var keyWords = filtreDistinctKewords();
  var strHtml = keyWords.map(function (word) {
    return `<option value="${word}">${word}</option>`
  })
  var strHtmls = `<option value = "All" > You can fillter the gallery</option>` +
    strHtml.join('');
  var container = document.getElementById('key-words');
  container.innerHTML = strHtmls
}


function onFilterChange(filterByKeyWord) {
  console.log('check', filterByKeyWord)
  setMemesFilter(filterByKeyWord);
  updateSearchCounter(filterByKeyWord);
  renderGallery();
  renderSecndFilter();
}


function findTopSearches(param) {
  var topSerches = {};
  var arrOfSerches = getSerchCounter();
  var maxprev = Infinity;
  for (var i = 0; i < param; i++) {
    var max = 0;
    var value;
    for (var key in arrOfSerches) {
      // console.log('lop', key, arrOfSerches[key])
      if (+arrOfSerches[key] >= max && +arrOfSerches[key] <= maxprev && !topSerches[key]) {
        max = +arrOfSerches[key];
        value = key;
      }
    }
    maxprev = max;
    topSerches[value] = max;
  }
  console.log(topSerches)
  return (topSerches);
}


function renderSecndFilter() {
  var mostlySerched = findTopSearches(3);
  var baseSize = 60; //base size font param that can be changed 
  var arrOfValues = Object.values(mostlySerched);
  var total = arrOfValues.reduce(function (acc, val) { return acc + val }, 0);
  var keysForDisplay = Object.keys(mostlySerched);
  var strHtmls = keysForDisplay.map(function (key) {
    var fontSize = mostlySerched[key] / total;
    return `<li value="${key}" style="font-size:${baseSize * fontSize}px" onclick="onFilterChange('${key}')">${key} </li>`
  });
  console.log('inner', strHtmls.join(''))
  var scndFiltContainer = document.querySelector('.scnd-filter-list');
  scndFiltContainer.innerHTML = strHtmls.join('');
}


function initCanvas(id) {
  // createImages();
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


