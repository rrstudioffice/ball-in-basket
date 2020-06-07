import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from './services/storage.service';
import { PreloaderScene } from './scenes/preloader';
import { MenuScene } from './scenes/menu';
import { GameScene } from './scenes/game';
import { BootScene } from './scenes/boot';
import { BoxScene } from './scenes/box';

import * as Phaser from 'phaser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  config: Phaser.Types.Core.GameConfig;
  game: Phaser.Game;
  storage: StorageService;

  constructor() {
    this.config = {
      type: Phaser.AUTO,
      width: 340,
      height: 600,
      parent: 'gameContainer',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      physics: {
        default: 'arcade',
        arcade: { debug: true }
      },
      scene: [BootScene, PreloaderScene, MenuScene, BoxScene, GameScene]
    };
    this.storage = new StorageService();
  }

  ngOnInit() {
    this.storage.getObject('game').then(value => {
      const objGame = value ? value : { level: 1 };
      this.game = new Phaser.Game(this.config);
      this.game.registry.merge(Object.assign(objGame));
    });
  }

  ngOnDestroy() {
    this.game.destroy(true, false);
  }

}
