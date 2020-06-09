import * as Phaser from 'phaser';

export class Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene) {
    super(scene, 0, 50, 'ball');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setOrigin(0.5, 0.5);
    this.setCircle(24);
    this.setBounce(1);
  }
}
