var animFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame    || window.oRequestAnimationFrame      || window.msRequestAnimationFrame     || null ;

//Creating instances of canvas and the canvas' 2d drawing
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var loaded = false;

//GAME DATA

var man = {
  "x" : 200,
  "y" : 200
}



//send: {image, width, height, timing}

var testImages = [
  {
    "name" : "man",
    "image" : "https://cdn.codeandweb.com/blog/2014/11/05/animate-sprites-in-css-with-texturepacker/capguy-walk.png",
    "width" : 184,
    "height" : 320,
    "mWidth" : 1472,
    "mHeight" : 325,
    "timing" : 100
  },
  {
    "name" : "explosion",
    "image" : "http://apolinariopassos.com.br/dev/spriteOnHover/demo/images/explosion-spritesheet.png",
    "width" : 192,
    "height" : 195,
    "mWidth" : 4800,
    "mHeight" : 195,
    "timing" : 50
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
    //drawSprites();
    drawSprite();
  }

}

function drawBackground() {
  ctx.fillStyle="#23f390";
  ctx.fillRect(0, 0, c.width, c.height);
}

function checkLoad() {
  ctx.fillStyle="#ff0000";
  if (spriter.checkLoaded()) {
    loaded = true;
  }
  //var loadText = "LOADING";
  ctx.font="70px Arial";
  ctx.fillText("LOADING", 500, 400);
  //ctx.fillText(loadText, c.width - (ctx.measureText(loadText).width / 2), c.height - (ctx.measureText(loadText).height / 2));
}

function drawSprites() {
  var localX = 300,
      localY = 300;
  var sprites = spriter.getSprites();
  for (var i = 0; i < sprites.length; i++) {
    ctx.drawImage(sprites[i].image,sprites[i].x,sprites[i].y,sprites[i].width,sprites[i].height,localX,localY,sprites[i].width,sprites[i].height);
  }
}

function drawSprite() {
  drawMan();
}

function drawMan() {
  var sprite = spriter.getSprite("man");
  ctx.drawImage(sprite.image,sprite.x,sprite.y,sprite.width,sprite.height,man.x,man.y,sprite.width,sprite.height);
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
