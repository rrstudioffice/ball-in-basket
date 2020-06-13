import * as Phaser from 'phaser';

export class Join extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'arrow', 'btn');
    this.setOrigin(0, 0);
    this
      .setInteractive({ useHandCursor: true })
      .on('pointerout', () => this.setFrame('btn'))
      .on('pointerdown', () => this.setFrame('btn_active'))
      .on('pointerup', () => this.setFrame('btn'));
    scene.add.existing(this);
  }
}
