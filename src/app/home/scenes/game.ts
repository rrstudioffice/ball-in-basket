import { Header } from '../models/header';
import { Player } from '../models/player';
import { Basket } from '../models/basket';
import { World } from '../models/world';
import { Ball } from '../models/ball';

import * as Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  gameOverText: Phaser.GameObjects.Text;
  scoreText: Phaser.GameObjects.Text;
  bubble: Phaser.Sound.BaseSound;
  game: Phaser.Game;

  config: { [key: string]: any; };
  worldModel: World;
  player: Player;
  header: Header;
  score = 0;

  constructor() {
    super({ key: 'game', active: false });
  }

  create() {
    const w = this.sys.canvas.width;
    const h = this.sys.canvas.height;
    this.physics.world.setBoundsCollision(true);
    this.physics.world.setBounds(0, 0, w, h - 50);
    this.config = this.registry.getAll();
    this.worldModel = new World(this, this.config.level);
    this.header = new Header(this, this.worldModel.levelGame.balls.amount, this.config.level);
    this.player = new Player(this, this.config.level);
    // CONTROLS
    this.cursors = this.input.keyboard.createCursorKeys();
    // Contato da bola com o CHÃO
    this.physics.add.overlap(this.worldModel.balls, this.worldModel.floor, this.gameOver, null, this);
    // CONTATO DA BOLA COM A CESTA
    this.physics.add.overlap(this.player.baskets, this.worldModel.balls, this.collectBall, null, this);
    this.player.setfixedMovementMobile();
  }

  collectBall(basket: Basket, ball: Ball) {
    if (basket.active === true && ball.active === true) {
      // CONTINUA O JOGO se cesta for mesma cor que a bola
      if (basket.name === ball.name) {
        const ballAll = this.worldModel.levelGame.balls.amount;
        this.header.scoreText.setText(`Bolas: ${this.score += 1} / ${ballAll}`);
        ball.setActive(false);
        ball.setVisible(false);
        ball.destroy();
      } else {
        this.gameOver();
      }

      // BOLA ENCOSTAR NO CHAO GAME OVER
      if (ball.y > this.sys.canvas.height - 50) {
        this.gameOver();
      }

      if (this.score === this.worldModel.levelGame.balls.amount) {
        // APARECE UMA BOX COM O STAGE COMPLETE
        this.scene.restart();
        this.goToBox();
      }
    }
  }

  update(time) {
    this.worldModel.update(time);
    if (this.player.getData('notMoving')) {
      // this.playerModel.setVelocity(0);
      // TECLADO
      if (this.cursors.left.isDown) {
        this.player.setfixedMovement(64, 'left');
      } else if (this.cursors.right.isDown) {
        this.player.setfixedMovement(64, 'right');
      }
    }
  }

  // CONCLUIR A FASE
  private goToBox() {
    this.score = 0;
    this.registry.merge({ level: this.config.level + 1 });
    this.scene.start('box', {
      pageTitle: 'Level ' + this.config.level,
      levelFinish: 'Completo!',
      level: this.config.level + 1
    });
  }

  private async goToMenu() {
    this.scene.start('menu');
    this.score = 0;
  }

  private gameOver() {
    this.scene.pause();
    this.score = 0;
    // SE NIVEL FACIL LEVEL CONTINUA
    // SE LEVEL MEDIO LEVEL SERA
    this.scene.start('box', {
      pageTitle: 'Game Over!',
      level: this.config.nivel === 'easy' ? this.config.level : 0
    });
  }
}
