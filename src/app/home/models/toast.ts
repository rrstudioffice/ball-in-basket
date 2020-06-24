import * as Phaser from 'phaser';

const boxW = 250;
const boxH = 50;

export interface IConfigToast {
  position?: 'center' | 'top' | 'bottom';
  duration?: number;
  text: string;
}

export class Toast extends Phaser.GameObjects.Container {
  options = { fontSize: '22px', color: '#FFFFFF', fontFamily: 'Piedra-Regular' };
  height: number;
  width: number;

  constructor(scene: Phaser.Scene) {
    super(scene);
    this.width = this.scene.sys.canvas.width;
    this.height = this.scene.sys.canvas.height;
    this.setPosition(this.width / 2, boxH);
    // 0x222222
  }

  show(config: IConfigToast) {
    const localPos = this.pos(config.position ? config.position : 'bottom');
    const rect = this.scene.add.graphics();
    rect.fillRect(this.width / 2 - boxW / 2, localPos - (boxH / 2), boxW, boxH);
    const label = this.scene.add.text(
      this.width / 2,
      localPos,
      config.text,
      this.options
    );
    label.setOrigin(0.5, 0.5);
    setTimeout(() => {
      label.setVisible(false);
      rect.setVisible(false);
    }, config.duration ? config.duration : 1500);
    this.scene.add.existing(this);
  }

  private pos(position) {
    switch (position) {
      case 'center':
        return (this.height / 2);
      case 'top':
        return 10 + boxH / 2;
      default:
        return this.height - boxH / 2;
    }
  }
}
