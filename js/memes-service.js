'use strict';
var gNextId = 1;
var gImages;
const IMAGES_KEY = 'images';
var gMeme;

function createMeme(selectedImgId) {
    gMeme = {
        selectedImgId: selectedImgId,
        firstLine: {
            line: '',
            x: 50,
            y: 50,
            size: 50,
            color: '#000000',
            isActive: true
        },
        secondLine: {
            line: '',
            x: 50,
            y: 450,
            size: 50,
            color: '#000000',
            isActive: false
        }
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
            createImage('meme-imgs/006.jpg', ['kats']),
            createImage('meme-imgs/putin.jpg', ['scary']),
            createImage('meme-imgs/patrick.jpg', ['happy']),
            createImage('meme-imgs/drevil.jpg', ['happy']),
            createImage('meme-imgs/leo.jpg', ['happy']),
            createImage('meme-imgs/img12.jpg', ['happy']),
            createImage('meme-imgs/img11.jpg', ['happy']),
            createImage('meme-imgs/img6.jpg', ['funny']),
            createImage('meme-imgs/img5.jpg', ['happy']),
            createImage('meme-imgs/img4.jpg', ['happy']),
            createImage('meme-imgs/img2.jpg', ['happy']),
            createImage('meme-imgs/meme1.jpg', ['scary']),
            createImage('meme-imgs/19.jpg', ['happy']),
            createImage('meme-imgs/003.jpg', ['happy']),
            createImage('meme-imgs/12.jpg', ['happy']),
            createImage('meme-imgs/9.jpg', ['happy']),
            createImage('meme-imgs/8.jpg', ['happy']),
            createImage('meme-imgs/Ancient-Aliens.jpg', ['happy']),
            createImage('meme-imgs/One-Does-Not-Simply.jpg', ['happy']),
            createImage('meme-imgs/X-Everywhere.jpg', ['happy']),
            createImage('meme-imgs/5.jpg', ['happy']),
            createImage('meme-imgs/2.jpg', ['happy']),
        ];
    } else {
        gNextId = findNextId(images);
    }

    gImages = images;
    saveToStorage(IMAGES_KEY, gImages);
}

function getImagesForDisplay() {
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