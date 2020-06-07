import { StorageService } from '../services/storage.service';
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
  db: firebase.firestore.Firestore;
  auth: firebase.auth.Auth;
  storage: StorageService;
  game: Phaser.Game;

  worldModel: World;
  player: Player;
  header: Header;

  score = 0;
  config: { [key: string]: any; };

  constructor() {
    super({ key: 'game', active: false });
  }

  create() {
    this.config = this.registry.getAll();
    this.header = new Header(this);
    this.worldModel = new World(this, this.config.level || 1);
    this.player = new Player(this, 1);
    this.physics.world.setBoundsCollision(true);
    // CONTROLS
    const w = this.sys.canvas.width;
    const h = this.sys.canvas.height;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.overlap(this.player.baskets, this.worldModel.balls, this.collectBall, null, this);

    const ballAll = this.worldModel.levelGame.balls.amount;
    this.scoreText = this.add.text(w / 2, 16, 'Bolas: 0 / ' + ballAll, { fontSize: '32px', fill: '#000' });
    this.scoreText.setOrigin(0.5, 0.5);
    this.gameOverText = this.add.text(w / 2, h / 2, 'GAME OVER', {
      fontSize: '40px', fill: '#000'
    });
    this.gameOverText.setVisible(false);
    this.gameOverText.setOrigin(0.5, 0.5);
  }

  collectBall(basket: Basket, ball: Ball) {
    if (basket.active === true && ball.active === true) {
      // CONTINUA O JOGO se cesta for mesma cor que a bola
      if (basket.name === ball.name) {
        const ballAll = this.worldModel.levelGame.balls.amount;
        this.scoreText.setText(`Bolas: ${this.score += 1} / ${ballAll}`);
        ball.setActive(false);
        ball.setVisible(false);
        ball.destroy();
      } else {
        this.gameOver();
      }

      if (this.score === this.worldModel.levelGame.balls.amount) {
        // APARECE UMA BOX COM O STAGE COMPLETE
        this.scene.pause();
        // this.goToMenu();
      }
    }
  }

  update(time) {
    if (this.player.getData('notMoving')) {
      // this.playerModel.setVelocity(0);
      if (this.cursors.left.isDown) {
        this.worldModel.x -= 10;
        this.player.setfixedMovement(64, 'left');
      } else if (this.cursors.right.isDown) {
        this.worldModel.x += 10;
        this.player.setfixedMovement(64, 'right');
      }
    }
  }

  // CONCLUIR A FASE
  private async goToMenu() {
    this.registry.merge({ level: this.config.level + 1 });
    this.scene.start('menu');
  }

  private gameOver() {
    this.gameOverText.visible = true;
    this.scene.pause();
  }
}
