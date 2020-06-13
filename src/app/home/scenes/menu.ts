import { Button } from '../models/button';
import * as Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  bg: Phaser.GameObjects.Image;
  level: number;

  constructor() {
    super({ key: 'menu', active: false });
  }

  init(data) {
    this.level = data.level;
  }

  create() {
    const bg = this.add.image(0, 700, 'bg_0');
    bg.setOrigin(0, 1);

    const width = (this.sys.game.canvas.width / 2);
    const height = (this.sys.game.canvas.height / 2);

    const titleText = this.add.text(width, height - 80, 'BALL IN BASKET', {
      fontFamily: 'Piedra-Regular',
      shadowColor: '#000000',
      strokeThickness: 2,
      stroke: '#FFFFFF',
      fontSize: '42px',
      color: '#000000'
    });
    titleText.setOrigin(0.5, 0.5);

    const btnPlayAgain = new Button({
      callback: () => {
        this.scene.start('game', { level: this.level || 1 });
      },
      y: height - 30,
      txt: 'Jogar',
      scene: this,
      x: width,
    });

    const btnSetting = new Button({
      callback: () => this.scene.start('option'),
      txt: 'Opções',
      scene: this,
      y: height + 30,
      x: width,
    });
  }
}
