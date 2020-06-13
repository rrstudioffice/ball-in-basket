import { Button } from '../models/button';
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
      },
      y: height - 60, txt: 'Nível Fácil', scene: this, x: width,
    });
    // MEDIUM
    const btnMedium = new Button({
      callback: () => {
        this.registry.set('nivel', 'medium');
        this.titleText.setText('Nível Médio');
      },
      txt: 'Nível Médio', scene: this, y: height, x: width,
    });

    // MENU
    const btnBack = new Button({
      callback: () => this.scene.start('menu'),
      y: height + 100, txt: 'Voltar', scene: this, x: width,
    });
  }
}
