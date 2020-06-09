import * as Phaser from 'phaser';

export class Background extends Phaser.GameObjects.TileSprite {
  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 1200, 699, 'bg_1_1');
    scene.add.existing(this);
    this.tilePositionX = scene.cameras.main.scrollX * .3;
    this.setOrigin(0.5, 1);
  }

}
