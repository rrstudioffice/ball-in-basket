import * as Phaser from 'phaser';

export class Basket extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, frameColor: string) {
    super(scene, x, y, 'baskets', frameColor);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setName(frameColor);
    this.setOrigin(0.5, 0.5);
    this.setOffset(0, 25);
    this.setScale(0.5, 0.5);
  }
}
