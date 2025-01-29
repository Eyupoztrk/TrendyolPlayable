import { gameConfig } from './config/gameConfig.js';
import { GameScene } from './scenes/GameScene.js';

class Game extends Phaser.Game {
    constructor() {
        super({
            ...gameConfig,
            scene: GameScene
        });
    }
}

window.onload = () => {
    new Game();
}; 