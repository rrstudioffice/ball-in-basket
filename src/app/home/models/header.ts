import * as Phaser from 'phaser';

export class Header extends Phaser.GameObjects.Container {
  scoreText: Phaser.GameObjects.Text;
  lvlText: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, amount: number, level: number) {
    super(scene, 0, 0);
    scene.add.existing(this);
    const w = scene.sys.canvas.width;
    this.scoreText = scene.add.text(w - 20, 20, `Bolas: 0 / ${amount}`, {
      fontSize: '32px', color: '#000', stroke: '3px', fontFamily: 'Piedra-Regular'
    });
    this.scoreText.setOrigin(1, 0.5);
    this.add(this.scoreText);
    // LEVEL
    this.lvlText = scene.add.text(20, 20, `Level: ${level}`, {
      fontSize: '32px', color: '#000', fontFamily: 'Piedra-Regular'
    });
    this.lvlText.setOrigin(0, 0.5);
    this.add(this.scoreText);
  }
}
