import { StorageService } from '../services/storage.service';

import * as Phaser from 'phaser';
import { Button } from '../models/button';

export class BoxScene extends Phaser.Scene {
  pageTitle: string;
  finish: string;
  level: number;
  sizeW = 600;
  sizeH = 400;

  constructor() {
    super({ key: 'box', active: false });
  }

  init(data) {
    const storage = new StorageService();
    this.pageTitle = data.pageTitle;
    this.level = data.level;
    this.finish = data.levelFinish;
    storage.setItem({ key: 'level', value: data.level });
  }

  create() {
    const bg = this.add.image(0, 700, 'bg_0');
    bg.setOrigin(0, 1);

    const w = this.sys.canvas.width;
    const h = this.sys.canvas.height;
    // TITULO
    const titleText = this.add.text(w / 2, h / 2 - 150, this.pageTitle, {
      fontSize: '42px', color: '#000000', fontFamily: 'Piedra-Regular'
    });
    titleText.setOrigin(0.5, 0.5);
    this.add.existing(titleText);
    // FASE COMPLETA - Se houver
    const finishText = this.add.text(w / 2, h / 2 - 100, this.finish, {
      fontSize: '28px', color: '#000000', fontFamily: 'Piedra-Regular'
    });
    finishText.setOrigin(0.5, 0.5);
    this.add.existing(finishText);

    // JOGAR DE NOVO
    const btnPlayAgain = new Button({
      callback: () => this.scene.start('game', { level: this.level }),
      txt: 'Jogar', scene: this, x: w / 2, y: h / 2
    });
    // IR PARA O MENU
    // const btnMenu = new Button({
    //   callback: () => this.scene.start('menu'),
    //   txt: 'Menu', scene: this, x: w / 2, y: h / 2 + 80
    // });
  }

}
