import * as Phaser from 'phaser';

export class Header extends Phaser.GameObjects.Container {
  scoreText: Phaser.GameObjects.Text;
  lvlText: Phaser.GameObjects.Text;
  private options = {
    fontFamily: 'Piedra-Regular',
    strokeThickness: 2,
    stroke: '#FFFFFF',
    fontSize: '32px',
    color: '#000',
  };

  constructor(scene: Phaser.Scene, amount: number, level: number) {
    super(scene, 0, 0);
    scene.add.existing(this);
    const w = scene.sys.canvas.width;
    this.scoreText = scene.add.text(w - 20, 20, `Bolas: 0 / ${amount}`, this.options);
    this.scoreText.setOrigin(1, 0.5);
    this.add(this.scoreText);
    // LEVEL
    this.lvlText = scene.add.text(20, 20, `Level: ${level}`, this.options);
    this.lvlText.setOrigin(0, 0.5);
    this.add(this.scoreText);
  }
}
