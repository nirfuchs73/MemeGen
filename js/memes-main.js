'use strict';

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

console.log(renderFirstFilter())
function renderFirstFilter() {
    //take the unique valuies from the image array on select send key param
    var keywords = [];
    createImages();
    var allMemes = getImagesForDisplay();
    console.log('meme', allMemes)
    var filtered = allMemes.filter(function (meme) {
        if (!keywords[meme.keywords]) {
            keywords.push[meme.keywords]
            return true
        }
    })
    console.log(keywords)
    return keywords
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
