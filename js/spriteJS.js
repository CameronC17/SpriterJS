class Spriter {
  constructor() {
    this.sprites = [];
    this.numImages = false;
    this.loaded = 0;


    //debug var
    this.sc = false;

    console.log("Loaded SpriteGen 2016. Cameron Chalmers 2016");
  }

  //loads all of the sprites into the client
  loadSprites(spritelist) {
    var obj = this;
    this.numImages = spritelist.length;
    for (var i = 0; i < spritelist.length; i++) {
      var image = new Image();
      image.src = spritelist[i].image;
      var time = new Date().getTime();
      this.sprites.push({
        "image": image,
        "name": spritelist[i].name,
        "width": spritelist[i].width,
        "height": spritelist[i].height,
        "maxwidth": spritelist[i].mWidth,
        "maxheight": spritelist[i].mHeight,
        "timing": spritelist[i].timing,
        "lastupdate": time,
        "currX": 0,
        "currY": 0,
        "multiline" : spritelist[i].multiline,
        "animate" : false
      });
      image.onload = function() {
        console.log("loaded!");
        obj.loaded++;
      }
    }
  }

  //gets a sprite based on a name
  getSprite(name) {
    var spriteID = this.sprites.map(function(e) { return e.name; }).indexOf(name);
    if (spriteID > -1) {
      var retSprite = this.checkUpdate(spriteID);
      return retSprite;
    } else {
      console.log("Unable to find sprite: " + name);
      return null;
    }

  }

  //moves the sprites animation
  checkUpdate(num) {
    var sprite = this.sprites[num];
    var now = new Date().getTime();
    if (now >= sprite.lastupdate + sprite.timing && sprite.animate) {
      this.sprites[num].lastupdate = now;
      this.sprites[num].currX += sprite.width;
      if (this.sprites[num].currX >= this.sprites[num].maxwidth) {
        if (this.sprites[num].multiline) {
          if (this.sprites[num].currY + this.sprites[num].height >= this.sprites[num].maxheight) {
            this.sprites[num].currX = 0;
            this.sprites[num].currY = 0;
          } else {
            this.sprites[num].currX = 0;
            this.sprites[num].currY += this.sprites[num].height;
          }
        } else {
          this.sprites[num].currX = 0;
        }
      }
    }
    return ({"image": this.sprites[num].image, "x": this.sprites[num].currX, "y": this.sprites[num].currY, "width": this.sprites[num].width, "height": this.sprites[num].height});
  }

  //duplicates sprites to use more of the same image
  duplicateSprite(curr, newName) {
    var spriteID = this.sprites.map(function(e) { return e.name; }).indexOf(curr);
    if (spriteID > -1) {
      var sprite = this.sprites[spriteID];
      var time = new Date().getTime();
      var dupeSprite = {
        "name" : newName,
        "image" : sprite.image,
        "width" : sprite.width,
        "height" : sprite.height,
        "maxwidth" : sprite.maxwidth,
        "maxheight" : sprite.maxheight,
        "timing" : sprite.timing,
        "lastupdate": time,
        "currX": 0,
        "currY": 0,
        "multiline" : sprite.multiline,
        "animate" : false
      }
      this.sprites.push(dupeSprite);
    } else {
      console.log("Unable to find sprite: " + curr + "   " + spriteID);
    }
  }

  animate(sprite, option) {
    var spriteID = this.sprites.map(function(e) { return e.name; }).indexOf(sprite);
    if (spriteID > -1) {
      this.sprites[spriteID].animate = option;
    } else {
      console.log("Unable to find sprite: " + sprite)
    }
  }

  //check if all sprites loaded
  checkLoaded() {
    return (this.loaded == this.numImages);
  }


}
