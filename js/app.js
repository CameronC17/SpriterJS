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
  ["homer", 100, 100],
  ["lisa", 700, 300],
  ["smallgirl", 800, 100],
  ["runguy", 300, 200],
  ["topguy", 500, 500],
  ["randomcat", 600, 10],
  ["spritegradient", 200, 200]
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
  },
  {
    "name" : "lisa",
    "image" : "http://i.imgur.com/vCc74kC.png",
    "width" : 41,
    "height" : 48,
    "mWidth" : 328,
    "mHeight" : 48,
    "timing" : 100
  },
  {
    "name" : "smallgirl",
    "image" : "https://openclipart.org/image/2400px/svg_to_png/248088/WalkingGirl.png",
    "width" : 600,
    "height" : 698,
    "mWidth" : 2400,
    "mHeight" : 698,
    "timing" : 300
  },
  {
    "name" : "runguy",
    "image" : "http://i.imgur.com/BRMnNWK.png",
    "width" : 240,
    "height" : 296,
    "mWidth" : 1440,
    "mHeight" : 1480,
    "timing" : 30,
    "multiline" : true
  },
  {
    "name" : "topguy",
    "image" : "https://s-media-cache-ak0.pinimg.com/originals/b9/f5/1d/b9f51d8e41dbb11e3d1459ee1e03f846.png",
    "width" : 32,
    "height" : 32,
    "mWidth" : 384,
    "mHeight" : 256,
    "timing" : 100,
    "multiline" : true
  },
  {
    "name" : "randomcat",
    "image" : "http://i.imgur.com/LBY8Pvx.jpg",
    "width" : 171,
    "height" : 86,
    "mWidth" : 2052,
    "mHeight" : 946,
    "timing" : 60,
    "multiline" : true
  },
  {
    "name" : "spritegradient",
    "image" : "http://i.imgur.com/y7f1519.png",
    "width" : 40,
    "height" : 40,
    "mWidth" : 400,
    "mHeight" : 400,
    "timing" : 50,
    "multisheet": [
      {"name": "one", "yPos": 0, "slides": 7, "timing": 50},
      {"name": "two", "yPos": 40, "slides": 4, "timing": 500},
      {"name": "three", "yPos": 80, "slides": 6, "timing": 250}
    ]
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
    if (!test) {
      testDuplication();
      spriter.animate("runguy2", true);
      test = true;
    }
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
    spriter.animate("runguy", true);
    spriter.animate("explosion", true);
    spriter.animate("man", true);
    spriter.animate("spritegradient", true);
  }
  //var loadText = "LOADING";
  ctx.font="70px Arial";
  ctx.fillText("LOADING", 460, 400);
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

function testDuplication() {
  var spriteToDupe = testImages[6].name;
  for (var i = 0; i < 3; i++) {
    var newName = spriteToDupe + (i + 2);
    //console.log(newName);
    posData.push([newName, Math.floor(Math.random() * c.width) + 0, Math.floor(Math.random() * c.height) + 0]);
    spriter.duplicateSprite(spriteToDupe, newName);
  }
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

var testAnimationChange = ["two", "three", "one"];

function moveMan() {
  posData[0][1]+=10;
  if (posData[0][1] > c.width) {
    posData[0][1] = -200;
    spriter.changeAnimation("spritegradient", testAnimationChange[0]);
    testAnimationChange.push(testAnimationChange[0]);
    testAnimationChange.splice(0, 1);
  }
}

function moveExplosion() {
  posData[1][1]+=explMove[0];
  posData[1][2]+=explMove[1];
  if (posData[1][1] + 192 > c.width || posData[1][1] < 0)
    explMove[0] *= -1;
  if (posData[1][2] + 195 > c.height || posData[1][2] < 0)
    explMove[1] *= -1;

}
