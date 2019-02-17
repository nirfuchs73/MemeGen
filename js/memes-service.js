'use strict';
var gNextId = 1;
var gImages;
const IMAGES_KEY = 'images';
var gMeme;
var WHITE = '#FFFFFF';
var YELLOW = '#FFFF00';
var BLACK = '#000000'
var gMemesFilterBy = 'All';
const SEARCHES_KEY= 'countSearches';
var gSerchCounter = { 'happy': 3, 'dogs': 2, 'cats': 1 };

function createMeme(selectedImgId) {
    gMeme = {
        selectedImgId: selectedImgId,
        txts: [
            {
                type: 'top',
                line: '',
                x: 20,
                y: 70,
                size: 60,
                align: 'left',
                color: WHITE,
                font: 'Impact'
            },
            {
                type: 'bottom',
                line: '',
                x: 20,
                y: 450,
                size: 60,
                align: 'left',
                color: WHITE,
                font: 'Impact'
            },
            {
                type: 'center',
                line: '',
                x: 20,
                y: 250,
                size: 60,
                align: 'left',
                color: WHITE,
                font: 'Impact'
            }
        ]
    };
}

function getMeme() {
    return gMeme;
}

function createImages() {
    var images = loadFromStorage(IMAGES_KEY);
    if (!images || images.length === 0) {
        images = [
            createImage('meme-imgs/Oprah-You-Get-A.jpg', ['happy']),
            createImage('meme-imgs/004.jpg', ['dogs']),
            createImage('meme-imgs/005.jpg', ['happy']),
            createImage('meme-imgs/006.jpg', ['cats']),
            createImage('meme-imgs/putin.jpg', ['scary']),
            createImage('meme-imgs/patrick.jpg', ['happy']),
            createImage('meme-imgs/drevil.jpg', ['happy']),
            createImage('meme-imgs/leo.jpg', ['happy']),
            createImage('meme-imgs/img12.jpg', ['happy']),
            createImage('meme-imgs/img11.jpg', ['happy']),
            createImage('meme-imgs/img6.jpg', ['funny','dogs']),
            createImage('meme-imgs/img5.jpg', ['happy']),
            createImage('meme-imgs/img4.jpg', ['happy', 'funny']),
            createImage('meme-imgs/img2.jpg', ['happy']),
            createImage('meme-imgs/meme1.jpg', ['scary']),
            createImage('meme-imgs/19.jpg', ['happy']),
            createImage('meme-imgs/003.jpg', ['happy']),
            createImage('meme-imgs/12.jpg', ['happy']),
            createImage('meme-imgs/9.jpg', ['happy']),
            createImage('meme-imgs/8.jpg', ['happy']),
            createImage('meme-imgs/Ancient-Aliens.jpg', ['happy']),
            createImage('meme-imgs/One-Does-Not-Simply.jpg', ['happy']),
            createImage('meme-imgs/X-Everywhere.jpg', ['happy','cartoons']),
            createImage('meme-imgs/5.jpg', ['happy']),
            createImage('meme-imgs/2.jpg', ['happy','cartoons']),
        ];
    } else {
        gNextId = findNextId(images);
    }
    gImages = images;
    saveToStorage(IMAGES_KEY, gImages);
}

// function createDefualtSearchCounter(){
// var counter={'happy':3,'dogs':2, 'cats':1}
// var gSerchCounter = counter;
// }



function getImagesForDisplay() {
    if (gMemesFilterBy === 'All') return gImages;
    return gImages.filter(function (meme) {
        if (meme.keywords.find(function (word) { return word === gMemesFilterBy })) return meme;
    })
}

function allImages(){
    return gImages;
}


function createImage(url, keywords) {
    return {
        id: gNextId++,
        url: url,
        keywords: keywords
    };
}


function findNextId(images) {
    var max = 0;
    images.forEach(function (image) {
        if (image.id > max) max = image.id;
    })
    return max + 1;
}


function getImageById(id) {
    var image = gImages.find(function (image) {
        return image.id === id;
    });
    return image;
}

function setMemesFilter(filterByKeyWord) {
    gMemesFilterBy = filterByKeyWord;
}

function updateSearchCounter(keyWord) {
    if (keyWord === 'All') { return }
    else {
        var count = gSerchCounter[keyWord];
        gSerchCounter[keyWord] = (count) ? count + 1 : 1;
         saveToStorage(SEARCHES_KEY, gSerchCounter)
    }
}

function getSerchCounter() {
    var counter= loadFromStorage(SEARCHES_KEY);
    if (!counter || counter.length === 0) {
        counter = gSerchCounter;
    }
  return counter;
}
