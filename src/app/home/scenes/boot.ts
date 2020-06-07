import * as Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'boot', active: true });
  }

  create() {
    this.scene.start('preloader');
  }
}
