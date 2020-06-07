import * as Phaser from 'phaser';

export class Header extends Phaser.GameObjects.Container {
  scoreText: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 50);
    scene.add.existing(this);
    const w = scene.sys.canvas.width;
    this.setX(w);
    this.scoreText = scene.add.text(w / 2, 16, 'Balls: 0', { fontSize: '32px', fill: '#FFF' });
    this.scoreText.setOrigin(0.5, 0.5);
    this.add(this.scoreText);
  }
}
