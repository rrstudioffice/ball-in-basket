import * as Phaser from 'phaser';

export class Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene) {
    super(scene, 0, 10, 'ball');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setOrigin(0.5, 0.5);
    this.setScale(0.3, 0.3);
    this.setCircle(55, 10, 10);
    this.setBounce(0.2);
  }
}
