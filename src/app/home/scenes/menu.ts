import { StorageService } from '../services/storage.service';
import { Button } from '../models/button';
import * as Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  bg: Phaser.GameObjects.Image;
  pageTitle: string;
  finish: string;
  level = 0;
  options = {
    fontFamily: 'Piedra-Regular',
    shadowColor: '#000000',
    strokeThickness: 2,
    stroke: '#FFFFFF',
    color: '#000000'
  };

  constructor() {
    super({ key: 'menu', active: false });
  }

  init(data) {
    this.pageTitle = data.pageTitle;
    this.finish = data.levelFinish;
    this.level = data.level;
  }

  create() {
    const w = (this.sys.game.canvas.width / 2);
    const h = (this.sys.game.canvas.height / 2);
    const bg = this.add.image(w, this.sys.game.canvas.height, 'bg_0');
    bg.setOrigin(0.5, 1);

    // ===================== MUDANÇA DE FASE OU GAME OVER ==========================
    // TITULO DA PAGINA - Se houver
    const titleText = this.add.text(w, h - 160, this.pageTitle,
      Object.assign(this.options, { fontSize: '42px' }),
    );
    titleText.setOrigin(0.5, 0.5);
    this.add.existing(titleText);

    // FASE COMPLETA - Se houver
    const finishText = this.add.text(w, h - 120, this.finish,
      Object.assign(this.options, { fontSize: '28px' })
    );
    finishText.setOrigin(0.5, 0.5);
    this.add.existing(finishText);

    // NOME DO JOGO
    const gameText = this.add.text(w, h - 60, 'BALL IN BASKET', {
      fontFamily: 'Piedra-Regular',
      shadowColor: '#000000',
      strokeThickness: 2,
      stroke: '#FFFFFF',
      fontSize: '42px',
      color: '#000000'
    });
    gameText.setOrigin(0.5, 0.5);

    // ================================= BUTTONS ==================================
    /** JOGAR */

    const btnPlayAgain = new Button({
      callback: () => {
        const storage = new StorageService();
        storage.setObject('ball_in_basket', {
          nivel: this.registry.get('nivel'),
          level: this.level || 1
        });
        this.scene.start('game', { level: this.level || 1 });
      },
      y: h, txt: 'Jogar', scene: this, x: w,
    });

    /** OPTION */
    const btnSetting = new Button({
      callback: () => this.scene.start('option'),
      txt: 'Opções', scene: this, y: h + 60, x: w,
    });
  }
}
