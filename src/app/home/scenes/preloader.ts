import * as Phaser from 'phaser';

export class PreloaderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'preloader', active: false });
  }

  preload() {
    this.load.setPath('./assets/');
    // LEVELS
    this.load.json('level', 'level.json');
    // GUI BUTTONS
    this.load.atlas('button', 'gui/button.png', 'gui/button.json');
    // BALLS
    this.load.atlas('ball', 'balls.png', 'balls.json');
    // PLAYER
    this.load.atlas('baskets', 'baskets.png', 'baskets.json');
    // BACKGROUNDS
    this.load.image('bg_0', 'bgs/bg_0.png');
    this.load.image('bg_1', 'bgs/bg_1.png');
    this.load.image('floor_1', 'bgs/floor_1.png');
  }

  create() {
    this.scene.start('menu');
  }
}
