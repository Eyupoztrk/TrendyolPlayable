export class PlayerManager {
    constructor(scene) {
        this.scene = scene;
        this.player = null;
        this.cartGroup = null;
        this.cartShadow = null;
        this.lastX = 0;
        this.wheelRotation = 0;
    }

    create() {
        this.createPlayer();
        this.setupMovement();
    }

    createPlayer() {
        // Create player sprite
        this.player = this.scene.add.sprite(200, 500, 'cart');
        this.player.setScale(0.7);
        this.scene.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);

        // Create shadow
        this.cartShadow = this.scene.add.ellipse(200, 525, 50, 15, 0x000000, 0.2);
        this.cartShadow.setDepth(this.player.depth - 1);

        // Create container
        this.cartGroup = this.scene.add.container(200, 500);
        this.cartGroup.add([this.cartShadow, this.player]);

        // Add floating animation
        this.addFloatingAnimation();
    }

    addFloatingAnimation() {
        this.scene.tweens.add({
            targets: this.cartGroup,
            y: this.cartGroup.y + 3,
            duration: 1200,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.inOut'
        });
    }

    setupMovement() {
        this.scene.input.on('pointermove', (pointer) => {
            const targetX = Phaser.Math.Clamp(
                pointer.x,
                this.player.width/2,
                this.scene.game.config.width - this.player.width/2
            );

            this.scene.tweens.add({
                targets: this.cartGroup,
                x: targetX,
                duration: 100,
                ease: 'Power2'
            });
        });

        this.setupTiltAnimation();
    }

    setupTiltAnimation() {
        this.scene.time.addEvent({
            delay: 16,
            callback: this.updateTilt,
            callbackScope: this,
            loop: true
        });
    }

    updateTilt() {
        const velocity = (this.cartGroup.x - this.lastX);
        const tiltAngle = Phaser.Math.Clamp(velocity * 0.3, -10, 10);

        // Smooth tilt animation
        this.scene.tweens.add({
            targets: this.player,
            angle: tiltAngle,
            duration: 100,
            ease: 'Power1'
        });

        // Update shadow
        this.cartShadow.scaleX = 1 + Math.abs(tiltAngle) * 0.01;
        this.cartShadow.scaleY = 1 - Math.abs(tiltAngle) * 0.01;
        this.cartShadow.x = this.player.x + tiltAngle * 0.5;

        this.lastX = this.cartGroup.x;
    }

    getPlayer() {
        return this.player;
    }

    update() {
        // Additional update logic if needed
    }
} 