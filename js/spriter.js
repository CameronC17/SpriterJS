class Spriter {
  constructor() {
    this.sprites = [];
    this.numImages = false;
    console.log("Loaded SpriteGen 2016. Cameron Chalmers 2016");
  }

  //loads all of the sprites into the client
  loadSprites(spritelist) {
    var obj = this;
    this.numImages = spritelist.length;
    for (var i = 0; i < spritelist.length; i++) {
      var image = new Image();
      image.src = spritelist[i].image;
      image.onload = function() {
        var time = new Date().getTime();
        obj.sprites.push({"image": image, "width": spritelist[i - 1].width, "height": spritelist[i - 1].height, "maxwidth": image.width, "maxheight": image.height, "timing": spritelist[i - 1].timing, "lastupdate": time, "currX": 0, "currY": 0});
      }
    }
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
    return (this.sprites.length == this.numImages);
  }


}
