import * as Phaser from 'phaser';
import { Basket } from './basket';

import { IMap, IMapLevel } from '../interface';
import { Join } from './join';

export class Player extends Phaser.GameObjects.Container {
  btnRight: Phaser.GameObjects.Sprite;
  btnLeft: Phaser.GameObjects.Sprite;
  baskets: Basket[] = [];
  lines: number[];
  btnRightPos = 0;
  btnLeftPos = 0;

  constructor(scene: Phaser.Scene, nLvl: number) {
    super(scene, 0, scene.sys.canvas.height - 50);
    const w = scene.sys.canvas.width / 2;
    const h = scene.sys.canvas.height;
    scene.add.existing(this);
    this.setData('notMoving', true);
    const mapLevel: IMap = scene.cache.json.get('level');
    const levelGame: IMapLevel = mapLevel.levels[nLvl];
    this.lines = [w - 128, w - 64, w, w + 64, w + 128];
    levelGame.baskets.colors.forEach((basket, i) => {
      const line = levelGame.baskets.lines[i];
      this.baskets.push(new Basket(scene, this.lines[line], -100, basket));
    });
    // Left BTN
    this.btnLeft = new Join(scene, 10, h - 74);
    this.btnLeft.setFlipX(true);
    // Right BTN
    this.btnRight = new Join(scene, scene.sys.canvas.width - 74, h - 74);
    this.add(this.baskets);
  }

  setfixedMovement(distance, direction) {
    if (direction === 'left') {
      this.x -= distance;
    } else if (direction === 'right') {
      this.x += distance;
    }
    this.setData('notMoving', false);
    setTimeout(() => this.setData('notMoving', true), 200);
  }

  /**
   * CASO O JOGO ESTEJA RODANDO EM UM CELULAR
   */
  setfixedMovementMobile() {
    const lines = [-128, -64, 0, 64, 128];
    let count = (this.x / 64);
    this.btnLeft.on('pointerup', (pointer) => {
      count--;
      this.setX(count * 64);
    });
    this.btnRight.on('pointerup', (pointer) => {
      count++;
      this.setX(count * 64);
    });
  }
}
