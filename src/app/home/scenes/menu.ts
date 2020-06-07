import { StorageService } from '../services/storage.service';

import * as Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'menu', active: false });
  }

  create() {

    const storage = new StorageService();
    // if (storage.getObject('game')) {
    //   this.scene.start('game');
    // }
    const width = (this.sys.game.canvas.width / 2);
    const height = (this.sys.game.canvas.height / 2);

    const options = { fontSize: '36px' };
    const play = this.add.text(width, height - 100, 'Jogar', options);
    play.setOrigin(0.5, 0.5);
    play.setInteractive({ useHandCursor: true });
    play.on('pointerdown', () => {
      this.scene.start('game');
    });

    const setting = this.add.text(width, height, 'Música', options);
    setting.setOrigin(0.5, 0.5);
    setting.setInteractive({ useHandCursor: true });
    setting.on('pointerdown', () => {
      this.scene.start('setting');
    });
  }
}
