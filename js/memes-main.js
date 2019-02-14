function init() {
  createImages()
  renderGallery();
}

function renderGallery() {
  var images = getImagesForDisplay()
  var strHtmls = images.map(function (image) {
      return `
    <div class="img img-1" style="background-image: url(${image.url}); background-repeat: no-repeat; background-size: cover; background-position: center center; position: relative;
     width:100%; object-fit: cover"></div>`
  })
  //console.log(strHtmls.join(''))
  var container = document.querySelector('.main-container');
  container.innerHTML = strHtmls.join('')

}
console.log(renderFirstFilter())
 function renderFirstFilter(){
//take the unique valuies from the image array on select send key param
var keywords=[];
var allMemes=getImagesForDisplay();
console.log('meme', allMemes)
var filtered= allMemes.filter(function (meme) {
  if(!keywords[meme.keywords]){push.keywords[meme.keywords] 
   return  true}
 })
console.log(keywords)
return keywords
console.log(kewords)
 }

function onSelectFilter( keyWord){   
//finds the object by key name makes the new array for display
}

function renderSecndFilter(){
// array of popularyty {keyword: numof times serched}
//the size will be function of poularity 

//
}