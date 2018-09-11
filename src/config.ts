import * as THREE from 'three';

export const three = {
  cameraPosition: new THREE.Vector3(0, 0, 50),
  backgroundColor: 0xffffff
};

export const audio = {
  roomDimensions: {
    width: 5,
    height: 5,
    depth: 5
  },
  roomMaterials: {
    left: 'transparent',
    right: 'transparent',
    front: 'transparent',
    back: 'transparent',
    down: 'transparent',
    up: 'transparent'
  }
};

export default { three, audio };