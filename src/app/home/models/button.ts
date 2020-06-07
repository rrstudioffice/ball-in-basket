import * as Phaser from 'phaser';

export interface IConfigButton {
  scene: Phaser.Scene;
  callback: () => void;
  txt: string;
  x: number;
  y: number;
  style?: any;
}
export class Button extends Phaser.GameObjects.Container {
  label: Phaser.GameObjects.Text;
  options = { fontSize: '36px' };

  constructor(config: IConfigButton) {
    super(config.scene, config.x + 10, config.y + 10);
    this
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => this.enterButtonHoverState())
      .on('pointerout', () => this.enterButtonRestState())
      .on('pointerdown', () => this.enterButtonActiveState())
      .on('pointerup', () => {
        this.enterButtonHoverState();
        config.callback();
      });
  }

  initBtn(txt) {
    this.label = this.scene.add.text(this.x, this.y, txt, this.options);
    this.label.setOrigin(0.5, 0.5);
    this.label.setInteractive();
  }

  enterButtonHoverState() {
    this.label.setStyle({ fill: '#ff0' });
  }

  enterButtonRestState() {
    this.label.setStyle({ fill: '#0f0' });
  }

  enterButtonActiveState() {
    this.label.setStyle({ fill: '#0ff' });
  }

}
