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
        "currY": 0
      });
      image.onload = function() {
        console.log("loaded!");
        obj.loaded++;
      }
    }
  }

  getSprite(name) {
    var spriteID = this.sprites.map(function(e) { return e.name; }).indexOf(name);
    var retSprite = this.checkUpdate(spriteID);
    return retSprite;
  }

  checkUpdate(num) {
    var sprite = this.sprites[num];
    var now = new Date().getTime();
    if (now >= sprite.lastupdate + sprite.timing) {
      this.sprites[num].lastupdate = now;
      this.sprites[num].currX += sprite.width;
      if (this.sprites[num].currX >= this.sprites[num].maxwidth) {
        this.sprites[num].currX = 0;
      }
    }
    return ({"image": this.sprites[num].image, "x": this.sprites[num].currX, "y": this.sprites[num].currY, "width": this.sprites[num].width, "height": this.sprites[num].height});
  }

  //returns all of the sprites
  getSprites() {
    return this.checkUpdates();
  }

  checkUpdates() {
    var newSprites = [];
    for (var i = 0; i < this.sprites.length; i++) {
      var sprite = this.sprites[i];
      var now = new Date().getTime();
      if (now >= sprite.lastupdate + sprite.timing) {
        this.sprites[i].lastupdate = now;
        this.sprites[i].currX += sprite.width;
        if (this.sprites[i].currX >= this.sprites[i].maxwidth) {
          this.sprites[i].currX = 0;
        }
      }
      sprite = this.sprites[i];
      newSprites.push({"image": sprite.image, "x": sprite.currX, "y": sprite.currY, "width": sprite.width, "height": sprite.height});
    }

    return newSprites;
  }

  //check if all sprites loaded
  checkLoaded() {
    return (this.loaded == this.numImages);
  }


}
