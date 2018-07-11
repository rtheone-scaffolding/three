import 'normalize.css';
import './base.css';

import * as THREE from 'three';
import * as STATE from './state.ts';
import * as DEFAULT from './config.ts';

// THREE configuration

STATE.scene = new THREE.Scene();
STATE.scene.background = new THREE.Color(DEFAULT.three.backgroundColor);
STATE.camera = new THREE.PerspectiveCamera(
  85,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
STATE.camera.position.copy(DEFAULT.three.cameraPosition);
STATE.clock = new THREE.Clock();

// WIP: Resonance Audio API

/*

let audioContext = new AudioContext();
let resonanceAudioScene = new ResonanceAudio(audioContext);
resonanceAudioScene.output.connect(audioContext.destination);
resonanceAudioScene.setRoomProperties(
  DEFAULT.audio.roomDimensions,
  DEFAULT.audio.roomMaterials
);

*/

// Controllers

window.addEventListener('resize', onWindowResize, false);
window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

// Begin loading assets

STATE.loader.onLoad = loaded;

///// THE FOLLOWING IS DEMO CODE

STATE.loader.prepareAssets(3);

// demo lights

let light = new THREE.AmbientLight(0x555555);
STATE.scene.add(light);

let directionalLight = new THREE.DirectionalLight(0xddeedd, 1.5);
directionalLight.position.set(-5, 2, 3);
STATE.scene.add(directionalLight);

STATE.loader.assetLoaded();

// demo cube

let geo = new THREE.BoxGeometry(5, 5);
let mat = new THREE.MeshPhongMaterial({ color: 0x2194ce });
let mesh = new THREE.Mesh(geo, mat);

STATE.scene.add(mesh);

STATE.loader.assetLoaded();

// WIP: demo audio

/*

let audio = document.createElement('audio');
audio.src = 'resources/audio/sfx/OSR_us_000_0010_8k.wav';
let audioSource = audioContext.createMediaElementSource(audio);
let source = resonanceAudioScene.createSource();
audioSource.connect(source.input);
source.setPosition(1, 0, 0);

*/

STATE.loader.assetLoaded();

///// THE ABOVE IS DEMO CODE

function loaded() {
  // Initialize assets

  // Finalize THREE configuration.

  STATE.renderer = new THREE.WebGLRenderer();
  STATE.renderer.setPixelRatio(window.devicePixelRatio);
  STATE.renderer.setSize(window.innerWidth, window.innerHeight);

  let container = document.getElementById('app');
  container.appendChild(STATE.renderer.domElement);

  loop();
}

function loop() {
  let deltaTime = STATE.clock.getDelta();
  update(deltaTime);
  render(deltaTime);
  requestAnimationFrame(loop);
}

function update(deltaTime: number) {
  STATE.keyboard.update(deltaTime);

  // three.js demo code
  mesh.rotation.z += deltaTime;

  // WIP: Resonance Audio demo code

  /*

  source.setPosition(
    Math.sin(mesh.rotation.z) * 5,
    Math.cos(mesh.rotation.z) * 5,
    1
  );

  if (Math.floor(mesh.rotation.z) % 10 === 0 && (audio.paused || audio.ended))
    audio.play();

  */
}

function render(deltaTime: number) {
  STATE.renderer.render(STATE.scene, STATE.camera);
}

// Events

function onKeyDown(evt: KeyboardEvent) {
  if (
    typeof STATE.keyboard.keys[evt.keyCode] === 'undefined' ||
    STATE.keyboard.keys[evt.keyCode] === 0
  )
    STATE.keyboard.keys[evt.keyCode] = 1;
}

function onKeyUp(evt: KeyboardEvent) {
  STATE.keyboard.keys[evt.keyCode] = 0;
}

function onWindowResize() {
  STATE.camera.aspect = window.innerWidth / window.innerHeight;
  STATE.camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
