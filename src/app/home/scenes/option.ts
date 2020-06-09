import { Button } from '../models/button';
import * as Phaser from 'phaser';

export class OptionScene extends Phaser.Scene {

  constructor() {
    super({ key: 'option', active: false });
  }

  create() {
    const bg = this.add.image(0, 700, 'bg_0');
    bg.setOrigin(0, 1);
    const width = (this.sys.game.canvas.width / 2);
    const height = (this.sys.game.canvas.height / 2);
    const music: Phaser.Sound.BaseSound = this.registry.get('music');
    const btnPlayAgain = new Button({
      callback: () => {
        if (music.isPlaying) {
          this.sound.mute = true;
        } else {
          this.sound.mute = false;
        }
      },
      y: height - 100,
      txt: 'Música',
      scene: this,
      x: width,
    });
    const btnSetting = new Button({
      callback: () => { },
      txt: 'Som',
      scene: this,
      y: height,
      x: width,
    });
    const btnBack = new Button({
      callback: () => this.scene.start('menu'),
      y: height + 100,
      txt: 'Voltar',
      scene: this,
      x: width,
    });
  }
}
