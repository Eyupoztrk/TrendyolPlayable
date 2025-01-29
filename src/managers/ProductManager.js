export class ProductManager {
    constructor(scene) {
        this.scene = scene;
        this.products = [];
        this.spawnTimer = null;
    }

    create() {
        // Initialize any necessary setup
    }

    startSpawning() {
        this.spawnTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: this.spawnProduct,
            callbackScope: this,
            loop: true
        });
    }

    spawnProduct() {
        const x = Phaser.Math.Between(50, this.scene.game.config.width - 50);
        const productType = Phaser.Math.Between(1, 2);
        const product = this.scene.add.sprite(x, -50, 'product' + productType);
        product.setScale(0.4);
        
        this.scene.physics.add.existing(product);
        product.body.setVelocityY(200);
        
        this.products.push(product);

        // Add floating animation
        this.scene.tweens.add({
            targets: product,
            angle: 360,
            duration: 2000,
            repeat: -1
        });
    }

    checkCollision(player) {
        for (let i = this.products.length - 1; i >= 0; i--) {
            const product = this.products[i];
            if (Phaser.Geom.Intersects.RectangleToRectangle(
                player.getBounds(),
                product.getBounds()
            )) {
                this.scene.scoreManager.collectProduct(product);
                this.removeProduct(product);
            }
        }
    }

    removeProduct(product) {
        product.destroy();
        this.products = this.products.filter(p => p !== product);
    }

    update() {
        const player = this.scene.playerManager.getPlayer();
        if (player) {
            this.checkCollision(player);
        }

        // Remove off-screen products
        for (let i = this.products.length - 1; i >= 0; i--) {
            const product = this.products[i];
            if (product.y > this.scene.game.config.height - 80) {
                this.removeProduct(product);
            }
        }
    }

    destroy() {
        if (this.spawnTimer) {
            this.spawnTimer.remove();
        }
        this.products.forEach(product => product.destroy());
        this.products = [];
    }
} 