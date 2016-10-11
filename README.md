# SpriterJS

Welcome to spriteJS.

To use spriteJS, first include `sprite.js` above all of your js files in the HTML.

`<script type="text/javascript" src="js/spriteJS.js"></script>`

Then, in your JS code, create a new instance of spriteJS

`var spriter = new Spriter();`

SpriteJS handles loading images asynchronously, and allows you to check when loading has finished.

Create an array of images to load into the spriter. width and height is the dimensions of each individual frame in the animation, and mWidth and mHeight is the width and height of the whole object.

```
var images = [
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
 ]
```

Then give the spriter the array of images to load.

`spriter.loadSprites(testImages);`

Now, during your animation frame, you can call the following to draw your sprite of choice. (pass the name you initially gave in the array of the images to call that exact sprite).

```
var sprite = spriter.getSprite("man");
ctx.drawImage(sprite.image,sprite.x,sprite.y,sprite.width,sprite.height,posData[i][1],posData[i][2],sprite.width,sprite.height);
    
```
