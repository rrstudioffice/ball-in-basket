import * as Phaser from 'phaser';

export interface IConfigButton {
  color?: 'grey' | 'red' | 'blue' | 'green' | 'yellow';
  callback?: () => void;
  scene: Phaser.Scene;
  style?: any;
  txt: string;
  x: number;
  y: number;
}
export class Button extends Phaser.GameObjects.Sprite {
  label: Phaser.GameObjects.Text;
  options = {
    fontSize: '28px',
    color: '#FFFFFF',
    fontFamily: 'Piedra-Regular'
  };
  constructor(config: IConfigButton) {
    super(config.scene, config.x, config.y, 'button', 'btn');
    this.setOrigin(0.5, 0.5);
    this
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => {
        this.setFrame('btn_over');
        this.label.setStyle({ color: '#000000' });
      })
      .on('pointerout', () => {
        this.setFrame('btn');
        this.label.setStyle({ color: '#FFFFFF' });
      })
      .on('pointerdown', () => this.setFrame('btn_active'))
      .on('pointerup', () => {
        this.setFrame('btn');
        config.callback();
      });
    config.scene.add.existing(this);
    this.initBtn(config.txt);
  }

  initBtn(txt) {
    this.label = this.scene.add.text(this.x, this.y, txt, this.options);
    this.label.setOrigin(0.5, 0.5);
  }
}
