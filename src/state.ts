let state = {
  clock: {} as THREE.Clock,
  scene: {} as THREE.Scene,
  camera: {} as THREE.PerspectiveCamera,
  renderer: {} as THREE.WebGLRenderer,
  entities: [],
  keyboard: {
    keys: [] as number[],
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
    onLoad: () => {},
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

export default state;
