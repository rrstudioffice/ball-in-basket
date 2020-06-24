import { Button } from '../models/button';
import { Toast } from '../models/toast';

import { StorageService } from '../services/storage.service';

import * as Phaser from 'phaser';

export class OptionScene extends Phaser.Scene {
  titleText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'option', active: false });
  }

  create() {
    const width = (this.sys.game.canvas.width / 2);
    const height = (this.sys.game.canvas.height / 2);
    const bg = this.add.image(width, this.sys.game.canvas.height, 'bg_0');
    bg.setOrigin(0.5, 1);
    const toast = new Toast(this);
    const nivel = this.registry.get('nivel');
    this.titleText = this.add.text(width, height - 120,
      (nivel && nivel === 'medium') ? 'Nível Médio' : 'Nível Fácil', {
      fontFamily: 'Piedra-Regular',
      shadowColor: '#000000',
      strokeThickness: 2,
      stroke: '#FFFFFF',
      fontSize: '42px',
      color: '#000000'
    });
    this.titleText.setOrigin(0.5, 0.5);
    // EASY
    const btnEasy = new Button({
      callback: () => {
        this.registry.set('nivel', 'easy');
        this.titleText.setText('Nível Fácil');
        toast.show({ text: 'Nivél fácil acionado' });
      },
      y: height - 60, txt: 'Nível Fácil', scene: this, x: width,
    });
    // MEDIUM
    const btnMedium = new Button({
      callback: () => {
        this.registry.set('nivel', 'medium');
        this.titleText.setText('Nível Médio');
        toast.show({ text: 'Nivél médio acionado' });
      },
      txt: 'Nível Médio', scene: this, y: height, x: width,
    });

    const btnInitial = new Button({
      callback: () => {
        this.registry.set('level', 'easy');
        this.titleText.setText('Nível Fácil');
        const storage = new StorageService();
        storage.setObject('ball_in_basket', {
          nivel: this.registry.get('nivel'), level: 1
        });
        toast.show({ text: 'Progresso reiniciado!' });
        this.scene.start('game', { nivel: 'easy', level: 1 });
      },
      txt: 'Reiniciar', scene: this, y: height + 60, x: width,
    });

    // MENU
    const btnBack = new Button({
      callback: () => this.scene.start('menu'),
      y: height + 120, txt: 'Voltar', scene: this, x: width,
    });

    // TOAST
  }
}
