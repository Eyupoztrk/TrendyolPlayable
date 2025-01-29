export class UIManager {
    constructor(scene) {
        this.scene = scene;
        this.scoreText = null;
        this.timeText = null;
        this.timeLeft = 30;
        this.gameTimer = null;
        this.topUIContainer = null;
    }

    create() {
        this.createTopUI();
        this.createLogo();
        this.startGameTimer();
    }

    createTopUI() {
        // Create top UI container
        this.topUIContainer = this.scene.add.container(this.scene.game.config.width / 2, 30);
        
        // Create rounded rectangle background
        const roundedRectWidth = 200;
        const roundedRectHeight = 50;
        const graphics = this.scene.add.graphics();
        graphics.fillStyle(0x000000, 0.3);
        graphics.lineStyle(2, 0xffffff, 0.1);
        
        // Draw rounded rectangle with shadow
        graphics.fillRoundedRect(-roundedRectWidth/2, -roundedRectHeight/2, roundedRectWidth, roundedRectHeight, 25);
        graphics.strokeRoundedRect(-roundedRectWidth/2, -roundedRectHeight/2, roundedRectWidth, roundedRectHeight, 25);
        
        // Add separator line
        graphics.lineStyle(2, 0xffffff, 0.1);
        graphics.beginPath();
        graphics.moveTo(0, -roundedRectHeight/2);
        graphics.lineTo(0, roundedRectHeight/2);
        graphics.strokePath();

        // Create score container
        const scoreContainer = this.scene.add.container(-roundedRectWidth/4, 0);
        const moneySymbol = this.scene.add.text(-35, -15, '₺', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Poppins',
            fontWeight: 'bold'
        });
        
        this.scoreText = this.scene.add.text(-15, -15, '0', {
            fontSize: '28px',
            fill: '#ffffff',
            fontFamily: 'Poppins',
            fontWeight: 'bold'
        });
        
        // Create timer container
        const timerContainer = this.scene.add.container(roundedRectWidth/4, 0);
        const clockSymbol = this.scene.add.text(-45, -15, '⏱', {
            fontSize: '24px',
            fill: '#ffffff'
        });
        
        this.timeText = this.scene.add.text(-15, -15, '30', {
            fontSize: '28px',
            fill: '#ffffff',
            fontFamily: 'Poppins',
            fontWeight: 'bold'
        });

        // Add glow effect
        const glow = this.scene.add.graphics();
        glow.lineStyle(8, 0xffffff, 0.1);
        glow.strokeRoundedRect(-roundedRectWidth/2 - 4, -roundedRectHeight/2 - 4, 
                              roundedRectWidth + 8, roundedRectHeight + 8, 25);

        // Add all elements to containers
        scoreContainer.add([moneySymbol, this.scoreText]);
        timerContainer.add([clockSymbol, this.timeText]);
        this.topUIContainer.add([glow, graphics, scoreContainer, timerContainer]);

        // Add floating animation
        this.scene.tweens.add({
            targets: this.topUIContainer,
            y: 35,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.inOut'
        });
    }

    createLogo() {
        const logo = this.scene.add.image(this.scene.game.config.width - 70, this.scene.game.config.height - 30, 'logo');
        logo.setScale(0.3);
        logo.setAlpha(0.8);
        
        this.scene.tweens.add({
            targets: logo,
            scale: 0.35,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.inOut'
        });
    }

    startGameTimer() {
        this.gameTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }

    updateTimer() {
        this.timeLeft--;
        this.timeText.setText(this.timeLeft);

        if (this.timeLeft <= 5) {
            this.scene.tweens.add({
                targets: this.timeText,
                scale: 1.2,
                duration: 200,
                yoyo: true,
                ease: 'Cubic.easeOut'
            });
            this.timeText.setTint(0xff0000);
        }

        if (this.timeLeft <= 0) {
            this.gameTimer.remove();
            this.scene.endGameManager.showEndGame();
        }
    }

    updateScore(value) {
        this.scoreText.setText(value.toString());
    }

    getScoreText() {
        return this.scoreText;
    }

    getTimeLeft() {
        return this.timeLeft;
    }

    reset() {
        this.timeLeft = 30;
        this.timeText.setText('30');
        this.timeText.clearTint();
        this.scoreText.setText('0');
    }
} 