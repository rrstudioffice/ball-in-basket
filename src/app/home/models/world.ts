import * as Phaser from 'phaser';
import { Ball } from './ball';

import { IMap, IMapLevel } from '../interface';

export class World extends Phaser.GameObjects.Image {
  private lines: any[] = [];
  private nextBall: number;
  private mapLevel: IMap;
  // PUBLICS
  balls: Phaser.Physics.Arcade.Group;
  levelGame: IMapLevel;

  constructor(scene: Phaser.Scene, nLvl: number) {
    super(scene, 0, 0, 'bg');
    const w = scene.sys.canvas.width / 2;
    this.mapLevel = scene.cache.json.get('level');
    this.levelGame = this.mapLevel.levels[nLvl];
    this.balls = scene.physics.add.group({ classType: Ball, runChildUpdate: true });
    this.lines = [w - 128, w - 64, w, w + 64, w + 128];
    this.nextBall = 0;
    this.setOrigin(0.5, 0);
    this.setScale(0.93, 0.93);
    scene.add.existing(this);
  }

  preUpdate(time) {
    this.update(time);
  }

  update(time) {
    if (time > this.nextBall) {
      const ball: Ball = this.balls.get();
      // Velocidade da bola
      ball.setVelocityY(this.levelGame.velocity);
      // Onde ela inicia
      const line = Phaser.Utils.Array.GetRandom(this.levelGame.balls.lines);
      ball.setX(this.lines[line]);
      const frame = Phaser.Utils.Array.GetRandom(this.levelGame.balls.colors);
      ball.setName(frame);
      if (ball) {
        ball.setActive(true);
        ball.setVisible(true);
        // Tempo da próxima bola
        this.nextBall = time + this.levelGame.time;
      }
    }
  }
}
