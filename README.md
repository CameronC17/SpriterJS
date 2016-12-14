# SpriterJS

Welcome to spriterJS.

To use spriterJS, first include `spriteJS.js` above all of your js files in the HTML.

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

The properties mean: 

```
{
    "name" : UNIQUE NAME OF SPRITE
    "image" : IMAGE URL
    "width" : WIDTH OF ONE FRAME
    "height" : HEIGHT OF ONE FRAME
    "mWidth" : WIDTH OF ENTIRE IMAGE
    "mHeight" : HEIGHT OF ENTIRE IMAGE
    "timing" : MILLISECONDS PER SPRITE UPDATE
  }
```

Then give the spriter the array of images to load.

`spriter.loadSprites(testImages);`

The images may not instantly load, as they may be quite large. Before drawing any images, use the `checkLoaded` function to ensure all images are loaded. You probably want this in a timeout loop:

`spriter.checkLoaded()`

Now, during your animation frame, you can call the following to draw your sprite of choice. (Pass the corresponding name you initially gave in the array of the images to call that exact sprite).

```
var sprite = spriter.getSprite("man");
ctx.drawImage(sprite.image,sprite.x,sprite.y,sprite.width,sprite.height,SPRITE_SCREEN_X_POS,SPRITE_SCREEN_Y_POS,sprite.width,sprite.height);
    
```

NB: `SPRITE_SCREEN_X_POS` and `SPRITE_SCREEN_Y_POS` should be the x and y values of where you want the sprite on your canvas.

##NOTE: ALL SPRITES ARE INITIALISED WITHOUT ANIMATION!!!

Once your sprites have loaded, use the following function to begin animation.

`spriter.animate("SPRITENAME", true)`

##Multi-line sprites

If your spritesheet has more sprite frames that are on more than one line (and are all part of the same animation), add the property `"multiline" : true` to your image when creating your initial array of images. The framework will be able to progress through each frame in your spritesheet.

##Duplication
To duplicate any sprite, call the following function. The first parameter should be the name of the sprite you want to copy, and the second parameter the name of the new sprite you want.

`spriter.duplicateSprite("SPRITE_TO_DUPLICATE", "SPRITE2");`

##Multiple animations on one sheet

If you have a sprite that uses different lines for different animations, you can set the sprite to draw these different lines in animation (NB: This is not possible on a multiline spritesheet). To tell spriter how many sprites are on each line, add the following multisheet line property to your sprite when loading it into spriter:

```
{
    "name" : "spritegradient",
    "image" : "http://i.imgur.com/y7f1519.png",
    "width" : 40,
    "height" : 40,
    "mWidth" : 400,
    "mHeight" : 400,
    "timing" : 50,
    "multisheet": [
      {"name": "NEW_EXAMPLE_ANIMATION_NAME_LINE_ONE", "yPos": 0, "slides": 7, "timing": 100},
      {"name": "NEW_EXAMPLE_ANIMATION_NAME_LINE_TWO", "yPos": 40, "slides": 4, "timing": 10},
      {"name": "NEW_EXAMPLE_ANIMATION_NAME_LINE_THREE", "yPos": 80, "slides": 6, "timing": 500}
    ]
  }
```

And then change what animation you want to do based on the name you have given it:

`spriter.changeAnimation("spritegradient", "NEW_EXAMPLE_ANIMATION_NAME_LINE_TWO");`

Note: All sprites begin using the first animation given to it in the array, so in the example above it would be `NEW_EXAMPLE_ANIMATION_NAME_LINE_ONE`.
