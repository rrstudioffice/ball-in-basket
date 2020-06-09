import * as Phaser from 'phaser';

export interface IConfigButton {
  callback?: () => void;
  scene: Phaser.Scene;
  style?: any;
  txt: string;
  x: number;
  y: number;
}
export class ButtonTxt extends Phaser.GameObjects.Text {
  label: Phaser.GameObjects.Text;
  options = {
    fontSize: '28px',
    color: 0xFFFFFF,
    fontFamily: 'Piedra-Regular'
  };
  color: string;

  constructor(config: IConfigButton) {
    super(
      config.scene,
      config.x,
      config.y,
      config.txt,
      null
    );
    if (config.style) {
      this.options = Object.assign(config.style, config.style);
    }
    this.setOrigin(0.5, 0.5);
    config.scene.add.existing(this);
    this.initBtn(config.txt);
  }

  initBtn(txt) {
    this.label = this.scene.add.text(this.x, this.y - 5, txt, this.options);
    this.label.setOrigin(0.5, 0.5);
  }
}
