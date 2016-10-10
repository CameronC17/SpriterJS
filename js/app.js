var animFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame    || window.oRequestAnimationFrame      || window.msRequestAnimationFrame     || null ;

//Creating instances of canvas and the canvas' 2d drawing
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var loaded = false;



//send: {image, width, height, timing}

var testImages = [
  {
    "image" : "https://cdn.codeandweb.com/blog/2014/11/05/animate-sprites-in-css-with-texturepacker/capguy-walk.png",
    "width" : 184,
    "height" : 320,
    "timing" : 100
  },
  {
    "image" : "http://apolinariopassos.com.br/dev/spriteOnHover/demo/images/explosion-spritesheet.png",
    "width" : 192,
    "height" : 195,
    "timing" : 1
  }
];

var spriter = new Spriter();
spriter.loadSprites(testImages);

function mainLoop() {
  clearScreen();
  if (!loaded) {
    drawBackground();
    checkLoad();
  } else {
    drawSprites();
  }

}

function drawBackground() {
  ctx.fillStyle="#23f390";
  ctx.fillRect(50, 50, 100, 100);
}

function checkLoad() {
  ctx.fillStyle="#ff0000";
  if (spriter.checkLoaded()) {
    ctx.fillStyle="#0000ff";
    loaded = true;
  }
  ctx.fillRect(300, 300, 150, 150);
}

function drawSprites() {
  var localX = 300,
      localY = 300;
  var sprites = spriter.getSprites();
  for (var i = 0; i < sprites.length; i++) {
    ctx.drawImage(sprites[i].image,sprites[i].x,sprites[i].y,sprites[i].width,sprites[i].height,localX,localY,sprites[i].width,sprites[i].height);
  }
}

function clearScreen() {
  ctx.fillStyle="#fff";
  ctx.fillRect(0, 0, c.width, c.height);
}

//This loops the animation frames for animation!!!!
var recursiveAnim = function() {
          mainLoop();
          animFrame(recursiveAnim);
    };
animFrame(recursiveAnim);
