import { StorageService } from '../services/storage.service';

import * as Phaser from 'phaser';
import { Button } from '../models/button';

export class BoxScene extends Phaser.Scene {
  pageTitle: string;
  finish: string;
  sizeW = 600;
  sizeH = 400;
  level = 0;

  constructor() {
    super({ key: 'box', active: false });
  }

  init(data) {
    const storage = new StorageService();
    storage.setObject('ball_in_basket', { level: data.level });
    this.pageTitle = data.pageTitle;
    this.finish = data.levelFinish;
    this.level = data.level;
  }

  create() {
    const w = this.sys.canvas.width;
    const h = this.sys.canvas.height;
    const bg = this.add.image(w / 2, h, 'bg_0');
    bg.setOrigin(0.5, 1);
    // TITULO
    const titleText = this.add.text(w / 2, h / 2 - 100, this.pageTitle, {
      fontFamily: 'Piedra-Regular',
      shadowColor: '#000000',
      strokeThickness: 2,
      stroke: '#FFFFFF',
      fontSize: '42px',
      color: '#000000'
    });
    titleText.setOrigin(0.5, 0.5);
    this.add.existing(titleText);
    // FASE COMPLETA - Se houver
    const finishText = this.add.text(w / 2, h / 2 - 60, this.finish, {
      fontSize: '28px', color: '#000000', fontFamily: 'Piedra-Regular'
    });
    finishText.setOrigin(0.5, 0.5);
    this.add.existing(finishText);

    /** JOGAR */
    const btnPlay = new Button({
      callback: () => this.scene.start('game'),
      txt: 'Jogar', scene: this, x: w / 2, y: h / 2
    });
    // IR PARA O MENU
    const btnMenu = new Button({
      callback: () => this.scene.start('menu'),
      txt: 'Menu', scene: this, x: w / 2, y: h / 2 + 60
    });
  }

}
