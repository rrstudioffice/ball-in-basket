import * as Phaser from 'phaser';

export class PreloaderScene extends Phaser.Scene {
  progressBar: Phaser.GameObjects.Graphics;
  progressBox: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: 'preloader', active: false });
  }

  preload() {
    this.load.setPath('./assets/');
    this.load.audio('music', ['sounds/music.ogg', 'sounds/music.mp3']);
    this.load.audio('bubble', ['sounds/bubble.ogg', 'sounds/bubble.mp3']);
    // LEVELS
    this.load.json('level', 'level.json');
    // GUI BUTTONS
    this.load.atlas('btnBlue', 'gui/btnBlue.png', 'gui/btnBlue.json');
    this.load.atlas('button', 'gui/button.png', 'gui/button.json');
    this.load.atlas('arrow', 'gui/arrow.png', 'gui/arrow.json');
    // BALLS
    this.load.atlas('ball', 'balls.png', 'balls.json');
    // PLAYER
    this.load.atlas('baskets', 'baskets.png', 'baskets.json');
    // BACKGROUNDS

    this.load.image('logo', 'logo.png');
    this.load.image('bg_0', 'bgs/bg_0.png');
    this.load.image('bg_1', 'bgs/bg_1.png');
    this.load.image('floor_1', 'bgs/floor_1.png');

    this.progressBar = this.add.graphics();
    this.progressBox = this.add.graphics();
    const w = this.sys.canvas.width / 2;
    const h = this.sys.canvas.height / 2;
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(w - 160, h - 25, 320, 50);
    this.load.on('progress', (event) => {
      this.progressBar.clear();
      this.progressBar.fillStyle(0xffffff, 1);
      this.progressBar.fillRect(w - 150, h - 20, 300 * event, 40);
    });
    this.load.on('complete', (event) => {
      if (event.progress === 1) {
        this.scene.start('menu');
        this.progressBar.destroy();
        this.progressBox.destroy();
      }
    });
  }

  create() {
    const width = (this.sys.game.canvas.width / 2);
    const height = (this.sys.game.canvas.height / 2);
    const logo = this.add.image(width, height, 'logo');
    logo.setOrigin(0.5, 0.5);
    logo.setScale(0.2);
  }
}
