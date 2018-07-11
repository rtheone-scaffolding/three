let state = {
  clock: null,
  scene: null,
  camera: null,
  renderer: null,
  entities: [],
  keyboard: {
    keys: [],
    isPressed: function(keyCode: number): boolean {
      return typeof this.keys[keyCode] !== 'undefined'
        ? this.keys[keyCode] >= 1
        : false;
    },
    startPressed: function(keyCode: number): boolean {
      return typeof this.keys[keyCode] !== 'undefined'
        ? this.keys[keyCode] === 1
        : false;
    },
    update: function(deltaTime: number): void {
      let len = this.keys.length;
      while (len--) {
        if (this.keys[len] >= 1) {
          this.keys[len] += deltaTime;
        }
      }
    }
  },
  loader: {
    loadingAssets: 0,
    onLoad: null,
    prepareAssets: function (numberOfAssets = 1) {
      this.loadingAssets += numberOfAssets;
    },
    assetLoaded: function (numberOfAssets = 1) {
      this.loadingAssets -= numberOfAssets;
      if (this.loadingAssets === 0) {
        this.onLoad();
      }
    }
  },
};

module.exports = state;
