import { UIManager } from '../managers/UIManager.js';
import { PlayerManager } from '../managers/PlayerManager.js';
import { ProductManager } from '../managers/ProductManager.js';
import { ScoreManager } from '../managers/ScoreManager.js';
import { EndGameManager } from '../managers/EndGameManager.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.uiManager = new UIManager(this);
        this.playerManager = new PlayerManager(this);
        this.productManager = new ProductManager(this);
        this.scoreManager = new ScoreManager(this);
        this.endGameManager = new EndGameManager(this);
    }

    preload() {
        this.load.svg('cart', 'assets/cart.svg');
        this.load.svg('product1', 'assets/product1.svg');
        this.load.svg('product2', 'assets/product2.svg');
        this.load.svg('background', 'assets/background.svg');
        this.load.svg('logo', 'assets/logo.svg');
    }

    create() {
        // Add background
        this.add.image(200, 300, 'background');
        
        // Initialize all managers
        this.uiManager.create();
        this.playerManager.create();
        this.productManager.create();
        this.scoreManager.create();

        // Start game loop
        this.productManager.startSpawning();
    }

    update() {
        this.playerManager.update();
        this.productManager.update();
    }
} 