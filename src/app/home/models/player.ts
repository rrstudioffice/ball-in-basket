import * as Phaser from 'phaser';
import { Basket } from './basket';

import { IMap, IMapLevel } from '../interface';

export class Player extends Phaser.GameObjects.Container {
  baskets: Basket[] = [];
  lines: number[];

  constructor(scene: Phaser.Scene, nLvl: number) {
    super(scene, 0, scene.sys.canvas.height - 50);
    const w = scene.sys.canvas.width / 2;
    scene.add.existing(this);
    this.setData('notMoving', true);
    const mapLevel: IMap = scene.cache.json.get('level');
    const levelGame: IMapLevel = mapLevel.levels[nLvl];
    this.lines = [w - 128, w - 64, w, w + 64, w + 128];
    levelGame.baskets.colors.forEach((basket, i) => {
      const line = levelGame.baskets.lines[i];
      this.baskets.push(new Basket(scene, this.lines[line], 0, basket));
    });
    this.add(this.baskets);
  }

  setfixedMovement(distance, direction) {
    if (direction === 'left') {
      this.x -= distance;
    } else if (direction === 'right') {
      this.x += distance;
    }
    this.setData('notMoving', false);
    setTimeout(() => this.setData('notMoving', true), 100);
  }
}
