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

  worldModel: World;
  player: Player;
  header: Header;
  level = 1;
  score = 0;

  constructor() {
    super({ key: 'game', active: false });
  }

  init(data) {
    this.level = data.level;
  }

  create() {
    /**
     * CASO NIVEL EASY REPETI A FASE
     * CASO NIVEL MEDIO COMEÇA DO ZERO
     */
    const w = this.sys.canvas.width;
    const h = this.sys.canvas.height;
    this.physics.world.setBoundsCollision(true);
    this.physics.world.setBounds(0, 0, w, h);
    this.worldModel = new World(this, this.level);
    this.header = new Header(this, this.worldModel.levelGame.balls.amount, this.level);
    this.player = new Player(this, this.level);
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
    this.registry.set('level', this.level + 1);
    this.score = 0;
    this.scene.start('menu', {
      pageTitle: 'Level ' + this.level,
      levelFinish: 'Completo!',
      level: this.level + 1
    });
  }

  private gameOver() {
    this.scene.start('menu', { pageTitle: 'Game Over!', level: this.level });
    this.scene.pause();
    this.score = 0;
  }
}
