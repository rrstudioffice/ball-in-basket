import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from './services/storage.service';
import { PreloaderScene } from './scenes/preloader';
import { OptionScene } from './scenes/option';
import { MenuScene } from './scenes/menu';
import { GameScene } from './scenes/game';
import { BootScene } from './scenes/boot';
import { BoxScene } from './scenes/box';

import { Platform } from '@ionic/angular';

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

  constructor(private plt: Platform) {
    this.config = {
      type: Phaser.AUTO,
      width: this.plt.width(),
      height: this.plt.height(),
      parent: 'gameContainer',
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
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
      this.game.registry.merge(
        value ? value : Object.assign({ nivel: 'easy', level: 1 })
      );
    });
  }

  ngOnDestroy() {
    this.game.destroy(true, false);
  }

}
