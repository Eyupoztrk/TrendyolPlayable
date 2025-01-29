export class ScoreManager {
    constructor(scene) {
        this.scene = scene;
        this.score = 0;
        this.scoreText = null;
        this.particleEmitter = null;
    }

    create() {
        this.createParticleEmitter();
    }

    createParticleEmitter() {
        this.particleEmitter = this.scene.add.particles(0, 0, {
            speed: { min: -150, max: 150 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.6, end: 0 },
            blendMode: 'ADD',
            lifespan: 1000,
            gravityY: 200,
            tint: [0xf27a1a, 0xff9f4a, 0xffb366],
            alpha: { start: 1, end: 0 },
            quantity: 1
        });
    }

    collectProduct(product) {
        // Particle effect
        this.particleEmitter.setPosition(product.x, product.y);
        this.particleEmitter.explode(20);

        // Update score
        const oldScore = this.score;
        this.score += 10;
        
        // Animate score change
        this.animateScoreChange(oldScore);
        
        // Show score popup
        this.showScorePopup(product);
    }

    animateScoreChange(oldScore) {
        // Scale effect on score text
        this.scene.tweens.add({
            targets: this.scene.uiManager.getScoreText(),
            scale: 1.2,
            duration: 100,
            yoyo: true,
            onComplete: () => {
                this.scene.uiManager.getScoreText().setScale(1);
            }
        });
        
        // Counting animation
        this.scene.tweens.addCounter({
            from: oldScore,
            to: this.score,
            duration: 500,
            ease: 'Power2',
            onUpdate: (tween) => {
                const value = Math.floor(tween.getValue());
                this.scene.uiManager.updateScore(value);
            }
        });
    }

    showScorePopup(product) {
        const scorePopup = this.scene.add.text(product.x, product.y, '+₺10', {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'Poppins',
            fontWeight: 'bold',
            stroke: '#000',
            strokeThickness: 2,
            shadow: { blur: 5, color: '#000000', fill: true }
        }).setOrigin(0.5);
        
        this.scene.tweens.add({
            targets: scorePopup,
            y: scorePopup.y - 50,
            alpha: 0,
            scale: 1.5,
            duration: 800,
            ease: 'Back.easeOut',
            onComplete: () => scorePopup.destroy()
        });
    }

    getScore() {
        return this.score;
    }

    reset() {
        this.score = 0;
        if (this.scene.uiManager) {
            this.scene.uiManager.updateScore(0);
        }
    }
} 