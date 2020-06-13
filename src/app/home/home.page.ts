import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from './services/storage.service';
import { PreloaderScene } from './scenes/preloader';
import { OptionScene } from './scenes/option';
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
  music: Phaser.Sound.BaseSound;
  storage: StorageService;
  game: Phaser.Game;

  constructor() {
    this.config = {
      type: Phaser.AUTO,
      width: 1000,
      height: 700,
      parent: 'gameContainer',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      physics: {
        default: 'arcade',
        // arcade: { debug: true }
      },
      scene: [BootScene, PreloaderScene, MenuScene, BoxScene, OptionScene, GameScene]
    };
    this.storage = new StorageService();
  }

  ngOnInit() {
    this.storage.getObject('ball_in_basket').then(value => {
      this.game = new Phaser.Game(this.config);
      const valueConfig = { nivel: 'easy', level: 1 };
      this.game.registry.merge(Object.assign(value ? value : valueConfig));
    });
  }

  ngOnDestroy() {
    this.game.destroy(true, false);
  }

}
