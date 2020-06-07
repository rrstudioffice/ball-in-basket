import * as Phaser from 'phaser';

export class PreloaderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'preloader', active: false });
  }

  preload() {
    this.load.setPath('./assets/');
    // LEVELS
    this.load.json('level', 'level.json');
    this.load.image('baseLvl', 'imgs/Level.png');
    for (let i = 2; i < 10; i++) {
      this.load.image(`lvl${i}`, `imgs/${i}.png`);
    }
    // BALLS
    this.load.atlas('ball', 'balls.png', 'balls.json');
    // PLAYER
    this.load.atlas('baskets', 'baskets.png', 'baskets.json');
    // BACKGROUNDS
    this.load.image('bg', 'bg.jpg');
  }

  create() {
    this.scene.start('menu');
  }
}
