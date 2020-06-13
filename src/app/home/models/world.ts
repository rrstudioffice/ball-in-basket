import * as Phaser from 'phaser';
import { Ball } from './ball';

import { IMap, IMapLevel } from '../interface';

export class World extends Phaser.GameObjects.Image {
  private lines: any[] = [];
  private nextBall: number;
  private mapLevel: IMap;
  // PUBLICS
  floor: Phaser.Physics.Arcade.Sprite;
  balls: Phaser.Physics.Arcade.Group;
  levelGame: IMapLevel;
  bg: Phaser.GameObjects.TileSprite;

  constructor(scene: Phaser.Scene, nLvl: number) {
    super(scene, 0, 0, 'bg_1');
    scene.add.existing(this);
    this.setOrigin(0, 0);
    const w = this.scene.sys.canvas.width / 2;
    const h = this.scene.sys.canvas.height;
    this.mapLevel = this.scene.cache.json.get('level');
    this.levelGame = this.mapLevel.levels[nLvl];
    // BALLS
    this.balls = this.scene.physics.add.group({ classType: Ball, runChildUpdate: true });

    // FLOOR
    this.floor = this.scene.physics.add.staticSprite(1050 / 2, 595, 'floor_1');
    this.floor.setOffset(0, 80);
    this.lines = [w - 128, w - 64, w, w + 64, w + 128];
    this.nextBall = 0;
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
      ball.setFrame(frame);
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
