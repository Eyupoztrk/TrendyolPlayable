export class EndGameManager {
    constructor(scene) {
        this.scene = scene;
    }

    showEndGame() {
        this.scene.physics.pause();
        this.createEndGameScreen();
    }

    createEndGameScreen() {
        // Create blur effect
        const darkOverlay = this.scene.add.rectangle(
            0, 0,
            this.scene.game.config.width,
            this.scene.game.config.height,
            0x000000, 0.7
        ).setOrigin(0).setDepth(1);
        
        this.scene.tweens.add({
            targets: darkOverlay,
            alpha: { from: 0, to: 0.7 },
            duration: 800,
            ease: 'Power2'
        });

        // Create end screen container
        const endScreen = this.scene.add.container(200, 300).setDepth(2);
        
        // Create gradient background
        const gradientTexture = this.scene.add.graphics();
        gradientTexture.fillGradientStyle(0x2d3436, 0x2d3436, 0x636e72, 0x636e72, 1);
        gradientTexture.fillRect(-150, -150, 300, 300);
        
        // Create glass panel
        const panel = this.scene.add.rectangle(0, 0, 300, 320, 0xffffff, 0.1)
            .setStrokeStyle(2, 0xffffff, 0.3);
        
        // Add shine effect
        const shine = this.scene.add.graphics();
        shine.lineGradientStyle(100, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0.2, 0, 0.2, 0);
        shine.lineBetween(-150, -150, 150, 150);

        // Add trophy and texts
        const trophy = this.scene.add.text(0, -120, '🏆', { fontSize: '64px' }).setOrigin(0.5);
        
        const gameOverText = this.scene.add.text(0, -40, 'Oyun Bitti!', {
            fontSize: '36px',
            fill: '#ffffff',
            fontFamily: 'Poppins',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        const finalScoreText = this.scene.add.text(0, 20, 'Toplam Kazanç:', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Poppins'
        }).setOrigin(0.5);

        const score = this.scene.scoreManager.getScore();
        const finalScore = this.scene.add.text(0, 60, '₺0', {
            fontSize: '48px',
            fill: '#f27a1a',
            fontFamily: 'Poppins',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // Create CTA button
        const buttonBg = this.scene.add.rectangle(0, 130, 220, 50, 0xf27a1a)
            .setInteractive()
            .setOrigin(0.5);
        
        const buttonText = this.scene.add.text(0, 130, 'Alışverişe Başla!', {
            fontSize: '20px',
            fill: '#ffffff',
            fontFamily: 'Poppins',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // Add button interactions
        this.setupButtonInteractions(buttonBg, buttonText);

        // Add confetti effect
        const confettiEmitter = this.scene.add.particles(0, 0, {
            frame: { frames: [0], cycle: true },
            lifespan: 2000,
            speed: { min: 100, max: 200 },
            scale: { start: 1, end: 0 },
            gravityY: 300,
            quantity: 2,
            blendMode: 'ADD',
            emitting: false
        });

        // Add elements to end screen
        endScreen.add([gradientTexture, panel, shine, trophy, gameOverText, 
                      finalScoreText, finalScore, buttonBg, buttonText]);

        // Animate end screen entrance
        this.animateEndScreen(endScreen, finalScore, score, trophy, confettiEmitter);
    }

    setupButtonInteractions(buttonBg, buttonText) {
        buttonBg.on('pointerover', () => {
            this.scene.tweens.add({
                targets: [buttonBg, buttonText],
                scaleX: 1.05,
                scaleY: 1.05,
                duration: 100,
                ease: 'Power1'
            });
            buttonBg.setFillStyle(0xff8f4a);
        });

        buttonBg.on('pointerout', () => {
            this.scene.tweens.add({
                targets: [buttonBg, buttonText],
                scaleX: 1,
                scaleY: 1,
                duration: 100,
                ease: 'Power1'
            });
            buttonBg.setFillStyle(0xf27a1a);
        });

        buttonBg.on('pointerdown', () => {
            window.location.href = 'https://www.trendyol.com';
        });
    }

    animateEndScreen(endScreen, finalScore, score, trophy, confettiEmitter) {
        endScreen.setScale(0);
        this.scene.tweens.add({
            targets: endScreen,
            scale: { from: 0, to: 1 },
            duration: 500,
            ease: 'Back.out',
            onComplete: () => {
                // Animate score counting
                this.scene.tweens.addCounter({
                    from: 0,
                    to: score,
                    duration: 1500,
                    ease: 'Power2',
                    onUpdate: (tween) => {
                        const value = Math.floor(tween.getValue());
                        finalScore.setText('₺' + value);
                    }
                });

                // Start confetti
                confettiEmitter.start();
                
                // Add trophy animation
                this.scene.tweens.add({
                    targets: trophy,
                    y: trophy.y - 10,
                    duration: 1000,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.inOut'
                });
            }
        });
    }
} 