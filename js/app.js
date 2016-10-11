var animFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame    || window.oRequestAnimationFrame      || window.msRequestAnimationFrame     || null ;

//Creating instances of canvas and the canvas' 2d drawing
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var loaded = false;
var gameTick = 50;

var test = false;

//GAME DATA

var posData = [
  ["man", -200, c.height - 320],
  ["explosion", c.width / 2, c.height / 2],
  ["ball", 600, 300],
  ["homer", 100, 100]
];

var explMove = [15, 15];

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
  },
  {
    "name" : "ball",
    "image" : "https://openclipart.org/image/2400px/svg_to_png/222581/basketball-css-spritesheet.png",
    "width" : 400,
    "height" : 400,
    "mWidth" : 2400,
    "mHeight" : 400,
    "timing" : 100
  },
  {
    "name" : "homer",
    "image" : "http://i.imgur.com/6gppwMd.png",
    "width" : 37,
    "height" : 66,
    "mWidth" : 334,
    "mHeight" : 66,
    "timing" : 100
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
  for (var i = 0; i < posData.length; i++) {
    var sprite = spriter.getSprite(posData[i][0]);
    if (sprite != null) {
      ctx.drawImage(sprite.image,sprite.x,sprite.y,sprite.width,sprite.height,posData[i][1],posData[i][2],sprite.width,sprite.height);
    }
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

//game engine #####################################
function game() {
  moveMan();
  moveExplosion();


	setTimeout(function () {
		game();
  }, gameTick);
}
game();

function moveMan() {
  posData[0][1]+=10;
  if (posData[0][1] > c.width)
    posData[0][1] = -200;
}

function moveExplosion() {
  posData[1][1]+=explMove[0];
  posData[1][2]+=explMove[1];
  if (posData[1][1] + 192 > c.width || posData[1][1] < 0)
    explMove[0] *= -1;
  if (posData[1][2] + 195 > c.height || posData[1][2] < 0)
    explMove[1] *= -1;

}
