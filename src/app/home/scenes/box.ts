import * as Phaser from 'phaser';

export class BoxScene extends Phaser.Scene {
  pageTitle: string;
  sizeW = 600;
  sizeH = 400;

  constructor() {
    super({ key: 'box', active: false });
  }

  init(data) {
    this.pageTitle = data.pageTitle;
  }

  create() {
    const w = this.sys.canvas.width;
    const h = this.sys.canvas.height;
    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 0.9);
    graphics.fillRect((w - this.sizeW) / 2, (h - this.sizeH) / 2, this.sizeW, this.sizeH);
    const pageTItle = this.add.text(w / 2, h / 2 - 180, this.pageTitle, {
      fontSize: '32px',
      fillColor: '#FFFFFF'
    });
    pageTItle.setOrigin(0.5, 0.5);

    const playAgain = this.add.text(w / 2, h / 2 - 180, 'Jogar de novo', {
      fontSize: '32px',
      fillColor: '#FFFFFF'
    });
    playAgain.setOrigin(0.5, 0.5);
    this.add.existing(playAgain);
    playAgain.on('pointerdown', (pointer) => {
      this.scene.remove();
      this.scene.start('game');
    });
  }

  update() {
  }

}
